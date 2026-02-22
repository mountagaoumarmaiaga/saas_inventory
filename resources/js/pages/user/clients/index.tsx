
import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Search, Plus, Pencil, Trash2, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Client, PaginationMeta, fetchClients, deleteClientApi, createClientApi, updateClientApi, ClientForm } from "./api";

// Reusing Delete Modal logic inline or importing? 
// For User Panel, let's do modal-based Create/Edit as a variation/experiment? 
// Or stick to Pages to be consistent with Admin?
// The plan said: "Implement Simple CRUD". 
// Let's use Pages for consistency and cleaner code.
// Wait, I didn't create Page Routes for User Clients in web.php yet! I only created API routes.
// The `web.php` line 82: `Route::get('/clients', fn() => Inertia::render('user/clients/index'))->name('clients.index');` exists.
// But no Create/Edit routes.
// So for User, I should probably do Modals OR add routes.
// Given constraints, I'll add routes to web.php for User Create/Edit as well to be consistent. 
// Actually, let's check `web.php` again.
// Line 82 is just index.
// I'll add create/edit routes for User in `web.php` soon.

// For now, let's implement the Index page.

interface DeleteModalProps {
    open: boolean;
    setOpen: (o: boolean) => void;
    client: Client | null;
    onConfirm: () => void;
    deleting: boolean;
}
function DeleteClientModal({ open, setOpen, client, onConfirm, deleting }: DeleteModalProps) {
    if (!client) return null;
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Supprimer le client</DialogTitle>
                    <DialogDescription>
                        Êtes-vous sûr de vouloir supprimer <b>{client.name}</b> ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={deleting}>Annuler</Button>
                    <Button variant="destructive" onClick={onConfirm} disabled={deleting}>
                        {deleting ? "Suppression..." : "Supprimer"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function UserClientsIndex() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Client[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({ current_page: 1, last_page: 1, total: 0, per_page: 10, links: [] });
    const [error, setError] = useState<string | null>(null);

    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 10;

    const [selected, setSelected] = useState<Client | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        if (q.trim()) params.set("search", q.trim());
        params.set("page", String(page));
        params.set("perPage", String(perPage));
        return params.toString();
    }, [q, page]);

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const { items, meta } = await fetchClients(queryString);
            setItems(items);
            setMeta(meta);
        } catch (e: any) {
            setError(e.message);
            toast.error("Erreur chargement clients");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, [queryString]);

    async function handleDeleteConfirm() {
        if (!selected) return;
        setDeleting(true);
        try {
            await deleteClientApi(selected.id);
            setDeleteOpen(false);
            setSelected(null);
            toast.success("Client supprimé !");
            await load();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setDeleting(false);
        }
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "/user/dashboard" },
                { title: "Clients", href: "/user/clients" },
            ]}
        >
            <Head title="Mes Clients" />

            <div className="p-6 space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Mes Clients
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Gérez votre base de clients.
                        </p>
                    </div>
                    <Link href="/user/clients/create">
                        <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02]">
                            <Plus className="mr-2 h-5 w-5" />
                            Nouveau Client
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="relative flex-1 md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Rechercher par nom, email..."
                            className="pl-10 h-12 w-full rounded-xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm focus-visible:ring-orange-500 transition-all font-medium"
                            value={q}
                            onChange={(e) => {
                                setPage(1);
                                setQ(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center p-12">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="h-12 w-12 rounded-full border-4 border-orange-500/30 border-t-orange-600 animate-spin" />
                                <span className="text-muted-foreground font-medium animate-pulse">Chargement des clients...</span>
                            </div>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center mb-4">
                                <Users className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Aucun client</h3>
                            <p className="text-sm text-muted-foreground mt-1">Commencez par ajouter un client.</p>
                        </div>
                    ) : (
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent">
                                        <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Nom</th>
                                        <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Email</th>
                                        <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Téléphone</th>
                                        <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Adresse</th>
                                        <th className="h-12 px-6 text-right align-middle font-bold text-muted-foreground/80 uppercase text-[11px] tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {items.map((client) => (
                                        <tr key={client.id} className="border-b border-white/5 transition-all hover:bg-orange-500/5 group">
                                            <td className="p-6 align-middle font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center text-orange-700 font-bold text-xs ring-2 ring-white/10">
                                                        {client.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <span className="group-hover:text-orange-600 transition-colors">{client.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-6 align-middle">{client.email || <span className="text-muted-foreground/50">-</span>}</td>
                                            <td className="p-6 align-middle">{client.phone || <span className="text-muted-foreground/50">-</span>}</td>
                                            <td className="p-6 align-middle max-w-[200px] truncate" title={client.address || ""}>{client.address || <span className="text-muted-foreground/50">-</span>}</td>
                                            <td className="p-6 align-middle text-right">
                                                <div className="flex justify-end gap-2">
                                                    <div className="flex items-center gap-1 bg-background/50 backdrop-blur-sm p-1 rounded-lg border border-white/5 shadow-sm">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            asChild
                                                            className="h-8 w-8 hover:bg-orange-500/10 hover:text-orange-600 transition-colors"
                                                            title="Modifier"
                                                        >
                                                            <Link href={`/user/clients/${client.id}/edit`}>
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <div className="w-px h-4 bg-border/50" />
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
                                                            onClick={() => { setSelected(client); setDeleteOpen(true); }}
                                                            title="Supprimer"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="flex items-center justify-between gap-4 p-4 border-t border-white/10 bg-muted/20">
                        <div className="text-xs font-medium text-muted-foreground">Total: <span className="text-foreground">{meta.total}</span> clients</div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={loading || page <= 1}
                                className="h-8 rounded-lg border-white/10 hover:bg-white/5"
                            >
                                Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => p + 1)}
                                disabled={loading || page >= meta.last_page}
                                className="h-8 rounded-lg border-white/10 hover:bg-white/5"
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                </div>

                <DeleteClientModal
                    open={deleteOpen}
                    setOpen={setDeleteOpen}
                    client={selected}
                    onConfirm={handleDeleteConfirm}
                    deleting={deleting}
                />
            </div>
        </AppLayout>
    );
}
