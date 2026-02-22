
import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchDeliveryNote, updateDeliveryNote, DeliveryNote, DeliveryNoteItem } from "./api";
import { toast } from "react-toastify";
import { Save, ArrowLeft, Trash2 } from "lucide-react";

export default function DeliveryNoteEdit({ id }: { id: number }) {
    const [dn, setDn] = useState<DeliveryNote | null>(null);
    const [items, setItems] = useState<DeliveryNoteItem[]>([]);
    const [deliveryDate, setDeliveryDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchDeliveryNote(id).then(res => {
            setDn(res.data);
            setItems(res.data.items || []);
            setDeliveryDate(res.data.delivery_date.split('T')[0]);
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
                    description: i.product_name // Keep name as description or use existing description? Backend expects description.
                }))
            });
            toast.success("Bon de livraison mis à jour !");
            router.visit(`/user/delivery-notes/${id}`);
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

    if (loading) return <div className="p-8 text-center">Chargement...</div>;
    if (!dn) return <div className="p-8 text-center text-red-500">Introuvable</div>;

    return (
        <AppLayout breadcrumbs={[
            { title: "Bons de Livraison", href: "/user/delivery-notes" },
            { title: dn.reference, href: `/user/delivery-notes/${id}` },
            { title: "Modifier", href: "#" }
        ]}>
            <Head title={`Modifier BL - ${dn.reference}`} />
            <div className="p-6 max-w-5xl mx-auto space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Modifier {dn.reference}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Mise à jour du bon de livraison.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => router.visit(`/user/delivery-notes/${id}`)}
                            className="h-12 rounded-xl border-white/10 slide-in-from-right-2 hover:bg-orange-500/10 hover:text-orange-600 hover:border-orange-200"
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="h-12 px-8 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-orange-500/20"
                        >
                            <Save className="h-5 w-5 mr-2" />
                            {saving ? "Enregistrement..." : "Enregistrer"}
                        </Button>
                    </div>
                </div>

                <div className="rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <div className="relative p-6 border-b border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                        <h2 className="relative text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Informations Générales</h2>
                    </div>
                    <div className="p-6 grid md:grid-cols-2 gap-6 relative">
                        <div className="space-y-2">
                            <Label className="font-bold">Date de Livraison</Label>
                            <Input
                                type="date"
                                value={deliveryDate}
                                onChange={e => setDeliveryDate(e.target.value)}
                                className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-orange-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold">Client</Label>
                            <div className="flex h-12 w-full rounded-xl border-2 border-white/10 bg-muted/50 items-center px-4 text-sm font-medium">
                                {dn.client?.name}
                            </div>
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label className="font-bold">Livreur</Label>
                            <Input
                                placeholder="Nom du livreur"
                                value={dn.delivery_person || ""}
                                onChange={e => setDn({ ...dn, delivery_person: e.target.value })}
                                className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-orange-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <div className="relative p-6 border-b border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
                        <h2 className="relative text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Articles</h2>
                    </div>
                    <div className="relative">
                        <table className="w-full text-sm caption-bottom">
                            <thead>
                                <tr className="border-b border-white/10 bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-transparent">
                                    <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Produit</th>
                                    <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider w-[200px]">Quantité Livrée</th>
                                    <th className="h-12 px-6 text-right align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider w-[100px]">Action</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {items.map((item, index) => (
                                    <tr key={index} className="border-b border-white/5 transition-all hover:bg-blue-500/5">
                                        <td className="p-6 align-middle font-medium">
                                            {item.product_name}
                                        </td>
                                        <td className="p-6 align-middle">
                                            <Input
                                                type="number"
                                                min="0"
                                                value={item.quantity}
                                                onChange={e => updateQuantity(index, Number(e.target.value))}
                                                className="h-10 rounded-lg border-2 border-white/10 focus-visible:ring-blue-500 text-center font-mono font-bold"
                                            />
                                        </td>
                                        <td className="p-6 align-middle text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg h-9 w-9"
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
                            <div className="p-12 text-center">
                                <p className="text-muted-foreground">Aucun article dans ce bon de livraison</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
