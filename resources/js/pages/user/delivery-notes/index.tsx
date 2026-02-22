
import { useEffect, useState, useMemo } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Search, FileText, Eye, FileDown, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchDeliveryNotes, DeliveryNote } from "./api";
import { groupItemsByDate } from "@/lib/date-utils";

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function DeliveryNotesIndex() {
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
        <AppLayout breadcrumbs={[{ title: "Dashboard", href: "/user/dashboard" }, { title: "Bons de Livraison", href: "/user/delivery-notes" }]}>
            <Head title="Bons de Livraison" />
            <div className="p-6 space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Bons de Livraison
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Gérez les bons de livraison de vos commandes.
                        </p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher par référence, client..."
                            value={q}
                            onChange={e => setQ(e.target.value)}
                            className="pl-10 h-10 w-[300px] rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-orange-500 transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <table className="w-full text-sm caption-bottom">
                        <thead>
                            <tr className="border-b border-white/10 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent">
                                <th className="h-12 px-4 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Référence</th>
                                <th className="h-12 px-4 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Date</th>
                                <th className="h-12 px-4 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Client</th>
                                <th className="h-12 px-4 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Facture Liée</th>
                                <th className="h-12 px-4 text-right align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-4">
                                            <div className="h-12 w-12 rounded-full border-4 border-orange-500/30 border-t-orange-600 animate-spin" />
                                            <span className="text-muted-foreground font-medium animate-pulse">Chargement des données...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-4">
                                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
                                                <FileText className="h-8 w-8 text-orange-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Aucun bon de livraison</h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Aucun document trouvé pour le moment.
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                (() => {
                                    const grouped = groupItemsByDate(items, (item: DeliveryNote) => item.created_at || item.delivery_date);

                                    return grouped.flatMap(group => [
                                        <tr key={`header-${group.label}`} className="bg-muted/50 border-b border-white/5">
                                            <td colSpan={5} className="p-2 px-4 font-bold text-xs uppercase text-orange-600/80 tracking-wider">
                                                {group.label}
                                            </td>
                                        </tr>,
                                        ...group.items.map(item => (
                                            <tr key={item.id} className="border-b border-white/5 transition-all hover:bg-orange-500/5 group">
                                                <td className="p-4 align-middle font-medium">
                                                    <span className="group-hover:text-orange-600 transition-colors">{item.reference}</span>
                                                </td>
                                                <td className="p-4 align-middle">{new Date(item.delivery_date).toLocaleDateString()}</td>
                                                <td className="p-4 align-middle">{item.client?.name || "-"}</td>
                                                <td className="p-4 align-middle">
                                                    {item.invoice ? (
                                                        <Link href={`/user/invoices/${item.invoice.id}/edit`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                                                            {item.invoice.reference}
                                                        </Link>
                                                    ) : <span className="text-muted-foreground">-</span>}
                                                </td>
                                                <td className="p-4 align-middle text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <div className="flex items-center gap-1 bg-background/50 backdrop-blur-sm p-1 rounded-lg border border-white/5 shadow-sm">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                asChild
                                                                title="Modifier"
                                                                className="h-8 w-8 hover:bg-orange-500/10 hover:text-orange-600 transition-colors"
                                                            >
                                                                <Link href={`/user/delivery-notes/${item.id}/edit`}>
                                                                    <Pencil className="h-4 w-4" />
                                                                </Link>
                                                            </Button>
                                                            <div className="w-px h-4 bg-border/50" />
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                asChild
                                                                title="Voir PDF"
                                                                className="h-8 w-8 hover:bg-blue-500/10 hover:text-blue-600 transition-colors"
                                                            >
                                                                <a href={`/user/api/delivery-notes/${item.id}/pdf?action=stream`} target="_blank">
                                                                    <Eye className="h-4 w-4" />
                                                                </a>
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                asChild
                                                                title="Télécharger PDF"
                                                                className="h-8 w-8 hover:bg-green-500/10 hover:text-green-600 transition-colors"
                                                            >
                                                                <a href={`/user/api/delivery-notes/${item.id}/pdf`} target="_blank">
                                                                    <FileDown className="h-4 w-4" />
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ]);
                                })()
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
