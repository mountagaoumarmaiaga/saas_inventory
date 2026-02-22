import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "react-toastify";
import type { Product } from "./types";
import { deleteProductApi } from "./api"; // Updated import

interface DeleteProductModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: Product | null;
    onDeleted: () => void;
}

export default function DeleteProductModal({
    open,
    onOpenChange,
    product,
    onDeleted,
}: DeleteProductModalProps) {
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        if (!product) return;
        setLoading(true);
        try {
            await deleteProductApi(product.id); // Updated API call
            toast.success(`Produit "${product.name}" supprimé`);
            onDeleted();
            onOpenChange(false);
        } catch (e) {
            toast.error("Erreur lors de la suppression");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action est irréversible. Le produit{" "}
                        <span className="font-semibold text-foreground">
                            {product?.name}
                        </span>{" "}
                        sera supprimé définitivement.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        disabled={loading}
                    >
                        {loading ? "Suppression..." : "Supprimer"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
