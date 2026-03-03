import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Download, CreditCard, Clock, CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicInvoice({ invoice }: any) {
    const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Some calculated fields
    const isPaid = invoice.status === 'PAID';
    const amountDue = Math.max(0, invoice.total - (invoice.amount_paid || 0));

    // Check if overdue
    const isOverdue = invoice.due_date
        ? new Date(invoice.due_date) < new Date() && !isPaid
        : false;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleSimulatePayment = () => {
        setIsSimulatingPayment(true);
        // Simulate a network processing
        setTimeout(() => {
            setIsSimulatingPayment(false);
            setPaymentSuccess(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Head title={`Facture ${invoice.number}`} />

            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {invoice.entreprise.logo ? (
                            <img src={`/storage/${invoice.entreprise.logo}`} alt={invoice.entreprise.name} className="h-8 w-auto object-contain" />
                        ) : (
                            <div className="h-8 w-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                                {invoice.entreprise.name.substring(0, 1).toUpperCase()}
                            </div>
                        )}
                        <span className="font-semibold text-slate-800">{invoice.entreprise.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="hidden sm:flex border-slate-200 text-slate-600 hover:text-slate-900"
                            onClick={() => window.print()}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger PDF
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                {/* Status Banners */}
                <div className="mb-8">
                    {isPaid ? (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Facture Réglée</h3>
                                <p className="text-sm opacity-90">Merci pour votre paiement de {formatCurrency(invoice.total)}.</p>
                            </div>
                        </div>
                    ) : paymentSuccess ? (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Paiement Réussi !</h3>
                                <p className="text-sm opacity-90">Votre transaction vient d'être enregistrée. Le statut sera mis à jour.</p>
                            </div>
                        </div>
                    ) : isOverdue ? (
                        <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-red-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Facture En Retard</h3>
                                <p className="text-sm opacity-90">
                                    Cette facture est échue depuis le {format(new Date(invoice.due_date || invoice.date), 'dd MMMM yyyy', { locale: fr })}.
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left Column: Invoice Document */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-8 sm:p-12">

                                {/* Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12">
                                    <div>
                                        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-1">
                                            {invoice.type === 'proforma' ? 'Proforma' : 'Facture'}
                                        </h1>
                                        <p className="text-slate-500 font-mono text-lg">#{invoice.number}</p>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Montant Dû</p>
                                        <p className="text-3xl font-bold tracking-tight text-slate-900">{formatCurrency(amountDue)}</p>
                                    </div>
                                </div>

                                {/* Addresses */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-slate-100 pt-8 mb-10">
                                    <div className="space-y-3">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">De</p>
                                        <div>
                                            <p className="font-bold text-base text-slate-900">{invoice.entreprise.name}</p>
                                            <div className="text-slate-500 text-sm mt-3 space-y-2">
                                                {invoice.entreprise.address && (
                                                    <p className="flex items-start gap-2">
                                                        <MapPin className="w-4 h-4 mt-0.5" />
                                                        <span className="leading-tight">{invoice.entreprise.address}</span>
                                                    </p>
                                                )}
                                                {invoice.entreprise.phone && (
                                                    <p className="flex items-center gap-2">
                                                        <Phone className="w-4 h-4" />
                                                        {invoice.entreprise.phone}
                                                    </p>
                                                )}
                                                {invoice.entreprise.email && (
                                                    <p className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4" />
                                                        {invoice.entreprise.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Facturé à</p>
                                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                            <p className="font-bold text-base text-slate-900">{invoice.client.name}</p>
                                            <div className="text-slate-500 text-sm mt-3 space-y-1">
                                                {invoice.client.address && <p>{invoice.client.address}</p>}
                                                {invoice.client.email && <p className="pt-1">{invoice.client.email}</p>}
                                                {invoice.client.phone && <p>{invoice.client.phone}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Items Table */}
                                <div className="mb-8 overflow-x-auto">
                                    <table className="w-full text-left text-sm min-w-[500px]">
                                        <thead className="text-xs text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200">
                                            <tr>
                                                <th className="pb-3 pl-2">Description</th>
                                                <th className="pb-3 text-center w-20">Qté</th>
                                                <th className="pb-3 text-right w-28">Prix U. HT</th>
                                                <th className="pb-3 text-right w-32 pr-2">Total HT</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {invoice.items.map((item: any, idx: number) => (
                                                <tr key={idx}>
                                                    <td className="py-4 pl-2">
                                                        <p className="font-medium text-slate-900">{item.description}</p>
                                                        {item.product && item.product.reference && (
                                                            <p className="text-xs text-slate-400 mt-1">Réf: {item.product.reference}</p>
                                                        )}
                                                    </td>
                                                    <td className="py-4 text-center text-slate-500">{item.quantity}</td>
                                                    <td className="py-4 text-right text-slate-500">{formatCurrency(item.unit_price)}</td>
                                                    <td className="py-4 text-right font-medium text-slate-900 pr-2">{formatCurrency(item.line_total)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="border-t-2 border-slate-200">
                                            <tr>
                                                <td colSpan={3} className="pt-4 pb-2 text-right font-medium text-slate-500">Sous-total HT</td>
                                                <td className="pt-4 pb-2 text-right font-medium text-slate-900 pr-2">{formatCurrency(invoice.subtotal)}</td>
                                            </tr>
                                            {invoice.tva > 0 && (
                                                <tr>
                                                    <td colSpan={3} className="py-2 text-right font-medium text-slate-500">TVA ({invoice.tva}%)</td>
                                                    <td className="py-2 text-right font-medium text-slate-900 pr-2">
                                                        {formatCurrency((invoice.subtotal * invoice.tva) / 100)}
                                                    </td>
                                                </tr>
                                            )}
                                            {invoice.amount_paid > 0 && (
                                                <tr>
                                                    <td colSpan={3} className="py-2 text-right font-medium text-emerald-600">Déjà Payé</td>
                                                    <td className="py-2 text-right font-semibold text-emerald-600 pr-2">
                                                        -{formatCurrency(invoice.amount_paid)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3} className="pt-4 pb-2 text-right font-bold text-slate-900 uppercase tracking-widest text-xs">Total TTC</td>
                                                <td className="pt-4 pb-2 text-right font-black text-xl text-teal-600 pr-2">{formatCurrency(invoice.total)}</td>
                                            </tr>
                                            {invoice.amount_paid > 0 && (
                                                <tr>
                                                    <td colSpan={3} className="pt-2 text-right font-bold text-slate-900 uppercase tracking-widest text-xs">Reste à payer</td>
                                                    <td className="pt-2 text-right font-black text-xl text-slate-900 pr-2">{formatCurrency(amountDue)}</td>
                                                </tr>
                                            )}
                                        </tfoot>
                                    </table>
                                </div>

                                {/* Notes */}
                                {invoice.notes && (
                                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-sm">
                                        <p className="font-bold text-slate-700 mb-1">Notes / Conditions</p>
                                        <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{invoice.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Payment Panel (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 sticky top-24">

                            {!isPaid && !paymentSuccess ? (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-900 mb-1">Effectuer le paiement</h3>
                                        <p className="text-sm text-slate-500 mb-4">Montant exigible pour la facture {invoice.number}.</p>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                        <span className="text-slate-600 font-medium">À Payer</span>
                                        <span className="font-black text-2xl text-slate-900 tracking-tight">{formatCurrency(amountDue)}</span>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <Button
                                            className="w-full h-14 rounded-2xl text-base font-bold shadow-[0_8px_16px_-6px_rgba(13,148,136,0.3)] bg-teal-600 hover:bg-teal-700 text-white transition-all transform hover:-translate-y-0.5"
                                            onClick={handleSimulatePayment}
                                            disabled={isSimulatingPayment}
                                        >
                                            {isSimulatingPayment ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Traitement sécurisé...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <CreditCard className="w-5 h-5" />
                                                    Payer en Ligne
                                                </span>
                                            )}
                                        </Button>

                                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Sécurisé par Stripe / PayMe
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center space-y-4 py-6">
                                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-900">Merci !</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        Cette facture a été entièrement réglée. <br />Il n'y a plus aucun montant dû.
                                    </p>
                                </div>
                            )}

                            {/* Powered by Footer inside the card */}
                            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                                <p className="text-xs text-slate-400">
                                    Propulsé par <strong className="font-bold text-slate-700">SaaS Inventory</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
