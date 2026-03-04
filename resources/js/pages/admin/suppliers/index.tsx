import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Search, Plus, Pencil, Trash2, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import type { Supplier, PaginationMeta } from "./types";
import { fetchSuppliers, deleteSupplierApi } from "./api";
import DeleteSupplierModal from "./delete-modal";

export default function SuppliersIndex() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Supplier[]>([]);
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

    const [toDelete, setToDelete] = useState<Supplier | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
            const { items, meta } = await fetchSuppliers(queryString);
            setItems(items);
            setMeta(meta);
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryString]);

    function handleDeleteClick(supplier: Supplier) {
        setToDelete(supplier);
        setDeleteModalOpen(true);
    }

    async function handleDeleteConfirm() {
        if (!toDelete) return;
        setDeleting(true);
        try {
            await deleteSupplierApi(toDelete.id);
            toast.success("Fournisseur supprimé avec succès !");
            setDeleteModalOpen(false);
            setToDelete(null);
            await load();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setDeleting(false);
        }
    }

    const currentPage = meta.current_page ?? page;
    const lastPage = meta.last_page ?? 1;

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "/admin/dashboard" },
                { title: "Fournisseurs", href: "/admin/suppliers" },
            ]}
        >
            <Head title="Fournisseurs" />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Fournisseurs</h1>
                        <p className="text-muted-foreground text-sm mt-1">Gérez vos fournisseurs et vos contacts commerciaux.</p>
                    </div>

                    <Button asChild className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all">
                        <Link href="/admin/suppliers/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Fournisseur
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
                    <div className="relative w-full sm:w-96 group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                            <Search className="h-4 w-4" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Rechercher par nom, email..."
                            className="pl-10 h-10 bg-background border-input focus:ring-2 focus:ring-primary/20 transition-all rounded-lg w-full"
                            value={q}
                            onChange={(e) => {
                                setQ(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-sm flex items-center gap-2">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10 border-b-2 border-indigo-500/20">
                                <tr>
                                    <th className="px-6 py-4">Nom</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Adresse</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {loading && items.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                            <div className="flex justify-center items-center gap-2">
                                                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                                Chargement...
                                            </div>
                                        </td>
                                    </tr>
                                ) : items.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                                                    <Building2 className="h-6 w-6 opacity-50" />
                                                </div>
                                                <p className="font-medium text-foreground">Aucun fournisseur trouvé</p>
                                                <p className="text-sm">Ajoutez un fournisseur pour commencer à gérer vos achats.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((supplier) => (
                                        <tr key={supplier.id}  className="group hover:bg-gradient-to-r hover:from-indigo-500/5 hover:to-blue-500/5 transition-all duration-300 hover:bg-muted/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-foreground">{supplier.name}</div>
                                                {supplier.tax_number && (
                                                    <div className="text-xs text-muted-foreground mt-0.5">NIF: {supplier.tax_number}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    {supplier.email && <div className="text-blue-600 hover:underline">{supplier.email}</div>}
                                                    {supplier.phone && <div className="text-muted-foreground">{supplier.phone}</div>}
                                                    {!supplier.email && !supplier.phone && <span className="text-muted-foreground italic">Non renseigné</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground max-w-xs truncate">
                                                {supplier.address || <span className="italic">Non renseignée</span>}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10">
                                                        <Link href={`/admin/suppliers/${supplier.id}/edit`}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleDeleteClick(supplier)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {!loading && items.length > 0 && (
                        <div className="flex items-center justify-between px-6 py-4 bg-muted/20 border-t border-border">
                            <div className="text-sm text-muted-foreground">
                                Affichage de <span className="font-medium text-foreground">{(currentPage - 1) * perPage + 1}</span> à <span className="font-medium text-foreground">{Math.min(currentPage * perPage, meta.total)}</span> sur <span className="font-medium text-foreground">{meta.total}</span> résultats
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={loading || currentPage <= 1}
                                    className="h-8 shadow-sm"
                                >
                                    Précédent
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={loading || currentPage >= lastPage}
                                    className="h-8 shadow-sm"
                                >
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <DeleteSupplierModal
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                name={toDelete?.name ?? ""}
                onConfirm={handleDeleteConfirm}
                loading={deleting}
            />
        </AppLayout>
    );
}
