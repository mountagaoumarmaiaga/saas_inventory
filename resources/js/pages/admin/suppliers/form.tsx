import { useState, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { ArrowLeft, Save, Building2, Phone, Mail, MapPin, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import type { Supplier, SupplierForm } from "./types";
import { createSupplierApi, getSupplierApi, updateSupplierApi } from "./api";

export default function SupplierFormPage({ id }: { id?: number }) {
    const isEditing = !!id;
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const [form, setForm] = useState<SupplierForm>({
        name: "",
        email: "",
        phone: "",
        address: "",
        tax_number: "",
        notes: "",
    });

    useEffect(() => {
        if (isEditing) {
            loadSupplier();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function loadSupplier() {
        try {
            setLoading(true);
            const data = await getSupplierApi(id!);
            setForm({
                name: data.name,
                email: data.email || "",
                phone: data.phone || "",
                address: data.address || "",
                tax_number: data.tax_number || "",
                notes: data.notes || "",
            });
        } catch (e: any) {
            toast.error(e.message || "Erreur de chargement");
            router.visit("/admin/suppliers");
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        try {
            const res = isEditing
                ? await updateSupplierApi(id!, form)
                : await createSupplierApi(form);

            if (!res.ok) {
                setErrors(res.errors);
                toast.error("Veuillez corriger les erreurs.");
            } else {
                toast.success(isEditing ? "Fournisseur mis à jour !" : "Fournisseur créé !");
                router.visit("/admin/suppliers");
            }
        } catch (error: any) {
            toast.error(error.message || "Erreur sauvegarde");
        } finally {
            setSaving(false);
        }
    }

    function handleChange(field: keyof SupplierForm, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const newErrs = { ...prev };
                delete newErrs[field];
                return newErrs;
            });
        }
    }

    if (loading) {
        return (
            <AppLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "/admin/dashboard" },
                { title: "Fournisseurs", href: "/admin/suppliers" },
                { title: isEditing ? "Modifier" : "Nouveau", href: "#" },
            ]}
        >
            <Head title={isEditing ? "Modifier Fournisseur" : "Nouveau Fournisseur"} />

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-muted">
                        <Link href="/admin/suppliers">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            {isEditing ? "Modifier le fournisseur" : "Nouveau fournisseur"}
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            {isEditing ? "Mettez à jour les informations du fournisseur." : "Ajoutez un nouveau fournisseur à votre carnet d'adresses."}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">

                        {/* Infos Principales */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                                <Building2 className="h-5 w-5 text-primary" />
                                Informations Principales
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-foreground">Nom / Raison Sociale <span className="text-destructive">*</span></Label>
                                    <Input
                                        id="name"
                                        value={form.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        placeholder="Ex: Fournisseur XYZ"
                                        className={errors.name ? "border-destructive focus-visible:ring-destructive/20" : ""}
                                    />
                                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tax_number" className="text-foreground flex items-center gap-2">
                                        NIF / STAT / RCCM
                                        <span className="text-xs text-muted-foreground font-normal">(Optionnel)</span>
                                    </Label>
                                    <Input
                                        id="tax_number"
                                        value={form.tax_number}
                                        onChange={(e) => handleChange("tax_number", e.target.value)}
                                        placeholder="Ex: 123456789"
                                        className={errors.tax_number ? "border-destructive focus-visible:ring-destructive/20" : ""}
                                    />
                                    {errors.tax_number && <p className="text-xs text-destructive mt-1">{errors.tax_number[0]}</p>}
                                </div>
                            </div>
                        </div>

                        <hr className="border-border" />

                        {/* Contact */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                                <Phone className="h-5 w-5 text-primary" />
                                Coordonnées
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" /> Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        placeholder="contact@fournisseur.com"
                                        className={errors.email ? "border-destructive focus-visible:ring-destructive/20" : ""}
                                    />
                                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" /> Téléphone
                                    </Label>
                                    <Input
                                        id="phone"
                                        value={form.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        placeholder="+221 77 000 00 00"
                                        className={errors.phone ? "border-destructive focus-visible:ring-destructive/20" : ""}
                                    />
                                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone[0]}</p>}
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="address" className="text-foreground flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" /> Adresse Postale
                                    </Label>
                                    <Textarea
                                        id="address"
                                        value={form.address}
                                        onChange={(e) => handleChange("address", e.target.value)}
                                        placeholder="Adresse complète du fournisseur"
                                        className={`resize-none min-h-[80px] ${errors.address ? "border-destructive focus-visible:ring-destructive/20" : ""}`}
                                    />
                                    {errors.address && <p className="text-xs text-destructive mt-1">{errors.address[0]}</p>}
                                </div>
                            </div>
                        </div>

                        <hr className="border-border" />

                        {/* Notes */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                                <FileText className="h-5 w-5 text-primary" />
                                Notes & Informations Complémentaires
                            </h3>
                            <div className="space-y-2">
                                <Label htmlFor="notes" className="text-foreground">Remarques internes</Label>
                                <Textarea
                                    id="notes"
                                    value={form.notes}
                                    onChange={(e) => handleChange("notes", e.target.value)}
                                    placeholder="Conditions de paiement particulières, délais de livraison habituels, contacts spécifiques..."
                                    className={`resize-none min-h-[120px] ${errors.notes ? "border-destructive focus-visible:ring-destructive/20" : ""}`}
                                />
                                {errors.notes && <p className="text-xs text-destructive mt-1">{errors.notes[0]}</p>}
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" asChild disabled={saving}>
                            <Link href="/admin/suppliers">
                                Annuler
                            </Link>
                        </Button>
                        <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            {saving ? (
                                <>
                                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                    Sauvegarde...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    {isEditing ? "Mettre à jour" : "Créer le fournisseur"}
                                </>
                            )}
                        </Button>
                    </div>
                </form>

            </div>
        </AppLayout>
    );
}
