import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Users, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Badge } from '@/components/ui/badge';

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
    top_products?: { product?: { name: string }, total_quantity: string | number, total_revenue: string | number }[];
    sales_evolution?: { date_label: string, revenue: string | number }[];
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
                    <p className="text-xs text-muted-foreground mt-1 text-primary">
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

            {/* Evolution Chart & Top Products */}
            <div className="grid gap-6 md:grid-cols-3 mt-6 md:col-span-2 lg:col-span-4">
                <Card className="md:col-span-2 overflow-hidden hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Évolution des Ventes</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full pt-4">
                        {data.sales_evolution && data.sales_evolution.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.sales_evolution.map(d => ({ ...d, revenue: Number(d.revenue) }))}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                                    <XAxis dataKey="date_label" tick={{ fontSize: 12 }} opacity={0.6} tickMargin={10} />
                                    <YAxis 
                                        tickFormatter={(value) => new Intl.NumberFormat('fr-FR', { notation: "compact", compactDisplay: "short" }).format(value)}
                                        tick={{ fontSize: 12 }} 
                                        opacity={0.6}
                                        tickMargin={10}
                                        width={60}
                                    />
                                    <RechartsTooltip 
                                        formatter={(value: number) => [new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(value), "Revenu"]}
                                        labelFormatter={(label) => `Date: ${label}`}
                                        contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'var(--background)' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                                Aucune donnée de vente pour cette période.
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="hover:border-primary/50 transition-colors flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Produits les plus vendus</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto">
                        {data.top_products && data.top_products.length > 0 ? (
                            <div className="space-y-4">
                                {data.top_products.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-muted/40 p-3 rounded-lg border border-border/50">
                                        <div className="flex-1 min-w-0 pr-4">
                                            <p className="text-sm font-medium truncate">{item.product?.name || 'Produit inconnu'}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">{Number(item.total_quantity)} unités vendues</p>
                                        </div>
                                        <div className="text-right whitespace-nowrap">
                                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20">
                                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(Number(item.total_revenue))}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex h-[200px] items-center justify-center text-muted-foreground text-sm">
                                Aucune vente enregistrée.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
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
