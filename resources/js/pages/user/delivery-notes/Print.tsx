
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { fetchDeliveryNote, DeliveryNote } from "./api";

export default function DeliveryNotePrint({ id }: { id: number }) {
    const [dn, setDn] = useState<DeliveryNote | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDeliveryNote(id).then(res => {
            setDn(res.data);
            setLoading(false);
            setTimeout(() => window.print(), 500);
        }).catch(console.error);
    }, [id]);

    if (loading) return <div className="p-8 text-center">Chargement...</div>;
    if (!dn) return <div className="p-8 text-center text-red-500">Introuvable</div>;

    return (
        <div className="bg-white text-black p-8 min-h-screen font-sans">
            <Head title={`BL - ${dn.reference}`} />

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold uppercase tracking-tight">{dn.entreprise?.name || "Entreprise"}</h1>
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                            <p>{dn.entreprise?.address}</p>
                            <p>{dn.entreprise?.phone}</p>
                            <p>{dn.entreprise?.email}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="inline-block bg-gray-100 px-4 py-2 rounded border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">BON DE LIVRAISON</h2>
                            <p className="text-md font-medium text-gray-600 mt-1">{dn.reference}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Date: {new Date(dn.delivery_date).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Client & Info */}
                <div className="grid grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Expédié à</h3>
                        <div className="border-l-4 border-gray-200 pl-4 py-1">
                            <p className="text-xl font-bold text-gray-800">{dn.client?.name}</p>
                            {/* Assuming we might fetch address later, for now just name */}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between border-b border-gray-100 pb-1">
                            <span className="text-gray-500">Référence Facture:</span>
                            <span className="font-medium">{dn.invoice?.reference || "-"}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-1">
                            <span className="text-gray-500">N° Client:</span>
                            <span className="font-medium">#{dn.client?.id}</span>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-8">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-y border-gray-200">
                                <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase text-xs tracking-wider">Désignation</th>
                                <th className="py-3 px-4 text-right font-semibold text-gray-600 uppercase text-xs tracking-wider w-32">Quantité</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {dn.items?.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-4 px-4 text-gray-800">{item.product_name}</td>
                                    <td className="py-4 px-4 text-right font-bold text-gray-900">{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(!dn.items || dn.items.length === 0) && (
                        <div className="p-8 text-center text-gray-400 italic">Aucun article listé.</div>
                    )}
                </div>

                {/* Footer Signatures */}
                <div className="grid grid-cols-2 gap-12 mt-16 pt-8 border-t border-gray-200 page-break-inside-avoid">
                    <div className="bg-gray-50 p-6 rounded h-32 border border-dashed border-gray-300">
                        <p className="font-bold text-sm uppercase text-gray-500 mb-2">Signature Livreur</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded h-32 border border-dashed border-gray-300">
                        <p className="font-bold text-sm uppercase text-gray-500 mb-2">Signature Client</p>
                        <div className="text-right mt-8">
                            <p className="text-xs text-gray-400">Reçu le : ____/____/_______</p>
                        </div>
                    </div>
                </div>

                {/* Helper for print */}
                <style>{`
            @media print {
                @page { margin: 1cm; size: auto; }
                body { background: white; -webkit-print-color-adjust: exact; }
                .bg-gray-50 { background-color: #f9fafb !important; }
                .bg-gray-100 { background-color: #f3f4f6 !important; }
            }
        `}</style>
            </div>
        </div>
    );
}
