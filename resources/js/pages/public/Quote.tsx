import React from 'react';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Download, CheckCircle2, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicQuote({ quote }: any) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const isExpired = quote.valid_until
        ? new Date(quote.valid_until) < new Date() && quote.status === 'DRAFT'
        : false;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Head title={`Devis ${quote.number}`} />

            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {quote.entreprise.logo ? (
                            <img src={`/storage/${quote.entreprise.logo}`} alt={quote.entreprise.name} className="h-8 w-auto object-contain" />
                        ) : (
                            <div className="h-8 w-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                                {quote.entreprise.name.substring(0, 1).toUpperCase()}
                            </div>
                        )}
                        <span className="font-semibold text-slate-800">{quote.entreprise.name}</span>
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
                    {quote.status === 'APPROVED' ? (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Devis Approuvé</h3>
                                <p className="text-sm opacity-90">Ce devis a été accepté.</p>
                            </div>
                        </div>
                    ) : quote.status === 'REJECTED' ? (
                        <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-red-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Devis Refusé</h3>
                                <p className="text-sm opacity-90">Ce devis a été refusé.</p>
                            </div>
                        </div>
                    ) : isExpired ? (
                        <div className="bg-primary/5 border border-primary/20 text-orange-800 rounded-2xl p-4 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Devis Expiré</h3>
                                <p className="text-sm opacity-90">
                                    Ce devis a expiré le {format(new Date(quote.valid_until), 'dd MMMM yyyy', { locale: fr })}.
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Document */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-8 sm:p-12">

                                {/* Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12">
                                    <div>
                                        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-1">
                                            Devis
                                        </h1>
                                        <p className="text-slate-500 font-mono text-lg">#{quote.number}</p>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Montant Total</p>
                                        <p className="text-3xl font-bold tracking-tight text-slate-900">{formatCurrency(quote.total)}</p>
                                    </div>
                                </div>

                                {/* Addresses */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-slate-100 pt-8 mb-10">
                                    <div className="space-y-3">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">De</p>
                                        <div>
                                            <p className="font-bold text-base text-slate-900">{quote.entreprise.name}</p>
                                            <div className="text-slate-500 text-sm mt-3 space-y-2">
                                                {quote.entreprise.address && (
                                                    <p className="flex items-start gap-2">
                                                        <MapPin className="w-4 h-4 mt-0.5" />
                                                        <span className="leading-tight">{quote.entreprise.address}</span>
                                                    </p>
                                                )}
                                                {quote.entreprise.phone && (
                                                    <p className="flex items-center gap-2">
                                                        <Phone className="w-4 h-4" />
                                                        {quote.entreprise.phone}
                                                    </p>
                                                )}
                                                {quote.entreprise.email && (
                                                    <p className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4" />
                                                        {quote.entreprise.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pour</p>
                                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                            <p className="font-bold text-base text-slate-900">{quote.client.name}</p>
                                            <div className="text-slate-500 text-sm mt-3 space-y-1">
                                                {quote.client.address && <p>{quote.client.address}</p>}
                                                {quote.client.email && <p className="pt-1">{quote.client.email}</p>}
                                                {quote.client.phone && <p>{quote.client.phone}</p>}
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
                                            {quote.items.map((item: any, idx: number) => (
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
                                                <td className="pt-4 pb-2 text-right font-medium text-slate-900 pr-2">{formatCurrency(quote.subtotal)}</td>
                                            </tr>
                                            {quote.tva > 0 && (
                                                <tr>
                                                    <td colSpan={3} className="py-2 text-right font-medium text-slate-500">TVA ({quote.tva}%)</td>
                                                    <td className="py-2 text-right font-medium text-slate-900 pr-2">
                                                        {formatCurrency((quote.subtotal * quote.tva) / 100)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3} className="pt-4 pb-2 text-right font-bold text-slate-900 uppercase tracking-widest text-xs">Total TTC</td>
                                                <td className="pt-4 pb-2 text-right font-black text-xl text-teal-600 pr-2">{formatCurrency(quote.total)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                {/* Notes */}
                                {quote.notes && (
                                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-sm">
                                        <p className="font-bold text-slate-700 mb-1">Notes / Conditions</p>
                                        <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{quote.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Panel (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 sticky top-24">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-1">Détails</h3>
                                    <p className="text-sm text-slate-500 mb-4">Informations sur ce devis.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Date d'émission</span>
                                        <span className="font-medium text-slate-900">{format(new Date(quote.date), 'dd/MM/yyyy')}</span>
                                    </div>
                                    {quote.valid_until && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500">Valable jusqu'au</span>
                                            <span className="font-medium text-slate-900">{format(new Date(quote.valid_until), 'dd/MM/yyyy')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

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
