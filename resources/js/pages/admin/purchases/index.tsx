import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { Plus, Search, Eye, FileText, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import AppLayout from "@/layouts/app-layout";
import { fetchPurchases } from "./api";
import { Purchase, PurchaseStatus } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const STATUS_CONFIG: Record<PurchaseStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" }> = {
    DRAFT: { label: "Brouillon", variant: "secondary" },
    ORDERED: { label: "Commandé", variant: "outline" },
    PARTIALLY_RECEIVED: { label: "Partiellement Reçu", variant: "default" },
    RECEIVED: { label: "Reçu", variant: "success" },
    CANCELLED: { label: "Annulé", variant: "destructive" }
};

export default function PurchasesIndex() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadPurchases = async (page = 1, searchQuery = search) => {
        try {
            setLoading(true);
            const data = await fetchPurchases(page, searchQuery);
            setPurchases(data.data as Purchase[]);
            setCurrentPage(data.current_page);
            setTotalPages(data.last_page);
        } catch (error) {
            console.error("Erreur lors du chargement des bons de commande:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            loadPurchases(1, search);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    useEffect(() => {
        loadPurchases(currentPage, search);
    }, [currentPage]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "XOF",
        }).format(amount);
    };

    return (
        <AppLayout>
            <Head title="Bons de Commande" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Bons de Commande
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Gérez vos achats et approvisionnements fournisseurs
                        </p>
                    </div>
                    <Button
                        asChild
                        className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 rounded-lg whitespace-nowrap"
                    >
                        <Link href="/admin/purchases/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Bon de Commande
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-2">
                    <div className="relative flex-1 md:max-w-xs group">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors duration-200" />
                        <Input
                            type="search"
                            placeholder="Rechercher par n° ou fournisseur..."
                            className="h-10 pl-9 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-border/40 bg-background/50 backdrop-blur-xl shadow-sm overflow-hidden flex flex-col">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-12 gap-2">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                            <span className="text-xs text-muted-foreground">Chargement...</span>
                        </div>
                    ) : purchases.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center">
                            <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                                <FileText className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="font-medium text-foreground">Aucun bon de commande</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Commencez par créer un nouveau bon de commande.
                            </p>
                        </div>
                    ) : (
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10 border-b-2 border-indigo-500/20">
                                    <tr className="border-b border-border/40 bg-muted/20">
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Numéro</th>
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Fournisseur</th>
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Date Commande</th>
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Montant Total</th>
                                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Statut</th>
                                        <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="h-24 text-center">
                                                Chargement...
                                            </td>
                                        </tr>
                                    ) : purchases.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="h-24 text-center text-slate-500">
                                                Aucun bon de commande.
                                            </td>
                                        </tr>
                                    ) : (
                                        purchases.map((purchase) => {
                                            const statusConf = STATUS_CONFIG[purchase.status];
                                            return (
                                                <tr key={purchase.id}  className="group hover:bg-gradient-to-r hover:from-indigo-500/5 hover:to-blue-500/5 transition-all duration-300 group hover:bg-muted/30 transition-colors">
                                                    <td className="p-4 align-middle font-medium">
                                                        <span className="text-foreground">{purchase.number}</span>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground border border-border/50">
                                                            {purchase.supplier?.name || "-"}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 align-middle text-muted-foreground text-xs">
                                                        {purchase.order_date
                                                            ? format(new Date(purchase.order_date), "dd MMM yyyy", { locale: fr })
                                                            : "-"}
                                                    </td>
                                                    <td className="p-4 align-middle font-medium text-foreground">
                                                        {formatCurrency(purchase.total_amount)}
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <Badge variant={statusConf.variant === 'success' ? 'default' : statusConf.variant} className={statusConf.variant === 'success' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
                                                            {statusConf.label}
                                                        </Badge>
                                                    </td>
                                                    <td className="p-4 align-middle text-right">
                                                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary" title="Voir">
                                                            <Link href={`/admin/purchases/${purchase.id}`}>
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 py-4 border-t border-border/40 bg-muted/5">
                        <div className="text-sm text-muted-foreground">
                            Page <span className="font-medium text-foreground">{currentPage}</span> / <span className="font-medium text-foreground">{totalPages}</span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={loading || currentPage <= 1}
                                className="h-8 px-3 text-xs"
                            >
                                Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => p + 1)}
                                disabled={loading || currentPage >= totalPages}
                                className="h-8 px-3 text-xs"
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
