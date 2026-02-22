import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "react-toastify";
import { ChevronLeft, Save, Upload, X } from "lucide-react";
import axios from "axios";
import { createProductApi } from "./api";
import { supabase } from "@/lib/supabase";

export default function AdminProductCreate() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const [categories, setCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: "",
        sku: "",
        description: "",
        price: "",      // purchase_price
        sale_price: "",
        min_quantity: "",
        unit: "",
        category_id: "",
        sub_category_id: "",
        image: null as File | null,
    });

    useEffect(() => {
        // Load options
        axios.get("/admin/api/categories?perPage=100")
            .then(res => setCategories(res.data.data || res.data))
            .catch(err => console.error(err));

        axios.get("/admin/api/sub-categories?perPage=100")
            .then(res => setSubCategories(res.data.data || res.data))
            .catch(err => console.error(err));
    }, []);

    const filteredSubCats = form.category_id
        ? subCategories.filter(s => String(s.category_id) === String(form.category_id))
        : [];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ ...form, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setForm({ ...form, image: null });
        setImagePreview(null);
    };

    async function uploadImageToSupabase(file: File): Promise<string | null> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('image')
                .upload(filePath, file);

            if (uploadError) {
                console.error("Supabase upload error:", uploadError);
                toast.error("Échec du téléchargement de l'image (Supabase)");
                return null;
            }

            const { data } = supabase.storage
                .from('image')
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
            if (form.min_quantity) fd.append("min_quantity", form.min_quantity);
            if (form.unit) fd.append("unit", form.unit);
            if (form.category_id) fd.append("category_id", form.category_id);
            if (form.sub_category_id) fd.append("sub_category_id", form.sub_category_id);

            if (imageUrl) {
                fd.append("image", imageUrl);
            }

            await createProductApi(fd);
            toast.success("Produit créé avec succès");
            router.visit("/admin/products");
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
        <AppLayout
            breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Produits", href: "/admin/products" },
                { title: "Nouveau", href: "/admin/products/create" },
            ]}
        >
            <Head title="Nouveau produit" />

            <div className="p-6 max-w-7xl mx-auto space-y-8">
                {/* Modern Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-border/40">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            asChild
                            className="h-10 w-10 rounded-lg border-border/50 hover:bg-muted/50 transition-colors"
                        >
                            <Link href="/admin/products">
                                <ChevronLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                Nouveau produit
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">Créez un produit avec style et précision</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            asChild
                            className="rounded-lg h-10 hover:bg-muted/50"
                        >
                            <Link href="/admin/products">Annuler</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            onClick={submit}
                            className="rounded-lg h-10 bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px] shadow-[0_0_15px_-3px_rgba(var(--primary),0.3)] transition-all duration-200 hover:shadow-[0_0_20px_-3px_rgba(var(--primary),0.4)]"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {loading ? "Enregistrement..." : "Enregistrer"}
                        </Button>
                    </div>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Basic Info Card */}
                        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80">
                            <div className="flex flex-col space-y-1.5 p-6 border-b border-border/40">
                                <h3 className="text-lg font-semibold leading-none tracking-tight">Détails du produit</h3>
                                <p className="text-sm text-muted-foreground">Informations essentielles pour identifier le produit</p>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                                        Nom du produit <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        placeholder="Ex: iPhone 15 Pro Max"
                                        className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    {errors.name && <p className="text-sm text-red-500 font-medium flex items-center gap-1">{errors.name[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-medium text-foreground">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={form.description}
                                        onChange={e => setForm({ ...form, description: e.target.value })}
                                        placeholder="Description détaillée du produit..."
                                        className="min-h-[120px] rounded-lg resize-none border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80">
                            <div className="flex flex-col space-y-1.5 p-6 border-b border-border/40">
                                <h3 className="text-lg font-semibold leading-none tracking-tight">Prix & Stock</h3>
                                <p className="text-sm text-muted-foreground">Définissez la tarification et les seuils d'alerte</p>
                            </div>
                            <div className="p-6 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="price" className="text-sm font-medium text-foreground">Prix d'achat</Label>
                                        <div className="relative">
                                            <Input
                                                id="price"
                                                type="number"
                                                className="h-11 rounded-lg pr-16 border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                                value={form.price}
                                                onChange={e => setForm({ ...form, price: e.target.value })}
                                                placeholder="0.00"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                                                F CFA
                                            </span>
                                        </div>
                                        {errors.purchase_price && <p className="text-sm text-red-500 font-medium">{errors.purchase_price[0]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sale_price" className="text-sm font-medium text-foreground">Prix de vente</Label>
                                        <div className="relative">
                                            <Input
                                                id="sale_price"
                                                type="number"
                                                className="h-11 rounded-lg pr-16 border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                                value={form.sale_price}
                                                onChange={e => setForm({ ...form, sale_price: e.target.value })}
                                                placeholder="0.00"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                                                F CFA
                                            </span>
                                        </div>
                                        {errors.sale_price && <p className="text-sm text-red-500 font-medium">{errors.sale_price[0]}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="min_quantity" className="text-sm font-medium text-foreground">Seuil d'alerte</Label>
                                        <Input
                                            id="min_quantity"
                                            type="number"
                                            className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                            value={form.min_quantity}
                                            onChange={e => setForm({ ...form, min_quantity: e.target.value })}
                                            placeholder="Ex: 5"
                                        />
                                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                            Notification automatique au seuil
                                        </p>
                                        {errors.min_quantity && <p className="text-sm text-red-500 font-medium">{errors.min_quantity[0]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="unit" className="text-sm font-medium text-foreground">Unité de mesure</Label>
                                        <select
                                            className="flex h-11 w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                            id="unit"
                                            value={form.unit}
                                            onChange={e => setForm({ ...form, unit: e.target.value })}
                                        >
                                            <option value="">Sélectionner</option>
                                            <option value="Pièce">Pièce</option>
                                            <option value="Carton">Carton</option>
                                            <option value="Boîte">Boîte</option>
                                            <option value="Flacon">Flacon</option>
                                            <option value="Mètre">Mètre</option>
                                            <option value="Kg">Kilogramme (kg)</option>
                                            <option value="Litre">Litre (L)</option>
                                            <option value="Paquet">Paquet</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Image Upload Card */}
                        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80">
                            <div className="flex flex-col space-y-1.5 p-6 border-b border-border/40">
                                <h3 className="text-lg font-semibold leading-none tracking-tight">Image</h3>
                            </div>
                            <div className="p-6">
                                <div className="relative">
                                    <div className="relative border-2 border-dashed border-border/50 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] hover:bg-muted/30 hover:border-primary/50 transition-all duration-200 group">
                                        {imagePreview ? (
                                            <>
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="max-h-[180px] w-auto object-contain rounded-md shadow-sm"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={removeImage}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </>
                                        ) : (
                                            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-4 text-center w-full">
                                                <div className="p-3 rounded-full bg-primary/10 group-hover:scale-110 transition-transform duration-200">
                                                    <Upload className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium block text-foreground">
                                                        Cliquez pour ajouter une image
                                                    </span>
                                                    <span className="text-xs text-muted-foreground mt-1 block">
                                                        JPG, PNG jusqu'à 2MB
                                                    </span>
                                                </div>
                                            </label>
                                        )}
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                                {errors.image && <p className="text-sm text-red-500 font-medium mt-3">{errors.image[0]}</p>}
                            </div>
                        </div>

                        {/* Organization Card */}
                        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80">
                            <div className="flex flex-col space-y-1.5 p-6 border-b border-border/40">
                                <h3 className="text-lg font-semibold leading-none tracking-tight">Organisation</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-foreground">Catégorie</Label>
                                    <select
                                        className="flex h-11 w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        value={form.category_id}
                                        onChange={e => setForm({ ...form, category_id: e.target.value, sub_category_id: "" })}
                                    >
                                        <option value="">Sélectionner une catégorie</option>
                                        {categories.map((c: any) => (
                                            <option key={c.id} value={String(c.id)}>{c.name}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-sm text-red-500 font-medium">{errors.category_id[0]}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-foreground">Sous-catégorie</Label>
                                    <select
                                        className="flex h-11 w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        value={form.sub_category_id}
                                        onChange={e => setForm({ ...form, sub_category_id: e.target.value })}
                                        disabled={!form.category_id}
                                    >
                                        <option value="">Sélectionner une sous-catégorie</option>
                                        {filteredSubCats.map((s: any) => (
                                            <option key={s.id} value={String(s.id)}>{s.name}</option>
                                        ))}
                                    </select>
                                    {errors.sub_category_id && <p className="text-sm text-red-500 font-medium">{errors.sub_category_id[0]}</p>}
                                </div>

                                <div className="space-y-2 pt-4 border-t border-border/40">
                                    <Label htmlFor="sku" className="text-sm font-medium text-foreground">Code SKU</Label>
                                    <Input
                                        id="sku"
                                        value={form.sku}
                                        onChange={e => setForm({ ...form, sku: e.target.value })}
                                        placeholder="Généré automatiquement"
                                        className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    {errors.sku && <p className="text-sm text-red-500 font-medium">{errors.sku[0]}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
