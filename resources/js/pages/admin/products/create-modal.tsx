import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { ChevronLeft, Save, Loader2 } from "lucide-react";
import axios from "axios";
import { createProductApi } from "./api";
import { supabase } from "@/lib/supabase";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreated: () => void;
}

export default function CreateProductModal({ open, onOpenChange, onCreated }: Props) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const [categories, setCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);

    const [form, setForm] = useState({
        name: "",
        sku: "",
        description: "",
        price: "",      // purchase_price
        sale_price: "",
        quantity: "",
        min_quantity: "",
        unit: "",
        category_id: "",
        sub_category_id: "",
        image: null as File | null,
    });

    useEffect(() => {
        if (open) {
            // Load options when modal opens
            axios.get("/admin/api/categories?perPage=100")
                .then(res => setCategories(res.data.data || res.data))
                .catch(err => console.error(err));

            axios.get("/admin/api/sub-categories?perPage=100")
                .then(res => setSubCategories(res.data.data || res.data))
                .catch(err => console.error(err));
        }
    }, [open]);

    const filteredSubCats = form.category_id
        ? subCategories.filter(s => String(s.category_id) === String(form.category_id))
        : [];

    async function uploadImageToSupabase(file: File): Promise<string | null> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(filePath, file);

            if (uploadError) {
                console.error("Supabase upload error:", uploadError);
                toast.error("Échec du téléchargement de l'image (Supabase)");
                return null;
            }

            const { data } = supabase.storage
                .from('products')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (err) {
            console.error("Unexpected upload error:", err);
            return null;
        }
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            let imageUrl: string | null = null;

            if (form.image) {
                imageUrl = await uploadImageToSupabase(form.image);
                if (!imageUrl) {
                    setLoading(false);
                    return;
                }
            }

            const fd = new FormData();
            fd.append("name", form.name);
            if (form.sku) fd.append("sku", form.sku);
            if (form.description) fd.append("description", form.description);
            if (form.price) fd.append("purchase_price", form.price);
            if (form.sale_price) fd.append("sale_price", form.sale_price);
            if (form.quantity) fd.append("quantity", form.quantity);
            if (form.min_quantity) fd.append("min_quantity", form.min_quantity);
            if (form.unit) fd.append("unit", form.unit);
            if (form.category_id) fd.append("category_id", form.category_id);
            if (form.sub_category_id) fd.append("sub_category_id", form.sub_category_id);

            if (imageUrl) {
                fd.append("image", imageUrl);
            }

            await createProductApi(fd);
            toast.success("Produit créé avec succès");
            onCreated();
            onOpenChange(false);

            setForm({
                name: "",
                sku: "",
                description: "",
                price: "",
                sale_price: "",
                quantity: "",
                min_quantity: "",
                unit: "",
                category_id: "",
                sub_category_id: "",
                image: null,
            });
        } catch (e: any) {
            if (e?.response?.status === 422) {
                setErrors(e.response.data.errors);
                toast.error("Veuillez corriger les erreurs");
            } else {
                toast.error(e.message || "Erreur lors de la création");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Nouveau produit</DialogTitle>
                    <DialogDescription>
                        Ajouter un nouveau produit au catalogue.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-6 py-4">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* General Info */}
                        <div className="space-y-4 md:col-span-2">
                            <h3 className="font-semibold text-sm text-foreground">Informations générales</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Nom du produit *</Label>
                                    <Input
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        placeholder="Ex: iPhone 15 Pro"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>SKU (Code barre)</Label>
                                    <Input
                                        value={form.sku}
                                        onChange={e => setForm({ ...form, sku: e.target.value })}
                                        placeholder="Ex: IPH-15-PRO-256"
                                    />
                                    {errors.sku && <p className="text-sm text-red-500">{errors.sku[0]}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    placeholder="Description détaillée du produit..."
                                    className="resize-none min-h-[80px]"
                                />
                            </div>
                        </div>

                        {/* Categorization */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm text-foreground">Catégorisation</h3>
                            <div className="space-y-2">
                                <Label>Catégorie</Label>
                                <select
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    value={form.category_id}
                                    onChange={e => setForm({ ...form, category_id: e.target.value, sub_category_id: "" })}
                                >
                                    <option value="">Sélectionner une catégorie</option>
                                    {categories.map((c: any) => (
                                        <option key={c.id} value={String(c.id)}>{c.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-sm text-red-500">{errors.category_id[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Sous-catégorie</Label>
                                <select
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    value={form.sub_category_id}
                                    onChange={e => setForm({ ...form, sub_category_id: e.target.value })}
                                    disabled={!form.category_id}
                                >
                                    <option value="">Sélectionner une sous-catégorie</option>
                                    {filteredSubCats.map((s: any) => (
                                        <option key={s.id} value={String(s.id)}>{s.name}</option>
                                    ))}
                                </select>
                                {errors.sub_category_id && <p className="text-sm text-red-500">{errors.sub_category_id[0]}</p>}
                            </div>
                        </div>

                        {/* Pricing & Stock */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm text-foreground">Prix & Stock</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Prix d'achat</Label>
                                    <Input
                                        type="number"
                                        value={form.price}
                                        onChange={e => setForm({ ...form, price: e.target.value })}
                                        placeholder="0.00"
                                    />
                                    {errors.purchase_price && <p className="text-sm text-red-500">{errors.purchase_price[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Prix de vente</Label>
                                    <Input
                                        type="number"
                                        value={form.sale_price}
                                        onChange={e => setForm({ ...form, sale_price: e.target.value })}
                                        placeholder="0.00"
                                    />
                                    {errors.sale_price && <p className="text-sm text-red-500">{errors.sale_price[0]}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Stock initial</Label>
                                    <Input
                                        type="number"
                                        value={form.quantity}
                                        onChange={e => setForm({ ...form, quantity: e.target.value })}
                                        placeholder="0"
                                    />
                                    {errors.quantity && <p className="text-sm text-red-500">{errors.quantity[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Stock min.</Label>
                                    <Input
                                        type="number"
                                        value={form.min_quantity}
                                        onChange={e => setForm({ ...form, min_quantity: e.target.value })}
                                        placeholder="5"
                                    />
                                    {errors.min_quantity && <p className="text-sm text-red-500">{errors.min_quantity[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Unité</Label>
                                    <Input
                                        value={form.unit}
                                        onChange={e => setForm({ ...form, unit: e.target.value })}
                                        placeholder="Ex: pce"
                                    />
                                    {errors.unit && <p className="text-sm text-red-500">{errors.unit[0]}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="space-y-4 md:col-span-2">
                            <h3 className="font-semibold text-sm text-foreground">Image</h3>
                            <div className="space-y-2">
                                <Label>Image du produit</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setForm({ ...form, image: e.target.files?.[0] || null })}
                                />
                                <p className="text-xs text-muted-foreground">Formats acceptés: JPG, PNG. Max 2Mo.</p>
                                {errors.image && <p className="text-sm text-red-500">{errors.image[0]}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Enregistrer le produit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
