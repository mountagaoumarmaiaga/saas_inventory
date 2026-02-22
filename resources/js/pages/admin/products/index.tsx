import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, Image as ImageIcon, Edit, Trash2, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { toast } from "react-toastify";

import { Product, ProductPaginatedResponse } from "./types";
import { fetchProducts } from "./api";
import DeleteProductModal from "./delete-modal";
import ProductActionsMenu from "./dropdown-menu";

export default function AdminProductsIndex() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Product[]>([]);
    const [meta, setMeta] = useState<ProductPaginatedResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 10;

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);



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
            const result = await fetchProducts(queryString);
            setItems(result.data);
            setMeta(result);
        } catch (e: any) {
            const msg = e?.response?.data?.message || e.message || "Erreur chargement";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryString]);

    const currentPage = meta?.current_page ?? page;
    const lastPage = meta?.last_page ?? 1;
    const total = meta?.total ?? 0;

    function formatMoney(val: number | null) {
        if (val === null) return "-";
        return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF" }).format(val);
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Produits", href: "/admin/products" },
            ]}
        >
            <Head title="Produits (Admin)" />

            <div className="p-6 space-y-6">
                {/* Page Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Produits
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Gestion du catalogue · <span className="font-medium text-foreground">{total}</span> produits
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                            <Input
                                value={q}
                                onChange={(e) => {
                                    setPage(1);
                                    setQ(e.target.value);
                                }}
                                placeholder="Rechercher..."
                                className="pl-9 h-10 w-full sm:w-[280px] rounded-lg border-border/50 bg-background/50 hover:bg-background/80 focus:bg-background transition-all duration-200 text-sm"
                            />
                        </div>

                        <Button asChild className="h-10 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_-3px_rgba(var(--primary),0.3)] transition-all duration-200 hover:shadow-[0_0_20px_-3px_rgba(var(--primary),0.4)] hover:scale-[1.02]">
                            <Link href="/admin/products/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Nouveau Produit
                            </Link>
                        </Button>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 text-red-600 rounded-lg text-sm border border-red-500/20 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        {error}
                    </div>
                )}

                {/* Modern Table Card */}
                <div className="rounded-xl border border-border/40 bg-background/50 backdrop-blur-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="relative overflow-x-auto flex-1">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/30 border-b border-border/40">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[80px]">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Produit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Catégorie</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Prix Achat</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Prix Vente</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-[80px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="p-12 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="h-10 w-10 animate-spin text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full opacity-20"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                                                </div>
                                                <span className="text-sm">Chargement...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : items.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-12 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
                                                    <Search className="h-6 w-6 opacity-30" />
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <span className="font-medium text-foreground">Aucun produit trouvé</span>
                                                    <span className="text-xs text-muted-foreground mt-1">Modifiez vos filtres de recherche</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((p) => (
                                        <tr key={p.id} className="group hover:bg-muted/30 transition-colors duration-200">
                                            <td className="px-6 py-4">
                                                <div className="relative h-10 w-10 rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center overflow-hidden">
                                                    {p.image_path ? (
                                                        <img src={p.image_path.startsWith('http') ? p.image_path : `/storage/${p.image_path}`} alt={p.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="h-4 w-4 text-muted-foreground/30" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">{p.name}</div>
                                                    <div className="text-xs text-muted-foreground font-mono tracking-tight">
                                                        {p.sku || "-"}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-0.5 max-w-[150px]">
                                                    <span className="text-sm text-foreground/90 truncate" title={p.category?.name || ""}>{p.category?.name || "-"}</span>
                                                    {p.sub_category && (
                                                        <span className="text-xs text-muted-foreground truncate" title={p.sub_category.name}>
                                                            {p.sub_category.name}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-sm font-mono text-muted-foreground tracking-tight">
                                                    {formatMoney(p.purchase_price)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-sm font-mono font-medium text-foreground tracking-tight">
                                                    {formatMoney(p.sale_price)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {(() => {
                                                    const q = p.quantity;
                                                    const min = p.min_quantity || 0;

                                                    // Status styling
                                                    let statusColor = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
                                                    let statusLabel = "En Stock";

                                                    if (q <= 0) {
                                                        statusColor = "bg-red-500/10 text-red-600 border-red-500/20";
                                                        statusLabel = "Rupture";
                                                    } else if (q <= min) {
                                                        statusColor = "bg-amber-500/10 text-amber-600 border-amber-500/20";
                                                        statusLabel = "Faible";
                                                    }

                                                    return (
                                                        <div className="flex flex-col items-center gap-1">
                                                            <span className="text-sm font-semibold">{q}</span>
                                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusColor}`}>
                                                                {statusLabel}
                                                            </span>
                                                        </div>
                                                    )
                                                })()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <ProductActionsMenu
                                                    product={p}
                                                    onDelete={(prod) => {
                                                        setDeleteProduct(prod);
                                                        setDeleteOpen(true);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Minimal Pagination */}
                    <div className="relative flex items-center justify-between px-6 py-4 border-t border-border/40 bg-muted/5">
                        <div className="text-xs text-muted-foreground">
                            Page <span className="font-medium text-foreground">{currentPage}</span> / <span className="font-medium text-foreground">{lastPage}</span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPage(currentPage - 1)}
                                disabled={currentPage <= 1 || loading}
                                className="h-8 px-3 text-xs"
                            >
                                Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(currentPage + 1)}
                                disabled={currentPage >= lastPage || loading}
                                className="h-8 px-3 text-xs bg-transparent hover:bg-muted/50"
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                </div>

                <DeleteProductModal
                    open={deleteOpen}
                    onOpenChange={(v) => {
                        setDeleteOpen(v);
                        if (!v) setDeleteProduct(null);
                    }}
                    product={deleteProduct}
                    onDeleted={load}
                />


            </div>
        </AppLayout>
    );
}
