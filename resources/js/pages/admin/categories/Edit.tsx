// resources/js/pages/admin/categories/Edit.tsx

import { useEffect, useState } from "react";
import type { Category } from "./types";
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
import { Save } from "lucide-react";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  category: Category | null;
  onUpdated: () => Promise<void> | void;
  updateApi: (id: number, fd: FormData) => Promise<Response>;
};

export default function EditCategory({
  open,
  onOpenChange,
  category,
  onUpdated,
  updateApi,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  const [form, setForm] = useState({ name: "", slug: "" });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name ?? "",
        slug: category.slug ?? "",
      });
      setError(null);
      setFormErrors({});
    }
  }, [category]);

  async function submit() {
    if (!category) return;

    setSaving(true);
    setError(null);
    setFormErrors({});

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      if (form.slug.trim()) fd.append("slug", form.slug.trim());

      const res = await updateApi(category.id, fd);

      if (res.status === 422) {
        const json = await res.json();
        setFormErrors(json?.errors ?? {});
        return;
      }

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Erreur HTTP ${res.status}`);
      }

      onOpenChange(false);
      toast.success(`Catégorie "${form.name}" modifiée avec succès !`, {
        position: "bottom-right",
        autoClose: 3000,
      });
      await onUpdated();
    } catch (e: any) {
      const errorMsg = e?.message ?? "Erreur modification catégorie";
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "bottom-right",
        autoClose: 4000,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-border/40 bg-background/80 backdrop-blur-xl shadow-2xl duration-200">
        <DialogHeader className="pb-4 border-b border-border/40">
          <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
            Modifier la catégorie
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit_name" className="text-sm font-medium text-foreground">Nom <span className="text-red-500">*</span></Label>
            <Input
              id="edit_name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
            {formErrors.name?.[0] && (
              <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                {formErrors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_slug" className="text-sm font-medium text-foreground">Slug</Label>
            <Input
              id="edit_slug"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
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
            disabled={saving}
            className="h-10 px-4 rounded-lg hover:bg-muted/50"
          >
            Annuler
          </Button>
          <Button
            onClick={submit}
            disabled={saving || !form.name.trim()}
            className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 rounded-lg"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Sauvegarde..." : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
