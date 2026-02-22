
import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Search, Plus, Pencil, Trash2, Users } from "lucide-react";

import { Client, PaginationMeta, fetchClients, deleteClientApi } from "./api";
import DeleteClientModal from "./delete-modal";

export default function AdminClientsIndex() {
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
        if (q.trim()) params.set("search", q.trim()); // Controller typically uses ?search= or ?q=, we'll assume search or q. Controller uses $request->all() passed to repo. Repo usually handles filters.
        // ClientRepository usually implements basic filtering.
        // Filter key might be 'search' or 'q'. Let's try 'search'.
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
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Clients", href: "/admin/clients" },
            ]}
        >
            <Head title="Clients" />

            <div className="p-6 space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Clients
                            {!loading && meta.total > 0 && (
                                <span className="ml-3 text-lg font-semibold text-muted-foreground">
                                    ({meta.total})
                                </span>
                            )}
                        </h1>
                        <p className="text-muted-foreground mt-1">Gestion des clients de l'entreprise.</p>
                    </div>
                    <Link href="/admin/clients/create">
                        <Button className="h-12 px-6 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:via-amber-700 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 rounded-xl">
                            <Plus className="mr-2 h-5 w-5" />
                            Nouveau Client
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="relative flex-1 md:max-w-md group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/60 group-hover:text-orange-500 transition-colors duration-300" />
                        <Input
                            type="search"
                            placeholder="Rechercher..."
                            className="h-12 pl-11 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                            value={q}
                            onChange={(e) => {
                                setPage(1);
                                setQ(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="relative rounded-2xl border border-white/10 backdrop-blur-xl bg-background/60 shadow-2xl shadow-orange-500/5 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />

                    {loading ? (
                        <div className="relative flex flex-col items-center justify-center p-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-orange-500"></div>
                            <span className="mt-2 text-muted-foreground">Chargement des clients...</span>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="relative flex flex-col items-center justify-center p-12 text-center">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center border-2 border-orange-500/20">
                                <Users className="h-8 w-8 text-orange-500/60" />
                            </div>
                            <h3 className="mt-4 font-semibold text-foreground">Aucun client</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Commencez par ajouter un client.
                            </p>
                        </div>
                    ) : (
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border-b-2 border-orange-500/20">
                                    <tr>
                                        <th className="h-14 px-4 text-left align-middle font-bold text-sm text-foreground/90">Nom</th>
                                        <th className="h-14 px-4 text-left align-middle font-bold text-sm text-foreground/90">Email</th>
                                        <th className="h-14 px-4 text-left align-middle font-bold text-sm text-foreground/90">Téléphone</th>
                                        <th className="h-14 px-4 text-left align-middle font-bold text-sm text-foreground/90">Adresse</th>
                                        <th className="h-14 px-4 text-right align-middle font-bold text-sm text-foreground/90">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {items.map((client) => (
                                        <tr key={client.id} className="group hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5 transition-all duration-300">
                                            <td className="p-4 align-middle font-medium">{client.name}</td>
                                            <td className="p-4 align-middle text-muted-foreground">{client.email || "-"}</td>
                                            <td className="p-4 align-middle text-muted-foreground">{client.phone || "-"}</td>
                                            <td className="p-4 align-middle text-muted-foreground">{client.address || "-"}</td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/clients/${client.id}/edit`}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="hover:bg-orange-500/10 hover:text-orange-600 transition-all"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:bg-destructive/10"
                                                        onClick={() => { setSelected(client); setDeleteOpen(true); }}
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

                    <div className="relative flex items-center justify-between gap-2 p-4 border-t border-white/10 bg-muted/20">
                        <div className="text-sm font-medium text-muted-foreground">Total: <span className="text-foreground">{meta.total}</span> clients</div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={loading || page <= 1}
                                className="h-9 hover:bg-orange-500/10 hover:border-orange-500/50 hover:text-orange-600 transition-all disabled:opacity-50"
                            >
                                Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => p + 1)}
                                disabled={loading || page >= meta.last_page}
                                className="h-9 hover:bg-orange-500/10 hover:border-orange-500/50 hover:text-orange-600 transition-all disabled:opacity-50"
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
