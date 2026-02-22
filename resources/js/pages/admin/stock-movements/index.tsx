import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

import type { StockMovement, PaginationMeta, StockMovementForm } from "./types";
import { columns, cellValue } from "./columns";
import { fetchStockMovements, createStockMovementApi, updateStockMovementApi, deleteStockMovementApi } from "./api";

import CreateStockMovement from "./Create";
import EditStockMovement from "./Edit";
import DeleteModal from "./delete-modal";
import StockMovementActionsMenu from "./dropdown-menu";
import { ErrorBoundary } from "@/components/error-boundary";
import ClientOnly from "@/components/client-only";

export default function AdminStockMovementsIndex() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<StockMovement[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({});
    const [error, setError] = useState<string | null>(null);

    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 10;

    const [creating, setCreating] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [selected, setSelected] = useState<StockMovement | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

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
            const { data, meta } = await fetchStockMovements(queryString);
            // The API return format might need adjustment depending on how paginateByEntreprise returns.
            // Usually it returns { data: [...], ...meta_fields } or { data: [...] } directly if using default Laravel resource collection.
            // We'll assume standard Laravel pagination for now: { data: [...], current_page: 1, ... }
            // If it's wrapped in 'data' key twice (resource), we adjust.
            // Based on controller: return response()->json($data); where $data is from paginateByEntreprise.
            // paginateByEntreprise likely returns LengthAwarePaginator array/json.

            setItems(data?.data || data || []);
            setMeta(data || {});
        } catch (e: any) {
            const errorMsg = e?.message ?? "Erreur chargement mouvements";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let isMounted = true;

        async function load() {
            setLoading(true);
            setError(null);
            try {
                const { data, meta } = await fetchStockMovements(queryString);
                if (isMounted) {
                    setItems(data?.data || data || []);
                    setMeta(data || {});
                }
            } catch (e: any) {
                if (isMounted) {
                    const errorMsg = e?.message ?? "Erreur chargement mouvements";
                    setError(errorMsg);
                    toast.error(errorMsg);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        load();

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryString]);

    async function handleCreate(form: StockMovementForm, close: () => void, setErrors: (e: any) => void) {
        setCreating(true);
        setError(null);

        try {
            const res = await createStockMovementApi(form);
            if (!res.ok) {
                setErrors(res.errors);
                Object.values(res.errors).forEach((errors: any) => {
                    errors.forEach((errorMsg: string) => {
                        toast.error(errorMsg);
                    });
                });
                return;
            }
            close();
            toast.success("Mouvement créé avec succès !");

            if (res.data?.warning) {
                toast.warn(res.data.warning, { autoClose: 8000 });
            }

            await load();
        } catch (e: any) {
            const errorMsg = e?.message ?? "Erreur création mouvement";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setCreating(false);
        }
    }

    async function handleUpdate(id: number, form: StockMovementForm, close: () => void, setErrors: (e: any) => void) {
        setUpdating(true);
        setError(null);

        try {
            const res = await updateStockMovementApi(id, form);
            if (!res.ok) {
                setErrors(res.errors);
                Object.values(res.errors).forEach((errors: any) => {
                    errors.forEach((errorMsg: string) => {
                        toast.error(errorMsg);
                    });
                });
                return;
            }
            close();
            toast.success("Mouvement mis à jour avec succès !");
            await load();
        } catch (e: any) {
            const errorMsg = e?.message ?? "Erreur mise à jour mouvement";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setUpdating(false);
        }
    }

    async function handleDeleteConfirm() {
        if (!selected) return;

        setDeleting(true);
        setError(null);

        try {
            await deleteStockMovementApi(selected.id);
            setDeleteOpen(false);
            setSelected(null);
            toast.success("Mouvement supprimé avec succès !");
            await load();
        } catch (e: any) {
            const errorMsg = e?.message ?? "Erreur suppression mouvement";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setDeleting(false);
        }
    }

    const currentPage = meta.current_page ?? page;
    const lastPage = meta.last_page ?? 1;

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Mouvements de stock", href: "/admin/stock-movements" },
            ]}
        >
            <Head title="Mouvements de stock (Admin)" />

            <div className="p-6 space-y-6">
                <ErrorBoundary>
                    {/* Page Header */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                Mouvements de stock
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Historique et gestion des entrées/sorties
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors duration-300" />
                                <Input
                                    value={q}
                                    onChange={(e) => {
                                        setPage(1);
                                        setQ(e.target.value);
                                    }}
                                    placeholder="Rechercher..."
                                    className="w-[280px] h-10 pl-9 rounded-lg border-border/50 bg-background/50 focus:bg-background transition-all duration-200"
                                />
                            </div>

                            <CreateStockMovement onCreate={handleCreate} creating={creating} />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive font-medium">
                            {error}
                        </div>
                    )}

                    {/* Modern Table Card */}
                    <div className="rounded-xl border border-border/40 bg-background/50 backdrop-blur-xl shadow-sm overflow-hidden flex flex-col">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border/40 bg-muted/20">
                                        {columns.map((c) => (
                                            <th key={c.key} className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">
                                                {c.label}
                                            </th>
                                        ))}
                                        <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px] w-[80px]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-border/30">
                                    {loading ? (
                                        <tr>
                                            <td className="p-12 text-center text-muted-foreground" colSpan={columns.length + 1}>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                                                    <span className="text-xs">Chargement...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : items.length === 0 ? (
                                        <tr>
                                            <td className="p-12 text-center text-muted-foreground" colSpan={columns.length + 1}>
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="font-medium">Aucun mouvement trouvé</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        items.map((item) => (
                                            <tr key={item.id} className="group hover:bg-muted/30 transition-colors">
                                                {columns.map((c) => (
                                                    <td key={c.key} className="p-4 align-middle font-medium text-foreground">
                                                        <div className="truncate max-w-[200px]">
                                                            {cellValue(item, c.key)}
                                                        </div>
                                                    </td>
                                                ))}
                                                <td className="p-4">
                                                    <div className="flex justify-end">
                                                        <StockMovementActionsMenu
                                                            onEdit={() => {
                                                                setSelected(item);
                                                                setEditOpen(true);
                                                            }}
                                                            onDelete={() => {
                                                                setSelected(item);
                                                                setDeleteOpen(true);
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-4 py-4 border-t border-border/40 bg-muted/5">
                            <div className="text-xs text-muted-foreground">
                                <span>Page </span>
                                <span className="font-medium text-foreground">{currentPage}</span>
                                <span> / </span>
                                <span className="font-medium text-foreground">{lastPage}</span>
                                {meta.total !== undefined && <span className="ml-1">({meta.total} total)</span>}
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={loading || currentPage <= 1}
                                    className="h-8 px-2 text-xs"
                                >
                                    Précédent
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={loading || currentPage >= lastPage}
                                    className="h-8 px-2 text-xs"
                                >
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    </div>
                </ErrorBoundary>
            </div>

            {/* ClientOnly to isolate modals from hydration issues */}
            <ClientOnly>
                <EditStockMovement
                    movement={selected}
                    open={editOpen}
                    onOpenChange={(v) => setEditOpen(v)}
                    onUpdate={handleUpdate}
                    updating={updating}
                />

                <DeleteModal
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    onConfirm={handleDeleteConfirm}
                    loading={deleting}
                />
            </ClientOnly>
        </AppLayout>
    );
}
