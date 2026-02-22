import DashboardUI from '../shared/dashboard-ui';
import { type BreadcrumbItem } from '@/types';
import { Link, Head, usePage } from "@inertiajs/react";
import { FileText, Truck, DollarSign, ArrowRight, User } from "lucide-react";
import RevenueChart from "@/components/RevenueChart";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/user/dashboard' },
];

interface DailyRevenue {
  date: string;
  revenue: number;
}

interface DashboardProps {
  stats: {
    my_invoices_count: number;
    my_delivery_notes_count: number;
    my_revenue: number;
    revenue_today: number;
    revenue_this_week: number;
    revenue_this_month: number;
  };
  recentInvoices: any[];
  dailyRevenue: DailyRevenue[];
}

export default function UserDashboard({ stats, recentInvoices, dailyRevenue }: DashboardProps) {
  const { auth } = usePage<any>().props;

  return (
    <DashboardUI title="Dashboard User" breadcrumbs={breadcrumbs}>
      <Head title="Mon Dashboard" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-0">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Mon Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Bienvenue, <span className="font-semibold text-foreground">{auth.user.name}</span>. Voici votre activité.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Mes Factures Payées"
            value={stats.my_revenue}
            isCurrency
            icon={DollarSign}
            description="Total de vos dépenses"
            color="primary"
          />
          <StatCard
            title="Mes Commandes"
            value={stats.my_invoices_count}
            icon={FileText}
            description="Factures générées"
            color="info"
          />
          <StatCard
            title="Bons de Livraison"
            value={stats.my_delivery_notes_count}
            icon={Truck}
            description="Livraisons reçues"
            color="success"
          />
        </div>

        {/* Period Revenue Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Aujourd'hui"
            value={stats.revenue_today}
            isCurrency
            icon={DollarSign}
            description="Dépenses du jour"
            color="info"
          />
          <StatCard
            title="Cette Semaine"
            value={stats.revenue_this_week}
            isCurrency
            icon={DollarSign}
            description="Dépenses de la semaine"
            color="purple"
          />
          <StatCard
            title="Ce Mois"
            value={stats.revenue_this_month}
            isCurrency
            icon={DollarSign}
            description="Dépenses du mois"
            color="success"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          {/* Recent Invoices */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Mes Factures Récentes</h2>
              <Button variant="ghost" size="sm" asChild className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 group">
                <Link href="/user/invoices" className="flex items-center">
                  Voir tout <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="relative rounded-2xl border border-white/10 dark:border-zinc-800/50 backdrop-blur-xl bg-background/60 shadow-2xl shadow-orange-500/5 overflow-hidden">
              {/* Glossy Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />

              <div className="relative overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border-b-2 border-orange-500/20">
                    <tr>
                      <th className="h-14 px-6 text-left align-middle font-bold text-foreground/90">Réf</th>
                      <th className="h-14 px-6 text-left align-middle font-bold text-foreground/90">Date</th>
                      <th className="h-14 px-6 text-right align-middle font-bold text-foreground/90">Montant</th>
                      <th className="h-14 px-6 text-right align-middle font-bold text-foreground/90">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentInvoices.map((inv) => (
                      <tr key={inv.id} className="group hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5 transition-all duration-300">
                        <td className="p-6 align-middle font-medium">{inv.reference}</td>
                        <td className="p-6 align-middle text-muted-foreground">{new Date(inv.date).toLocaleDateString('fr-FR')}</td>
                        <td className="p-6 align-middle text-right font-bold font-mono">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(inv.total)}</td>
                        <td className="p-6 align-middle text-right">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold shadow-sm ${inv.status === 'PAID' ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border border-green-500/30' :
                            inv.status === 'APPROVED' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 border border-blue-500/30' :
                              'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-700 border border-gray-500/30'
                            }`}>
                            {inv.status === 'PAID' ? 'Payé' : inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {recentInvoices.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <FileText className="h-12 w-12 text-muted-foreground/30" />
                            <p className="text-muted-foreground font-medium">Aucune facture récente</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Revenue Chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Évolution de Mes Revenus</h2>
            <p className="text-sm font-medium text-muted-foreground">7 derniers jours</p>
          </div>
          <div className="relative rounded-2xl border border-white/10 dark:border-zinc-800/50 backdrop-blur-xl bg-background/60 shadow-2xl shadow-orange-500/5 overflow-hidden p-6 scale-on-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
            <div className="relative h-[400px]">
              {dailyRevenue && dailyRevenue.length > 0 ? (
                <RevenueChart data={dailyRevenue} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center space-y-3">
                  <DollarSign className="h-16 w-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground font-medium">Aucune donnée de revenu disponible</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardUI>
  );
}
