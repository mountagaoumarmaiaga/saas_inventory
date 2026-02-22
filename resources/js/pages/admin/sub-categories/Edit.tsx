// resources/js/pages/admin/sub-categories/Edit.tsx

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Category, SubCategory } from "./types";
import { fetchCategories, normalizeListResponse, updateSubCategoryApi } from "./api";
import { Save } from "lucide-react";
import { toast } from "react-toastify";

export default function EditSubCategory({
  open,
  onOpenChange,
  subCategory,
  onUpdated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  subCategory: SubCategory | null;
  onUpdated: () => Promise<void> | void;
}) {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);

  const [form, setForm] = useState({
    category_id: "",
    name: "",
    slug: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  async function loadCategories() {
    setLoadingCats(true);
    try {
      const res = await fetchCategories({ perPage: 200 });
      if (!res.ok) {
        setError(res.text ?? "Erreur chargement catégories");
        return;
      }
      const normalized = normalizeListResponse<Category>(res.json);
      setCategories(normalized.items);
    } finally {
      setLoadingCats(false);
    }
  }

  useEffect(() => {
    if (open) {
      loadCategories();
      if (subCategory) {
        setForm({
          category_id: String(subCategory.category_id),
          name: subCategory.name,
          slug: subCategory.slug || "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, subCategory]);

  function reset() {
    setFormErrors({});
    setError(null);
  }

  async function submit() {
    if (!subCategory) return;
    setUpdating(true);
    setError(null);
    setFormErrors({});

    try {
      const res = await updateSubCategoryApi(subCategory.id, {
        category_id: form.category_id,
        name: form.name,
        slug: form.slug || undefined,
      });

      if (res.status === 422) {
        setFormErrors(res.json?.errors ?? {});
        return;
      }

      if (!res.ok) {
        throw new Error(res.text || "Erreur mise à jour");
      }

      onOpenChange(false);
      reset();
      toast.success(`Sous-catégorie "${form.name}" modifiée avec succès !`, {
        position: "bottom-right",
        autoClose: 3000,
      });
      await onUpdated();
    } catch (e: any) {
      const errorMsg = e?.message ?? "Erreur mise à jour";
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "bottom-right",
        autoClose: 4000,
      });
    } finally {
      setUpdating(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent className="sm:max-w-[500px] border-border/40 bg-background/80 backdrop-blur-xl shadow-2xl duration-200">
        <DialogHeader className="pb-4 border-b border-border/40">
          <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
            Modifier sous-catégorie
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Catégorie <span className="text-red-500">*</span></Label>
            <select
              className="flex h-11 w-full items-center justify-between rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.category_id}
              onChange={(e) => setForm((p) => ({ ...p, category_id: e.target.value }))}
              disabled={loadingCats}
            >
              <option value="">{loadingCats ? "Chargement..." : "Sélectionner une catégorie"}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {formErrors.category_id?.[0] && (
              <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                {formErrors.category_id[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-name" className="text-sm font-medium text-foreground">Nom <span className="text-red-500">*</span></Label>
            <Input
              id="edit-name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ex: Smartphones"
              className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
            {formErrors.name?.[0] && (
              <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                {formErrors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-slug" className="text-sm font-medium text-foreground">Slug (optionnel)</Label>
            <Input
              id="edit-slug"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              placeholder="ex: smartphones"
              className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm"
            />
            {formErrors.slug?.[0] && (
              <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                {formErrors.slug[0]}
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive font-medium">
              {error}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 pt-4 border-t border-border/40">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={updating}
            className="h-10 px-4 rounded-lg hover:bg-muted/50"
          >
            Annuler
          </Button>
          <Button
            onClick={submit}
            disabled={updating || !form.name.trim() || !form.category_id}
            className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 rounded-lg"
          >
            <Save className="mr-2 h-4 w-4" />
            {updating ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
