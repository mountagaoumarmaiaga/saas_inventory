import { useEffect, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Printer, Edit, Plus, Trash2, Link as LinkIcon, ExternalLink, MessageCircle, Send, CheckCircle, Ban, ArrowUpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";
import type { Invoice } from "./types";
import {
    submitInvoiceApi,
    approveInvoiceApi,
    markPaidInvoiceApi,
    markUnpaidInvoiceApi,
    validateProformaApi,
    requestModificationApi
} from "./api";

interface ShowInvoiceProps {
    id: number;
}
export default function ShowInvoice({ id }: ShowInvoiceProps) {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const page = usePage<any>();

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [submittingPayment, setSubmittingPayment] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    const [paymentRef, setPaymentRef] = useState("");
    const [paymentNotes, setPaymentNotes] = useState("");

    const [actionLoading, setActionLoading] = useState(false);

    const loadInvoice = async () => {
        try {
            const res = await fetch(`/admin/api/invoices/${id}`);
            const json = await res.json();
            setInvoice(json.data);
            if (json.data?.amount_due) {
                setPaymentAmount(json.data.amount_due.toString());
            }
        } catch (e: any) {
            toast.error(e?.message ?? "Erreur chargement facture");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInvoice();
    }, [id]);

    const handleAddPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittingPayment(true);
        try {
            const res = await fetch('/admin/api/payments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    invoice_id: invoice!.id,
                    amount: Number(paymentAmount),
                    payment_method: paymentMethod,
                    date: paymentDate,
                    reference: paymentRef,
                    notes: paymentNotes
                })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Paiement enregistré');
                setIsPaymentModalOpen(false);
                loadInvoice();
            } else {
                toast.error(data.message || 'Erreur lors de l\'enregistrement');
            }
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setSubmittingPayment(false);
        }
    };

    const handleDeletePayment = async (paymentId: number) => {
        if (!confirm("Voulez-vous supprimer ce paiement ?")) return;
        try {
            const res = await fetch(`/admin/api/payments/${paymentId}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                toast.success('Paiement supprimé');
                loadInvoice();
            } else {
                toast.error('Erreur lors de la suppression');
            }
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    const handleDownloadPdf = () => {
        window.open(`/admin/api/invoices/${id}/pdf/download`, '_blank');
    };

    const handlePrint = () => {
        window.open(`/admin/api/invoices/${id}/pdf/view`, '_blank');
    };

    const handleEdit = () => {
        router.visit(`/admin/invoices/${id}/edit`);
    };

    const handleCopyPublicLink = () => {
        if (!invoice?.uuid) return;
        const url = `${window.location.origin}/i/${invoice.uuid}`;
        navigator.clipboard.writeText(url);
        toast.success("Lien public copié dans le presse-papiers !");
    };

    const handleWorkflowAction = async (actionFn: (id: number) => Promise<any>, successMsg: string) => {
        if (!invoice) return;
        setActionLoading(true);
        try {
            const res = await actionFn(invoice.id);
            if (res.ok) {
                toast.success(successMsg);
                loadInvoice();
            } else {
                toast.error(res.errors ? Object.values(res.errors).flat().join(', ') : "Erreur");
            }
        } catch (e: any) {
            toast.error(e.message || "Une erreur est survenue");
        } finally {
            setActionLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        if (status === 'APPROVED' && invoice?.amount_paid && invoice.amount_paid > 0) {
            return <Badge className="bg-indigo-500 hover:bg-primary">Partiellement Payée</Badge>;
        }
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
                        <Button variant="ghost" onClick={() => router.visit('/admin/invoices')} className="pl-0 hover:bg-transparent hover:text-primary transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour à la liste
                        </Button>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent mt-2">
                            Facture {invoice.number}
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        {canEdit && (
                            <Button variant="outline" onClick={handleEdit} className="border-primary/20 hover:bg-primary/5 hover:text-primary/90" disabled={actionLoading}>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </Button>
                        )}

                        {invoice.status === 'DRAFT' && invoice.type === 'invoice' && (
                            <Button variant="default" onClick={() => handleWorkflowAction(submitInvoiceApi, "Facture soumise avec succès")} disabled={actionLoading} className="bg-primary hover:bg-primary/90 text-white">
                                <Send className="mr-2 h-4 w-4" />
                                Soumettre
                            </Button>
                        )}

                        {invoice.status === 'DRAFT' && invoice.type === 'proforma' && (
                            <Button variant="default" onClick={() => handleWorkflowAction(validateProformaApi, "Proforma validée")} disabled={actionLoading} className="bg-primary hover:bg-primary/90 text-white">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Valider Proforma
                            </Button>
                        )}

                        {invoice.status === 'PENDING' && invoice.type === 'invoice' && (
                            <Button variant="default" onClick={() => handleWorkflowAction(approveInvoiceApi, "Facture approuvée")} disabled={actionLoading} className="bg-green-600 hover:bg-green-700 text-white">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approuver
                            </Button>
                        )}

                        {invoice.status === 'APPROVED' && invoice.type === 'invoice' && invoice.amount_due === invoice.total && (
                            <Button variant="default" onClick={() => handleWorkflowAction(markPaidInvoiceApi, "Facture marquée comme payée")} disabled={actionLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Marquer Payée
                            </Button>
                        )}

                        {invoice.status === 'PAID' && invoice.type === 'invoice' && invoice.payments && invoice.payments.length === 0 && (
                            <Button variant="destructive" onClick={() => handleWorkflowAction(markUnpaidInvoiceApi, "Paiement annulé")} disabled={actionLoading}>
                                <Ban className="mr-2 h-4 w-4" />
                                Annuler Paiement
                            </Button>
                        )}
                        <Button variant="outline" onClick={handlePrint} className="border-border/50 hover:bg-muted/50">
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimer
                        </Button>
                        {invoice.uuid && (
                            <>
                                <Button variant="outline" onClick={handleCopyPublicLink} className="border-border/50 hover:bg-muted/50 text-primary border-blue-200 hover:border-blue-300">
                                    <LinkIcon className="mr-2 h-4 w-4" />
                                    Copier le lien
                                </Button>
                                <Button variant="outline" asChild className="border-border/50 hover:bg-muted/50 text-green-600 border-green-200 hover:border-green-300">
                                    <a href={`https://wa.me/?text=${encodeURIComponent(`Bonjour, voici votre facture ${invoice.number}. Vous pouvez la consulter en ligne et la télécharger à cette adresse : ${window.location.origin}/i/${invoice.uuid}`)}`} target="_blank" rel="noreferrer">
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        WhatsApp
                                    </a>
                                </Button>
                                <Button variant="outline" asChild className="border-border/50 hover:bg-muted/50 hidden sm:flex">
                                    <a href={`/i/${invoice.uuid}`} target="_blank" rel="noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Ouvrir (Client)
                                    </a>
                                </Button>
                            </>
                        )}
                        <Button onClick={handleDownloadPdf} className="bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 text-white shadow-lg shadow-primary/20">
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger PDF
                        </Button>
                    </div>
                </div>

                <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 pointer-events-none" />

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
                                    <p className="font-bold text-lg text-foreground bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">{page.props.auth?.user?.entreprise?.name || "Entreprise"}</p>
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
                            <div className="w-80 space-y-4 p-6 rounded-xl bg-gradient-to-br from-indigo-500/5 to-blue-500/5 border border-primary/50">
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
                                <Separator className="bg-primary/10" />
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-foreground dark:text-indigo-100 uppercase tracking-wide">Total TTC</span>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                                        {invoice.total.toLocaleString('fr-FR')} <span className="text-sm text-muted-foreground font-normal">FCFA</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payments Section */}
                        {(invoice.status === 'APPROVED' || invoice.status === 'PAID') && (
                            <div className="pt-8 border-t border-white/10 mt-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-foreground">Historique des Paiements</h3>
                                    {invoice.status === 'APPROVED' && invoice.amount_due! > 0 && (
                                        <Button onClick={() => setIsPaymentModalOpen(true)} size="sm" className="bg-primary hover:bg-primary/90 text-white">
                                            <Plus className="mr-2 h-4 w-4" /> Ajouter un paiement
                                        </Button>
                                    )}
                                </div>

                                {invoice.payments && invoice.payments.length > 0 ? (
                                    <div className="rounded-xl border border-white/10 overflow-hidden bg-background/40">
                                        <table className="w-full text-sm">
                                            <thead className="bg-muted/40 border-b border-white/10">
                                                <tr>
                                                    <th className="p-4 text-left font-semibold text-muted-foreground w-32">Date</th>
                                                    <th className="p-4 text-left font-semibold text-muted-foreground">Méthode</th>
                                                    <th className="p-4 text-left font-semibold text-muted-foreground">Référence</th>
                                                    <th className="p-4 text-right font-semibold text-muted-foreground w-40">Montant</th>
                                                    <th className="p-4 text-center font-semibold text-muted-foreground w-20"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {invoice.payments.map((p, idx) => (
                                                    <tr key={idx} className="hover:bg-muted/20 transition-colors">
                                                        <td className="p-4 font-medium text-foreground/90">{new Date(p.date).toLocaleDateString('fr-FR')}</td>
                                                        <td className="p-4 text-muted-foreground">{p.payment_method}</td>
                                                        <td className="p-4 text-muted-foreground">{p.reference || '-'}</td>
                                                        <td className="p-4 text-right font-bold text-green-600 dark:text-green-400">+{Number(p.amount).toLocaleString('fr-FR')} FCFA</td>
                                                        <td className="p-4 text-center">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted" onClick={() => window.open(`/admin/api/payments/${p.id}/pdf/view`, '_blank')} title="Imprimer le reçu">
                                                                    <Printer className="h-4 w-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => handleDeletePayment(p.id)} title="Supprimer le paiement">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className="bg-muted/20 border-t border-white/10">
                                                <tr>
                                                    <td colSpan={3} className="p-4 text-right font-semibold text-muted-foreground">Reste à payer</td>
                                                    <td className="p-4 text-right font-bold text-primary dark:text-primary">{invoice.amount_due?.toLocaleString('fr-FR')} FCFA</td>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center p-8 border border-dashed border-border rounded-xl bg-muted/20">
                                        <p className="text-muted-foreground">Aucun paiement enregistré pour cette facture.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Notes */}
                        {invoice.notes && (
                            <div className="pt-2">
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Notes & Conditions</h3>
                                <div className="bg-primary/5 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 p-5 rounded-xl text-sm text-foreground/80 leading-relaxed shadow-sm">
                                    {invoice.notes}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Payment Modal */}
            <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Enregistrer un paiement</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddPayment} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Montant (FCFA)</Label>
                            <Input
                                type="number"
                                min="1"
                                max={invoice.amount_due}
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                required
                            />
                            <p className="text-xs text-muted-foreground">Reste à payer: {invoice.amount_due?.toLocaleString('fr-FR')} FCFA</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Méthode de paiement</Label>
                            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Cash">Espèces</SelectItem>
                                    <SelectItem value="Virement">Virement bancaire</SelectItem>
                                    <SelectItem value="Cheque">Chèque</SelectItem>
                                    <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Input
                                type="date"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Référence (Optionnel)</Label>
                            <Input
                                placeholder="Numéro de chèque, transaction..."
                                value={paymentRef}
                                onChange={(e) => setPaymentRef(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Notes (Optionnel)</Label>
                            <Textarea
                                value={paymentNotes}
                                onChange={(e) => setPaymentNotes(e.target.value)}
                                rows={2}
                            />
                        </div>
                        <div className="pt-4 flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setIsPaymentModalOpen(false)}>Annuler</Button>
                            <Button type="submit" disabled={submittingPayment} className="bg-primary hover:bg-primary/90 text-white">
                                {submittingPayment ? "Enregistrement..." : "Enregistrer"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

        </AppLayout>
    );
}
