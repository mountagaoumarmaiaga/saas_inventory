
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
import { Plus, Trash2, ArrowLeft, Loader2, Lock } from "lucide-react";
import { toast } from "react-toastify";

import { InvoiceForm, InvoiceItem, Invoice } from "./types";
import { fetchInvoices, updateInvoiceApi } from "./api"; // fetchInvoices is for list, we need single fetch

import { fetchProducts } from "@/pages/user/products/api";

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
                setProducts(pRes.items);

                // Fetch clients 
                // Mocking client fetch as before
                try {
                    const res = await fetch('/user/api/clients-list');
                    if (res.ok) {
                        const data = await res.json();
                        setClients(data);
                    }
                } catch (e) { }

                // Fetch Invoice
                // We use the show endpoint: /admin/api/invoices/{id}
                const invRes = await fetch(`/user/api/invoices/${id}`, {
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
                        _tempId: Math.random().toString(36).substr(2, 9),
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
                router.visit("/user/invoices");
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

            if (field === 'product_id') {
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
        // ...
        setSaving(true);
        try {
            const res = await updateInvoiceApi(Number(id), form);
            if (!res.ok) {
                toast.error("Erreur, vérifiez le formulaire.");
                setSaving(false);
            } else {
                toast.success("Facture mise à jour !");
                // Force full reload to avoid React 'removeChild' errors during unmount of complex forms
                window.location.href = "/user/invoices";
            }
        } catch (e: any) {
            toast.error(e.message);
            setSaving(false);
        }
    }
    // ...
    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "/user/dashboard" },
                { title: "Factures", href: "/user/invoices" },
                { title: `Édition #${id}`, href: "#" },
            ]}
        >
            <Head title={`Éditer Facture #${id}`} />

            <div className="p-6 space-y-8 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Éditer Facture
                    </h1>
                    {isLocked && (
                        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/30 text-amber-800 dark:text-amber-200 px-6 py-3 rounded-xl font-bold text-sm flex items-center shadow-lg">
                            <Lock className="h-5 w-5 mr-2" />
                            Lecture seule (Approuvée/Payée)
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                        <div className="relative p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Informations Générales</h2>
                        </div>
                        <div className="relative p-6 grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="font-bold">Type</Label>
                                <Select disabled={isLocked} value={form.type} onValueChange={(v: any) => setForm({ ...form, type: v })}>
                                    <SelectTrigger className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus:ring-orange-500">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="invoice">Facture</SelectItem>
                                        <SelectItem value="proforma">Proforma</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold">Client</Label>
                                <Select
                                    disabled={isLocked}
                                    value={String(form.client_id || "")}
                                    onValueChange={(v) => setForm({ ...form, client_id: Number(v) })}
                                >
                                    <SelectTrigger className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus:ring-orange-500">
                                        <SelectValue placeholder="Sélectionner un client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map(c => (
                                            <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {clients.length === 0 && <p className="text-xs text-muted-foreground">Aucun client trouvé.</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold">Date</Label>
                                <Input
                                    disabled={isLocked}
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
                                        disabled={isLocked}
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
                            <Button type="button" size="sm" onClick={handleAddItem} disabled={isLocked} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-10 rounded-xl disabled:opacity-50">
                                <Plus className="mr-2 h-4 w-4" /> Ajouter ligne
                            </Button>
                        </div>
                        <div className="relative p-6 space-y-6">
                            {form.items.map((item, index) => (
                                <div key={item._tempId || index} className="grid md:grid-cols-12 gap-4 items-end border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                    <div className="md:col-span-3 space-y-2">
                                        <Label className="text-xs font-bold">Produit (Optionnel)</Label>
                                        <Select
                                            disabled={isLocked}
                                            value={item.product_id ? String(item.product_id) : ""}
                                            onValueChange={(v) => updateItem(index, 'product_id', Number(v))}
                                        >
                                            <SelectTrigger className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus:ring-blue-500">
                                                <SelectValue placeholder="Choisir..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {products.map(p => (
                                                    <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="md:col-span-3 space-y-2">
                                        <Label className="text-xs font-bold">Description</Label>
                                        <Input
                                            disabled={isLocked}
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
                                            disabled={isLocked}
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
                                            disabled={isLocked}
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
                                            disabled={isLocked || form.items.length === 1}
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
                                disabled={isLocked}
                                value={form.notes || ""}
                                onChange={e => setForm({ ...form, notes: e.target.value })}
                                placeholder="Conditions de paiement, notes additionnelles..."
                                className="min-h-32 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => window.location.href = '/user/invoices'} className="h-12 rounded-xl px-6">
                            Annuler
                        </Button>
                        <Button type="submit" disabled={saving || isLocked} className="h-12 rounded-xl px-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 disabled:opacity-50">
                            {saving ? "Sauvegarde..." : "Enregistrer les modifications"}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
