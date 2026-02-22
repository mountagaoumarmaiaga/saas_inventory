
import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchDeliveryNote, updateDeliveryNote } from "./api"; // Admin API
import { DeliveryNote, DeliveryNoteItem } from "../../user/delivery-notes/api"; // Reuse types
import { toast } from "react-toastify";
import { Save, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDeliveryNoteEdit({ id }: { id: number }) {
    const [dn, setDn] = useState<DeliveryNote | null>(null);
    const [items, setItems] = useState<DeliveryNoteItem[]>([]);
    const [deliveryDate, setDeliveryDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchDeliveryNote(id).then(res => {
            setDn(res.data);
            setItems(res.data.items || []);
            setDeliveryDate(res.data.delivery_date ? res.data.delivery_date.split('T')[0] : "");
            setLoading(false);
        }).catch(console.error);
    }, [id]);

    async function handleSave() {
        if (!dn) return;
        setSaving(true);
        try {
            await updateDeliveryNote(dn.id, {
                delivery_date: deliveryDate,
                delivery_person: dn.delivery_person,
                items: items.map(i => ({
                    product_id: i.product_id,
                    quantity: parseInt(String(i.quantity)),
                    description: i.product_name || `Produit #${i.product_id}`
                }))
            });
            toast.success("Bon de livraison mis à jour !");
            router.visit(`/admin/delivery-notes`); // Redirect to index
        } catch (e: any) {
            console.error(e);
            toast.error("Erreur lors de la mise à jour");
        } finally {
            setSaving(false);
        }
    }

    function updateQuantity(index: number, qty: number) {
        const newItems = [...items];
        newItems[index].quantity = qty;
        setItems(newItems);
    }

    function removeItem(index: number) {
        if (!confirm("Retirer cet article du BL ?")) return;
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    }

    if (loading) {
        return (
            <AppLayout breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Bons de Livraison", href: "/admin/delivery-notes" },
                { title: "Modification", href: "#" }
            ]}>
                <Head title="Modifier Bon de Livraison" />
                <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                    <div className="relative">
                        <div className="h-16 w-16 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
                    </div>
                    <p className="text-muted-foreground font-medium">Chargement du bon de livraison...</p>
                </div>
            </AppLayout>
        );
    }
    if (!dn) return <div className="p-8 text-center text-red-500">Introuvable</div>;

    return (
        <AppLayout breadcrumbs={[
            { title: "Admin", href: "/admin/dashboard" },
            { title: "Bons de Livraison", href: "/admin/delivery-notes" },
            { title: dn.reference, href: "#" },
            { title: "Modifier", href: "#" }
        ]}>
            <Head title={`Modifier BL - ${dn.reference}`} />
            <div className="p-6 max-w-5xl mx-auto space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Modifier {dn.reference}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Mise à jour des informations de livraison
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => router.visit(`/admin/delivery-notes`)}
                            className="h-10 px-4 rounded-lg hover:bg-muted/50"
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 rounded-lg disabled:opacity-50"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {saving ? "Sauvegarde..." : "Enregistrer"}
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Info Card */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="rounded-xl border border-border/40 bg-background/50 backdrop-blur-xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-border/40">
                                <h3 className="font-semibold text-foreground">Informations</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-foreground">Date de Livraison</Label>
                                    <Input
                                        type="date"
                                        value={deliveryDate}
                                        onChange={e => setDeliveryDate(e.target.value)}
                                        className="h-10 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-foreground">Client</Label>
                                    <div className="h-10 px-3 flex items-center bg-muted/30 rounded-lg border border-border/50 text-sm font-medium text-muted-foreground">
                                        {dn.client?.name}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-foreground">Livreur</Label>
                                    <Input
                                        placeholder="Nom du livreur"
                                        value={dn.delivery_person || ""}
                                        onChange={e => setDn({ ...dn, delivery_person: e.target.value })}
                                        className="h-10 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Card */}
                    <div className="md:col-span-2">
                        <div className="rounded-xl border border-border/40 bg-background/50 backdrop-blur-xl shadow-sm overflow-hidden flex flex-col h-full">
                            <div className="px-6 py-4 border-b border-border/40 bg-muted/5 flex justify-between items-center">
                                <h3 className="font-semibold text-foreground">Articles à Livrer</h3>
                                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border border-border/50">
                                    {items.length} article{items.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <div className="flex-1 overflow-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border/40 bg-muted/20">
                                            <th className="h-10 px-6 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Produit</th>
                                            <th className="h-10 px-6 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px] w-[150px]">Quantité</th>
                                            <th className="h-10 px-6 text-right align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px] w-[50px]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/30">
                                        {items.map((item, index) => (
                                            <tr key={index} className="group hover:bg-muted/30 transition-colors">
                                                <td className="p-6 align-middle font-medium text-foreground">{item.product_name}</td>
                                                <td className="p-6 align-middle">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        value={item.quantity}
                                                        onChange={e => updateQuantity(index, Number(e.target.value))}
                                                        className="h-9 w-24 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all font-medium text-center"
                                                    />
                                                </td>
                                                <td className="p-6 align-middle text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                                        onClick={() => removeItem(index)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {items.length === 0 && (
                                    <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                                        <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                                            <Trash2 className="h-6 w-6 opacity-50" />
                                        </div>
                                        <p className="text-sm">Aucun article dans ce bon de livraison</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
