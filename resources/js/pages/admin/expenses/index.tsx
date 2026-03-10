import { useEffect, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import axios from "axios";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Search, FileText, TrendingUp, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import StatCard from "@/components/StatCard";

interface ExpensesIndexProps {
    stats: {
        total_revenue: number;
        manual_expenses: number;
        total_expenses: number;
        net_profit: number;
    }
}

export default function ExpensesIndex({ stats }: ExpensesIndexProps) {
    const [expenses, setExpenses] = useState<{ data: any[], meta: any }>({ data: [], meta: null });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const loadExpenses = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/admin/api/expenses?page=${page}`);
            setExpenses({ data: res.data.data, meta: res.data });
        } catch (e: any) {
            toast.error("Erreur de chargement des dépenses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExpenses();
    }, [page]);

    const handleDelete = async (id: number) => {
        if (!confirm('Voulez-vous supprimer cette dépense ?')) return;
        try {
            await axios.delete(`/admin/api/expenses/${id}`);
            toast.success('Dépense supprimée');
            loadExpenses();
        } catch (e: any) {
            toast.error(e.response?.data?.message || e.message || 'Erreur lors de la suppression');
        }
    };

    const currentPage = expenses.meta?.current_page ?? page;
    const lastPage = expenses.meta?.last_page ?? 1;

    return (
        <AppLayout breadcrumbs={[
            { title: "Admin", href: "/admin/dashboard" },
            { title: "Dépenses", href: "/admin/expenses" },
        ]}>
            <Head title="Dépenses" />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            Gestion des Dépenses
                        </h1>
                        <p className="text-muted-foreground mt-1">Gérez vos coûts opérationnels et achats fournisseurs.</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/admin/expense-categories">
                            <Button variant="outline" className="border-primary/20 text-primary/90 hover:bg-primary/5 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-900/20">
                                <FileText className="mr-2 h-4 w-4" /> Catégories
                            </Button>
                        </Link>
                        <Link href="/admin/expenses/create">
                            <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-primary/20">
                                <Plus className="mr-2 h-4 w-4" /> Nouvelle Dépense
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <StatCard
                        title="Revenu Total"
                        value={stats.total_revenue}
                        icon={TrendingUp}
                        isCurrency
                        color="primary"
                        description="Factures Payées"
                        delay={0}
                    />
                    <StatCard
                        title="Dépenses Manuelles"
                        value={stats.manual_expenses}
                        icon={CreditCard}
                        isCurrency
                        color="info"
                        description="Autres Dépenses"
                        delay={1}
                    />
                    <StatCard
                        title="Achats Fournisseurs"
                        value={stats.total_expenses - stats.manual_expenses}
                        icon={CreditCard}
                        isCurrency
                        color="warning"
                        description="Bons de Commandes Validés"
                        delay={2}
                    />
                    <StatCard
                        title="Bénéfice Net"
                        value={stats.net_profit}
                        icon={TrendingUp}
                        isCurrency
                        color="success"
                        description="Revenus - Dépenses Totales"
                        delay={3}
                    />
                </div>

                <Card className="border-white/10 shadow-xl overflow-hidden bg-background/60 backdrop-blur-xl">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10 border-b-2 border-primary/20">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Date</th>
                                        <th className="px-6 py-4 font-semibold">Catégorie</th>
                                        <th className="px-6 py-4 font-semibold">Description</th>
                                        <th className="px-6 py-4 font-semibold">Référence</th>
                                        <th className="px-6 py-4 font-semibold text-right">Montant</th>
                                        <th className="px-6 py-4 font-semibold text-center w-24">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                                Chargement des dépenses...
                                            </td>
                                        </tr>
                                    ) : expenses.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                                Aucune dépense trouvée.
                                            </td>
                                        </tr>
                                    ) : (
                                        expenses.data.map((expense) => (
                                            <tr key={expense.id}  className="group hover:bg-gradient-to-r hover:from-indigo-500/5 hover:to-blue-500/5 transition-all duration-300 hover:bg-muted/20 transition-colors">
                                                <td className="px-6 py-4 font-medium">
                                                    {new Date(expense.date).toLocaleDateString('fr-FR')}
                                                </td>
                                                <td className="px-6 py-4 text-foreground/80">
                                                    {expense.category ? <Badge variant="secondary">{expense.category.name}</Badge> : '-'}
                                                </td>
                                                <td className="px-6 py-4 text-foreground/80">
                                                    {expense.description}
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground">
                                                    {expense.reference || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-primary dark:text-orange-400">
                                                    {Number(expense.amount).toLocaleString('fr-FR')}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <Link href={`/admin/expenses/${expense.id}/edit`}>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => handleDelete(expense.id)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {expenses.meta && expenses.meta.last_page > 1 && (
                    <div className="relative flex items-center justify-between px-6 py-4 border-t border-border/40 bg-muted/5 mt-6 rounded-b-xl border border-white/10">
                        <div className="text-xs text-muted-foreground">
                            Page <span className="font-medium text-foreground">{currentPage}</span> / <span className="font-medium text-foreground">{lastPage}</span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPage(currentPage - 1)}
                                disabled={currentPage <= 1 || loading}
                                className="h-8 px-3 text-xs"
                            >
                                Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(currentPage + 1)}
                                disabled={currentPage >= lastPage || loading}
                                className="h-8 px-3 text-xs bg-transparent hover:bg-muted/50"
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
