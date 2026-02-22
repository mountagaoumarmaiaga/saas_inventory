
import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, Lock, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { InvoiceForm, InvoiceItem, Invoice } from "./types";
import { fetchInvoices, updateInvoiceApi } from "./api"; // fetchInvoices is for list, we need single fetch

import { fetchProducts } from "../products/api";

export default function EditInvoice({ id }: { id: string }) {
    const [loading, setLoading] = useState(true); // Start loading
    const [saving, setSaving] = useState(false);
    const [clients, setClients] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [status, setStatus] = useState<string>('DRAFT');

    const [form, setForm] = useState<InvoiceForm>({
        type: "invoice",
        client_id: 0,
        tva: 0,
        date: new Date().toISOString().split('T')[0],
        notes: "",
        items: []
    });

    useEffect(() => {
        async function init() {
            try {
                // Fetch products
                const pRes = await fetchProducts("perPage=1000");
                setProducts(pRes.data || []);

                // Fetch clients 
                // Mocking client fetch as before
                try {
                    const res = await fetch('/admin/api/clients-list');
                    if (res.ok) {
                        const data = await res.json();
                        setClients(data);
                    }
                } catch (e) { }

                // Fetch Invoice
                // We use the show endpoint: /admin/api/invoices/{id}
                const invRes = await fetch(`/admin/api/invoices/${id}`, {
                    headers: {
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    }
                });
                if (!invRes.ok) throw new Error("Facture introuvable");
                const invData = await invRes.json();
                const inv: Invoice = invData.data;

                setForm({
                    type: inv.type as 'invoice' | 'proforma',
                    client_id: inv.client_id,
                    tva: inv.tva,
                    date: inv.date.split('T')[0], // ensure YYYY-MM-DD
                    notes: inv.notes ?? "",
                    items: inv.items.map(i => ({
                        id: i.id, // keep id for updates if needed, though we often replace lines
                        product_id: i.product_id,
                        description: i.description,
                        unit_price: Number(i.unit_price),
                        quantity: Number(i.quantity),
                        line_total: Number(i.line_total)
                    }))
                });
                setStatus(inv.status);

            } catch (e: any) {
                toast.error("Erreur chargement: " + e.message);
                router.visit("/admin/invoices");
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [id]);

    const isLocked = ['APPROVED', 'PAID'].includes(status);

    function handleAddItem() {
        if (isLocked) return;
        setForm(f => ({
            ...f,
            items: [...f.items, { description: "", unit_price: 0, quantity: 1, line_total: 0 }]
        }));
    }

    function handleRemoveItem(index: number) {
        if (isLocked) return;
        setForm(f => {
            const newItems = [...f.items];
            newItems.splice(index, 1);
            return { ...f, items: newItems };
        });
    }

    function updateItem(index: number, field: keyof InvoiceItem, value: any) {
        if (isLocked) return;
        setForm(f => {
            const newItems = [...f.items];
            const item = { ...newItems[index], [field]: value };

            if (field === 'product_id' && products && products.length > 0) {
                const p = products.find(prod => prod.id == value);
                if (p) {
                    item.description = p.name;
                    item.unit_price = p.sale_price;
                }
            }

            item.line_total = item.quantity * item.unit_price;
            newItems[index] = item;
            return { ...f, items: newItems };
        });
    }

    const subtotal = form.items.reduce((acc, item) => acc + item.line_total, 0);
    const total = subtotal * (1 + (form.tva || 0) / 100);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isLocked) {
            toast.error("Facture verrouillée. Impossible de modifier.");
            return;
        }
        if (!form.client_id) {
            toast.error("Veuillez sélectionner un client.");
            return;
        }

        setSaving(true);
        try {
            const res = await updateInvoiceApi(Number(id), form);
            if (!res.ok) {
                toast.error("Erreur, vérifiez le formulaire.");
                setSaving(false);
            } else {
                toast.success("Facture mise à jour !");
                // Force full reload to avoid React 'removeChild' errors during unmount of complex forms
                window.location.href = "/admin/invoices";
            }
        } catch (e: any) {
            toast.error(e.message);
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <AppLayout
                breadcrumbs={[
                    { title: "Admin", href: "/admin/dashboard" },
                    { title: "Factures", href: "/admin/invoices" },
                    { title: `Édition #${id}`, href: "#" },
                ]}
            >
                <Head title={`Éditer Facture #${id}`} />
                <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                    <div className="relative">
                        <div className="h-16 w-16 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
                    </div>
                    <p className="text-muted-foreground font-medium">Chargement de la facture...</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Factures", href: "/admin/invoices" },
                { title: `Édition #${id}`, href: "#" },
            ]}
        >
            <Head title={`Éditer Facture #${id}`} />

            <div className="p-6 space-y-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Update Invoice
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Modifier la facture #{id}
                        </p>
                    </div>
                    {isLocked && (
                        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-lg font-medium text-xs flex items-center shadow-sm">
                            <Lock className="h-3.5 w-3.5 mr-2" />
                            Lecture seule (Approuvée/Payée)
                        </div>
                    )}
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
                                <Select disabled={isLocked} value={form.type} onValueChange={(v: any) => setForm({ ...form, type: v })}>
                                    <SelectTrigger className="h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="invoice">Facture</SelectItem>
                                        <SelectItem value="proforma">Proforma</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Client</Label>
                                <Select
                                    disabled={isLocked}
                                    value={String(form.client_id || "")}
                                    onValueChange={(v) => setForm({ ...form, client_id: Number(v) })}
                                >
                                    <SelectTrigger className="h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm">
                                        <SelectValue placeholder="Sélectionner un client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map(c => (
                                            <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {clients.length === 0 && <p className="text-[10px] text-orange-500 font-medium pt-1">• Aucun client trouvé.</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</Label>
                                <Input
                                    disabled={isLocked}
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
                                        disabled={isLocked}
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
                                disabled={isLocked}
                                variant="secondary"
                                className="h-8 shadow-sm"
                            >
                                <Plus className="mr-2 h-3.5 w-3.5" /> Ajouter ligne
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            {form.items.map((item, index) => (
                                <div key={index} className="grid md:grid-cols-12 gap-4 items-start p-4 rounded-lg bg-muted/30 border border-border/40 group hover:border-primary/20 transition-colors">
                                    <div className="md:col-span-3 space-y-2">
                                        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Produit</Label>
                                        <Select
                                            disabled={isLocked}
                                            value={item.product_id ? String(item.product_id) : ""}
                                            onValueChange={(v) => updateItem(index, 'product_id', Number(v))}
                                        >
                                            <SelectTrigger className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                                                <SelectValue placeholder="Choisir..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {products && products.length > 0 ? (
                                                    products.map(p => (
                                                        <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="none" disabled>Aucun produit disponible</SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="md:col-span-3 space-y-2">
                                        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Description</Label>
                                        <Input
                                            disabled={isLocked}
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
                                            disabled={isLocked}
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
                                            disabled={isLocked}
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
                                            disabled={isLocked || form.items.length === 1}
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
                                disabled={isLocked}
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
                            onClick={() => window.location.href = '/admin/invoices'}
                            className="bg-background/50"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={saving || isLocked}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {saving ? "Sauvegarde..." : "Enregistrer les modifications"}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
