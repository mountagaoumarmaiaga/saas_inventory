import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "react-toastify";

import { PurchaseFormData } from "./types";
import { fetchPurchase, updatePurchase } from "./api";
import { fetchSuppliers } from "../suppliers/api";
import { fetchProducts } from "../products/api";
import { Supplier } from "../suppliers/types";
import { Product } from "../../admin/products/types";

interface Props {
    id: number;
}

export default function EditPurchase({ id }: Props) {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [form, setForm] = useState<PurchaseFormData>({
        supplier_id: "",
        order_date: new Date().toISOString().split('T')[0],
        expected_delivery_date: "",
        notes: "",
        tax_amount: 0,
        items: []
    });

    useEffect(() => {
        async function init() {
            setPageLoading(true);
            try {
                const sData = await fetchSuppliers("perPage=1000");
                setSuppliers(sData.items as any);

                const pData = await fetchProducts("perPage=1000");
                setProducts(pData.items as any);

                const purchaseData = await fetchPurchase(id);

                if (purchaseData.status !== 'DRAFT') {
                    toast.error("Ce bon de commande ne peut plus être modifié.");
                    router.visit(`/user/purchases/${id}`);
                    return;
                }

                setForm({
                    supplier_id: purchaseData.supplier_id,
                    order_date: purchaseData.order_date ? purchaseData.order_date.split('T')[0] : "",
                    expected_delivery_date: purchaseData.expected_delivery_date ? purchaseData.expected_delivery_date.split('T')[0] : "",
                    notes: purchaseData.notes || "",
                    tax_amount: purchaseData.tax_amount || 0,
                    items: purchaseData.items ? purchaseData.items.map((i: any) => ({
                        id: i.id,
                        product_id: i.product_id,
                        quantity: i.quantity,
                        unit_price: i.unit_price
                    })) : []
                });
            } catch (e) {
                console.error("Failed to load details", e);
                toast.error("Erreur de chargement des données");
                router.visit("/user/purchases");
            } finally {
                setPageLoading(false);
            }
        }
        init();
    }, [id]);

    const handleAddItem = () => {
        setForm(f => ({
            ...f,
            items: [...f.items, { product_id: "", quantity: 1, unit_price: 0 }]
        }));
    };

    const handleRemoveItem = (index: number) => {
        setForm(f => {
            const newItems = [...f.items];
            newItems.splice(index, 1);
            return { ...f, items: newItems };
        });
    };

    const updateItem = (index: number, field: string, value: any) => {
        setForm(f => {
            const newItems = [...f.items];
            const item = { ...newItems[index], [field]: value };

            if (field === 'product_id' && products) {
                const p = products.find(prod => prod.id == value);
                if (p) {
                    item.unit_price = p.purchase_price || 0;
                }
            }

            newItems[index] = item;
            return { ...f, items: newItems };
        });
    };

    const subtotal = form.items.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);
    const total = subtotal + Number(form.tax_amount || 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.supplier_id) {
            toast.error("Veuillez sélectionner un fournisseur.");
            return;
        }

        const cleanItems = form.items.filter(i => i.product_id !== "").map(i => ({
            id: i.id,
            product_id: Number(i.product_id),
            quantity: Number(i.quantity),
            unit_price: Number(i.unit_price)
        }));

        if (cleanItems.length === 0) {
            toast.error("Veuillez ajouter au moins un produit.");
            return;
        }

        setLoading(true);
        try {
            await updatePurchase(id, { ...form, items: cleanItems, supplier_id: Number(form.supplier_id) });
            toast.success("Bon de commande mis à jour !");
            router.visit(`/user/purchases/${id}`);
        } catch (e: any) {
            toast.error(e?.response?.data?.message || "Erreur lors de la mise à jour.");
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <AppLayout>
                <div className="flex h-64 items-center justify-center">
                    <p className="text-slate-500">Chargement en cours...</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title="Modifier le Bon de Commande" />

            <div className="p-6 space-y-6 max-w-5xl mx-auto">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Modifier le Bon de Commande
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Info */}
                    <Card className="border-border/40 bg-background/50 backdrop-blur-xl shadow-sm">
                        <CardHeader className="border-b border-border/40 pb-4">
                            <CardTitle className="text-base font-semibold tracking-tight">Informations Générales</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Fournisseur</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                                    value={form.supplier_id}
                                    onChange={(e) => setForm({ ...form, supplier_id: e.target.value ? Number(e.target.value) : "" })}
                                    required
                                >
                                    <option value="">Sélectionner un fournisseur...</option>
                                    {suppliers.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date de commande</Label>
                                <Input
                                    type="date"
                                    value={form.order_date}
                                    onChange={e => setForm({ ...form, order_date: e.target.value })}
                                    className="bg-background/50"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date de livraison estimée</Label>
                                <Input
                                    type="date"
                                    value={form.expected_delivery_date}
                                    onChange={e => setForm({ ...form, expected_delivery_date: e.target.value })}
                                    className="bg-background/50"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Items */}
                    <Card className="border-border/40 bg-background/50 backdrop-blur-xl shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
                            <CardTitle className="text-base font-semibold tracking-tight">Articles</CardTitle>
                            <Button type="button" size="sm" onClick={handleAddItem} variant="secondary">
                                <Plus className="mr-2 h-3.5 w-3.5" /> Ajouter ligne
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            {form.items.map((item, index) => (
                                <div key={index} className="grid md:grid-cols-12 gap-4 items-start p-4 rounded-lg bg-muted/30 border border-border/40">
                                    <div className="md:col-span-5 space-y-2">
                                        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Produit</Label>
                                        <select
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
                                            value={item.product_id}
                                            onChange={(e) => updateItem(index, 'product_id', Number(e.target.value))}
                                            required
                                        >
                                            <option value="">Choisir un produit...</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="md:col-span-3 space-y-2">
                                        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Prix d'achat unit.</Label>
                                        <Input
                                            type="number"
                                            value={item.unit_price}
                                            onChange={e => updateItem(index, 'unit_price', e.target.value)}
                                            min="0"
                                            step="0.01"
                                            required
                                            className="h-9 bg-background"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Quantité</Label>
                                        <Input
                                            type="number"
                                            value={item.quantity}
                                            onChange={e => updateItem(index, 'quantity', e.target.value)}
                                            min="1"
                                            required
                                            className="h-9 bg-background"
                                        />
                                    </div>

                                    <div className="md:col-span-1 space-y-2 text-right">
                                        <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Total</Label>
                                        <div className="h-9 flex items-center justify-end">
                                            <span className="text-sm font-semibold">{(Number(item.quantity) * Number(item.unit_price)).toFixed(0)}</span>
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
                                        <span className="font-medium">{subtotal.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="text-muted-foreground">Taxes Supplémentaires:</span>
                                        <Input
                                            type="number"
                                            className="w-24 h-8 text-right bg-background"
                                            value={form.tax_amount}
                                            onChange={e => setForm({ ...form, tax_amount: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="flex justify-between font-semibold text-base border-t border-border/40 pt-3 text-foreground">
                                        <span>Total:</span>
                                        <span>{total.toFixed(0)} FCFA</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notes */}
                    <Card className="border-border/40 bg-background/50 backdrop-blur-xl shadow-sm">
                        <CardContent className="pt-6">
                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notes</Label>
                            <Textarea
                                value={form.notes || ""}
                                onChange={e => setForm({ ...form, notes: e.target.value })}
                                placeholder="Conditions d'achat, mode de transport, instructions..."
                                className="min-h-[80px] mt-2 bg-background/50"
                            />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={() => router.visit(`/user/purchases/${id}`)}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-primary">
                            <Save className="mr-2 h-4 w-4" />
                            {loading ? "Enregistrement..." : "Enregistrer"}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
