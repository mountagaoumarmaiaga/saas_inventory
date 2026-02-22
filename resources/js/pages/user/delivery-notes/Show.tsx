
import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Printer, ArrowLeft, Pencil, Download, Eye } from "lucide-react";
import { fetchDeliveryNote, DeliveryNote } from "./api";

export default function DeliveryNoteShow({ id }: { id: number }) { // received from Inertia
    const [dn, setDn] = useState<DeliveryNote | null>(null);
    const [loading, setLoading] = useState(true);
    const [previewOpen, setPreviewOpen] = useState(false);

    useEffect(() => {
        fetchDeliveryNote(id).then(res => {
            setDn(res.data);
            setLoading(false);
        }).catch(console.error);
    }, [id]);

    if (loading) return <div className="p-8 text-center">Chargement...</div>;
    if (!dn) return <div className="p-8 text-center text-red-500">Bon de livraison introuvable.</div>;

    return (
        <AppLayout breadcrumbs={[
            { title: "Bons de Livraison", href: "/user/delivery-notes" },
            { title: dn.reference, href: `/user/delivery-notes/${id}` }
        ]}>
            <Head title={`BL - ${dn.reference}`} />
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">{dn.reference}</h1>
                        <p className="text-muted-foreground">Date: {new Date(dn.delivery_date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/user/delivery-notes/${id}/edit`}>
                            <Button variant="outline">
                                <Pencil className="h-4 w-4 mr-2" /> Modifier
                            </Button>
                        </Link>
                        <a href={`/user/delivery-notes/${id}/print`} target="_blank">
                            <Button variant="outline">
                                <Printer className="h-4 w-4 mr-2" /> Imprimer
                            </Button>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 border p-6 rounded-lg bg-card">
                    <div>
                        <h3 className="font-semibold mb-2">Client</h3>
                        <p className="text-lg">{dn.client?.name}</p>
                    </div>
                    <div className="text-right">
                        <h3 className="font-semibold mb-2">Facture Associée</h3>
                        {dn.invoice ? (
                            <Link href={`/user/invoices/${dn.invoice.id}/edit`} className="text-blue-600 hover:underline text-lg">
                                {dn.invoice.reference}
                            </Link>
                        ) : <span className="text-muted-foreground">-</span>}
                    </div>
                    {dn.delivery_person && (
                        <div className="col-span-2 mt-4 pt-4 border-t">
                            <h3 className="font-semibold mb-2">Livreur</h3>
                            <p className="text-lg">{dn.delivery_person}</p>
                        </div>
                    )}
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr className="text-left">
                                <th className="p-3">Produit</th>
                                <th className="p-3 text-right">Quantité Livrée</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dn.items?.map(item => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-3">{item.product_name}</td>
                                    <td className="p-3 text-right font-medium">{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Aperçu du BL</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 min-h-0">
                        <iframe
                            src={`/user/delivery-notes/${id}/pdf?action=stream`}
                            className="w-full h-full border rounded bg-muted"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
