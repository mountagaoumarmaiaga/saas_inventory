import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { type NavItem, type NavGroup } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import {
  FileText,
  FolderTree,
  LayoutGrid,
  Package,
  Settings,
  Truck,
  Users,
  Layers,
  ArrowRightLeft,
  UserRound,
  ShieldCheck
} from "lucide-react";
import AppLogo from "./app-logo";

// Empty footer items as requested
const footerNavItems: NavItem[] = [];

export function AppSidebar() {
  const page = usePage();
  const user: any = (page.props as any).auth?.user;

  const isSuperAdmin = user?.is_super_admin;
  const isAdmin = user?.role === "admin";

  const mainNavGroups: NavGroup[] = isSuperAdmin
    ? [
      {
        title: "Administration Globale",
        items: [
          { title: "Dashboard", href: "/super-admin/dashboard", icon: LayoutGrid },
          { title: "Entreprises", href: "/super-admin/enterprises", icon: Users },
        ]
      }
    ]
    : isAdmin
      ? [
        {
          title: "Général",
          items: [
            { title: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
          ]
        },
        {
          title: "Catalogue",
          items: [
            { title: "Produits", href: "/admin/products", icon: Package },
            { title: "Catégories", href: "/admin/categories", icon: Layers },
            { title: "Sous-catégories", href: "/admin/sub-categories", icon: FolderTree },
          ]
        },
        {
          title: "Logistique",
          items: [
            { title: "Mouvements de stock", href: "/admin/stock-movements", icon: ArrowRightLeft },
            { title: "Bons de Livraison", href: "/admin/delivery-notes", icon: Truck },
          ]
        },
        {
          title: "Finance",
          items: [
            { title: "Factures", href: "/admin/invoices", icon: FileText },
            { title: "Paramètres Factures", href: "/admin/settings/invoice-customization", icon: Settings }
          ]
        },
        {
          title: "Tiers",
          items: [
            { title: "Clients", href: "/admin/clients", icon: UserRound },
            { title: "Utilisateurs", href: "/admin/users", icon: ShieldCheck },
          ]
        }
      ]
      : [
        {
          title: "Général",
          items: [
            { title: "Dashboard", href: "/user/dashboard", icon: LayoutGrid },
          ]
        },
        {
          title: "Catalogue",
          items: [
            { title: "Produits", href: "/user/products", icon: Package },
          ]
        },
        {
          title: "Logistique",
          items: [
            { title: "Bons de Livraison", href: "/user/delivery-notes", icon: Truck },
          ]
        },
        {
          title: "Finance",
          items: [
            { title: "Factures", href: "/user/invoices", icon: FileText },
          ]
        },
        {
          title: "Tiers",
          items: [
            { title: "Clients", href: "/user/clients", icon: UserRound },
          ]
        }
      ];

  return (
    <Sidebar collapsible="icon" variant="inset" className="border-r border-border/50 shadow-sm">
      {/* Subtle Premium Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <SidebarHeader className="relative backdrop-blur-xl bg-background/80 border-b border-border/50 pb-4 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-primary/10 transition-all duration-300 group-data-[collapsible=icon]:!p-2 hover:scale-[1.02]">
              <Link href={isAdmin ? "/admin/dashboard" : "/user/dashboard"} prefetch className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative flex aspect-square size-10 items-center justify-center rounded-lg bg-white overflow-hidden shadow-lg border border-border/50">
                    <img src="/images/logo-icon.png" alt="NextGenStock Logo" className="size-full object-contain p-0.5" />
                  </div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-foreground">NextGenStock</span>
                  <span className="truncate text-xs text-muted-foreground tracking-wide uppercase">Entreprise Tool</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="relative backdrop-blur-xl bg-background/80">
        <NavMain groups={mainNavGroups} />
      </SidebarContent>

      <SidebarFooter className="relative backdrop-blur-xl bg-background/80 border-t border-border/50">
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
