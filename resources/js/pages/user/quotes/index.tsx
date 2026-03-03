
import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Search, Plus, Pencil, Trash2, FileText, CheckCircle, XCircle, Send, FileDown, Lock, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import type { Quote, PaginationMeta } from "./types";
import { fetchQuotes, deleteQuoteApi, convertToInvoiceApi } from "./api";
import { groupItemsByDate } from "@/lib/date-utils";

import DeleteQuoteModal from "./delete-modal";
import ClientOnly from "@/components/client-only";
import { usePage } from "@inertiajs/react";

export default function AdminQuotesIndex() {
    const { auth } = usePage().props as unknown as { auth: { user: { role: string } } };
    const isAdmin = auth?.user?.role === 'admin';
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Quote[]>([]);
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

    const [selected, setSelected] = useState<Quote | null>(null);
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
            const { items, meta } = await fetchQuotes(queryString);
            setItems(items);
            setMeta(meta);
        } catch (e: any) {
            const errorMsg = e?.message ?? "Erreur chargement deviss";
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
            await deleteQuoteApi(selected.id);
            setDeleteOpen(false);
            setSelected(null);
            toast.success("Devis supprimée avec succès !");
            await load();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setDeleting(false);
        }
    }

    async function handleStatusChange(quote: Quote, newStatus: string) {
        // We will implement full status update in Edit or Show for now, 
        // but here we can add quick actions if needed.
    }

    async function handleConvert(quote: Quote) {
        if (!confirm("Voulez-vous convertir ce devis en facture ?")) return;
        try {
            setLoading(true);
            await convertToInvoiceApi(quote.id);
            toast.success("Devis converti en facture avec succès !");
            await load();
        } catch (e: any) {
            toast.error(e.message || "Erreur lors de la conversion");
        } finally {
            setLoading(false);
        }
    }

    function formatMoney(amount: number) {
        return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF" }).format(amount);
    }

    function formatDate(dateStr: string) {
        if (!dateStr) return "-";
        return new Intl.DateTimeFormat("fr-FR").format(new Date(dateStr));
    }

    function getStatusBadge(status: string) {
        switch (status) {
            case 'DRAFT': return <Badge variant="outline">Brouillon</Badge>;
            case 'SENT': return <Badge className="bg-blue-500">Envoyé</Badge>;
            case 'ACCEPTED': return <Badge className="bg-green-500">Accepté</Badge>;
            case 'REJECTED': return <Badge variant="destructive">Rejeté</Badge>;
            case 'CANCELLED': return <Badge variant="secondary">Annulé</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    }

    const currentPage = meta.current_page ?? page;
    const lastPage = meta.last_page ?? 1;

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Devis", href: "/user/quotes" },
            ]}
        >
            <Head title="Devis" />

            <div className="p-6 space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Devis
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Gérer les devis de vos clients
                        </p>
                    </div>
                    <Button
                        asChild
                        className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 rounded-lg whitespace-nowrap"
                    >
                        <Link href="/user/quotes/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Devis
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
                            <h3 className="font-medium text-foreground">Aucun devis</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Commencez par créer un nouveau devis.
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
                                    {groupItemsByDate(items, (i: Quote) => i.created_at || i.date).flatMap(group => [
                                        <tr key={`header-${group.label}`} className="bg-muted/10">
                                            <td colSpan={6} className="py-2 px-4 font-semibold text-xs text-muted-foreground">
                                                {group.label}
                                            </td>
                                        </tr>,
                                        ...group.items.map((quote) => (
                                            <tr key={quote.id} className="group hover:bg-muted/30 transition-colors">
                                                <td className="p-4 align-middle font-medium">
                                                    <div className="flex flex-col">
                                                        <span className="text-foreground">{quote.number}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground border border-border/50">
                                                        {quote.client?.name || "-"}
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle text-muted-foreground text-xs">
                                                    <ClientOnly fallback={<span>...</span>}>
                                                        {formatDate(quote.date)}
                                                    </ClientOnly>
                                                </td>
                                                <td className="p-4 align-middle font-medium text-foreground">
                                                    <ClientOnly fallback={<span>...</span>}>
                                                        {formatMoney(quote.total)}
                                                    </ClientOnly>
                                                </td>
                                                <td className="p-4 align-middle">{getStatusBadge(quote.status)}</td>
                                                <td className="p-4 align-middle text-right">
                                                    <div className="flex justify-end gap-1">
                                                        {isAdmin && quote.status !== 'ACCEPTED' && (
                                                            <Button variant="ghost" size="icon" onClick={() => handleConvert(quote)} title="Convertir en facture" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                                                                <Send className="h-4 w-4" />
                                                            </Button>
                                                        )}

                                                        {/* View Button */}
                                                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary" title="Voir">
                                                            <Link href={`/user/quotes/${quote.id}`}>
                                                                <FileText className="h-4 w-4" />
                                                            </Link>
                                                        </Button>

                                                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary" title="Modifier">
                                                            <Link href={`/user/quotes/${quote.id}/edit`}>
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                            title="Supprimer"
                                                            onClick={() => {
                                                                setSelected(quote);
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

                <DeleteQuoteModal
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    name={selected?.number ?? "ce devis"}
                    onConfirm={handleDeleteConfirm}
                    loading={deleting}
                />
            </div>
        </AppLayout>
    );
}
