import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface ExpenseCategory {
    id: number;
    name: string;
}

export default function ExpenseCategoriesIndex() {
    const [categories, setCategories] = useState<ExpenseCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: 0, name: '' });
    const [submitting, setSubmitting] = useState(false);

    const loadCategories = async () => {
        try {
            const res = await fetch('/admin/api/expense-categories', {
                headers: { 'Accept': 'application/json' }
            });
            const data = await res.json();
            setCategories(data);
        } catch (e: any) {
            toast.error(e.message || "Erreur de chargement");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const isEdit = formData.id > 0;
            const url = isEdit ? `/admin/api/expense-categories/${formData.id}` : '/admin/api/expense-categories';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ name: formData.name })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(isEdit ? 'Catégorie mise à jour' : 'Catégorie créée');
                setIsModalOpen(false);
                loadCategories();
            } else {
                toast.error(data.message || "Erreur");
            }
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Voulez-vous supprimer cette catégorie ?')) return;
        try {
            const res = await fetch(`/admin/api/expense-categories/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                toast.success('Catégorie supprimée');
                loadCategories();
            } else {
                const data = await res.json();
                toast.error(data.message || 'Erreur lors de la suppression');
            }
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    const openCreateModal = () => {
        setFormData({ id: 0, name: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (cat: ExpenseCategory) => {
        setFormData({ id: cat.id, name: cat.name });
        setIsModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={[
            { title: "Admin", href: "/admin/dashboard" },
            { title: "Catégories de Dépenses", href: "/admin/expense-categories" },
        ]}>
            <Head title="Catégories de Dépenses" />

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            Catégories de Dépenses
                        </h1>
                        <p className="text-muted-foreground mt-1">Gérez les catégories pour vos dépenses.</p>
                    </div>
                    <Button onClick={openCreateModal} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Catégorie
                    </Button>
                </div>

                <Card className="border-white/10 shadow-xl overflow-hidden bg-background/60 backdrop-blur-xl">
                    <CardHeader className="border-b border-white/10 pb-4 bg-muted/30">
                        <CardTitle className="text-lg">Liste des catégories</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="p-12 text-center text-muted-foreground">Chargement...</div>
                        ) : categories.length === 0 ? (
                            <div className="p-12 text-center text-muted-foreground">Aucune catégorie trouvée.</div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {categories.map(cat => (
                                    <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                                        <div className="font-medium">{cat.name}</div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => openEditModal(cat)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(cat.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{formData.id ? "Modifier la catégorie" : "Nouvelle catégorie"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label>Nom de la catégorie</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="pt-4 flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
                                <Button type="submit" disabled={submitting} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                    {submitting ? "Enregistrement..." : "Enregistrer"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
