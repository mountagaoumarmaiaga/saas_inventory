import AppLayout from "@/layouts/app-layout";
import { Head, useForm, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Building2, Copy, Check } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";

interface Enterprise {
    id: number;
    name: string;
    email: string;
    users_count: number;
    created_at: string;
}

interface PageProps {
    enterprises: {
        data: Enterprise[];
        links: any[];
    };
    flash: {
        success?: string;
        created_credentials?: {
            email: string;
            password: string;
            enterprise: string;
        };
    };
}

export default function EnterprisesIndex({ enterprises, flash = {} }: PageProps) {
    const [createOpen, setCreateOpen] = useState(false);
    const [credentialsOpen, setCredentialsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
    });

    // Check for flash credentials on load/update
    if (flash?.created_credentials && !credentialsOpen && !createOpen) {
        setCredentialsOpen(true);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route("super-admin.enterprises.store"), {
            onSuccess: () => {
                setCreateOpen(false);
                reset();
                setCredentialsOpen(true);
                toast.success("Entreprise créée avec succès !");
            },
        });
    }

    function copyCredentials() {
        if (!flash?.created_credentials) return;
        const text = `
Nouvelle Entreprise: ${flash.created_credentials.enterprise}
Email Admin: ${flash.created_credentials.email}
Mot de passe: ${flash.created_credentials.password}
Lien de connexion: ${window.location.origin}/login
        `.trim();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Identifiants copiés !");
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Super Admin", href: "/super-admin/dashboard" },
                { title: "Entreprises", href: "/super-admin/enterprises" },
            ]}
        >
            <Head title="Gestion des Entreprises" />

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Entreprises
                        </h1>
                        <p className="text-muted-foreground">
                            Gérer les entreprises et leurs accès.
                        </p>
                    </div>
                    <Button onClick={() => setCreateOpen(true)} className="bg-orange-600 hover:bg-orange-700 text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvelle Entreprise
                    </Button>
                </div>

                <div className="rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Email Contact</TableHead>
                                <TableHead>Utilisateurs</TableHead>
                                <TableHead>Date de création</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {enterprises.data.map((enterprise) => (
                                <TableRow key={enterprise.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-muted-foreground" />
                                            {enterprise.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{enterprise.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            {enterprise.users_count} utilisateurs
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(enterprise.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            title="Réinitialiser le mot de passe Admin"
                                            onClick={() => {
                                                if (confirm('Voulez-vous vraiment réinitialiser le mot de passe administrateur de cette entreprise ?')) {
                                                    router.post(route('super-admin.enterprises.reset-password', enterprise.id));
                                                }
                                            }}
                                        >
                                            <div className="h-4 w-4 text-orange-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                            </div>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {enterprises.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                        Aucune entreprise trouvée.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Create Client Modal */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Créer une nouvelle entreprise</DialogTitle>
                        <DialogDescription>
                            Ceci créera automatiquement un compte administrateur par défaut.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom de l'entreprise</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                                placeholder="Ma Super Entreprise"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email de contact (optionnel)</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                required
                                placeholder="contact@entreprise.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-orange-600 hover:bg-orange-700">
                                {processing ? "Création..." : "Créer l'entreprise"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Credentials Success Modal */}
            <Dialog open={credentialsOpen} onOpenChange={setCredentialsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-green-600">Entreprise créée avec succès !</DialogTitle>
                        <DialogDescription>
                            Voici les identifiants administrateur générés automatiquement.
                            <br />
                            <span className="font-bold text-red-500">
                                Copiez-les maintenant, ils ne seront plus affichés.
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    {flash?.created_credentials && (
                        <div className="flex items-center space-x-2 bg-muted p-4 rounded-md border mt-2">
                            <div className="grid flex-1 gap-2">
                                <Label className="font-bold">Email Admin</Label>
                                <code className="bg-background p-2 rounded border truncate">
                                    {flash.created_credentials.email}
                                </code>
                                <Label className="font-bold mt-2">Mot de passe</Label>
                                <code className="bg-background p-2 rounded border">
                                    {flash.created_credentials.password}
                                </code>
                            </div>
                            <Button size="icon" variant="outline" onClick={copyCredentials} className="shrink-0 h-full ml-2">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    )}
                    <DialogFooter className="sm:justify-start">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setCredentialsOpen(false)}
                            className="w-full"
                        >
                            Fermer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
