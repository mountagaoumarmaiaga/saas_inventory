// resources/js/pages/admin/categories/index.tsx

import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Category, PaginationMeta } from "./types";
import {
  fetchCategories,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "./api";

import CreateCategory from "./Create";
import EditCategory from "./Edit";
import DeleteCategoryModal from "./delete-modal";
import CategoryActionsMenu from "./dropdown-menu";

export default function AdminCategoriesIndex() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Category[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({});
  const [error, setError] = useState<string | null>(null);

  // filters
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  // edit/delete states
  const [editOpen, setEditOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);

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
      const result = await fetchCategories(queryString);
      setItems(result.items);
      setMeta(result.meta);
    } catch (e: any) {
      setError(e?.message ?? "Erreur chargement catégories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  const currentPage = meta.current_page ?? page;
  const lastPage = meta.last_page ?? 1;

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Admin", href: "/admin/dashboard" },
        { title: "Catégories", href: "/admin/categories" },
      ]}
    >
      <Head title="Catégories (Admin)" />

      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Catégories
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gestion de la structure du catalogue
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

            <CreateCategory onCreated={reload} createApi={createCategoryApi} />
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
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Slug</th>
                  <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground uppercase tracking-wider text-[11px] w-[80px]">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/30">
                {loading ? (
                  <tr>
                    <td className="p-12 text-center text-muted-foreground" colSpan={3}>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        <span className="text-xs">Chargement...</span>
                      </div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td className="p-12 text-center text-muted-foreground" colSpan={3}>
                      <div className="flex flex-col items-center gap-2">
                        <span className="font-medium">Aucune catégorie</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((c) => (
                    <tr key={c.id} className="group hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-foreground">{c.name}</td>
                      <td className="p-4">
                        <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded border border-border/50">
                          {c.slug ?? "-"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <CategoryActionsMenu
                          category={c}
                          onEdit={(cat) => {
                            setEditCategory(cat);
                            setEditOpen(true);
                          }}
                          onDelete={(cat) => {
                            setDeleteCategory(cat);
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
      </div>

      {/* Edit */}
      <EditCategory
        open={editOpen}
        onOpenChange={(v) => {
          setEditOpen(v);
          if (!v) setEditCategory(null);
        }}
        category={editCategory}
        updateApi={updateCategoryApi}
        onUpdated={reload}
      />

      {/* Delete */}
      <DeleteCategoryModal
        open={deleteOpen}
        onOpenChange={(v) => {
          setDeleteOpen(v);
          if (!v) setDeleteCategory(null);
        }}
        category={deleteCategory}
        deleteApi={deleteCategoryApi}
        onDeleted={reload}
      />
    </AppLayout>
  );
}
