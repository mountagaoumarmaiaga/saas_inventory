import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { StockMovementForm, Product } from "./types";
import { fetchProducts } from "./api";

interface Props {
    onCreate: (data: StockMovementForm, close: () => void, setErrors: (e: any) => void) => void;
    creating: boolean;
}

const REASONS = {
    IN: ["Approvisionnement", "Retour client", "Production", "Correction inventaire (+)", "Autre (Entrée)"],
    OUT: ["Vente", "Consommation interne", "Perte", "Vol", "Dommage", "Péremption", "Retour fournisseur", "Correction inventaire (-)", "Autre (Sortie)"],
    ADJUSTMENT: ["Inventaire annuel", "Correction d'erreur", "Réévaluation", "Autre"],
};

export default function CreateStockMovement({ onCreate, creating }: Props) {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const [form, setForm] = useState<StockMovementForm>({
        product_id: 0,
        type: "IN",
        quantity: 1,
        reason: "",
        invoice_id: null,
    });

    useEffect(() => {
        if (open) {
            loadProducts();
        }
    }, [open]);

    async function loadProducts() {
        setLoadingProducts(true);
        try {
            const { items } = await fetchProducts("perPage=100"); // Load first 100 products for now
            setProducts(items);
            if (items.length > 0) {
                setForm((f) => ({ ...f, product_id: items[0].id }));
            }
        } catch (e) {
            console.error("Failed to load products", e);
        } finally {
            setLoadingProducts(false);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onCreate(form, () => setOpen(false), () => { });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_-3px_rgba(var(--primary),0.3)] transition-all duration-200 hover:shadow-[0_0_20px_-3px_rgba(var(--primary),0.4)] rounded-lg">
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="font-medium">Nouveau mouvement</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-border/40 bg-background/80 backdrop-blur-xl shadow-2xl duration-200">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="pb-4 border-b border-border/40">
                        <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
                            Ajouter un mouvement
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm">
                            Enregistrez une entrée, sortie ou un ajustement de stock.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="product" className="text-sm font-medium text-foreground">Produit <span className="text-red-500">*</span></Label>
                            {loadingProducts ? (
                                <div className="h-11 w-full rounded-lg border border-border/50 bg-background/50 flex items-center px-3 text-sm text-muted-foreground opacity-70 cursor-not-allowed">
                                    Chargement des produits...
                                </div>
                            ) : (
                                <Select
                                    value={form.product_id ? String(form.product_id) : ""}
                                    onValueChange={(val) => setForm({ ...form, product_id: Number(val) })}
                                    disabled={loadingProducts}
                                >
                                    <SelectTrigger className="h-11 w-full rounded-lg border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/20 transition-all">
                                        <SelectValue placeholder="Sélectionner un produit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {products.map((p) => (
                                            <SelectItem key={p.id} value={String(p.id)}>
                                                {p.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-sm font-medium text-foreground">Type de mouvement <span className="text-red-500">*</span></Label>
                            <Select
                                value={form.type}
                                onValueChange={(val: any) => {
                                    setForm({ ...form, type: val, reason: "" }); // Reset reason when type changes
                                }}
                            >
                                <SelectTrigger className="h-11 w-full rounded-lg border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/20 transition-all">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="IN">Entrée (+)</SelectItem>
                                    <SelectItem value="OUT">Sortie (-)</SelectItem>
                                    <SelectItem value="ADJUSTMENT">Ajustement (=)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quantity" className="text-sm font-medium text-foreground">Quantité <span className="text-red-500">*</span></Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="1"
                                value={form.quantity}
                                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                                required
                                className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reason" className="text-sm font-medium text-foreground">Raison</Label>
                            <Select
                                value={form.reason || ""}
                                onValueChange={(val) => setForm({ ...form, reason: val === "other" ? "" : val })}
                            >
                                <SelectTrigger className="h-11 w-full rounded-lg border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/20 transition-all">
                                    <SelectValue placeholder="Sélectionner une raison" />
                                </SelectTrigger>
                                <SelectContent>
                                    {REASONS[form.type as keyof typeof REASONS]?.map((r) => (
                                        <SelectItem key={r} value={r}>
                                            {r}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="gap-2 pt-4 border-t border-border/40">
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={() => setOpen(false)}
                            className="h-10 px-4 rounded-lg hover:bg-muted/50"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={creating || form.product_id === 0}
                            className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 rounded-lg"
                        >
                            {creating ? "Enregistrement..." : "Enregistrer"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
