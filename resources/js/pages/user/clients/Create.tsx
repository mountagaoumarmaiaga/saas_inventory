
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { ClientForm, createClientApi } from "./api";

export default function CreateClientUser() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<ClientForm>({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            const res = await createClientApi(form);
            if (!res.ok) {
                setErrors(res.errors);
                toast.error("Veuillez corriger les erreurs.");
            } else {
                toast.success("Client créé !");
                router.visit("/user/clients");
            }
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "/user/dashboard" },
                { title: "Clients", href: "/user/clients" },
                { title: "Nouveau", href: "#" },
            ]}
        >
            <Head title="Nouveau Client" />

            <div className="p-6 max-w-2xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Nouveau Client
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Ajoutez un nouveau client à votre base de données.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                        <div className="relative p-6 border-b border-white/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                            <h2 className="relative text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Informations Client</h2>
                        </div>

                        <div className="p-6 space-y-6 relative">
                            <div className="space-y-2">
                                <Label className="font-bold">Nom du Client <span className="text-orange-600">*</span></Label>
                                <Input
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                    placeholder="Ex: Entreprise SARL"
                                    className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-orange-500"
                                />
                                {errors.name && <p className="text-xs text-destructive font-medium">{errors.name}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="font-bold">Email</Label>
                                    <Input
                                        type="email"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        placeholder="contact@exemple.com"
                                        className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-orange-500"
                                    />
                                    {errors.email && <p className="text-xs text-destructive font-medium">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-bold">Téléphone</Label>
                                    <Input
                                        value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                        placeholder="+33 6 12 34 56 78"
                                        className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-orange-500"
                                    />
                                    {errors.phone && <p className="text-xs text-destructive font-medium">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold">Adresse</Label>
                                <Input
                                    value={form.address}
                                    onChange={e => setForm({ ...form, address: e.target.value })}
                                    placeholder="123 Rue de Exemple, 75000 Paris"
                                    className="h-12 rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-orange-500"
                                />
                                {errors.address && <p className="text-xs text-destructive font-medium">{errors.address}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit('/user/clients')}
                            className="h-12 px-6 rounded-xl border-white/10 hover:bg-white/5"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-12 px-8 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-orange-500/20"
                        >
                            {loading ? "Création..." : "Créer le client"}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
