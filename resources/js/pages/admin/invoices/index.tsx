
import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Search, Plus, Pencil, Trash2, FileText, CheckCircle, XCircle, Send, FileDown, Lock, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import type { Invoice, PaginationMeta } from "./types";
import { fetchInvoices, deleteInvoiceApi, submitInvoiceApi, approveInvoiceApi, markPaidInvoiceApi, markUnpaidInvoiceApi, validateProformaApi, requestModificationApi, approveModificationApi } from "./api"; // Updated imports
import { groupItemsByDate } from "@/lib/date-utils";

import DeleteInvoiceModal from "./delete-modal";
import ClientOnly from "@/components/client-only"; // Keep ClientOnly
import { createDeliveryNoteFromInvoice } from "../delivery-notes/api"; // Import from Admin API

export default function AdminInvoicesIndex() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Invoice[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10,
        links: [],
    });
    const [error, setError] = useState<string | null>(null);

    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 10;

    const [selected, setSelected] = useState<Invoice | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Debounce search? For now simple effect
    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        if (q.trim()) params.set("q", q.trim());
        params.set("page", String(page));
        params.set("perPage", String(perPage));
        return params.toString();
    }, [q, page]);

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const { items, meta } = await fetchInvoices(queryString);
            setItems(items);
            setMeta(meta);
        } catch (e: any) {
            const errorMsg = e?.message ?? "Erreur chargement factures";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryString]);

    async function handleDeleteConfirm() {
        if (!selected) return;
        setDeleting(true);
        try {
            await deleteInvoiceApi(selected.id);
            setDeleteOpen(false);
            setSelected(null);
            toast.success("Facture supprimée avec succès !");
            await load();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setDeleting(false);
        }
    }

    async function handleStatusChange(invoice: Invoice, action: 'submit' | 'approve' | 'pay' | 'unpay' | 'validate' | 'request-modification' | 'approve-modification') {
        try {
            setLoading(true);
            if (action === 'submit') await submitInvoiceApi(invoice.id);
            if (action === 'approve') await approveInvoiceApi(invoice.id);
            if (action === 'pay') await markPaidInvoiceApi(invoice.id);
            if (action === 'unpay') await markUnpaidInvoiceApi(invoice.id);
            if (action === 'validate') await validateProformaApi(invoice.id);
            if (action === 'request-modification') await requestModificationApi(invoice.id);
            if (action === 'approve-modification') await approveModificationApi(invoice.id);

            toast.success("Statut mis à jour !");

            // Optimistic / Local update to prevent stale UI
            setItems(currentItems => currentItems.map(item => {
                if (item.id === invoice.id) {
                    let newStatus = item.status;
                    let modReq = item.modification_requested_at;

                    if (action === 'submit') newStatus = 'PENDING';
                    if (action === 'approve') newStatus = 'APPROVED';
                    if (action === 'pay') newStatus = 'PAID';
                    if (action === 'unpay') newStatus = 'APPROVED';
                    if (action === 'validate') newStatus = 'SENT';
                    if (action === 'request-modification') modReq = new Date().toISOString();
                    if (action === 'approve-modification') {
                        newStatus = 'PENDING';
                        modReq = undefined;
                    }

                    return { ...item, status: newStatus, modification_requested_at: modReq };
                }
                return item;
            }));

            await load();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    function formatMoney(amount: number) {
        return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF" }).format(amount);
    }

    function formatDate(dateStr: string) {
        return new Intl.DateTimeFormat("fr-FR").format(new Date(dateStr));
    }

    async function handleCreateBL(invoice: Invoice) {
        if (!confirm("Voulez-vous générer un Bon de Livraison pour cette facture ?")) return;
        try {
            setLoading(true);
            await createDeliveryNoteFromInvoice(invoice.id);
            toast.success("Bon de Livraison généré avec succès !");
            await load();
        } catch (e: any) {
            toast.error(e.message || "Erreur lors de la génération du BL");
        } finally {
            setLoading(false);
        }
    }

    function getStatusBadge(status: string) {
        switch (status) {
            case 'DRAFT': return <Badge variant="outline">Brouillon</Badge>;
            case 'SUBMITTED': return <Badge className="bg-blue-500">Soumis</Badge>;
            case 'APPROVED': return <Badge className="bg-green-500">Approuvé</Badge>;
            case 'PAID': return <Badge className="bg-green-700">Payé</Badge>;
            case 'REJECTED': return <Badge variant="destructive">Rejeté</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    }

    const currentPage = meta.current_page ?? page;
    const lastPage = meta.last_page ?? 1;

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Factures", href: "/admin/invoices" },
            ]}
        >
            <Head title="Factures" />

            <div className="p-6 space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Factures
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Gérer les factures et proformas
                        </p>
                    </div>
                    <Button
                        asChild
                        className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 rounded-lg whitespace-nowrap"
                    >
                        <Link href="/admin/invoices/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle Facture
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="relative flex-1 md:max-w-xs group">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors duration-200" />
                        <Input
                            type="search"
                            placeholder="Rechercher..."
                            className="h-10 pl-9 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all w-full"
                            value={q}
                            onChange={(e) => {
                                setPage(1);
                                setQ(e.target.value);
                            }}
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="rounded-xl border border-border/40 bg-background/50 backdrop-blur-xl shadow-sm overflow-hidden flex flex-col">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-12 gap-2">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                            <span className="text-xs text-muted-foreground">Chargement...</span>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center">
                            <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                                <FileText className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="font-medium text-foreground">Aucune facture</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Commencez par créer une nouvelle facture.
                            </p>
                        </div>
                    ) : (
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead>
                                    <tr className="border-b border-border/40 bg-muted/20">
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Numéro</th>
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Client</th>
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Date</th>
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Montant</th>
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Statut</th>
                                        <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-border/30">
                                    {groupItemsByDate(items, (i: Invoice) => i.created_at || i.date).flatMap(group => [
                                        <tr key={`header-${group.label}`} className="bg-muted/10">
                                            <td colSpan={6} className="py-2 px-4 font-semibold text-xs text-muted-foreground">
                                                {group.label}
                                            </td>
                                        </tr>,
                                        ...group.items.map((invoice) => (
                                            <tr key={invoice.id} className="group hover:bg-muted/30 transition-colors">
                                                <td className="p-4 align-middle font-medium">
                                                    <div className="flex flex-col">
                                                        <span className="text-foreground">{invoice.number}</span>
                                                        <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{invoice.type}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground border border-border/50">
                                                        {invoice.client?.name || "-"}
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle text-muted-foreground text-xs">
                                                    <ClientOnly fallback={<span>...</span>}>
                                                        {formatDate(invoice.date)}
                                                    </ClientOnly>
                                                </td>
                                                <td className="p-4 align-middle font-medium text-foreground">
                                                    <ClientOnly fallback={<span>...</span>}>
                                                        {formatMoney(invoice.total)}
                                                    </ClientOnly>
                                                </td>
                                                <td className="p-4 align-middle">{getStatusBadge(invoice.status)}</td>
                                                <td className="p-4 align-middle text-right">
                                                    <div className="flex justify-end gap-1">
                                                        {/* Workflow Actions */}
                                                        {invoice.status === 'DRAFT' && invoice.type === 'invoice' && (
                                                            <Button variant="ghost" size="icon" onClick={() => handleStatusChange(invoice, 'submit')} title="Soumettre" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                                                                <Send className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        {invoice.status === 'DRAFT' && invoice.type === 'proforma' && (
                                                            <Button variant="ghost" size="icon" onClick={() => handleStatusChange(invoice, 'validate')} title="Valider" className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50">
                                                                <CheckCircle className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        {invoice.status === 'PENDING' && (
                                                            <Button variant="ghost" size="icon" onClick={() => handleStatusChange(invoice, 'approve')} title="Approuver" className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50">
                                                                <CheckCircle className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        {invoice.status === 'APPROVED' && (
                                                            <Button variant="ghost" size="icon" onClick={() => handleStatusChange(invoice, 'pay')} title="Marquer comme Payé" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                                                                <CheckCircle className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        {invoice.status === 'PAID' && (
                                                            <Button variant="ghost" size="icon" onClick={() => handleStatusChange(invoice, 'unpay')} title="Marquer comme Impayé" className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                                                <XCircle className="h-4 w-4" />
                                                            </Button>
                                                        )}

                                                        {/* Delivery Note Actions */}
                                                        {(invoice.status === 'APPROVED' || invoice.status === 'PAID') && invoice.type === 'invoice' && (
                                                            <>
                                                                {invoice.delivery_notes && invoice.delivery_notes.length > 0 ? (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        asChild
                                                                        className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                                                                        title="Télécharger BL"
                                                                    >
                                                                        <a
                                                                            href={`/admin/api/delivery-notes/${invoice.delivery_notes[0].id}/pdf`}
                                                                            target="_blank"
                                                                        >
                                                                            <FileDown className="h-4 w-4" />
                                                                        </a>
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => handleCreateBL(invoice)}
                                                                        title="Générer BL"
                                                                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                                                                    >
                                                                        <FileDown className="h-4 w-4" />
                                                                    </Button>
                                                                )}
                                                            </>
                                                        )}

                                                        {/* Request Modification Flow */}
                                                        {(invoice.status === 'APPROVED' || invoice.status === 'PAID') && !invoice.modification_requested_at && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleStatusChange(invoice, 'request-modification')}
                                                                title="Demander une modification"
                                                                className="h-8 w-8 text-muted-foreground hover:text-primary"
                                                            >
                                                                <Lock className="h-4 w-4" />
                                                            </Button>
                                                        )}

                                                        {invoice.modification_requested_at && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                                                onClick={() => handleStatusChange(invoice, 'approve-modification')}
                                                                title="Approuver la demande de modification"
                                                            >
                                                                <Unlock className="h-4 w-4" />
                                                            </Button>
                                                        )}

                                                        {/* View Button */}
                                                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary" title="Voir">
                                                            <Link href={`/admin/invoices/${invoice.id}`}>
                                                                <FileText className="h-4 w-4" />
                                                            </Link>
                                                        </Button>

                                                        {['APPROVED', 'PAID'].includes(invoice.status) ? (
                                                            <Button variant="ghost" size="icon" disabled className="h-8 w-8 opacity-50">
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                        ) : (
                                                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary" title="Modifier">
                                                                <Link href={`/admin/invoices/${invoice.id}/edit`}>
                                                                    <Pencil className="h-4 w-4" />
                                                                </Link>
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                            title="Supprimer"
                                                            onClick={() => {
                                                                setSelected(invoice);
                                                                setDeleteOpen(true);
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ])}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="flex items-center justify-between px-4 py-4 border-t border-border/40 bg-muted/5">
                        <div className="text-xs text-muted-foreground">
                            Page <span className="font-medium text-foreground">{currentPage}</span> / <span className="font-medium text-foreground">{lastPage}</span>
                            <span className="ml-1">({meta.total} total)</span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={loading || currentPage <= 1}
                                className="h-8 px-2 text-xs"
                            >
                                Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => p + 1)}
                                disabled={loading || currentPage >= lastPage}
                                className="h-8 px-2 text-xs"
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                </div>

                <DeleteInvoiceModal
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    name={selected?.number ?? "cette facture"}
                    onConfirm={handleDeleteConfirm}
                    loading={deleting}
                />
            </div>
        </AppLayout>
    );
}
