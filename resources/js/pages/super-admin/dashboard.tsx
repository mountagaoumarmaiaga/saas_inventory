import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users } from "lucide-react";

export default function SuperAdminDashboard() {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Super Admin", href: "/super-admin/dashboard" },
        { title: "Dashboard", href: "/super-admin/dashboard" },
      ]}
    >
      <Head title="Super Admin Dashboard" />

      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
            Vue d'ensemble
          </h1>
          <p className="text-muted-foreground">
            Bienvenue dans le panneau d'administration globale.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-orange-100 dark:border-orange-900/20 shadow-lg group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entreprises</CardTitle>
              <Building2 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">
                Entreprises actives
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
