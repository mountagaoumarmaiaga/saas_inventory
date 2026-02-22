import { useEffect, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Printer, Edit } from "lucide-react";
import { toast } from "react-toastify";
import type { Invoice } from "./types";

interface ShowInvoiceProps {
    id: number;
}

export default function ShowInvoice({ id }: ShowInvoiceProps) {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const page = usePage<any>();

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`/admin/api/invoices/${id}`);
                const json = await res.json();
                setInvoice(json.data);
            } catch (e: any) {
                toast.error(e?.message ?? "Erreur chargement facture");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    const handleDownloadPdf = () => {
        window.open(`/admin/api/invoices/${id}/pdf/download`, '_blank');
    };

    const handlePrint = () => {
        window.open(`/admin/api/invoices/${id}/pdf/view`, '_blank');
    };

    const handleEdit = () => {
        router.visit(`/admin/invoices/${id}/edit`);
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
            DRAFT: { variant: "secondary", label: "Brouillon" },
            PENDING: { variant: "outline", label: "En attente" },
            APPROVED: { variant: "default", label: "Approuvée" },
            PAID: { variant: "default", label: "Payée" },
        };
        const config = variants[status] || { variant: "outline", label: status };
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    if (loading) {
        return (
            <AppLayout breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Factures", href: "/admin/invoices" },
                { title: "Chargement...", href: "#" },
            ]}>
                <Head title="Facture" />
                <div className="flex items-center justify-center h-64">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
            </AppLayout>
        );
    }

    if (!invoice) {
        return (
            <AppLayout breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Factures", href: "/admin/invoices" },
                { title: "Erreur", href: "#" },
            ]}>
                <Head title="Facture introuvable" />
                <div className="p-4">
                    <Card>
                        <CardContent className="p-8 text-center">
                            <p className="text-muted-foreground">Facture introuvable</p>
                            <Button onClick={() => router.visit('/admin/invoices')} className="mt-4">
                                Retour à la liste
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    const canEdit = invoice.status === 'DRAFT' || invoice.status === 'PENDING';

    return (
        <AppLayout breadcrumbs={[
            { title: "Admin", href: "/admin/dashboard" },
            { title: "Factures", href: "/admin/invoices" },
            { title: invoice.number, href: "#" },
        ]}>
            <Head title={`Facture ${invoice.number}`} />

            <div className="p-6 space-y-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <Button variant="ghost" onClick={() => router.visit('/admin/invoices')} className="pl-0 hover:bg-transparent hover:text-orange-600 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour à la liste
                        </Button>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mt-2">
                            Facture {invoice.number}
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        {canEdit && (
                            <Button variant="outline" onClick={handleEdit} className="border-orange-200 hover:bg-orange-50 hover:text-orange-700">
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </Button>
                        )}
                        <Button variant="outline" onClick={handlePrint} className="border-border/50 hover:bg-muted/50">
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimer
                        </Button>
                        <Button onClick={handleDownloadPdf} className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-orange-500/20">
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger PDF
                        </Button>
                    </div>
                </div>

                <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />

                    <CardHeader className="relative border-b border-white/10 pb-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-bold text-foreground">Détails de la Facture</CardTitle>
                                <p className="text-sm text-muted-foreground flex items-center">
                                    <span className="font-medium mr-2">Date:</span>
                                    {new Date(invoice.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="transform scale-110">
                                {getStatusBadge(invoice.status)}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="relative space-y-8 pt-8">
                        {/* Client Info & Company Info Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center">
                                    <div className="h-px bg-border flex-grow mr-4"></div>
                                    Client
                                </h3>
                                <div className="bg-gradient-to-br from-muted/50 to-muted/20 p-5 rounded-xl border border-white/10 shadow-sm">
                                    <p className="font-bold text-lg text-foreground">{invoice.client?.name}</p>
                                    <div className="space-y-1 mt-2 text-sm text-muted-foreground">
                                        {invoice.client?.address && <p>{invoice.client.address}</p>}
                                        {invoice.client?.phone && <p>Tel: {invoice.client.phone}</p>}
                                        {invoice.client?.email && <p>Email: {invoice.client.email}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center">
                                    Fournisseur
                                    <div className="h-px bg-border flex-grow ml-4"></div>
                                </h3>
                                <div className="text-right space-y-1 pt-2">
                                    <p className="font-bold text-lg text-foreground bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{page.props.auth?.user?.entreprise?.name || "Entreprise"}</p>
                                    <p className="text-sm text-foreground/80">{page.props.auth?.user?.entreprise?.address || "Adresse non définie"}</p>
                                    <p className="text-sm text-foreground/80">{page.props.auth?.user?.entreprise?.phone ? `Tél: ${page.props.auth.user.entreprise.phone}` : ""}</p>
                                    <p className="text-sm text-muted-foreground">{page.props.auth?.user?.entreprise?.email || "Email non défini"}</p>
                                    {page.props.auth?.user?.entreprise?.rccm && <p className="text-xs text-muted-foreground mt-2">RCCM: {page.props.auth.user.entreprise.rccm}</p>}
                                    {page.props.auth?.user?.entreprise?.niu && <p className="text-xs text-muted-foreground">NIU: {page.props.auth.user.entreprise.niu}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Articles & Services</h3>
                            <div className="rounded-xl border border-white/10 overflow-hidden shadow-sm bg-background/40">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/40 border-b border-white/10">
                                        <tr>
                                            <th className="p-4 text-left font-semibold text-muted-foreground">Description</th>
                                            <th className="p-4 text-right font-semibold text-muted-foreground w-24">Qté</th>
                                            <th className="p-4 text-right font-semibold text-muted-foreground w-32">P.U.</th>
                                            <th className="p-4 text-right font-semibold text-foreground w-40">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {invoice.items?.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-muted/20 transition-colors">
                                                <td className="p-4 font-medium text-foreground/90">{item.description}</td>
                                                <td className="p-4 text-right text-muted-foreground">{item.quantity}</td>
                                                <td className="p-4 text-right text-muted-foreground">{item.unit_price.toLocaleString('fr-FR')}</td>
                                                <td className="p-4 text-right font-bold text-foreground">{item.line_total.toLocaleString('fr-FR')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Totals Section */}
                        <div className="flex justify-end pt-4">
                            <div className="w-80 space-y-4 p-6 rounded-xl bg-gradient-to-br from-orange-500/5 to-amber-500/5 border border-orange-500/10">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Total HT</span>
                                        <span className="font-medium text-foreground">{invoice.subtotal.toLocaleString('fr-FR')} FCFA</span>
                                    </div>
                                    {invoice.tva > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">TVA ({invoice.tva}%)</span>
                                            <span className="font-medium text-foreground">{((invoice.subtotal * invoice.tva) / 100).toLocaleString('fr-FR')} FCFA</span>
                                        </div>
                                    )}
                                </div>
                                <Separator className="bg-orange-500/10" />
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wide">Total TTC</span>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                        {invoice.total.toLocaleString('fr-FR')} <span className="text-sm text-muted-foreground font-normal">FCFA</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {invoice.notes && (
                            <div className="pt-2">
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Notes & Conditions</h3>
                                <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 p-5 rounded-xl text-sm text-foreground/80 leading-relaxed shadow-sm">
                                    {invoice.notes}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
