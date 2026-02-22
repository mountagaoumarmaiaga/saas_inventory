
import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { ClientForm, fetchClient, updateClientApi } from "./api";
import { Loader2, Save } from "lucide-react";

export default function EditClient({ id }: { id: number }) {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState<ClientForm>({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchClient(id).then(data => {
            setForm({
                name: data.name,
                email: data.email || "",
                phone: data.phone || "",
                address: data.address || ""
            });
            setLoading(false);
        }).catch(e => {
            toast.error(e.message);
            router.visit("/admin/clients");
        });
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setErrors({});
        try {
            const res = await updateClientApi(id, form);
            if (!res.ok) {
                setErrors(res.errors);
                toast.error("Veuillez corriger les erreurs.");
            } else {
                toast.success("Client mis à jour !");
                router.visit("/admin/clients");
            }
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <AppLayout breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Clients", href: "/admin/clients" },
                { title: "Édition", href: "#" },
            ]}>
                <Head title="Éditer Client" />
                <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                    <div className="relative">
                        <div className="h-16 w-16 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
                    </div>
                    <p className="text-muted-foreground font-medium">Chargement du client...</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Clients", href: "/admin/clients" },
                { title: "Édition", href: "#" },
            ]}
        >
            <Head title="Éditer Client" />

            <div className="p-6 max-w-2xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Éditer Client
                </h1>

                <form onSubmit={handleSubmit}>
                    <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                        <CardHeader className="relative border-b border-white/10">
                            <CardTitle className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                Informations Client
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative space-y-6 pt-6">
                            <div className="space-y-3">
                                <Label className="text-sm font-semibold text-foreground/90">Nom *</Label>
                                <Input
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                                    placeholder="Nom du client"
                                />
                                {errors.name && <p className="text-xs text-destructive font-medium">• {errors.name}</p>}
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-semibold text-foreground/90">Email</Label>
                                <Input
                                    type="email"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                                    placeholder="email@exemple.com"
                                />
                                {errors.email && <p className="text-xs text-destructive font-medium">• {errors.email}</p>}
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-semibold text-foreground/90">Téléphone</Label>
                                <Input
                                    value={form.phone}
                                    onChange={e => setForm({ ...form, phone: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                                    placeholder="+223 XX XXX XX XX"
                                />
                                {errors.phone && <p className="text-xs text-destructive font-medium">• {errors.phone}</p>}
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-semibold text-foreground/90">Adresse</Label>
                                <Input
                                    value={form.address}
                                    onChange={e => setForm({ ...form, address: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                                    placeholder="Adresse complète"
                                />
                                {errors.address && <p className="text-xs text-destructive font-medium">• {errors.address}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit('/admin/clients')}
                            className="h-12 px-6 rounded-xl border-2 hover:bg-muted/50 transition-all duration-300"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={saving}
                            className="h-12 px-8 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:via-amber-700 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 rounded-xl disabled:opacity-50"
                        >
                            <Save className="h-5 w-5 mr-2" />
                            {saving ? "Sauvegarde..." : "Enregistrer"}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
