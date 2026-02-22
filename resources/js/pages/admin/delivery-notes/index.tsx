
import { useEffect, useState, useMemo } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Search, FileText, Eye, FileDown, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchDeliveryNotes } from "./api"; // Use admin API
import { DeliveryNote } from "../../user/delivery-notes/api"; // Reuse types
import { PaginationMeta } from "../../admin/products/types";
import { groupItemsByDate } from "@/lib/date-utils";

export default function AdminDeliveryNotesIndex() {
    const [items, setItems] = useState<DeliveryNote[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);

    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        if (q) params.set("search", q);
        params.set("page", String(page));
        return params.toString();
    }, [q, page]);

    useEffect(() => {
        load();
    }, [queryString]);

    async function load() {
        setLoading(true);
        try {
            const data = await fetchDeliveryNotes(queryString);
            setItems(data.data);
            setMeta(data.meta || data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppLayout breadcrumbs={[{ title: "Admin", href: "/admin/dashboard" }, { title: "Bons de Livraison", href: "/admin/delivery-notes" }]}>
            <Head title="Bons de Livraison" />
            <div className="p-6 space-y-6">
                {/* Page Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Bons de Livraison
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Gestion des expéditions et suivis
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors duration-300" />
                            <Input
                                placeholder="Rechercher..."
                                value={q}
                                onChange={e => setQ(e.target.value)}
                                className="w-[280px] h-10 pl-9 rounded-lg border-border/50 bg-background/50 focus:bg-background transition-all duration-200"
                            />
                        </div>
                    </div>
                </div>

                {/* Modern Table Card */}
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
                            <h3 className="font-medium text-foreground">Aucun bon de livraison</h3>
                        </div>
                    ) : (
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead>
                                    <tr className="border-b border-border/40 bg-muted/20">
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Référence</th>
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Date</th>
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Client</th>
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Facture Liée</th>
                                        <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-border/30">
                                    {(() => {
                                        const grouped = groupItemsByDate(items, (item: DeliveryNote) => item.created_at || item.delivery_date);

                                        return grouped.flatMap(group => [
                                            <tr key={`header-${group.label}`} className="bg-muted/10">
                                                <td colSpan={5} className="py-2 px-4 font-semibold text-xs text-muted-foreground">
                                                    {group.label}
                                                </td>
                                            </tr>,
                                            ...group.items.map(item => (
                                                <tr key={item.id} className="group hover:bg-muted/30 transition-colors">
                                                    <td className="p-4 align-middle font-medium text-foreground">{item.reference}</td>
                                                    <td className="p-4 align-middle text-muted-foreground text-xs">{new Date(item.delivery_date).toLocaleDateString()}</td>
                                                    <td className="p-4 align-middle">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground border border-border/50">
                                                            {item.client?.name || "-"}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        {item.invoice ? (
                                                            <Link
                                                                href={`/admin/invoices/${item.invoice.id}/edit`}
                                                                className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors text-xs"
                                                            >
                                                                {item.invoice.reference}
                                                            </Link>
                                                        ) : (
                                                            <span className="text-muted-foreground text-xs">-</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 align-middle text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                asChild
                                                                title="Modifier"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Link href={`/admin/delivery-notes/${item.id}/edit`}>
                                                                    <Pencil className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                asChild
                                                                title="Voir PDF"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <a href={`/admin/api/delivery-notes/${item.id}/pdf?action=stream`} target="_blank">
                                                                    <FileText className="h-4 w-4 text-blue-500/70 group-hover:text-blue-600 transition-colors" />
                                                                </a>
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                asChild
                                                                title="Télécharger PDF"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <a href={`/admin/api/delivery-notes/${item.id}/pdf`} target="_blank">
                                                                    <FileDown className="h-4 w-4 text-green-500/70 group-hover:text-green-600 transition-colors" />
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ]);
                                    })()}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 py-4 border-t border-border/40 bg-muted/5">
                        <div className="text-xs text-muted-foreground">
                            Page <span className="font-medium text-foreground">{meta.current_page}</span> / <span className="font-medium text-foreground">{meta.last_page}</span>
                            {meta.total !== undefined && <span className="ml-1">({meta.total} total)</span>}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={loading || page <= 1}
                                className="h-8 px-2 text-xs"
                            >
                                Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => p + 1)}
                                disabled={loading || page >= meta.last_page}
                                className="h-8 px-2 text-xs"
                            >
                                Suivant
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
