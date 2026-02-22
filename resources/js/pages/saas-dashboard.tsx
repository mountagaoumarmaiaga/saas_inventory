import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Search,
    Bell,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Truck,
    FileText,
    Settings,
    Menu,
    ChevronDown,
    TrendingUp,
    Users,
    AlertTriangle,
    Clock,
    MoreVertical,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// shadcn UI imports (assume these exist based on the audit)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- MOCK DATA ---
const REVENUE_DATA = [
    { name: 'Jan', value: 12500 },
    { name: 'Fév', value: 14200 },
    { name: 'Mar', value: 13800 },
    { name: 'Avr', value: 16500 },
    { name: 'Mai', value: 15900 },
    { name: 'Juin', value: 18200 },
    { name: 'Juil', value: 21500 },
    { name: 'Août', value: 19800 },
    { name: 'Sep', value: 24500 },
    { name: 'Oct', value: 23200 },
    { name: 'Nov', value: 26800 },
    { name: 'Déc', value: 29500 },
];

const RECENT_ACTIVITY = [
    { id: 1, type: 'order', title: 'Nouvelle commande #CMD-2849', time: 'Il y a 10 min', amount: '820 000 FCFA', status: 'En attente' },
    { id: 2, type: 'stock', title: 'Stock critique: Sony A7 IV', time: 'Il y a 45 min', amount: '0 unités', status: 'Rupture' },
    { id: 3, type: 'payment', title: 'Paiement reçu - Facture #FA-102', time: 'Il y a 2 heures', amount: '1 250 000 FCFA', status: 'Validé' },
    { id: 4, type: 'order', title: 'Commande livrée #CMD-2845', time: 'Hier à 14:30', amount: '450 000 FCFA', status: 'Terminé' },
    { id: 5, type: 'user', title: 'Nouveau client: Tech Solutions', time: 'Hier à 09:15', amount: '-', status: 'Nouveau' },
];

export default function SaasDashboard() {
    const [mounted, setMounted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        // Simulate loading state for skeleton demonstration
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value * 1000); // Multiplying mock data by 1k for realism
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover text-popover-foreground border border-border rounded-lg shadow-xl p-3 text-sm">
                    <p className="font-semibold text-muted-foreground mb-1">{label} 2026</p>
                    <p className="text-lg font-bold text-primary">
                        {formatCurrency(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <Head title="Dashboard - NextGenStock" />

            {/* 
        MAIN LAYOUT CONTAINER 
        Uses bg-background. Supports Light/Dark variables from app.css 
      */}
            <div className="flex h-screen overflow-hidden bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-200">

                {/* === SIDEBAR (Premium Dark Style) === */}
                <aside className={cn(
                    "bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 transition-all duration-300 z-20 shrink-0",
                    sidebarOpen ? "w-64" : "w-[72px]"
                )}>
                    {/* Logo Area */}
                    <div className="h-16 flex items-center px-4 border-b border-slate-800">
                        <div className="flex items-center gap-3 w-full cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <div className="shrink-0 w-8 h-8 rounded-md bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                <LayoutDashboard size={18} className="text-white" />
                            </div>
                            {sidebarOpen && (
                                <span className="font-bold text-white tracking-tight animate-in fade-in duration-200">NextGenStock</span>
                            )}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                        {sidebarOpen && <div className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4 first:mt-0">Menu Principal</div>}

                        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-slate-800/80 text-white group transition-colors">
                            <LayoutDashboard size={18} className="text-primary shrink-0" />
                            {sidebarOpen && <span className="text-sm font-medium">Tableau de Bord</span>}
                        </Link>

                        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/50 group transition-colors">
                            <Package size={18} className="shrink-0 group-hover:text-slate-300 transition-colors" />
                            {sidebarOpen && <span className="text-sm font-medium">Produits</span>}
                        </Link>

                        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/50 group transition-colors">
                            <ShoppingCart size={18} className="shrink-0 group-hover:text-slate-300 transition-colors" />
                            {sidebarOpen && <span className="text-sm font-medium">Commandes</span>}
                        </Link>

                        {sidebarOpen && <div className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6">Rapports</div>}

                        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/50 group transition-colors">
                            <FileText size={18} className="shrink-0 group-hover:text-slate-300 transition-colors" />
                            {sidebarOpen && <span className="text-sm font-medium">Factures</span>}
                        </Link>
                    </nav>

                    {/* User / Settings Footer */}
                    <div className="p-4 border-t border-slate-800">
                        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors">
                            <Settings size={18} className="shrink-0" />
                            {sidebarOpen && <span className="text-sm font-medium">Paramètres</span>}
                        </Link>
                    </div>
                </aside>

                {/* === MAIN CONTENT WRAPPER === */}
                <div className="flex-1 flex flex-col min-w-0">

                    {/* TOPBAR */}
                    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 lg:px-8 shrink-0 relative z-10 shadow-sm">
                        <div className="flex items-center gap-4 flex-1">
                            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                                <Menu className="h-5 w-5 text-muted-foreground" />
                            </Button>

                            {/* Global Search */}
                            <div className="hidden md:flex relative w-full max-w-sm group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Rechercher partout..."
                                    className="pl-9 bg-muted/50 border-transparent hover:border-border focus-visible:bg-background transition-all rounded-full"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 justify-end">
                            <Button variant="outline" size="sm" className="hidden sm:flex text-orange-500 border-orange-500/20 hover:bg-orange-500/10 hover:text-orange-600 gap-2">
                                Nouveau Produit
                            </Button>

                            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-destructive border-2 border-background"></span>
                            </Button>

                            <div className="w-px h-6 bg-border mx-2 hidden sm:block"></div>

                            {/* User Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8 border border-border">
                                            <AvatarImage src="https://ui-avatars.com/api/?name=Admin+User&background=2563EB&color=fff" alt="@admin" />
                                            <AvatarFallback>AU</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">Admin User</p>
                                            <p className="text-xs text-muted-foreground leading-none">admin@nextgenstock.com</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profil</DropdownMenuItem>
                                    <DropdownMenuItem>Paramètres</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10">Déconnexion</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    {/* PAGE SCROLLABLE CONTENT */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/30">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <div>
                                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">Aperçu Général</h1>
                                    <p className="text-sm text-muted-foreground mt-1">L'état actuel de votre activité et inventaire.</p>
                                </div>
                                {/* Period Toggle */}
                                <div className="flex bg-background border border-border rounded-lg p-1 shadow-sm">
                                    <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-muted text-foreground shadow-sm">Aujourd'hui</button>
                                    <button className="px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">7 Jours</button>
                                    <button className="px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">30 Jours</button>
                                </div>
                            </div>

                            {/* KPI CARDS */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                                <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Valeur du Stock</CardTitle>
                                        <div className="p-1.5 bg-primary/10 text-primary rounded-md">
                                            <TrendingUp className="h-4 w-4" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {isLoading ? (
                                            <div className="space-y-2">
                                                <Skeleton className="h-8 w-32" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="text-2xl font-bold tracking-tight">29.5M FCFA</div>
                                                <div className="flex items-center text-xs mt-1 text-muted-foreground">
                                                    <span className="flex items-center text-emerald-500 font-medium mr-2">
                                                        <ArrowUpRight className="h-3 w-3 mr-0.5" /> +12.5%
                                                    </span>
                                                    depuis le mois dernier
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Clients Actifs</CardTitle>
                                        <div className="p-1.5 bg-primary/10 text-primary rounded-md">
                                            <Users className="h-4 w-4" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {isLoading ? (
                                            <div className="space-y-2">
                                                <Skeleton className="h-8 w-24" />
                                                <Skeleton className="h-4 w-32" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="text-2xl font-bold tracking-tight">1,248</div>
                                                <div className="flex items-center text-xs mt-1 text-muted-foreground">
                                                    <span className="flex items-center text-emerald-500 font-medium mr-2">
                                                        <ArrowUpRight className="h-3 w-3 mr-0.5" /> +4.2%
                                                    </span>
                                                    nouveaux ce mois
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Commandes en Cours</CardTitle>
                                        <div className="p-1.5 bg-primary/10 text-primary rounded-md">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {isLoading ? (
                                            <div className="space-y-2">
                                                <Skeleton className="h-8 w-16" />
                                                <Skeleton className="h-4 w-28" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="text-2xl font-bold tracking-tight">42</div>
                                                <div className="flex items-center text-xs mt-1 text-muted-foreground">
                                                    <span className="flex items-center text-red-500 font-medium mr-2">
                                                        <ArrowDownRight className="h-3 w-3 mr-0.5" /> -2.1%
                                                    </span>
                                                    par rapport à hier
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-orange-500/20">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Alertes de Stock</CardTitle>
                                        <div className="p-1.5 bg-orange-500/10 text-orange-500 rounded-md">
                                            <AlertTriangle className="h-4 w-4" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {isLoading ? (
                                            <div className="space-y-2">
                                                <Skeleton className="h-8 w-16" />
                                                <Skeleton className="h-4 w-32" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="text-2xl font-bold tracking-tight text-foreground">8</div>
                                                <div className="flex items-center text-xs mt-1 text-muted-foreground">
                                                    <span className="text-orange-500 font-medium mr-1">3 articles</span> en rupture totale
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>

                            </div>

                            {/* MIDDLE SECTION: Charts & Activity */}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                                {/* CHART AREA */}
                                <Card className="xl:col-span-2 shadow-sm">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <div className="space-y-1">
                                            <CardTitle className="text-base font-semibold">Tendance des Revenus</CardTitle>
                                            <CardDescription>Visualisation de l'année en cours</CardDescription>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <div className="h-[300px] w-full relative">
                                            {isLoading || !mounted ? (
                                                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                                                    <Skeleton className="w-full h-full rounded-md" />
                                                </div>
                                            ) : (
                                                <ResponsiveContainer width="100%" height="100%" debounce={50}>
                                                    <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                                        <defs>
                                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                                {/* Using the primary CSS variable for the SVG gradient */}
                                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <XAxis
                                                            dataKey="name"
                                                            stroke="hsl(var(--muted-foreground))"
                                                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 400 }}
                                                            tickLine={false}
                                                            axisLine={false}
                                                            dy={10}
                                                        />
                                                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                                        <Area
                                                            type="monotone"
                                                            dataKey="value"
                                                            stroke="var(--color-primary)"
                                                            strokeWidth={2}
                                                            fillOpacity={1}
                                                            fill="url(#colorRevenue)"
                                                            activeDot={{ r: 4, strokeWidth: 0, fill: 'var(--color-primary)' }}
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* ACTIVITY FEED */}
                                <Card className="shadow-sm flex flex-col">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
                                        <div>
                                            <CardTitle className="text-base font-semibold">Activité Récente</CardTitle>
                                        </div>
                                        <Link href="#" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                                            Tout voir
                                        </Link>
                                    </CardHeader>
                                    <CardContent className="p-0 flex-1 overflow-y-auto">
                                        {isLoading ? (
                                            <div className="divide-y divide-border/50">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <div key={i} className="p-4 flex gap-4 items-start">
                                                        <Skeleton className="h-8 w-8 rounded-md shrink-0" />
                                                        <div className="space-y-2 flex-1">
                                                            <Skeleton className="h-4 w-full" />
                                                            <Skeleton className="h-3 w-2/3" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-border/50">
                                                {RECENT_ACTIVITY.map((item) => (
                                                    <div key={item.id} className="p-4 hover:bg-muted/30 transition-colors flex items-start gap-4">
                                                        <div className={cn(
                                                            "mt-0.5 p-2 rounded-lg shrink-0",
                                                            item.type === 'order' && "bg-blue-500/10 text-blue-500 dark:text-blue-400",
                                                            item.type === 'stock' && "bg-destructive/10 text-destructive",
                                                            item.type === 'payment' && "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
                                                            item.type === 'user' && "bg-orange-500/10 text-orange-500 dark:text-orange-400"
                                                        )}>
                                                            {item.type === 'order' && <ShoppingCart size={14} />}
                                                            {item.type === 'stock' && <AlertTriangle size={14} />}
                                                            {item.type === 'payment' && <TrendingUp size={14} />}
                                                            {item.type === 'user' && <Users size={14} />}
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                                                            <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                                                        </div>

                                                        <div className="text-right shrink-0">
                                                            <p className="text-sm font-medium text-foreground font-mono">{item.amount}</p>
                                                            <span className={cn(
                                                                "inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded",
                                                                item.status === 'En attente' && 'bg-orange-500/10 text-orange-500 dark:text-orange-400',
                                                                item.status === 'Rupture' && 'bg-destructive/10 text-destructive',
                                                                item.status === 'Validé' && 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400',
                                                                item.status === 'Nouveau' && 'bg-blue-500/10 text-blue-500 dark:text-blue-400',
                                                                item.status === 'Terminé' && 'bg-muted text-muted-foreground'
                                                            )}>
                                                                {item.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                            </div>

                        </div>
                    </main>
                </div>
            </div>

            {/* Scrollbar styling for the new unified theme */}
            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: hsl(var(--border) / 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: hsl(var(--border));
        }
      `}</style>
        </>
    );
}
