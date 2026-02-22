import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Search, Image as ImageIcon, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

import type { Product } from "./api"; // Import local Product type
import { fetchProducts } from "./api";
import type { PaginationMeta } from "../../admin/products/types"; // Import shared PaginationMeta

export default function UserProductsIndex() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Product[]>([]);
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
            const { items, meta } = await fetchProducts(queryString);
            setItems(items);
            setMeta(meta);
        } catch (e: any) {
            const errorMsg = e?.message ?? "Erreur chargement produits";
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

    const currentPage = meta.current_page ?? page;
    const lastPage = meta.last_page ?? 1;

    function formatMoney(amount: number) {
        return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF" }).format(amount);
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "/user/dashboard" },
                { title: "Produits", href: "/user/products" },
            ]}
        >
            <Head title="Produits" />

            <div className="p-6 space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Catalogue Produits
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Consultez les produits disponibles ({meta.total ?? 0} produit{meta.total !== 1 ? "s" : ""})
                        </p>
                    </div>

                    <div className="relative flex-1 md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={q}
                            onChange={(e) => {
                                setPage(1);
                                setQ(e.target.value);
                            }}
                            placeholder="Rechercher par nom, SKU..."
                            className="pl-10 h-12 w-full rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-orange-500 transition-all font-medium"
                        />
                    </div>
                </div>

                {error && (
                    <div className="rounded-md border border-red-500/20 bg-red-500/10 p-4 flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <p className="text-sm text-red-500 font-medium">{error}</p>
                    </div>
                )}

                <div className="rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <div className="max-h-[calc(100vh-14rem)] overflow-auto">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 z-10">
                                <tr className="border-b border-white/10 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent">
                                    <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider w-[80px]">Image</th>
                                    <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Nom / SKU</th>
                                    <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Catégorie</th>
                                    <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Unité</th>
                                    <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Prix Vente</th>
                                    <th className="h-12 px-6 text-center align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Stock</th>
                                </tr>
                            </thead>

                            <tbody className="[&_tr:last-child]:border-0">
                                {loading ? (
                                    <tr>
                                        <td className="p-12 text-center" colSpan={6}>
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <div className="h-12 w-12 rounded-full border-4 border-orange-500/30 border-t-orange-600 animate-spin" />
                                                <span className="text-muted-foreground font-medium animate-pulse">Chargement des produits...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : items.length === 0 ? (
                                    <tr>
                                        <td className="p-12 text-center" colSpan={6}>
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center mb-4">
                                                    <Search className="h-8 w-8 text-orange-600" />
                                                </div>
                                                <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Aucun produit trouvé</h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {q ? "Essayez de modifier votre recherche." : "Le catalogue est vide."}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((p) => (
                                        <tr key={p.id} className="border-b border-white/5 transition-all hover:bg-orange-500/5 group">
                                            <td className="px-6 py-4 align-middle">
                                                <div className="h-12 w-12 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-orange-500/30 transition-colors">
                                                    {p.image_url ? (
                                                        <img src={p.image_url} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="h-5 w-5 text-muted-foreground/30" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-middle">
                                                <div className="font-medium text-foreground group-hover:text-orange-600 transition-colors">{p.name}</div>
                                                <div className="text-xs text-muted-foreground font-mono mt-0.5">{p.sku || "-"}</div>
                                            </td>
                                            <td className="px-6 py-4 align-middle">
                                                <div className="flex flex-col gap-1">
                                                    {p.category ? (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 border border-orange-500/20 w-fit">
                                                            {p.category.name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground/50 text-xs">-</span>
                                                    )}
                                                    {p.sub_category && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted/30 text-muted-foreground border border-white/5 w-fit">
                                                            {p.sub_category.name}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-middle">
                                                <span className="text-xs text-muted-foreground">{p.unit || "-"}</span>
                                            </td>
                                            <td className="px-6 py-4 align-middle">
                                                <span className="font-mono font-medium text-foreground">{formatMoney(p.sale_price)}</span>
                                            </td>
                                            <td className="px-6 py-4 align-middle">
                                                <div className="flex justify-center">
                                                    {(() => {
                                                        const qty = p.quantity ?? 0;
                                                        const min = p.min_quantity || 0;
                                                        let statusColor = "text-emerald-600";
                                                        let statusBg = "bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/30";
                                                        let Icon = CheckCircle;

                                                        if (qty <= 0) {
                                                            statusColor = "text-red-600";
                                                            statusBg = "bg-gradient-to-r from-red-500/10 to-rose-500/10 border-red-500/30";
                                                            Icon = XCircle;
                                                        } else if (qty <= min) {
                                                            statusColor = "text-amber-600";
                                                            statusBg = "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30";
                                                            Icon = AlertTriangle;
                                                        }

                                                        return (
                                                            <span className={`px - 3 py - 1.5 rounded - lg text - xs font - bold border ${statusBg} ${statusColor} tabular - nums shadow - sm flex items - center gap - 1.5 w - fit`}>
                                                                <Icon className="h-3.5 w-3.5" />
                                                                {qty}
                                                            </span>
                                                        );
                                                    })()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4 border-t border-white/10 bg-muted/20">
                        <div className="text-xs font-medium text-muted-foreground">
                            Page <span className="text-foreground">{currentPage}</span> sur <span className="text-foreground">{lastPage}</span>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={loading || currentPage <= 1}
                                className="h-8 rounded-lg border-white/10 hover:bg-white/5"
                            >
                                ←
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => p + 1)}
                                disabled={loading || currentPage >= lastPage}
                                className="h-8 rounded-lg border-white/10 hover:bg-white/5"
                            >
                                →
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
