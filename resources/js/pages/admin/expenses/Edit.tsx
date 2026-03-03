import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

export default function ExpenseEdit({ id }: { id: number }) {
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        category_id: '',
        amount: '',
        date: '',
        description: '',
        reference: ''
    });

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [catsRes, expenseRes] = await Promise.all([
                    fetch('/admin/api/expense-categories', { headers: { 'Accept': 'application/json' } }),
                    fetch(`/admin/api/expenses/${id}`, { headers: { 'Accept': 'application/json' } })
                ]);

                const catsData = await catsRes.json();
                const expenseData = await expenseRes.json();

                setCategories(catsData);

                if (expenseData.data) {
                    const d = expenseData.data;
                    setFormData({
                        category_id: d.category_id ? d.category_id.toString() : '',
                        amount: d.amount ? d.amount.toString() : '',
                        date: d.date ? d.date.split('T')[0] : '',
                        description: d.description || '',
                        reference: d.reference || ''
                    });
                }
            } catch (e) {
                toast.error("Erreur de chargement");
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`/admin/api/expenses/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Dépense mise à jour avec succès');
                router.visit('/admin/expenses');
            } else {
                toast.error(data.message || 'Erreur lors de la mise à jour');
            }
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <AppLayout breadcrumbs={[{ title: "Admin", href: "/admin/dashboard" }, { title: "Dépenses", href: "/admin/expenses" }, { title: "Modification", href: "#" }]}>
                <div className="flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={[
            { title: "Admin", href: "/admin/dashboard" },
            { title: "Dépenses", href: "/admin/expenses" },
            { title: "Modifier Dépense", href: "#" },
        ]}>
            <Head title="Modifier Dépense" />

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div>
                    <Button variant="ghost" onClick={() => router.visit('/admin/expenses')} className="pl-0 hover:bg-transparent hover:text-orange-600 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux dépenses
                    </Button>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mt-2">
                        Modifier Dépense
                    </h1>
                </div>

                <Card className="border border-white/10 bg-background/60 shadow-xl backdrop-blur-xl">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Date <span className="text-destructive">*</span></Label>
                                    <Input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Catégorie <span className="text-destructive">*</span></Label>
                                    <Select value={formData.category_id} onValueChange={(val) => setFormData({ ...formData, category_id: val })} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(c => (
                                                <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Description <span className="text-destructive">*</span></Label>
                                    <Input
                                        required
                                        placeholder="ex: Fournitures de bureau, Achat matériel..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Montant (FCFA) <span className="text-destructive">*</span></Label>
                                    <Input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        required
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Référence (Optionnel)</Label>
                                    <Input
                                        placeholder="Numéro de facture, reçu..."
                                        value={formData.reference}
                                        onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => router.visit('/admin/expenses')}>
                                    Annuler
                                </Button>
                                <Button type="submit" disabled={submitting} className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-orange-500/20">
                                    {submitting ? "Mise à jour..." : "Mettre à jour la dépense"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
