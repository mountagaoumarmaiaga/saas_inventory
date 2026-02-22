
import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Search, Plus, Pencil, Trash2, FileText, CheckCircle, XCircle, Send, FileDown, Lock, FilePlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import type { Invoice, PaginationMeta } from "./types";
import { fetchInvoices, deleteInvoiceApi, submitInvoiceApi, validateProformaApi, requestModificationApi } from "./api";
import { groupItemsByDate } from "@/lib/date-utils";

import DeleteInvoiceModal from "./delete-modal";
import { createDeliveryNoteFromInvoice } from "../delivery-notes/api";

export default function UserInvoicesIndex() {
    const { auth } = usePage<{ auth: { user: { id: number; is_admin: boolean } } }>().props;
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
        if (!selected) return; // Changed from toDelete to selected
        try {
            setLoading(true);
            await deleteInvoiceApi(selected.id); // Changed from toDelete to selected
            toast.success("Document supprimé avec succès");
            setDeleteOpen(false); // Changed from setDeleteModalOpen to setDeleteOpen
            setSelected(null); // Changed from setToDelete to setSelected
            await load();
        } catch (e: any) {
            const status = e.response?.status;
            if (status === 403) {
                toast.warning("Seul l'administrateur a le droit de supprimer cette facture.", { autoClose: 5000 });
                setDeleteOpen(false);
            } else {
                toast.error(e.response?.data?.message || e.message || "Erreur lors de la suppression");
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(invoice: Invoice) {
        if (!confirm("Voulez-vous vraiment soumettre cette facture ? Elle ne sera plus modifiable.")) return;
        try {
            setLoading(true);
            await submitInvoiceApi(invoice.id);
            toast.success("Facture soumise avec succès !");
            await load();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleValidate(invoice: Invoice) {
        if (!confirm("Voulez-vous vraiment valider ce proforma ?")) return;
        try {
            setLoading(true);
            await validateProformaApi(invoice.id);
            toast.success("Proforma validé avec succès !");
            await load();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateBL(invoice: Invoice) {
        if (!confirm("Voulez-vous générer un Bon de Livraison pour cette facture ?")) return;
        try {
            setLoading(true);
            await createDeliveryNoteFromInvoice(invoice.id);
            toast.success("Bon de Livraison généré avec succès !");
            await load(); // Refresh the list
        } catch (e: any) {
            // Better error message handling
            const errorMsg = e.response?.data?.message || e.message || "Erreur lors de la génération du BL";
            toast.error(errorMsg);

            // If CSRF error (419), suggest page refresh
            if (e.response?.status === 419) {
                toast.info("Veuillez rafraîchir la page et réessayer", { autoClose: 5000 });
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleRequestModification(invoice: Invoice) {
        if (!confirm("Voulez-vous demander une modification de cette facture ?")) return;
        try {
            setLoading(true);
            await requestModificationApi(invoice.id);
            toast.success("Demande envoyée avec succès !");
            await load();
        } catch (e: any) {
            const status = e.response?.status;
            if (status === 403) {
                // Gestion spécifique demandée
                const msg = e.response?.data?.message || "Action réservée à l'administrateur";
                toast.warning(msg, { autoClose: 5000 });
            } else {
                const errorMsg = e.response?.data?.message || e.message || "Erreur lors de la demande";
                toast.error(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    }

    function formatMoney(amount: number) {
        return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF" }).format(amount);
    }

    // Check if user can delete an invoice
    function canDelete(invoice: Invoice): boolean {
        // Can't delete paid invoices
        if (invoice.status === 'PAID') return false;
        // Admin can delete any invoice
        if (auth.user.is_admin) return true;
        // User can only delete their own invoices
        return invoice.created_by === auth.user.id;
    }

    function formatDate(dateStr: string) {
        return new Intl.DateTimeFormat("fr-FR").format(new Date(dateStr));
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
                { title: "Dashboard", href: "/user/dashboard" },
                { title: "Factures", href: "/user/invoices" },
            ]}
        >
            <Head title="Factures" />

            <div className="p-6 space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Factures
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Gérez vos factures et proformas avec élégance.
                        </p>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white border-0 shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02]">
                        <Link href="/user/invoices/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle Facture
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="relative flex-1 md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Rechercher par numéro, client..."
                            className="pl-10 h-10 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-orange-500 transition-all font-medium"
                            value={q}
                            onChange={(e) => {
                                setPage(1);
                                setQ(e.target.value);
                            }}
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                        {error}
                    </div>
                )}

                <div className="rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-12 space-y-4">
                            <div className="relative">
                                <div className="h-12 w-12 rounded-full border-4 border-orange-500/30 border-t-orange-600 animate-spin" />
                            </div>
                            <span className="text-muted-foreground font-medium animate-pulse">Chargement des données...</span>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
                                <FileText className="h-8 w-8 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Aucune facture trouvée</h3>
                                <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                                    Commencez par créer votre première facture pour voir apparaître vos données ici.
                                </p>
                            </div>
                            <Button asChild variant="outline" className="mt-4 border-orange-200 hover:bg-orange-50 text-orange-700">
                                <Link href="/user/invoices/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Créer une facture
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent">
                                        <th className="h-12 px-4 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Numéro</th>
                                        <th className="h-12 px-4 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Client</th>
                                        <th className="h-12 px-4 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Date</th>
                                        <th className="h-12 px-4 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Montant</th>
                                        <th className="h-12 px-4 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Statut</th>
                                        <th className="h-12 px-4 text-right align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {groupItemsByDate(items, (i: Invoice) => i.created_at || i.date).flatMap(group => [
                                        <tr key={`header-${group.label}`} className="bg-muted/50 border-b border-white/5">
                                            <td colSpan={6} className="p-2 px-4 font-bold text-xs uppercase text-orange-600/80 tracking-wider">
                                                {group.label}
                                            </td>
                                        </tr>,
                                        ...group.items.map((invoice) => (
                                            <tr key={invoice.id} className="border-b border-white/5 transition-all hover:bg-orange-500/5 group">
                                                <td className="p-4 align-middle font-medium">
                                                    <div className="flex flex-col">
                                                        <span className="group-hover:text-orange-600 transition-colors">{invoice.number}</span>
                                                        <span className="text-xs text-muted-foreground uppercase">{invoice.type}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle">{invoice.client?.name || "-"}</td>
                                                <td className="p-4 align-middle">{formatDate(invoice.date)}</td>
                                                <td className="p-4 align-middle font-bold font-mono text-foreground/80">{formatMoney(invoice.total)}</td>
                                                <td className="p-4 align-middle">
                                                    {invoice.status === 'PAID' ? (
                                                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 border-0 shadow-sm">Payé</Badge>
                                                    ) : invoice.status === 'APPROVED' ? (
                                                        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 border-0 shadow-sm">Approuvé</Badge>
                                                    ) : invoice.status === 'SUBMITTED' ? (
                                                        <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 border-0 shadow-sm">Soumis</Badge>
                                                    ) : invoice.status === 'REJECTED' ? (
                                                        <Badge variant="destructive" className="shadow-sm">Rejeté</Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="border-dashed">Brouillon</Badge>
                                                    )}
                                                </td>
                                                <td className="p-4 align-middle text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {invoice.status === 'DRAFT' && invoice.type === 'invoice' && (
                                                            <Button variant="outline" size="sm" onClick={() => handleSubmit(invoice)}>
                                                                <Send className="h-4 w-4 mr-1" /> Soumettre
                                                            </Button>
                                                        )}
                                                        {invoice.status === 'DRAFT' && invoice.type === 'proforma' && (
                                                            <Button variant="outline" size="sm" onClick={() => handleValidate(invoice)}>
                                                                <CheckCircle className="h-4 w-4 mr-1" /> Valider
                                                            </Button>
                                                        )}
                                                        {(invoice.status === 'APPROVED' || invoice.status === 'PAID') && invoice.type === 'invoice' && (
                                                            <Button variant="outline" size="sm" onClick={() => handleCreateBL(invoice)}>
                                                                <FilePlus className="h-4 w-4 mr-1" /> Générer BL
                                                            </Button>
                                                        )}

                                                        {/* Request Modification */}
                                                        {(invoice.status === 'APPROVED' || invoice.status === 'PAID') && !invoice.modification_requested_at && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleRequestModification(invoice)}
                                                                title="Demander une modification"
                                                            >
                                                                <Lock className="h-4 w-4 mr-1" /> Modifier
                                                            </Button>
                                                        )}

                                                        <Button variant="outline" size="sm" asChild title="Voir PDF">
                                                            <a href={`/user/api/invoices/${invoice.id}/pdf/view`} target="_blank">
                                                                <FileText className="h-4 w-4 text-blue-500 mr-1" /> Voir
                                                            </a>
                                                        </Button>
                                                        <Button variant="outline" size="sm" asChild title="Télécharger PDF">
                                                            <a href={`/user/api/invoices/${invoice.id}/pdf/download`} target="_blank">
                                                                <FileDown className="h-4 w-4 text-green-500 mr-1" /> Télécharger
                                                            </a>
                                                        </Button>

                                                        {['APPROVED', 'PAID'].includes(invoice.status) ? (
                                                            <Button variant="ghost" size="icon" disabled title="Facture verrouillée. Demandez une modification pour éditer.">
                                                                <Pencil className="h-4 w-4 opacity-50" />
                                                            </Button>
                                                        ) : (
                                                            <Button variant="ghost" size="icon" asChild>
                                                                <Link href={`/user/invoices/${invoice.id}/edit`}>
                                                                    <Pencil className="h-4 w-4" />
                                                                </Link>
                                                            </Button>
                                                        )}
                                                        {canDelete(invoice) && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                                onClick={() => {
                                                                    setSelected(invoice);
                                                                    setDeleteOpen(true);
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ])}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="flex items-center justify-between gap-2 p-4 border-t">
                        <div className="text-xs text-muted-foreground">
                            Page {currentPage} / {lastPage} • Total: {meta.total}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={loading || currentPage <= 1}
                                className="h-9 w-9 p-0 rounded-lg hover:bg-orange-500/10 hover:text-orange-600 hover:border-orange-200 transition-all"
                            >
                                <span className="sr-only">Précédent</span>
                                <span>&lt;</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => p + 1)}
                                disabled={loading || currentPage >= lastPage}
                                className="h-9 w-9 p-0 rounded-lg hover:bg-orange-500/10 hover:text-orange-600 hover:border-orange-200 transition-all"
                            >
                                <span className="sr-only">Suivant</span>
                                <span>&gt;</span>
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
