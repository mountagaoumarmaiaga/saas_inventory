import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Search, UserPlus, Pencil, Trash2, Shield, User as UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "@/components/error-boundary";
import { useEffect, useMemo, useState } from "react";
import { User, UserForm } from "./types";
import CreateUser from "./Create";
import EditUser from "./Edit";
import DeleteUserModal from "./delete-modal";
import { fetchUsers, createUserApi, updateUserApi, deleteUserApi } from "./api";

export default function AdminUsersIndex() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [q, setQ] = useState("");

    // Modals state
    const [createOpen, setCreateOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Fetch users (simple fetch, no complex pagination for now as per controller returning paginated json)
    // We'll just handle the 'data' array from pagination
    async function loadUsers() {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUsers();
            setUsers(data.data || []);
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let isMounted = true;

        async function fetchSafe() {
            setLoading(true);
            try {
                const data = await fetchUsers();
                if (isMounted) {
                    setUsers(data.data || []);
                }
            } catch (e: any) {
                if (isMounted) {
                    setError(e.message);
                    toast.error(e.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchSafe();

        return () => {
            isMounted = false;
        };
    }, []);

    // Frontend filtering
    const filteredUsers = useMemo(() => {
        if (!q.trim()) return users;
        const lowerQ = q.toLowerCase();
        return users.filter(
            (u) =>
                u.name.toLowerCase().includes(lowerQ) ||
                u.email.toLowerCase().includes(lowerQ)
        );
    }, [users, q]);

    // HANDLERS

    async function handleCreate(form: UserForm, close: () => void, setErrors: (e: any) => void) {
        setCreating(true);
        try {
            const res = await createUserApi(form);
            if (!res.ok) {
                setErrors(res.errors);
                toast.error("Veuillez corriger les erreurs.");
                return;
            }

            close();
            toast.success("Utilisateur créé avec succès !");
            loadUsers();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setCreating(false);
        }
    }

    async function handleUpdate(id: number, form: UserForm, close: () => void, setErrors: (e: any) => void) {
        setUpdating(true);
        try {
            const res = await updateUserApi(id, form);
            if (!res.ok) {
                setErrors(res.errors);
                toast.error("Veuillez corriger les erreurs.");
                return;
            }

            close();
            toast.success("Utilisateur mis à jour avec succès !");
            loadUsers();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setUpdating(false);
        }
    }

    async function handleDeleteConfirm() {
        if (!selectedUser) return;
        setDeleting(true);
        try {
            await deleteUserApi(selectedUser.id);
            setDeleteOpen(false);
            setSelectedUser(null);
            toast.success("Utilisateur supprimé avec succès !");
            loadUsers();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setDeleting(false);
        }
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Utilisateurs", href: "/admin/users" },
            ]}
        >
            <Head title="Gestion des utilisateurs" />

            <div className="p-6 space-y-6">
                <ErrorBoundary>
                    {/* Header with Gradient */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                                Utilisateurs
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Gérer les comptes et les accès · <span className="font-semibold text-foreground">{filteredUsers.length}</span> utilisateur{filteredUsers.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                        <Button
                            onClick={() => setCreateOpen(true)}
                            className="h-12 px-6 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:via-amber-700 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105"
                        >
                            <UserPlus className="mr-2 h-5 w-5" />
                            Ajouter un utilisateur
                        </Button>
                    </div>

                    {/* Enhanced Search Bar */}
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-1 md:max-w-md group">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/60 group-hover:text-orange-500 transition-colors duration-300" />
                            <Input
                                type="search"
                                placeholder="Rechercher par nom ou email..."
                                className="h-12 pl-11 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Modern Table Card with Glassmorphism */}
                    <div className="relative rounded-2xl border border-white/10 backdrop-blur-xl bg-background/60 shadow-2xl shadow-orange-500/5 overflow-hidden">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />

                        {loading ? (
                            <div className="relative flex flex-col items-center justify-center p-12">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-orange-500"></div>
                                <span className="mt-2 text-muted-foreground">Chargement des utilisateurs...</span>
                            </div>
                        ) : error ? (
                            <div className="relative p-8 text-center text-red-500">
                                {error}
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="relative flex flex-col items-center justify-center p-12 text-center">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center border-2 border-orange-500/20">
                                    <UserIcon className="h-8 w-8 text-orange-500/60" />
                                </div>
                                <h3 className="mt-4 font-semibold text-foreground">Aucun utilisateur</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Commencez par ajouter un nouvel utilisateur à votre équipe.
                                </p>
                            </div>
                        ) : (
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border-b-2 border-orange-500/20">
                                        <tr>
                                            <th className="h-14 px-4 text-left align-middle font-bold text-sm text-foreground/90">Nom</th>
                                            <th className="h-14 px-4 text-left align-middle font-bold text-sm text-foreground/90">Email</th>
                                            <th className="h-14 px-4 text-left align-middle font-bold text-sm text-foreground/90">Rôle</th>
                                            <th className="h-14 px-4 text-left align-middle font-bold text-sm text-foreground/90">Date d'ajout</th>
                                            <th className="h-14 px-4 text-right align-middle font-bold text-sm text-foreground/90">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="group hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5 transition-all duration-300">
                                                <td className="p-4 align-middle font-medium">{user.name}</td>
                                                <td className="p-4 align-middle text-muted-foreground">{user.email}</td>
                                                <td className="p-4 align-middle">
                                                    {user.role === 'admin' ? (
                                                        <Badge className="gap-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-700 dark:text-orange-400">
                                                            <Shield className="h-3 w-3" />
                                                            Admin
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="bg-muted/50">Utilisateur</Badge>
                                                    )}
                                                </td>
                                                <td className="p-4 align-middle text-muted-foreground">
                                                    {new Intl.DateTimeFormat('fr-FR').format(new Date(user.created_at))}
                                                </td>
                                                <td className="p-4 align-middle text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => {
                                                                setSelectedUser(user);
                                                                setEditOpen(true);
                                                            }}
                                                            className="hover:bg-orange-500/10 hover:text-orange-600"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                            onClick={() => {
                                                                setSelectedUser(user);
                                                                setDeleteOpen(true);
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </ErrorBoundary>

                <CreateUser
                    createOpen={createOpen}
                    setCreateOpen={setCreateOpen}
                    onCreate={handleCreate}
                    creating={creating}
                />

                <EditUser
                    open={editOpen}
                    setOpen={setEditOpen}
                    user={selectedUser}
                    onUpdate={handleUpdate}
                    updating={updating}
                />

                <DeleteUserModal
                    open={deleteOpen}
                    setOpen={setDeleteOpen}
                    user={selectedUser}
                    onConfirm={handleDeleteConfirm}
                    deleting={deleting}
                />
            </div>
        </AppLayout>
    );
}
