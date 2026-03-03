import { useRef } from 'react';
import { Head, Link, usePage } from "@inertiajs/react";
import DashboardUI from "../shared/dashboard-ui";
import { type BreadcrumbItem, type PageProps } from "@/types";
import { FileText, Users, Package, CreditCard, TrendingUp, Activity, Calendar, ArrowRight, ArrowUpRight, Search, Bell, AlertTriangle } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RevenueChart from "@/components/RevenueChart";
import DonutChart from "@/components/DonutChart";
import CashflowChart from "@/components/CashflowChart";
import StackedAreaChart from "@/components/StackedAreaChart";
import StatCard from "@/components/StatCard";
import PeriodCard from "@/components/PeriodCard";
import ChartContainer from "@/components/ChartContainer";
import { Input } from "@/components/ui/input";

// Hooks
import { useDashboardStats, DateRange } from "@/hooks/useDashboardStats";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Tableau de Bord", href: "/admin/dashboard" },
];

export default function AdminDashboard(props: any) {
  const { auth } = usePage<PageProps>().props;
  const { stats, dateRange, setDateRange, loading, kpis } = useDashboardStats(props.stats);

  return (
    <DashboardUI title="Tableau de Bord" breadcrumbs={breadcrumbs}>
      <Head title="Admin Dashboard" />

      <div className="space-y-6 p-2 max-w-[1600px] mx-auto">

        {/* Top Bar: Greeting & Quick Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/40">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Bonjour, {auth.user.name.split(' ')[0]} 👋
            </h2>
            <p className="text-muted-foreground">
              Voici ce qui se passe sur votre boutique aujourd'hui.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher..." className="pl-9 w-[250px] bg-background/50 border-border/50 focus:bg-background transition-all rounded-xl" />
            </div>
            <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
              <SelectTrigger className="w-[180px] bg-background/50 border-border/50 backdrop-blur-sm rounded-xl">
                <Calendar className="mr-2 h-4 w-4 opacity-50" />
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 derniers jours</SelectItem>
                <SelectItem value="30d">30 derniers jours</SelectItem>
                <SelectItem value="90d">3 derniers mois</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* KPI Cards Row */}
          <StatCard
            title="Revenu Total (Mois)"
            value={stats.pop_revenue?.mtd || stats.total_revenue}
            icon={CreditCard}
            isCurrency
            color="primary"
            trend={stats.pop_revenue?.delta}
            sparklineData={stats.sparkline_revenue}
            sparklineColor="#f97316" // Orange
            subValue={kpis.averageBasket ? `Panier moyen global: ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(kpis.averageBasket)}` : undefined}
            delay={0}
          />
          <StatCard
            title="Dépenses Commises (Mois)"
            value={stats.pop_expenses?.mtd || stats.total_expenses}
            icon={TrendingUp}
            isCurrency
            color="warning"
            trend={stats.pop_expenses?.delta}
            sparklineData={stats.sparkline_expenses}
            sparklineColor="#ef4444" // Red
            delay={1}
            className="border-red-500/20 bg-red-500/5 dark:bg-red-500/10"
          />
          <StatCard
            title="Bénéfice Net (Mois)"
            value={stats.pop_net_profit?.mtd || stats.net_profit}
            icon={Activity}
            isCurrency
            color={(stats.pop_net_profit?.mtd || stats.net_profit) >= 0 ? "primary" : "destructive"}
            trend={stats.pop_net_profit?.delta}
            delay={2}
            className={(stats.pop_net_profit?.mtd || stats.net_profit) >= 0 ? "border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10" : "border-red-500/20 bg-red-500/5 dark:bg-red-500/10"}
          />
          <StatCard
            title="Factures Émises"
            value={stats.total_invoices}
            icon={FileText}
            color="purple"
            subValue={`${stats.pending_invoices} en attente`}
            delay={3}
          />

          {/* Main Chart Section (Span 2 or 3 cols) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ChartContainer
              title="Évolution des Revenus"
              icon={TrendingUp}
              loading={loading}
              height={400}
              className="h-full rounded-2xl border-2 shadow-xl"
            >
              {props.dailyRevenue && props.dailyRevenue.length > 0 ? (
                <RevenueChart data={props.dailyRevenue} />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Aucune donnée pour cette période
                </div>
              )}
            </ChartContainer>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <ChartContainer
              title="Top Clients"
              icon={Users}
              loading={loading}
              height={400}
              className="h-full rounded-2xl border-2 shadow-xl"
            >
              {props.revenueByClient && props.revenueByClient.length > 0 ? (
                <DonutChart data={props.revenueByClient} />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Aucune donnée
                </div>
              )}
            </ChartContainer>
          </div>

          {/* Cashflow Forecasting (Span 2 to 4 cols) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-2">
            <ChartContainer
              title="Prévisions de Trésorerie (30 Jours)"
              icon={TrendingUp}
              loading={loading}
              height={350}
              className="h-full rounded-2xl border-2 shadow-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5"
            >
              {props.cashflowForecast && props.cashflowForecast.length > 0 ? (
                <div className="relative h-full w-full pt-4 pb-2">
                  <div className="absolute top-0 right-4 flex items-center gap-4 text-xs font-medium bg-background/50 backdrop-blur px-3 py-1.5 rounded-full border border-border/50 shadow-sm z-10">
                    <div className="flex items-center gap-1.5"><div className="size-2.5 rounded-full bg-emerald-400"></div> Entrées</div>
                    <div className="flex items-center gap-1.5"><div className="size-2.5 rounded-full bg-rose-400"></div> Sorties</div>
                    <div className="flex items-center gap-1.5"><div className="size-2.5 rounded-full bg-blue-500"></div> Solde Global</div>
                  </div>
                  <CashflowChart data={props.cashflowForecast} />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Trésorerie indisponible
                </div>
              )}
            </ChartContainer>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl border-2 border-white/10 dark:border-zinc-800/50 bg-background/60 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border/10 flex items-center justify-between bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-transparent">
              <div>
                <h3 className="text-lg font-bold leading-none tracking-tight">Transactions Récentes</h3>
                <p className="text-sm text-muted-foreground mt-1">Vos 5 dernières factures générées.</p>
              </div>
              <Button variant="outline" size="sm" asChild className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary">
                <Link href="/admin/invoices">Voir tout</Link>
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-muted-foreground">Client</th>
                    <th className="px-6 py-4 text-left font-bold text-muted-foreground">Date</th>
                    <th className="px-6 py-4 text-left font-bold text-muted-foreground">Montant</th>
                    <th className="px-6 py-4 text-left font-bold text-muted-foreground">Statut</th>
                    <th className="px-6 py-4 text-right font-bold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {props.recentInvoices && props.recentInvoices.length > 0 ? (
                    props.recentInvoices.map((invoice: any) => (
                      <tr key={invoice.id} className="group hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5 transition-all duration-300">
                        <td className="px-6 py-4 font-medium text-foreground">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center text-orange-600 text-xs font-bold border border-orange-200/50">
                              {invoice.client.name.substring(0, 2).toUpperCase()}
                            </div>
                            {invoice.client.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{new Date(invoice.created_at).toLocaleDateString('fr-FR')}</td>
                        <td className="px-6 py-4 font-mono font-bold">
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(Number(invoice.total))}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm
                                            ${invoice.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                              invoice.status === 'PENDING' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                                'bg-slate-500/10 text-slate-600 border-slate-500/20'}`}>
                            {invoice.status === 'PAID' ? 'Payé' : invoice.status === 'PENDING' ? 'En attente' : invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-background hover:bg-orange-50 text-muted-foreground hover:text-orange-600 shadow-sm border border-border/50">
                            <Link href={`/admin/invoices/${invoice.id}`}>
                              <ArrowRight className="size-4" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        Aucune transaction récente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1 rounded-2xl border-2 border-red-500/20 dark:border-red-500/30 bg-red-500/5 dark:bg-red-500/10 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border/10 bg-gradient-to-r from-red-500/10 to-transparent flex items-center justify-between">
              <h3 className="text-lg font-bold leading-none tracking-tight flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" /> Ruptures de Stock
              </h3>
              <Button variant="outline" size="sm" asChild className="rounded-full border-red-500/20 hover:bg-red-500/10 text-red-600 dark:text-red-400 hover:text-red-700">
                <Link href="/admin/products">Voir tout</Link>
              </Button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto max-h-[400px]">
              {props.stockRuptures && props.stockRuptures.length > 0 ? (
                <div className="space-y-4">
                  {props.stockRuptures.map((product: any) => (
                    <div key={product.id} className="flex items-center justify-between p-3 rounded-xl border border-red-500/20 bg-background/50 hover:bg-red-500/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 font-bold border border-red-200 dark:border-red-800">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground leading-tight">{product.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">SKU: {product.sku}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30">
                          {product.quantity} en stock
                        </span>
                        <p className="text-[10px] text-muted-foreground mt-1">Alerte à {product.min_quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-3">
                  <div className="p-4 bg-emerald-500/10 rounded-full">
                    <Package className="h-8 w-8 text-emerald-500" />
                  </div>
                  <p className="text-sm font-medium">Tous les stocks sont à jour.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </DashboardUI >
  );
}
