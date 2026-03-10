import { useEffect, useState } from "react";

import { Head, Link, router } from "@inertiajs/react";
import axios from "axios";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

export default function ExpenseCreate() {
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const [formData, setFormData] = useState({
        category_id: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        reference: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/admin/api/expense-categories');
                setCategories(res.data);
            } catch (e) {
                toast.error("Erreur de chargement des catégories");
            }
        };
        fetchCategories();
    }, []);

    const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setAnalyzing(true);
        const dataForm = new FormData();
        dataForm.append('receipt', file);

        try {
            const res = await axios.post('/admin/api/expenses/analyze-receipt', dataForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const result = res.data;

            if (result.data) {
                toast.success('Reçu analysé avec succès !');

                // Pre-fill fields if data was found
                setFormData(prev => ({
                    ...prev,
                    amount: result.data.amount ? result.data.amount.toString() : prev.amount,
                    date: result.data.date ? result.data.date : prev.date,
                    // If supplier is extracted, we can put it in description or reference
                    description: result.data.supplier_name ? `Achat chez ${result.data.supplier_name}` : prev.description,
                }));
            } else {
                toast.error(result.message || 'Impossible d\'analyser ce reçu.');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Erreur lors de la communication avec le service OCR.');
        } finally {
            setAnalyzing(false);
            // Reset input
            e.target.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post('/admin/api/expenses', formData);
            toast.success('Dépense enregistrée avec succès');
            router.visit('/admin/expenses');
        } catch (e: any) {
            toast.error(e.response?.data?.message || e.message || 'Erreur lors de la création');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AppLayout breadcrumbs={[
            { title: "Admin", href: "/admin/dashboard" },
            { title: "Dépenses", href: "/admin/expenses" },
            { title: "Nouvelle Dépense", href: "#" },
        ]}>
            <Head title="Nouvelle Dépense" />

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div>
                    <Button variant="ghost" onClick={() => router.visit('/admin/expenses')} className="pl-0 hover:bg-transparent hover:text-primary transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux dépenses
                    </Button>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent mt-2">
                        Nouvelle Dépense
                    </h1>
                </div>

                <Card className="border border-white/10 bg-background/60 shadow-xl backdrop-blur-xl">
                    <CardContent className="p-6">
                        {/* OCR Upload Area */}
                        <div className="mb-8 p-6 rounded-xl border border-dashed border-primary/50 bg-primary/5 dark:bg-indigo-500/5 text-center flex flex-col items-center justify-center space-y-3 relative overflow-hidden transition-all hover:bg-primary/5 dark:hover:bg-primary/10">
                            {analyzing ? (
                                <div className="flex flex-col items-center justify-center text-primary dark:text-primary/80 space-y-2">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    <span className="font-medium text-sm animate-pulse">Analyse du reçu en cours avec l'IA...</span>
                                </div>
                            ) : (
                                <>
                                    <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-full text-primary dark:text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m16 16-4-4-4 4"></path></svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-foreground">Extraction Intelligente (OCR)</h3>
                                        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                                            Téléversez une photo de votre reçu. Le système lira automatiquement le montant, la date et le fournisseur.
                                        </p>
                                    </div>
                                    <Button type="button" variant="outline" className="mt-2 border-primary/20 dark:border-primary/50 text-primary/90 dark:text-primary font-medium relative overflow-hidden" onClick={() => document.getElementById('receipt-upload')?.click()}>
                                        Sélectionner une image
                                    </Button>
                                    <input
                                        type="file"
                                        id="receipt-upload"
                                        className="hidden"
                                        accept="image/jpeg,image/png,image/jpg"
                                        onChange={handleReceiptUpload}
                                    />
                                </>
                            )}
                        </div>

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
                                <Button type="submit" disabled={submitting} className="bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 text-white shadow-lg shadow-primary/20">
                                    {submitting ? "Enregistrement..." : "Enregistrer la dépense"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
