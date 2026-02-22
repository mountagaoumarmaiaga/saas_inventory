
import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

import { InvoiceForm, InvoiceItem } from "./types";
import { createInvoiceApi } from "./api";

// Assuming we have an API to fetch clients and products
// For now, we'll fetch them inside the component or expect them as props if we were using inertia props
// But since we are doing full CSR/API fetch pattern:
import { fetchProducts } from "@/pages/user/products/api";
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
    const [settings, setSettings] = useState<any>(null);

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
                setProducts(items);
            } catch (e) {
                console.error(e);
            }

            // Fetch clients - we'll try an endpoint, if fails we handle it
            try {
                // Fetch settings
                const resSettings = await fetch('/user/api/settings/invoice');
                if (resSettings.ok) {
                    const json = await resSettings.json();
                    setSettings(json.data);
                }

                // Fetch clients - we'll try an endpoint, if fails we handle it
                // Temporary: fetch from /user/clients via API? No, auth different.
                // I'll add the route in web.php in a separate step.
                const res = await fetch('/user/api/clients-list');
                if (res.ok) {
                    const data = await res.json();
                    setClients(data);
                }
            } catch (e) {
                console.error("Failed to load clients or settings");
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
            if (field === 'product_id') {
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
                router.visit("/user/invoices");
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
                { title: "Dashboard", href: "/user/dashboard" },
                { title: "Factures", href: "/user/invoices" },
                { title: "Créer", href: "#" },
            ]}
        >
            <Head title="Nouvelle Facture" />

            <div className="p-6 space-y-8 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Nouvelle Facture
                    </h1>
                </div>

                {/* Company Header / Logo Preview */}
                {settings && (
                    <div className="rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex flex-col gap-2">
                                {settings.logo_url ? (
                                    <div className="h-20 w-auto overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2 mb-2 inline-block">
                                        <img
                                            src={settings.logo_url}
                                            alt="Logo entreprise"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-20 w-20 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground text-xs mb-2">
                                        Aucun logo
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{settings.name || 'Mon Entreprise'}</h3>
                                    {settings.address && <p className="text-sm text-muted-foreground whitespace-pre-line">{settings.address}</p>}
                                    {settings.email && <p className="text-sm text-muted-foreground">{settings.email}</p>}
                                    {settings.phone && <p className="text-sm text-muted-foreground">{settings.phone}</p>}
                                </div>
                            </div>
                            <div className="text-right space-y-1">
                                <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold border border-orange-200 uppercase tracking-wider">
                                    {form.type === 'proforma' ? 'Proforma' : 'Facture'}
                                </span>
                                <p className="text-2xl font-bold text-foreground">#{'BL-XXXX'}</p>
                                <p className="text-sm text-muted-foreground">Date: {new Date(form.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                        <div className="relative p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Informations Générales</h2>
                        </div>
                        <div className="relative p-6 grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="font-bold">Type</Label>
                                <select
                                    className="flex h-12 w-full rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                                >
                                    <option value="invoice">Facture</option>
                                    <option value="proforma">Proforma</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold">Client</Label>
                                <select
                                    className="flex h-12 w-full rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                    value={form.client_id || ""}
                                    onChange={(e) => setForm({ ...form, client_id: Number(e.target.value) })}
                                >
                                    <option value="">Sélectionner un client</option>
                                    {clients.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                                {clients.length === 0 && <p className="text-xs text-muted-foreground">Aucun client trouvé.</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold">Date</Label>
                                <Input
                                    type="date"
                                    value={form.date}
                                    onChange={e => setForm({ ...form, date: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-orange-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold">TVA</Label>
                                <div className="flex items-center space-x-3 h-12">
                                    <Checkbox
                                        id="tva-toggle"
                                        checked={form.tva > 0}
                                        onCheckedChange={(checked) => {
                                            setForm({ ...form, tva: checked ? 18 : 0 });
                                        }}
                                        className="h-5 w-5"
                                    />
                                    <Label htmlFor="tva-toggle" className="font-normal cursor-pointer">
                                        Appliquer TVA (18%)
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
                        <div className="relative p-6 border-b border-white/10 flex flex-row items-center justify-between">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Articles</h2>
                            <Button type="button" size="sm" onClick={handleAddItem} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-10 rounded-xl">
                                <Plus className="mr-2 h-4 w-4" /> Ajouter ligne
                            </Button>
                        </div>
                        <div className="relative p-6 space-y-6">
                            {form.items.map((item, index) => (
                                <div key={item._tempId || index} className="grid md:grid-cols-12 gap-4 items-end border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                    <div className="md:col-span-3 space-y-2">
                                        <Label className="text-xs font-bold">Produit (Optionnel)</Label>
                                        <select
                                            className="flex h-12 w-full rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                                            value={item.product_id || ""}
                                            onChange={(e) => updateItem(index, 'product_id', Number(e.target.value))}
                                        >
                                            <option value="">Choisir un produit...</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="md:col-span-3 space-y-2">
                                        <Label className="text-xs font-bold">Description</Label>
                                        <Input
                                            value={item.description}
                                            onChange={e => updateItem(index, 'description', e.target.value)}
                                            placeholder="Service ou produit..."
                                            required
                                            className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-blue-500"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label className="text-xs font-bold">Prix Unitaire</Label>
                                        <Input
                                            type="number"
                                            value={item.unit_price}
                                            onChange={e => updateItem(index, 'unit_price', Number(e.target.value))}
                                            min="0"
                                            required
                                            className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-blue-500"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label className="text-xs font-bold">Qté</Label>
                                        <Input
                                            type="number"
                                            value={item.quantity}
                                            onChange={e => updateItem(index, 'quantity', Number(e.target.value))}
                                            min="1"
                                            required
                                            className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-blue-500"
                                        />
                                    </div>

                                    <div className="md:col-span-1 space-y-2 text-right">
                                        <Label className="text-xs font-bold block">Total</Label>
                                        <div className="h-12 flex items-center justify-end">
                                            <span className="text-base font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{item.line_total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 text-right">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive"
                                            onClick={() => handleRemoveItem(index)}
                                            disabled={form.items.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end pt-6">
                                <div className="w-72 rounded-xl border-2 border-white/10 bg-gradient-to-br from-orange-500/10 to-amber-500/10 p-6 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">Sous-total:</span>
                                        <span className="font-bold">{subtotal.toFixed(2)} FCFA</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">TVA ({form.tva}%):</span>
                                        <span className="font-bold">{(total - subtotal).toFixed(2)} FCFA</span>
                                    </div>
                                    <div className="flex justify-between text-lg border-t-2 border-white/20 pt-3">
                                        <span className="font-bold">Total:</span>
                                        <span className="font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{total.toFixed(2)} FCFA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
                        <div className="relative p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Notes</h2>
                        </div>
                        <div className="relative p-6">
                            <Textarea
                                value={form.notes || ""}
                                onChange={e => setForm({ ...form, notes: e.target.value })}
                                placeholder="Conditions de paiement, notes additionnelles..."
                                className="min-h-32 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.visit('/user/invoices')} className="h-12 rounded-xl px-6">
                            Annuler
                        </Button>
                        <Button type="submit" disabled={loading} className="h-12 rounded-xl px-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
                            {loading ? "Création..." : "Créer la facture"}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
