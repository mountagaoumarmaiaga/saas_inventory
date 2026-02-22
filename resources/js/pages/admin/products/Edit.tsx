import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { ChevronLeft, Save, Loader2, X, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { updateProductApi, fetchProductApi } from "./api";

interface Props {
    id: number;
}

export default function AdminProductEdit({ id }: Props) {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const [categories, setCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [form, setForm] = useState({
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
        image: null as File | null,
        current_image_url: null as string | null,
    });

    useEffect(() => {
        Promise.all([
            axios.get("/admin/api/categories?perPage=100"),
            axios.get("/admin/api/sub-categories?perPage=100"),
            fetchProductApi(id)
        ]).then(([resCat, resSub, resProd]) => {
            setCategories(resCat.data.data || resCat.data);
            setSubCategories(resSub.data.data || resSub.data);

            const p = resProd.data;
            setForm({
                name: p.name || "",
                sku: p.sku || "",
                description: p.description || "",
                price: p.purchase_price ? String(p.purchase_price) : "",
                sale_price: p.sale_price ? String(p.sale_price) : "",
                quantity: String(p.quantity),
                min_quantity: p.min_quantity ? String(p.min_quantity) : "",
                unit: p.unit || "",
                category_id: p.category_id ? String(p.category_id) : "",
                sub_category_id: p.sub_category_id ? String(p.sub_category_id) : "",
                image: null,
                current_image_url: p.image_path ? (p.image_path.startsWith('http') ? p.image_path : `/storage/${p.image_path}`) : null
            });
            setFetching(false);
        }).catch(e => {
            console.error(e);
            toast.error("Erreur chargement produit");
            setFetching(false);
        });
    }, [id]);

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

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
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

            if (form.image) fd.append("image", form.image);

            // Use _method=PUT to simulate PUT request with FormData
            fd.append("_method", "PUT");

            await updateProductApi(id, fd);
            toast.success("Produit modifié avec succès");
            router.visit("/admin/products");
        } catch (e: any) {
            if (e?.response?.status === 422) {
                setErrors(e.response.data.errors);
                toast.error("Veuillez corriger les erreurs");
            } else {
                toast.error(e.message || "Erreur lors de la modification");
            }
        } finally {
            setLoading(false);
        }
    }

    if (fetching) {
        return (
            <AppLayout breadcrumbs={[]}>
                <div className="flex h-screen items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Produits", href: "/admin/products" },
                { title: "Modifier", href: `/admin/products/${id}/edit` },
            ]}
        >
            <Head title={`Modifier: ${form.name}`} />

            <div className="p-6 max-w-7xl mx-auto space-y-8">
                {/* Modern Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-border/40">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild className="h-10 w-10 rounded-lg border-border/50 hover:bg-muted/50 transition-colors">
                            <Link href="/admin/products">
                                <ChevronLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">Modifier produit</h1>
                            <p className="text-sm text-muted-foreground mt-1">Édition des informations du produit</p>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        form="edit-product-form"
                        disabled={loading}
                        className="rounded-lg h-10 bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px] shadow-[0_0_15px_-3px_rgba(var(--primary),0.3)] transition-all duration-200 hover:shadow-[0_0_20px_-3px_rgba(var(--primary),0.4)]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Enregistrement...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Enregistrer
                            </>
                        )}
                    </Button>
                </div>

                <form onSubmit={submit} id="edit-product-form" className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* General Info */}
                        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80">
                            <div className="flex flex-col space-y-1.5 p-6 border-b border-border/40">
                                <h2 className="text-lg font-semibold leading-none tracking-tight">Informations générales</h2>
                                <p className="text-sm text-muted-foreground">Détails essentiels du produit</p>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium text-foreground">Nom du produit <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="name"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="Ex: iPhone 15 Pro"
                                            className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                        {errors.name && <p className="text-sm text-red-500 font-medium">• {errors.name[0]}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sku" className="text-sm font-medium text-foreground">SKU (Code barre)</Label>
                                        <Input
                                            id="sku"
                                            value={form.sku}
                                            onChange={e => setForm({ ...form, sku: e.target.value })}
                                            placeholder="Ex: IPH-15-PRO-256"
                                            className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                        {errors.sku && <p className="text-sm text-red-500 font-medium">• {errors.sku[0]}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-medium text-foreground">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={form.description}
                                        onChange={e => setForm({ ...form, description: e.target.value })}
                                        placeholder="Description détaillée du produit..."
                                        className="resize-none min-h-[120px] rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    {errors.description && <p className="text-sm text-red-500 font-medium">• {errors.description[0]}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Stock */}
                        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80">
                            <div className="flex flex-col space-y-1.5 p-6 border-b border-border/40">
                                <h2 className="text-lg font-semibold leading-none tracking-tight">Prix & Stock</h2>
                                <p className="text-sm text-muted-foreground">Tarification et gestion des quantités</p>
                            </div>

                            <div className="p-6 space-y-8">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="price" className="text-sm font-medium text-foreground">Prix d'achat</Label>
                                        <div className="relative">
                                            <Input
                                                id="price"
                                                type="number"
                                                value={form.price}
                                                onChange={e => setForm({ ...form, price: e.target.value })}
                                                placeholder="0.00"
                                                className="h-11 rounded-lg pr-16 border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">F CFA</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sale_price" className="text-sm font-medium text-foreground">Prix de vente</Label>
                                        <div className="relative">
                                            <Input
                                                id="sale_price"
                                                type="number"
                                                value={form.sale_price}
                                                onChange={e => setForm({ ...form, sale_price: e.target.value })}
                                                placeholder="0.00"
                                                className="h-11 rounded-lg pr-16 border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">F CFA</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="min_quantity" className="text-sm font-medium text-foreground">Stock min. (Alerte)</Label>
                                        <Input
                                            id="min_quantity"
                                            type="number"
                                            value={form.min_quantity}
                                            onChange={e => setForm({ ...form, min_quantity: e.target.value })}
                                            placeholder="5"
                                            className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="unit" className="text-sm font-medium text-foreground">Unité</Label>
                                        <Input
                                            id="unit"
                                            value={form.unit}
                                            onChange={e => setForm({ ...form, unit: e.target.value })}
                                            placeholder="Ex: pce, kg, l"
                                            className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Categorization */}
                        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80">
                            <div className="flex flex-col space-y-1.5 p-6 border-b border-border/40">
                                <h2 className="text-lg font-semibold leading-none tracking-tight">Catégorisation</h2>
                                <p className="text-sm text-muted-foreground">Organisation du catalogue</p>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category_id" className="text-sm font-medium text-foreground">Catégorie</Label>
                                    <Select
                                        value={form.category_id}
                                        onValueChange={v => setForm({ ...form, category_id: v, sub_category_id: "" })}
                                    >
                                        <SelectTrigger className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                                            <SelectValue placeholder="Sélectionner une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((c: any) => (
                                                <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category_id && <p className="text-sm text-red-500 font-medium">• {errors.category_id[0]}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sub_category_id" className="text-sm font-medium text-foreground">Sous-catégorie</Label>
                                    <Select
                                        value={form.sub_category_id}
                                        onValueChange={v => setForm({ ...form, sub_category_id: v })}
                                        disabled={!form.category_id}
                                    >
                                        <SelectTrigger className="h-11 rounded-lg border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                                            <SelectValue placeholder="Sélectionner une sous-catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filteredSubCats.map((s: any) => (
                                                <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.sub_category_id && <p className="text-sm text-red-500 font-medium">• {errors.sub_category_id[0]}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80">
                            <div className="flex flex-col space-y-1.5 p-6 border-b border-border/40">
                                <h2 className="text-lg font-semibold leading-none tracking-tight">Image</h2>
                                <p className="text-sm text-muted-foreground">Visuel du produit</p>
                            </div>

                            <div className="p-6 space-y-6">
                                {form.current_image_url || imagePreview ? (
                                    <div className="relative border-2 border-dashed border-border/50 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] hover:bg-muted/30 hover:border-primary/50 transition-all duration-200 group">
                                        <img
                                            src={imagePreview || form.current_image_url || ""}
                                            alt="Product"
                                            className="max-h-[180px] w-auto object-contain rounded-md shadow-sm"
                                        />
                                        {(imagePreview || form.current_image_url) && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={removeImage}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative border-2 border-dashed border-border/50 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] hover:bg-muted/30 hover:border-primary/50 transition-all duration-200 group">
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
                                    </div>
                                )}

                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                {errors.image && <p className="text-sm text-red-500 font-medium">• {errors.image[0]}</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
