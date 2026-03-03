import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Users, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ReportMetrics {
    period: string;
    start_date: string;
    end_date: string;
    revenue: number;
    pending_revenue: number;
    expenses: number;
    net_profit: number;
    new_clients: number;
    new_invoices_count: number;
}

export default function ReportsIndex({ metrics }: { metrics: { weekly: ReportMetrics, monthly: ReportMetrics, yearly: ReportMetrics } }) {
    const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

    // Function to render a specific metric dataset
    const renderMetrics = (data: ReportMetrics) => (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <Card className="hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Revenu Brut</CardTitle>
                    <TrendingUp className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold font-heading">
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(data.revenue)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-orange-500">
                        + {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(data.pending_revenue)} en attente
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:border-red-500/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Dépenses & Achats</CardTitle>
                    <TrendingUp className="w-4 h-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold font-heading">
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(data.expenses)}
                    </div>
                </CardContent>
            </Card>

            <Card className={`transition-colors ${data.net_profit >= 0 ? 'hover:border-green-500/50' : 'hover:border-red-500/50'}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Bénéfice Net</CardTitle>
                    <TrendingUp className={`w-4 h-4 ${data.net_profit >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold font-heading ${data.net_profit >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(data.net_profit)}
                    </div>
                </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Activité</CardTitle>
                    <FileText className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold font-heading">{data.new_invoices_count} <span className="text-sm font-normal text-muted-foreground">Factures</span></div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Users className="w-3 h-3" /> {data.new_clients} nouveaux clients
                    </p>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin/dashboard' },
                { title: 'Rapports & Analytique', href: '/admin/reports' },
            ]}
        >
            <Head title="Rapports Financiers" />

            <div className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full">

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">Rapports & Analytique</h1>
                        <p className="text-muted-foreground mt-1">Consultez vos performances financières par période. Ces données vous sont également envoyées par email de manière automatisée.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => window.open(`/admin/reports/export/pdf?period=${activeTab}`, '_blank')}>
                            <Download className="mr-2 h-4 w-4" /> Exporter PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.open(`/admin/reports/export/excel?period=${activeTab}`, '_blank')}>
                            <Download className="mr-2 h-4 w-4" /> Exporter Excel (CSV)
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => window.location.href = '/admin/dashboard'}>
                            Retour Dashboard
                        </Button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="space-y-6">
                        <div className="flex p-1 space-x-1 rounded-lg bg-muted inline-flex border shadow-sm backdrop-blur w-full sm:w-auto h-10 items-center justify-center">
                            <button
                                onClick={() => setActiveTab('weekly')}
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'weekly' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}`}
                            >
                                7 Derniers Jours (Hebdo)
                            </button>
                            <button
                                onClick={() => setActiveTab('monthly')}
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'monthly' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}`}
                            >
                                Ce Mois-ci (Mensuel)
                            </button>
                            <button
                                onClick={() => setActiveTab('yearly')}
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'yearly' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}`}
                            >
                                Cette Année (Annuel)
                            </button>
                        </div>

                        <div className="min-h-[400px]">
                            {activeTab === 'weekly' && (
                                <div className="space-y-6 animate-in fade-in-50 duration-500">
                                    <h3 className="text-lg font-medium">Performances de la semaine ({metrics.weekly.start_date} à aujourd'hui)</h3>
                                    {renderMetrics(metrics.weekly)}
                                </div>
                            )}

                            {activeTab === 'monthly' && (
                                <div className="space-y-6 animate-in fade-in-50 duration-500">
                                    <h3 className="text-lg font-medium">Performances du mois en cours ({metrics.monthly.start_date} à aujourd'hui)</h3>
                                    {renderMetrics(metrics.monthly)}
                                </div>
                            )}

                            {activeTab === 'yearly' && (
                                <div className="space-y-6 animate-in fade-in-50 duration-500">
                                    <h3 className="text-lg font-medium">Performances de l'année ({metrics.yearly.start_date} à aujourd'hui)</h3>
                                    {renderMetrics(metrics.yearly)}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

            </div>
        </AppLayout>
    );
}
