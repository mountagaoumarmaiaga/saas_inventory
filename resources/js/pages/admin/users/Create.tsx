import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { useState } from "react";
import { UserForm } from "./types";
import { UserPlus } from "lucide-react";

interface Props {
    createOpen: boolean;
    setCreateOpen: (open: boolean) => void;
    onCreate: (
        form: UserForm,
        close: () => void,
        setErrors: (errors: any) => void
    ) => void;
    creating: boolean;
}

export default function CreateUser({
    createOpen,
    setCreateOpen,
    onCreate,
    creating,
}: Props) {
    const [form, setForm] = useState<UserForm>({
        name: "",
        email: "",
        role: "user",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState<any>({});

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onCreate(
            form,
            () => {
                setCreateOpen(false);
                setForm({
                    name: "",
                    email: "",
                    role: "user",
                    password: "",
                    password_confirmation: "",
                });
                setErrors({});
            },
            setErrors
        );
    }

    return (
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogContent className="sm:max-w-[500px] border-white/10 backdrop-blur-xl bg-background/95 shadow-2xl">
                <DialogHeader className="pb-4 border-b border-white/10">
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Ajouter un utilisateur
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Créez un nouveau compte pour votre entreprise.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-3">
                        <Label htmlFor="create-name" className="text-sm font-semibold text-foreground/90">Nom complet</Label>
                        <Input
                            id="create-name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            required
                            className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                        />
                        {errors.name && (
                            <p className="text-sm text-orange-500 font-medium">• {errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="create-email" className="text-sm font-semibold text-foreground/90">Adresse email</Label>
                        <Input
                            id="create-email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            required
                            className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                        />
                        {errors.email && (
                            <p className="text-sm text-orange-500 font-medium">
                                • {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="create-role" className="text-sm font-semibold text-foreground/90">Rôle</Label>
                        <Select
                            value={form.role}
                            onValueChange={(val: "admin" | "user") =>
                                setForm({ ...form, role: val })
                            }
                        >
                            <SelectTrigger className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500/50 transition-all duration-300 shadow-lg">
                                <SelectValue placeholder="Sélectionner un rôle" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">
                                    <span>Utilisateur</span>
                                </SelectItem>
                                <SelectItem value="admin">
                                    <span>Administrateur</span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.role && (
                            <p className="text-sm text-orange-500 font-medium">• {errors.role}</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="create-password" className="text-sm font-semibold text-foreground/90">Mot de passe</Label>
                        <Input
                            id="create-password"
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            required
                            className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                        />
                        {errors.password && (
                            <p className="text-sm text-orange-500 font-medium">
                                • {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="create-password_confirmation" className="text-sm font-semibold text-foreground/90">
                            Confirmer mot de passe
                        </Label>
                        <Input
                            id="create-password_confirmation"
                            type="password"
                            value={form.password_confirmation}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password_confirmation: e.target.value,
                                })
                            }
                            required
                            className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                        />
                    </div>

                    <DialogFooter className="gap-2 pt-4 border-t border-white/10">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCreateOpen(false)}
                            className="h-11 px-6 rounded-xl border-2 hover:bg-muted/50 transition-all duration-300"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={creating}
                            className="h-11 px-6 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:via-amber-700 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 rounded-xl"
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            {creating ? "Création..." : "Créer"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
