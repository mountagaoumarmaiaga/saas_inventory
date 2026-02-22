
import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "react-toastify";

import { InvoiceForm, InvoiceItem } from "./types";
import { createInvoiceApi, fetchProducts } from "./api";

// Assuming we have an API to fetch clients and products
// We need a client fetch. Let's assume we can fetch clients
// If not available, we might need to mock or create a quick client fetcher.
// Checking routes/web.php... no public client API for admin? 
// Wait, Controller User/Clients exists? 
// Let's check if there is an endpoint for clients.
// There isn't one explicitly in the API group for JSON.
// We should probably add one or use a makeshift one. 
// For now, I'll add a fetchClients to the invoice api if possible or just use a placeholder.
// Actually, let's create a Client select component that fetches clients.

export default function CreateInvoice() {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);

    const [form, setForm] = useState<InvoiceForm>({
        type: "invoice",
        client_id: 0,
        tva: 0,
        date: new Date().toISOString().split('T')[0],
        notes: "",
        items: [
            { _tempId: 'init-1', description: "", unit_price: 0, quantity: 1, line_total: 0 }
        ]
    });

    useEffect(() => {
        // Fetch initial data
        async function init() {
            // Fetch clients (we might need to add an endpoint or use existing)
            // Check web.php... no admin api for clients. 
            // User has clients... admin/users/clients? No.
            // Let's look at ClientController... 
            // Admin has no ClientController in web.php? 
            // Wait, Admin routes don't have clients index. 
            // User routes do. 
            // This is a gap. Admin should likely have access to clients. 
            // For the sake of this task, I will try to fetch from a hypothetic endpoint 
            // or asking the user might be too slow.
            // I'll add a quick route for clients or just assume it exists for now and fix later.
            // Actually, looking at web.php, there IS NO Admin Client route. 
            // This is problematic. 
            // I will assume for now that I can fetch users as clients or something?
            // No, InvoiceController validates `client_id` exists in `clients` table.
            // I'll check if I can add a route for clients in the next step.
            // For now, I'll structure the page to receive data.

            // Fetch products
            try {
                const { items } = await fetchProducts("perPage=1000"); // fetch all for select
                setProducts(items || []);
            } catch (e) {
                console.error(e);
            }

            // Fetch clients - we'll try an endpoint, if fails we handle it
            try {
                // Temporary: fetch from /user/clients via API? No, auth different.
                // I'll add the route in web.php in a separate step.
                const res = await fetch('/admin/api/clients-list'); // I will create this
                if (res.ok) {
                    const data = await res.json();
                    setClients(data);
                }
            } catch (e) {
                console.error("Failed to load clients");
            }
        }
        init();
    }, []);

    function handleAddItem() {
        setForm(f => ({
            ...f,
            items: [...f.items, {
                _tempId: Math.random().toString(36).substr(2, 9),
                description: "",
                unit_price: 0,
                quantity: 1,
                line_total: 0
            }]
        }));
    }

    function handleRemoveItem(index: number) {
        setForm(f => {
            const newItems = [...f.items];
            newItems.splice(index, 1);
            return { ...f, items: newItems };
        });
    }

    function updateItem(index: number, field: keyof InvoiceItem, value: any) {
        setForm(f => {
            const newItems = [...f.items];
            const item = { ...newItems[index], [field]: value };

            // If product selected, fill defaults
            if (field === 'product_id' && products && products.length > 0) {
                const p = products.find(prod => prod.id == value);
                if (p) {
                    item.description = p.name;
                    item.unit_price = p.sale_price;
                    // Store product reference for stock validation
                    item._product = p;
                }
            }

            // Recalc line total
            item.line_total = item.quantity * item.unit_price;
            newItems[index] = item;
            return { ...f, items: newItems };
        });
    }

    // Calculate totals
    const subtotal = form.items.reduce((acc, item) => acc + item.line_total, 0);
    const total = subtotal * (1 + (form.tva || 0) / 100);

    // Validate cumulative stock across all lines
    function validateStock(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];
        const productTotals = new Map<number, { name: string; total: number; available: number }>();

        // Calculate cumulative quantities for each product
        form.items.forEach(item => {
            if (item.product_id) {
                const product = products.find(p => p.id == item.product_id);
                if (product) {
                    const existing = productTotals.get(product.id) || { name: product.name, total: 0, available: product.quantity || 0 };
                    existing.total += item.quantity;
                    productTotals.set(product.id, existing);
                }
            }
        });

        // Check if any product exceeds available stock
        productTotals.forEach((data, productId) => {
            if (data.total > data.available) {
                errors.push(`Quantité insuffisante pour "${data.name}". Total demandé: ${data.total}, Stock disponible: ${data.available}`);
            }
        });

        return { valid: errors.length === 0, errors };
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.client_id) {
            toast.error("Veuillez sélectionner un client.");
            return;
        }

        // Validate stock before submission
        const stockValidation = validateStock();
        if (!stockValidation.valid) {
            stockValidation.errors.forEach(error => toast.error(error));
            return;
        }

        setLoading(true);
        try {
            const res = await createInvoiceApi(form);
            if (!res.ok) {
                toast.error("Erreur, vérifiez le formulaire."); // simplified error handling
                // In real app, map errors to fields
            } else {
                toast.success("Facture créée !");
                router.visit("/admin/invoices");
            }
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Factures", href: "/admin/invoices" },
                { title: "Créer", href: "#" },
            ]}
        >
            <Head title="Nouvelle Facture" />

            <div className="p-6 space-y-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Nouvelle Facture
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Créer une nouvelle facture ou proforma
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card className="border-border/40 bg-background/50 backdrop-blur-xl shadow-sm">
                        <CardHeader className="border-b border-border/40 pb-4">
                            <CardTitle className="text-base font-semibold tracking-tight">
                                Informations Générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                                >
                                    <option value="invoice">Facture</option>
                                    <option value="proforma">Proforma</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Client</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={form.client_id || ""}
                                    onChange={(e) => setForm({ ...form, client_id: Number(e.target.value) })}
                                >
                                    <option value="">Sélectionner un client</option>
                                    {clients.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                                {clients.length === 0 && <p className="text-[10px] text-orange-500 font-medium pt-1">• Aucun client trouvé.</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</Label>
                                <Input
                                    type="date"
                                    value={form.date}
                                    onChange={e => setForm({ ...form, date: e.target.value })}
                                    className="bg-background/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">TVA</Label>
                                <div className="flex items-center space-x-3 h-10 rounded-md border border-input bg-background/50 px-3">
                                    <Checkbox
                                        id="tva-toggle"
                                        checked={form.tva > 0}
                                        onCheckedChange={(checked) => {
                                            setForm({ ...form, tva: checked ? 18 : 0 });
                                        }}
                                    />
                                    <Label htmlFor="tva-toggle" className="font-medium cursor-pointer text-sm">
                                        Appliquer TVA (18%)
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-background/50 backdrop-blur-xl shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
                            <CardTitle className="text-base font-semibold tracking-tight">
                                Articles
                            </CardTitle>
                            <Button
                                type="button"
                                size="sm"
                                onClick={handleAddItem}
                                variant="secondary"
                                className="h-8 shadow-sm"
                            >
                                <Plus className="mr-2 h-3.5 w-3.5" /> Ajouter ligne
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            {form.items.map((item, index) => (
                                <div key={item._tempId || index} className="grid md:grid-cols-12 gap-4 items-start p-4 rounded-lg bg-muted/30 border border-border/40 group hover:border-primary/20 transition-colors">
                                    <div className="md:col-span-3 space-y-2">
                                        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Produit</Label>
                                        <select
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            value={item.product_id || ""}
                                            onChange={(e) => updateItem(index, 'product_id', Number(e.target.value))}
                                        >
                                            <option value="">Choisir un produit...</option>
                                            {products && products.length > 0 ? (
                                                products.map(p => (
                                                    <option key={p.id} value={p.id}>{p.name}</option>
                                                ))
                                            ) : null}
                                        </select>
                                    </div>

                                    <div className="md:col-span-3 space-y-2">
                                        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Description</Label>
                                        <Input
                                            value={item.description}
                                            onChange={e => updateItem(index, 'description', e.target.value)}
                                            placeholder="Description..."
                                            required
                                            className="h-9 bg-background"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Prix Unit.</Label>
                                        <Input
                                            type="number"
                                            value={item.unit_price}
                                            onChange={e => updateItem(index, 'unit_price', Number(e.target.value))}
                                            min="0"
                                            required
                                            className="h-9 bg-background"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Qté</Label>
                                        <Input
                                            type="number"
                                            value={item.quantity}
                                            onChange={e => updateItem(index, 'quantity', Number(e.target.value))}
                                            min="1"
                                            required
                                            className="h-9 bg-background"
                                        />
                                    </div>

                                    <div className="md:col-span-1 space-y-2 text-right">
                                        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Total</Label>
                                        <div className="h-9 flex items-center justify-end">
                                            <span className="text-sm font-semibold">{item.line_total.toFixed(0)}</span>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 flex items-end justify-end h-full pt-6">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => handleRemoveItem(index)}
                                            disabled={form.items.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end pt-2">
                                <div className="w-72 space-y-3 p-4 rounded-lg bg-muted/30 border border-border/40">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Sous-total:</span>
                                        <span className="font-medium">{subtotal.toFixed(0)} FCFA</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">TVA ({form.tva}%):</span>
                                        <span className="font-medium">{(total - subtotal).toFixed(0)} FCFA</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-base border-t border-border/40 pt-3 text-foreground">
                                        <span>Total:</span>
                                        <span>{total.toFixed(0)} FCFA</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-background/50 backdrop-blur-xl shadow-sm">
                        <CardHeader className="border-b border-border/40 pb-4">
                            <CardTitle className="text-base font-semibold tracking-tight">
                                Notes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Textarea
                                value={form.notes || ""}
                                onChange={e => setForm({ ...form, notes: e.target.value })}
                                placeholder="Conditions de paiement, notes additionnelles..."
                                className="min-h-[100px] bg-background/50 resize-y"
                            />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit('/admin/invoices')}
                            className="bg-background/50"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {loading ? "Création..." : "Créer la facture"}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
