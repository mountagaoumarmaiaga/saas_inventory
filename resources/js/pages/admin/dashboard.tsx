import { useRef } from 'react';
import { Head, Link, usePage } from "@inertiajs/react";
import DashboardUI from "../shared/dashboard-ui";
import { type BreadcrumbItem, type PageProps } from "@/types";
import { FileText, Users, Package, CreditCard, TrendingUp, Activity, Calendar, ArrowRight, ArrowUpRight, Search, Bell } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RevenueChart from "@/components/RevenueChart";
import DonutChart from "@/components/DonutChart";
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
            title="Revenu Total"
            value={stats.total_revenue}
            icon={CreditCard}
            isCurrency
            color="primary"
            trend={12.5}
            subValue={kpis.averageBasket ? `Panier moyen: ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(kpis.averageBasket)}` : undefined}
            delay={0}
          />
          <StatCard
            title="Clients Actifs"
            value={stats.total_clients}
            icon={Users}
            color="info"
            trend={8.2}
            delay={1}
          />
          <StatCard
            title="Produits en Stock"
            value={stats.total_products}
            icon={Package}
            color="warning"
            trend={-2.4}
            delay={2}
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

          {/* Top Clients / Donut (Span 1 col) */}
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

          {/* Bottom Row - Recent Invoices (Span Full) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 rounded-2xl border-2 border-white/10 dark:border-zinc-800/50 bg-background/60 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col">
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
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(Number(invoice.total || invoice.amount) || 0)}
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

        </div>
      </div>
    </DashboardUI >
  );
}
