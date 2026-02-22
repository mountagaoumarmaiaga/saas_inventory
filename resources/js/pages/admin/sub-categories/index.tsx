// resources/js/pages/admin/sub-categories/index.tsx

import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { SubCategory, PaginationMeta } from "./types";
import { fetchSubCategories, normalizeListResponse, deleteSubCategoryApi } from "./api";

import CreateSubCategory from "./Create";
import EditSubCategory from "./Edit";
import DeleteModal from "./delete-modal";
import RowActionsMenu from "./dropdown-menu";

export default function AdminSubCategoriesIndex() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<SubCategory[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({});
  const [error, setError] = useState<string | null>(null);

  // filters
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  // edit
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<SubCategory | null>(null);

  // delete
  const [delOpen, setDelOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toDelete, setToDelete] = useState<SubCategory | null>(null);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    params.set("page", String(page));
    params.set("perPage", String(perPage));
    return params.toString();
  }, [q, page, perPage]);

  async function reload() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchSubCategories({ q, page, perPage });

      if (!res.ok) throw new Error(res.text || `Erreur HTTP ${res.status}`);

      const normalized = normalizeListResponse<SubCategory>(res.json);
      setItems(normalized.items);
      setMeta(normalized.meta);
    } catch (e: any) {
      setError(e?.message ?? "Erreur chargement sous-catégories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    setError(null);

    try {
      const res = await deleteSubCategoryApi(toDelete.id);
      if (!res.ok) throw new Error(res.text || "Erreur suppression");

      setDelOpen(false);
      setToDelete(null);
      await reload();
    } catch (e: any) {
      setError(e?.message ?? "Erreur suppression");
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
        { title: "Sous-catégories", href: "/admin/sub-categories" },
      ]}
    >
      <Head title="Sous-catégories (Admin)" />

      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Sous-catégories
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gestion des sous-classes de produits
            </p>
          </div>

          <div className="flex gap-3">
            <div className="relative group">
              <Input
                value={q}
                onChange={(e) => {
                  setPage(1);
                  setQ(e.target.value);
                }}
                placeholder="Rechercher..."
                className="w-[280px] h-10 rounded-lg border-border/50 bg-background/50 focus:bg-background transition-all duration-200"
              />
            </div>

            <CreateSubCategory onCreated={reload} />
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
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Nom</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Catégorie</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Slug</th>
                  <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px] w-[80px]">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/30">
                {loading ? (
                  <tr>
                    <td className="p-12 text-center text-muted-foreground" colSpan={4}>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        <span className="text-xs">Chargement...</span>
                      </div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td className="p-12 text-center text-muted-foreground" colSpan={4}>
                      <div className="flex flex-col items-center gap-2">
                        <span className="font-medium">Aucune sous-catégorie</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((s) => (
                    <tr key={s.id} className="group hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-foreground">{s.name}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-600 border border-blue-500/20">
                          {s.category?.name ?? `#${s.category_id}`}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded border border-border/50">
                          {s.slug ?? "-"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <RowActionsMenu
                          onEdit={() => {
                            setSelected(s);
                            setEditOpen(true);
                          }}
                          onDelete={() => {
                            setToDelete(s);
                            setDelOpen(true);
                          }}
                        />
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
              Page <span className="font-medium text-foreground">{currentPage}</span> / <span className="font-medium text-foreground">{lastPage}</span>
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

        <EditSubCategory
          open={editOpen}
          onOpenChange={(v) => {
            setEditOpen(v);
            if (!v) setSelected(null);
          }}
          subCategory={selected}
          onUpdated={reload}
        />

        <DeleteModal
          open={delOpen}
          onOpenChange={(v) => {
            setDelOpen(v);
            if (!v) setToDelete(null);
          }}
          title="Supprimer la sous-catégorie"
          description={
            toDelete ? `Supprimer "${toDelete.name}" ? Cette action est irréversible.` : ""
          }
          loading={deleting}
          onConfirm={confirmDelete}
        />
      </div>
    </AppLayout>
  );
}
