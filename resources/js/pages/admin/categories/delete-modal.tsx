// resources/js/pages/admin/categories/delete-modal.tsx

import type { Category } from "./types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  category: Category | null;
  onDeleted: () => Promise<void> | void;
  deleteApi: (id: number) => Promise<Response>;
};

export default function DeleteCategoryModal({
  open,
  onOpenChange,
  category,
  onDeleted,
  deleteApi,
}: Props) {
  async function confirm() {
    if (!category) return;

    try {
      const res = await deleteApi(category.id);
      if (res.ok) {
        onOpenChange(false);
        toast.success(`Catégorie "${category.name}" supprimée avec succès !`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        await onDeleted();
      } else {
        const txt = await res.text();
        throw new Error(txt || `Erreur HTTP ${res.status}`);
      }
    } catch (e: any) {
      const errorMsg = e?.message ?? "Erreur suppression";
      toast.error(errorMsg, {
        position: "bottom-right",
        autoClose: 4000,
      });
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Supprimer la catégorie</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground">
          Tu es sûr de vouloir supprimer{" "}
          <span className="font-medium text-foreground">
            {category?.name ?? ""}
          </span>{" "}
          ? Cette action est irréversible.
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={confirm}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
