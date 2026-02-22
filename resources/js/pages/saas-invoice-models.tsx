import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Printer, Download, Send, CreditCard, CheckCircle2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    tax: number;
}

const MOCK_INVOICE = {
    number: 'INV-2026-0084',
    date: '21 Fév 2026',
    dueDate: '21 Mar 2026',
    status: 'PAID',
    company: {
        name: 'NextGenStock SARL',
        address: '15 Avenue de la République',
        city: 'Dakar, Sénégal',
        email: 'contact@nextgenstock.com',
        phone: '+221 77 123 45 67',
        ninea: '001234567 2V2',
    },
    client: {
        name: 'Tech Solutions Afrique',
        contact: 'M. Diallo',
        address: 'Zone de Captage, Lot 45',
        city: 'Dakar, Sénégal',
        email: 'compta@techsolutions.sn',
        phone: '+221 78 987 65 43',
    },
    items: [
        { id: '1', description: 'MacBook Pro M3 Max (16", 1TB)', quantity: 2, unitPrice: 2150000, tax: 18 },
        { id: '2', description: 'Licence NextGenStock Enterprise (1 An)', quantity: 1, unitPrice: 500000, tax: 18 },
        { id: '3', description: 'Installation et Configuration sur site', quantity: 1, unitPrice: 150000, tax: 18 },
        { id: '4', description: 'Routeur Cisco C1111-8P', quantity: 3, unitPrice: 380000, tax: 18 },
    ] as InvoiceItem[],
    notes: 'Merci pour votre confiance. Le matériel informatique est garanti 1 an constructeur.',
};

export default function SaasInvoiceModels() {
    const [template, setTemplate] = useState<'modern' | 'classic' | 'minimalist' | 'executive' | 'creative'>('modern');

    const calculateSubtotal = () => {
        return MOCK_INVOICE.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    };

    const calculateTax = () => {
        return MOCK_INVOICE.items.reduce((acc, item) => {
            const itemThT = item.quantity * item.unitPrice;
            return acc + (itemThT * (item.tax / 100));
        }, 0);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const total = subtotal + tax;

    return (
        <>
            <Head title={`Facture ${MOCK_INVOICE.number} - NextGenStock`} />

            {/* SCREEN UI WRAPPER (Hidden when printing via CSS print media query) */}
            <div className="min-h-screen bg-muted/30 py-8 px-4 font-sans text-foreground print:bg-white print:p-0">
                <div className="max-w-[850px] mx-auto space-y-6 print:space-y-0">

                    {/* ACTION BAR (Hidden on print) */}
                    <div className="bg-background border border-border p-4 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" className="gap-2" onClick={() => window.print()}>
                                <Printer className="h-4 w-4" />
                                Imprimer
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Download className="h-4 w-4" />
                                PDF
                            </Button>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-muted-foreground">Modèle :</span>
                                <Select value={template} onValueChange={(val: any) => setTemplate(val)}>
                                    <SelectTrigger className="w-[180px] bg-background">
                                        <SelectValue placeholder="Choisir un modèle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="modern">Moderne</SelectItem>
                                        <SelectItem value="classic">Classique</SelectItem>
                                        <SelectItem value="minimalist">Minimaliste</SelectItem>
                                        <SelectItem value="executive">Corporate</SelectItem>
                                        <SelectItem value="creative">Agence</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                                <Send className="h-4 w-4" />
                                Envoyer au client
                            </Button>
                        </div>
                    </div>

                    {/* === A4 INVOICE SHEET === */}
                    <div className={cn(
                        "bg-white shadow-2xl mx-auto overflow-hidden text-slate-900 print:shadow-none print:m-0",
                        // A4 Aspect Ratio roughly setup for screen preview
                        "w-full max-w-[800px] min-h-[1130px] relative"
                    )}>

                        {/* ====== TEMPLATE 1: MODERN (Default Trust Blue SaaS) ====== */}
                        {template === 'modern' && (
                            <div className="p-12 h-full flex flex-col">
                                {/* Header Banner */}
                                <div className="flex justify-between items-start mb-12">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-8 h-8 bg-[#2563EB] rounded-lg shadow-sm flex items-center justify-center">
                                                <Building2 className="text-white h-5 w-5" />
                                            </div>
                                            <span className="text-2xl font-bold text-slate-900 tracking-tight">{MOCK_INVOICE.company.name}</span>
                                        </div>
                                        <p className="text-sm text-slate-500">{MOCK_INVOICE.company.address}</p>
                                        <p className="text-sm text-slate-500">{MOCK_INVOICE.company.city}</p>
                                        <p className="text-sm text-slate-500 mt-2">NINEA: {MOCK_INVOICE.company.ninea}</p>
                                    </div>
                                    <div className="text-right">
                                        <h1 className="text-4xl font-light text-slate-900 tracking-tight mb-2">FACTURE</h1>
                                        <p className="text-sm font-medium text-slate-900">{MOCK_INVOICE.number}</p>
                                        <div className="mt-4 pb-2">
                                            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">
                                                <CheckCircle2 className="w-3 h-3 mr-1" /> PAYÉE
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-12 mb-12">
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Facturé à</p>
                                        <p className="text-base font-bold text-slate-900">{MOCK_INVOICE.client.name}</p>
                                        <p className="text-sm text-slate-600 mt-1">{MOCK_INVOICE.client.contact}</p>
                                        <p className="text-sm text-slate-600">{MOCK_INVOICE.client.address}</p>
                                        <p className="text-sm text-slate-600">{MOCK_INVOICE.client.city}</p>
                                        <p className="text-sm text-slate-600 mt-2 font-medium">{MOCK_INVOICE.client.email}</p>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between py-2 border-b border-slate-100">
                                            <span className="text-sm text-slate-500">Date de facture</span>
                                            <span className="text-sm font-medium text-slate-900">{MOCK_INVOICE.date}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-100">
                                            <span className="text-sm text-slate-500">Date d'échéance</span>
                                            <span className="text-sm font-medium text-slate-900">{MOCK_INVOICE.dueDate}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-100">
                                            <span className="text-sm text-slate-500">Montant dû</span>
                                            <span className="text-base font-bold text-[#2563EB]">0 FCFA</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="mb-12 flex-1">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-y-2 border-slate-200">
                                                <th className="py-4 px-2 text-xs font-semibold text-slate-500 tracking-wider">DESCRIPTION</th>
                                                <th className="py-4 px-2 text-xs font-semibold text-slate-500 tracking-wider text-center">QTÉ</th>
                                                <th className="py-4 px-2 text-xs font-semibold text-slate-500 tracking-wider text-right">P.U HT</th>
                                                <th className="py-4 px-2 text-xs font-semibold text-slate-500 tracking-wider text-center">TVA</th>
                                                <th className="py-4 px-2 text-xs font-semibold text-slate-900 tracking-wider text-right">TOTAL HT</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {MOCK_INVOICE.items.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="py-4 px-2 text-sm text-slate-900 font-medium">{item.description}</td>
                                                    <td className="py-4 px-2 text-sm text-slate-600 text-center">{item.quantity}</td>
                                                    <td className="py-4 px-2 text-sm text-slate-600 text-right font-mono">{formatCurrency(item.unitPrice)}</td>
                                                    <td className="py-4 px-2 text-sm text-slate-400 text-center">{item.tax}%</td>
                                                    <td className="py-4 px-2 text-sm text-slate-900 font-bold text-right font-mono">
                                                        {formatCurrency(item.quantity * item.unitPrice)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Totals & Footer Info */}
                                <div className="grid grid-cols-2 gap-12 mt-auto pb-4">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Informations de paiement</p>
                                            <p className="text-sm text-slate-600 flex items-center gap-2"><CreditCard className="w-4 h-4 text-slate-400" /> Virement Bancaire (Ecobank)</p>
                                            <p className="text-xs text-slate-500 font-mono mt-1">IBAN: SN11 0000 0000 1234 5678 90</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Notes</p>
                                            <p className="text-sm text-slate-600">{MOCK_INVOICE.notes}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                        <div className="flex justify-between py-2">
                                            <span className="text-sm text-slate-600">Total HT</span>
                                            <span className="text-sm font-medium text-slate-900 font-mono">{formatCurrency(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-200">
                                            <span className="text-sm text-slate-600">TVA (18%)</span>
                                            <span className="text-sm font-medium text-slate-900 font-mono">{formatCurrency(tax)}</span>
                                        </div>
                                        <div className="flex justify-between pt-4">
                                            <span className="text-lg font-bold text-slate-900">Total TTC</span>
                                            <span className="text-2xl font-bold text-[#2563EB] font-mono tracking-tight">{formatCurrency(total)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-200 text-center">
                                    <p className="text-xs text-slate-400">
                                        {MOCK_INVOICE.company.name} • {MOCK_INVOICE.company.address} • Tél: {MOCK_INVOICE.company.phone} • NINEA: {MOCK_INVOICE.company.ninea}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ====== TEMPLATE 2: CLASSIC (Traditional Table with borders) ====== */}
                        {template === 'classic' && (
                            <div className="p-12 h-full flex flex-col font-serif">
                                <div className="flex justify-between items-start mb-10 border-b-2 border-slate-800 pb-8">
                                    <div>
                                        <h1 className="text-3xl font-bold text-slate-900">{MOCK_INVOICE.company.name}</h1>
                                        <div className="mt-4 text-sm text-slate-700 space-y-1">
                                            <p>{MOCK_INVOICE.company.address}, {MOCK_INVOICE.company.city}</p>
                                            <p>Email: {MOCK_INVOICE.company.email}</p>
                                            <p>Tél: {MOCK_INVOICE.company.phone}</p>
                                            <p>NINEA: {MOCK_INVOICE.company.ninea}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <h2 className="text-3xl font-normal tracking-widest text-slate-400 uppercase">Facture</h2>
                                        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                            <span className="font-bold text-slate-700">N° Facture:</span>
                                            <span className="text-slate-900">{MOCK_INVOICE.number}</span>
                                            <span className="font-bold text-slate-700">Date:</span>
                                            <span className="text-slate-900">{MOCK_INVOICE.date}</span>
                                            <span className="font-bold text-slate-700">Échéance:</span>
                                            <span className="text-slate-900">{MOCK_INVOICE.dueDate}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-10 w-1/2">
                                    <h3 className="text-sm font-bold border-b border-slate-300 pb-1 mb-3 uppercase text-slate-800">Doit:</h3>
                                    <div className="text-sm text-slate-900 space-y-1">
                                        <p className="font-bold text-base">{MOCK_INVOICE.client.name}</p>
                                        <p>À l'attention de: {MOCK_INVOICE.client.contact}</p>
                                        <p>{MOCK_INVOICE.client.address}</p>
                                        <p>{MOCK_INVOICE.client.city}</p>
                                    </div>
                                </div>

                                <div className="mb-10 flex-1">
                                    <table className="w-full text-left border-collapse border border-slate-300">
                                        <thead className="bg-slate-100">
                                            <tr>
                                                <th className="p-3 border border-slate-300 text-sm font-bold text-slate-900 text-center w-12">N°</th>
                                                <th className="p-3 border border-slate-300 text-sm font-bold text-slate-900">Désignation</th>
                                                <th className="p-3 border border-slate-300 text-sm font-bold text-slate-900 text-center w-16">Qté</th>
                                                <th className="p-3 border border-slate-300 text-sm font-bold text-slate-900 text-right">Prix Unitaire</th>
                                                <th className="p-3 border border-slate-300 text-sm font-bold text-slate-900 text-right">Montant HT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MOCK_INVOICE.items.map((item, index) => (
                                                <tr key={item.id} className="border-b border-slate-300">
                                                    <td className="p-3 border-x border-slate-300 text-sm text-slate-900 text-center">{index + 1}</td>
                                                    <td className="p-3 border-x border-slate-300 text-sm text-slate-900">{item.description}</td>
                                                    <td className="p-3 border-x border-slate-300 text-sm text-slate-900 text-center">{item.quantity}</td>
                                                    <td className="p-3 border-x border-slate-300 text-sm text-slate-900 text-right font-mono">{formatCurrency(item.unitPrice)}</td>
                                                    <td className="p-3 border-x border-slate-300 text-sm text-slate-900 text-right font-mono">{formatCurrency(item.quantity * item.unitPrice)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="grid grid-cols-2 gap-8 items-end mt-auto">
                                    <div className="text-sm text-slate-700">
                                        <p className="font-bold underline mb-2">Conditions de paiement:</p>
                                        <p>Paiement à réception par virement bancaire.</p>
                                        <p className="mt-4 break-words">Arrêtée la présente facture à la somme de :<br /><strong>QUATRE MILLIONS SIX CENT CINQUANTE HUIT MILLE SOIXANTE FRANCS CFA</strong></p>
                                    </div>

                                    <table className="w-full text-right border-collapse">
                                        <tbody>
                                            <tr>
                                                <td className="p-2 text-sm font-bold text-slate-800">Total HT:</td>
                                                <td className="p-2 text-sm border-b border-slate-300 font-mono">{formatCurrency(subtotal)}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 text-sm font-bold text-slate-800">TVA (18%):</td>
                                                <td className="p-2 text-sm border-b border-slate-300 font-mono">{formatCurrency(tax)}</td>
                                            </tr>
                                            <tr className="bg-slate-100">
                                                <td className="p-3 text-base font-bold text-slate-900">NET À PAYER TTC:</td>
                                                <td className="p-3 text-lg font-bold text-slate-900 border-b-2 border-slate-800 font-mono">{formatCurrency(total)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-12 text-center">
                                    <p className="text-sm font-bold">Cachet et Signature</p>
                                </div>
                            </div>
                        )}

                        {/* ====== TEMPLATE 3: MINIMALIST ====== */}
                        {template === 'minimalist' && (
                            <div className="p-16 h-full flex flex-col">
                                {/* Top: Just the word INVOICE and numbers */}
                                <div className="text-right mb-16">
                                    <h1 className="text-5xl font-black text-slate-200 tracking-tighter uppercase">Facture</h1>
                                    <p className="text-lg font-bold text-slate-900 mt-2">{MOCK_INVOICE.number}</p>
                                    <p className="text-sm text-slate-500 mt-1">{MOCK_INVOICE.date}</p>
                                </div>

                                {/* Split Addresses */}
                                <div className="grid grid-cols-2 gap-8 mb-16">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">De</p>
                                        <p className="font-semibold text-slate-900">{MOCK_INVOICE.company.name}</p>
                                        <p className="text-sm text-slate-500 mt-1">{MOCK_INVOICE.company.address}<br />{MOCK_INVOICE.company.city}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Pour</p>
                                        <p className="font-semibold text-slate-900">{MOCK_INVOICE.client.name}</p>
                                        <p className="text-sm text-slate-500 mt-1">{MOCK_INVOICE.client.address}<br />{MOCK_INVOICE.client.city}</p>
                                    </div>
                                </div>

                                {/* Super minimal table */}
                                <div className="mb-16">
                                    <div className="grid grid-cols-12 gap-4 border-b-2 border-slate-900 pb-4 mb-4">
                                        <div className="col-span-8 text-xs font-bold text-slate-900 uppercase tracking-wider">Description</div>
                                        <div className="col-span-1 text-xs font-bold text-slate-900 uppercase tracking-wider text-right">Qté</div>
                                        <div className="col-span-3 text-xs font-bold text-slate-900 uppercase tracking-wider text-right">Total</div>
                                    </div>
                                    <div className="space-y-4">
                                        {MOCK_INVOICE.items.map((item) => (
                                            <div key={item.id} className="grid grid-cols-12 gap-4 pb-4 border-b border-slate-100">
                                                <div className="col-span-8">
                                                    <p className="text-sm font-medium text-slate-800">{item.description}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{formatCurrency(item.unitPrice)} l'unité</p>
                                                </div>
                                                <div className="col-span-1 text-sm text-slate-600 text-right pt-0.5">{item.quantity}</div>
                                                <div className="col-span-3 text-sm font-mono font-medium text-slate-900 text-right pt-0.5">
                                                    {formatCurrency(item.quantity * item.unitPrice)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Minimal Totals */}
                                <div className="w-1/2 ml-auto">
                                    <div className="flex justify-between py-2 text-sm text-slate-500">
                                        <span>Sous-total</span>
                                        <span className="font-mono text-slate-900">{formatCurrency(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between py-2 text-sm text-slate-500">
                                        <span>TVA (18%)</span>
                                        <span className="font-mono text-slate-900">{formatCurrency(tax)}</span>
                                    </div>
                                    <div className="flex justify-between py-4 mt-2 border-t-2 border-slate-900">
                                        <span className="text-xl font-black text-slate-900">Total TTC</span>
                                        <span className="text-xl font-black font-mono text-slate-900">{formatCurrency(total)}</span>
                                    </div>
                                </div>

                                <div className="mt-auto pt-16">
                                    <p className="text-sm font-medium text-slate-900 text-center">Merci pour votre business.</p>
                                </div>
                            </div>
                        )}

                        {/* ====== TEMPLATE 4: EXECUTIVE (Bold Header) ====== */}
                        {template === 'executive' && (
                            <div className="h-full flex flex-col font-sans bg-white pb-8">
                                {/* Bold Blue Header */}
                                <div className="bg-[#2563EB] text-white p-12 pb-16">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h1 className="text-4xl font-extrabold tracking-tight mb-2">{MOCK_INVOICE.company.name}</h1>
                                            <div className="text-blue-100 text-sm space-y-1">
                                                <p>{MOCK_INVOICE.company.address}, {MOCK_INVOICE.company.city}</p>
                                                <p>{MOCK_INVOICE.company.email} | {MOCK_INVOICE.company.phone}</p>
                                                <p>NINEA: {MOCK_INVOICE.company.ninea}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <h2 className="text-4xl font-black uppercase tracking-widest text-white/90">FACTURE</h2>
                                            <p className="text-lg font-bold text-white shadow-sm mt-3 bg-white/10 inline-block px-3 py-1 rounded">{MOCK_INVOICE.number}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-12 -mt-8 relative z-10 flex-1 flex flex-col">
                                    {/* Info Cards overlapping the blue header */}
                                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-8 grid grid-cols-2 gap-8 mb-10">
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Destinataire</p>
                                            <p className="font-bold text-lg text-slate-900">{MOCK_INVOICE.client.name}</p>
                                            <p className="text-sm text-slate-600 font-medium mt-1">Attn: {MOCK_INVOICE.client.contact}</p>
                                            <p className="text-sm text-slate-500 mt-1">{MOCK_INVOICE.client.address}</p>
                                            <p className="text-sm text-slate-500">{MOCK_INVOICE.client.city}</p>
                                            <p className="text-sm text-slate-500 mt-1 font-medium">{MOCK_INVOICE.client.email}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 shadow-sm">Date</p>
                                                <p className="font-semibold text-slate-900 pb-2 border-b-2 border-[#2563EB]/20 inline-block">{MOCK_INVOICE.date}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Échéance</p>
                                                <p className="font-semibold text-slate-900 pb-2 border-b-2 border-red-500/20 inline-block">{MOCK_INVOICE.dueDate}</p>
                                            </div>
                                            <div className="col-span-2 pt-4 bg-[#2563EB]/5 p-4 rounded-lg mt-2">
                                                <p className="text-xs font-bold text-[#2563EB] uppercase tracking-widest mb-1">Montant à régler</p>
                                                <p className="text-3xl font-black text-[#2563EB] tracking-tighter font-mono">{formatCurrency(total)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Table with subtle blue headings */}
                                    <div className="mb-10 flex-1">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr>
                                                    <th className="bg-[#2563EB] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-tl-lg">Désignation</th>
                                                    <th className="bg-[#2563EB] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider text-center">Qté</th>
                                                    <th className="bg-[#2563EB] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider text-right">P.U HT</th>
                                                    <th className="bg-[#2563EB] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider text-right rounded-tr-lg">Montant HT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {MOCK_INVOICE.items.map((item, idx) => (
                                                    <tr key={item.id} className={cn(
                                                        "border-b border-slate-100",
                                                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                                                    )}>
                                                        <td className="py-4 px-4 text-sm font-semibold text-slate-800">{item.description}</td>
                                                        <td className="py-4 px-4 text-sm text-slate-600 text-center font-medium bg-slate-50 border-x border-slate-100">{item.quantity}</td>
                                                        <td className="py-4 px-4 text-sm text-slate-600 text-right font-mono">{formatCurrency(item.unitPrice)}</td>
                                                        <td className="py-4 px-4 text-sm font-black text-[#2563EB] text-right font-mono bg-[#2563EB]/5">{formatCurrency(item.quantity * item.unitPrice)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Totals Box */}
                                    <div className="flex justify-end mb-10 w-full">
                                        <div className="w-1/2">
                                            <div className="flex justify-between py-3 border-b border-slate-200">
                                                <span className="text-sm font-semibold text-slate-600">Total HT</span>
                                                <span className="text-sm font-bold text-slate-900 font-mono">{formatCurrency(subtotal)}</span>
                                            </div>
                                            <div className="flex justify-between py-3 border-b border-slate-200 bg-slate-50 px-2 rounded -mx-2">
                                                <span className="text-sm font-semibold text-slate-600">TVA (18%)</span>
                                                <span className="text-sm font-bold text-slate-900 font-mono">{formatCurrency(tax)}</span>
                                            </div>
                                            <div className="flex justify-between py-5 bg-[#2563EB] text-white mt-4 px-6 rounded-xl shadow-lg border border-[#2563EB]">
                                                <span className="text-lg font-bold uppercase tracking-wider">Net à Payer TTC</span>
                                                <span className="text-2xl font-black font-mono">{formatCurrency(total)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Notes */}
                                    <div className="mt-auto pt-6 text-sm text-slate-500 border-t-2 border-[#2563EB]/10">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <p className="font-bold text-[#2563EB] mb-1 uppercase tracking-wider text-xs">Termes & Conditions</p>
                                                <p className="leading-relaxed">Conditions de règlement : Paiement comptant à réception de la facture. Taux de pénalité de retard: 3 fois le taux d'intérêt légal.</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#2563EB] mb-1 uppercase tracking-wider text-xs">Coordonnées Bancaires</p>
                                                <p className="leading-relaxed text-slate-700 font-medium">Bq: <span className="font-mono">ECOBANK SENEGAL</span><br />RIB: <span className="font-mono">SN11 0000 0000 1234 5678</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ====== TEMPLATE 5: CREATIVE (Agency / Asymmetrical) ====== */}
                        {template === 'creative' && (
                            <div className="p-16 h-full flex flex-col font-sans bg-[#FAFAFA]">
                                {/* Asymmetrical Top Section */}
                                <div className="flex justify-between items-start mb-16 relative">

                                    {/* Decorative background circle */}
                                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -z-10"></div>

                                    {/* Left: Invoice Meta */}
                                    <div className="w-[55%] z-10">
                                        <h1 className="text-7xl font-black text-slate-900 tracking-tighter mb-6 relative">
                                            FACTURE<span className="text-orange-500">.</span>
                                        </h1>
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-lg">
                                                <p className="text-sm font-bold tracking-widest uppercase">N° {MOCK_INVOICE.number}</p>
                                            </div>
                                            <Badge variant="outline" className="border-emerald-500 text-emerald-600 text-sm px-4 py-1.5 rounded-full font-bold bg-emerald-50">Réglée</Badge>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8 text-sm mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50">
                                            <div>
                                                <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-1">Émise le</p>
                                                <p className="text-lg font-black text-slate-900">{MOCK_INVOICE.date}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-1">Échéance le</p>
                                                <p className="text-lg font-black text-slate-900">{MOCK_INVOICE.dueDate}</p>
                                            </div>
                                        </div>

                                        <div className="pr-12 border-l-4 border-orange-500 pl-6 py-2">
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Destinataire du projet</p>
                                            <p className="text-2xl font-black text-slate-900 leading-none mb-3">{MOCK_INVOICE.client.name}</p>
                                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                                À l'attention de {MOCK_INVOICE.client.contact}<br />
                                                {MOCK_INVOICE.client.address}, {MOCK_INVOICE.client.city}<br />
                                                <span className="text-orange-500 font-semibold">{MOCK_INVOICE.client.email}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: Agency Brand (Vertically aligned) */}
                                    <div className="w-1/3 text-right z-10 flex flex-col items-end">
                                        <div className="mb-8 p-4 bg-white rounded-2xl shadow-xl shadow-orange-500/10 border border-slate-100 flex items-center justify-center -mr-4">
                                            <Building2 className="text-orange-500 h-10 w-10" />
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{MOCK_INVOICE.company.name}</h2>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                            {MOCK_INVOICE.company.address}<br />
                                            {MOCK_INVOICE.company.city}<br />
                                            <span className="text-slate-800">{MOCK_INVOICE.company.email}</span><br />
                                            {MOCK_INVOICE.company.phone}
                                        </p>
                                        <div className="mt-6 bg-slate-100 px-4 py-2 rounded-lg inline-block">
                                            <p className="text-xs font-bold text-slate-500 tracking-widest">NINEA: {MOCK_INVOICE.company.ninea}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Minimalist Grid Table */}
                                <div className="mb-12 flex-1 relative z-10">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                                        <div className="grid grid-cols-12 gap-4 pb-4 border-b-2 border-slate-900 mb-6">
                                            <div className="col-span-6 text-xs font-black text-slate-900 uppercase tracking-widest">Projet / Mission</div>
                                            <div className="col-span-2 text-xs font-black text-slate-900 uppercase tracking-widest text-center">Qté</div>
                                            <div className="col-span-2 text-xs font-black text-slate-900 uppercase tracking-widest text-right">Tarif</div>
                                            <div className="col-span-2 text-xs font-black text-slate-900 uppercase tracking-widest text-right">Totaux</div>
                                        </div>

                                        <div className="space-y-6">
                                            {MOCK_INVOICE.items.map((item) => (
                                                <div key={item.id} className="grid grid-cols-12 gap-4 items-center group">
                                                    <div className="col-span-6">
                                                        <p className="text-base font-bold text-slate-900 group-hover:text-orange-500 transition-colors">{item.description}</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <div className="mx-auto w-10 text-center py-1 bg-slate-100 rounded-lg text-sm font-bold text-slate-600">{item.quantity}</div>
                                                    </div>
                                                    <div className="col-span-2 text-slate-500 text-right font-mono text-sm">{formatCurrency(item.unitPrice)}</div>
                                                    <div className="col-span-2 text-slate-900 font-black text-right font-mono text-lg">{formatCurrency(item.quantity * item.unitPrice)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Totals Section */}
                                <div className="flex justify-end mb-16 z-10 relative">
                                    <div className="w-[45%]">
                                        <div className="flex justify-between py-3 text-slate-600 border-b border-slate-200">
                                            <span className="font-bold">Sous-total HT</span>
                                            <span className="font-mono text-slate-900 font-bold">{formatCurrency(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between py-3 text-slate-600 border-b border-slate-200">
                                            <span className="font-bold">TVA (18%)</span>
                                            <span className="font-mono text-slate-900 font-bold">{formatCurrency(tax)}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-6 bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                                            <div>
                                                <p className="text-xs font-black text-orange-500 uppercase tracking-widest">Montant Total TTC</p>
                                            </div>
                                            <span className="text-3xl font-black tracking-tighter font-mono">
                                                {formatCurrency(total)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Notes */}
                                <div className="mt-auto text-sm font-medium text-slate-400 text-center z-10">
                                    <p>Créé avec ❤️ par l'équipe • Merci de votre confiance • {MOCK_INVOICE.company.email}</p>
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>

            {/* Global Print Styles Additions */}
            <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
        </>
    );
}
