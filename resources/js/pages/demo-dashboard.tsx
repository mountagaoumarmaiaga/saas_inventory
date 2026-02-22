import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Bell,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Settings,
    TrendingUp,
    Users,
    AlertTriangle,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data
const REVENUE_DATA = [
    { name: 'Jan', value: 12500000 },
    { name: 'Fév', value: 14200000 },
    { name: 'Mar', value: 13800000 },
    { name: 'Avr', value: 16500000 },
    { name: 'Mai', value: 15900000 },
    { name: 'Juin', value: 18200000 },
    { name: 'Juil', value: 21500000 },
    { name: 'Août', value: 19800000 },
    { name: 'Sep', value: 24500000 },
    { name: 'Oct', value: 23200000 },
    { name: 'Nov', value: 26800000 },
    { name: 'Déc', value: 29500000 },
];

const RECENT_ACTIVITY = [
    { id: 1, type: 'order', title: 'Nouvelle commande #CMD-2849', time: 'Il y a 10 min', amount: '820 000 FCFA', status: 'En attente' },
    { id: 2, type: 'stock', title: 'Stock critique: Sony A7 IV', time: 'Il y a 45 min', amount: '0 unités', status: 'Rupture' },
    { id: 3, type: 'payment', title: 'Paiement reçu - Facture #FA-102', time: 'Il y a 2 heures', amount: '1 250 000 FCFA', status: 'Validé' },
    { id: 4, type: 'order', title: 'Commande livrée #CMD-2845', time: 'Hier à 14:30', amount: '450 000 FCFA', status: 'Terminé' },
    { id: 5, type: 'user', title: 'Nouveau client: Tech Solutions', time: 'Hier à 09:15', amount: '-', status: 'Nouveau' },
];

export default function Dashboard() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#18181B] border border-[#2A2A2A] rounded-lg shadow-2xl p-3">
                    <p className="text-xs font-semibold text-zinc-500 mb-1">{label} 2026</p>
                    <p className="text-lg font-bold text-white">
                        {formatCurrency(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <Head title="Tableau de bord - NextGenStock" />

            <div className="h-screen w-full flex bg-[#0A0A0A] text-white font-sans overflow-hidden selection:bg-orange-500/30 selection:text-white">

                {/* SIDEBAR */}
                <aside className="w-64 bg-[#121212] flex flex-col border-r border-[#2A2A2A] shrink-0">
                    <div className="h-16 flex items-center px-6 border-b border-[#2A2A2A]">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-sm bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]"></div>
                            <span className="font-bold tracking-tight text-white text-lg">NextGenStock</span>
                        </div>
                    </div>

                    <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#2A2A2A]/30 text-white border border-[#2A2A2A]/50 transition-colors duration-200">
                            <LayoutDashboard size={18} className="text-orange-500" />
                            <span className="text-sm font-medium">Tableau de bord</span>
                        </Link>

                        <div className="pt-6 pb-2">
                            <span className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Catalogue</span>
                        </div>

                        <Link href="/inventory-demo" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-[#2A2A2A]/50 transition-colors duration-200">
                            <Package size={18} />
                            <span className="text-sm font-medium">Produits</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-[#2A2A2A]/50 transition-colors duration-200">
                            <ShoppingCart size={18} />
                            <span className="text-sm font-medium">Commandes</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-[#2A2A2A]/50 transition-colors duration-200">
                            <Users size={18} />
                            <span className="text-sm font-medium">Clients</span>
                        </Link>
                    </nav>

                    <div className="p-4 border-t border-[#2A2A2A]">
                        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-[#2A2A2A]/50 transition-colors duration-200">
                            <Settings size={18} />
                            <span className="text-sm font-medium">Paramètres</span>
                        </Link>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 flex flex-col overflow-hidden">

                    {/* Top Navbar */}
                    <header className="h-16 flex items-center justify-between px-8 border-b border-[#2A2A2A] bg-[#0A0A0A] shrink-0">
                        <div className="text-sm font-medium text-white tracking-wide">
                            Aperçu Général
                        </div>

                        <div className="flex items-center gap-5">
                            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-[#2A2A2A]/50">
                                <Bell size={18} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 border border-[#0A0A0A]"></span>
                            </button>
                            <div className="h-6 w-px bg-[#2A2A2A]"></div>
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-white group-hover:text-orange-500 transition-colors">Admin User</p>
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Super Admin</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500 border border-[#2A2A2A] overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=Admin+User&background=18181B&color=f97316" alt="Avatar" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        <div className="max-w-7xl mx-auto space-y-6">

                            {/* PAGE HEADER */}
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h1 className="text-2xl font-semibold text-white tracking-tight">Bonjour, Admin</h1>
                                    <p className="text-sm text-zinc-500 mt-1">Voici ce qui se passe avec votre inventaire aujourd'hui.</p>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 bg-[#121212] border border-[#2A2A2A] rounded-md p-1">
                                    <button className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2A2A2A] rounded shadow-sm">Aujourd'hui</button>
                                    <button className="px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors">7D</button>
                                    <button className="px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors">30D</button>
                                    <button className="px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors">1Y</button>
                                </div>
                            </div>

                            {/* KPI CARDS (Top Row) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 ml:grid-cols-4 gap-4">
                                {/* Card 1: Revenue */}
                                <div className="bg-[#18181B] border border-[#2A2A2A] rounded-xl p-5 shadow-sm hover:border-[#3A3A3A] transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-sm font-medium text-zinc-400">Chiffre d'Affaires</p>
                                        <div className="p-2 bg-[#2A2A2A]/50 rounded-lg text-white group-hover:text-orange-500 transition-colors">
                                            <TrendingUp size={18} />
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-3">
                                        <h3 className="text-2xl font-bold text-white tracking-tight">29.5M FCFA</h3>
                                    </div>
                                    <div className="mt-2 flex items-center text-xs">
                                        <span className="flex items-center text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                            <ArrowUpRight size={12} className="mr-0.5" /> +12.5%
                                        </span>
                                        <span className="text-zinc-600 ml-2">vs mois dernier</span>
                                    </div>
                                </div>

                                {/* Card 2: Active Clients */}
                                <div className="bg-[#18181B] border border-[#2A2A2A] rounded-xl p-5 shadow-sm hover:border-[#3A3A3A] transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-sm font-medium text-zinc-400">Clients Actifs</p>
                                        <div className="p-2 bg-[#2A2A2A]/50 rounded-lg text-white group-hover:text-orange-500 transition-colors">
                                            <Users size={18} />
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-3">
                                        <h3 className="text-2xl font-bold text-white tracking-tight">1,248</h3>
                                    </div>
                                    <div className="mt-2 flex items-center text-xs">
                                        <span className="flex items-center text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                            <ArrowUpRight size={12} className="mr-0.5" /> +4.2%
                                        </span>
                                        <span className="text-zinc-600 ml-2">vs mois dernier</span>
                                    </div>
                                </div>

                                {/* Card 3: Pending Orders */}
                                <div className="bg-[#18181B] border border-[#2A2A2A] rounded-xl p-5 shadow-sm hover:border-[#3A3A3A] transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-sm font-medium text-zinc-400">Commandes en cours</p>
                                        <div className="p-2 bg-[#2A2A2A]/50 rounded-lg text-white group-hover:text-orange-500 transition-colors">
                                            <Clock size={18} />
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-3">
                                        <h3 className="text-2xl font-bold text-white tracking-tight">42</h3>
                                    </div>
                                    <div className="mt-2 flex items-center text-xs">
                                        <span className="flex items-center text-red-400 font-medium bg-red-500/10 px-1.5 py-0.5 rounded">
                                            <ArrowDownRight size={12} className="mr-0.5" /> -2.1%
                                        </span>
                                        <span className="text-zinc-600 ml-2">vs mois dernier</span>
                                    </div>
                                </div>

                                {/* Card 4: Low Stock Alerts */}
                                <div className="bg-[#18181B] border border-[#2A2A2A] rounded-xl p-5 shadow-sm hover:border-[#3A3A3A] transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-sm font-medium text-zinc-400">Alertes Stock</p>
                                        <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-500">
                                            <AlertTriangle size={18} />
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-3">
                                        <h3 className="text-2xl font-bold text-white tracking-tight">8</h3>
                                    </div>
                                    <div className="mt-2 flex items-center text-xs">
                                        <span className="text-orange-400 font-medium">3 en rupture totale</span>
                                    </div>
                                </div>
                            </div>

                            {/* MIDDLE SECTION: Charts & Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Revenue Trend Chart */}
                                <div className="lg:col-span-2 bg-[#18181B] border border-[#2A2A2A] rounded-xl shadow-sm flex flex-col">
                                    <div className="p-5 border-b border-[#2A2A2A] flex justify-between items-center">
                                        <div>
                                            <h2 className="text-base font-semibold text-white">Évolution des Revenus</h2>
                                            <p className="text-xs text-zinc-500 mt-0.5">Performance sur l'année en cours (FCFA)</p>
                                        </div>
                                        <button className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-[#2A2A2A] transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                    <div className="flex-1 p-5 min-h-[300px] relative">
                                        {!mounted ? (
                                            <div className="w-full h-full flex items-center justify-center border border-dashed border-[#2A2A2A] rounded-lg">
                                                <Activity className="size-8 text-zinc-700 animate-pulse" />
                                            </div>
                                        ) : (
                                            <ResponsiveContainer width="100%" height={300} debounce={50}>
                                                <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                                    <defs>
                                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <XAxis
                                                        dataKey="name"
                                                        stroke="#52525b"
                                                        tick={{ fill: '#71717a', fontSize: 11, fontWeight: 500 }}
                                                        tickLine={false}
                                                        axisLine={false}
                                                        dy={10}
                                                    />
                                                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2A2A2A', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke="#f97316"
                                                        strokeWidth={2}
                                                        fillOpacity={1}
                                                        fill="url(#colorRevenue)"
                                                        activeDot={{ r: 4, strokeWidth: 0, fill: '#f97316' }}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        )}
                                    </div>
                                </div>

                                {/* Recent Activity List */}
                                <div className="bg-[#18181B] border border-[#2A2A2A] rounded-xl shadow-sm flex flex-col">
                                    <div className="p-5 border-b border-[#2A2A2A] flex justify-between items-center">
                                        <h2 className="text-base font-semibold text-white">Activité Récente</h2>
                                        <Link href="#" className="text-xs font-medium text-orange-500 hover:text-orange-400 transition-colors">
                                            Voir tout
                                        </Link>
                                    </div>
                                    <div className="flex-1 p-0 overflow-y-auto">
                                        <div className="divide-y divide-[#2A2A2A]">
                                            {RECENT_ACTIVITY.map((item) => (
                                                <div key={item.id} className="p-4 hover:bg-[#2A2A2A]/20 transition-colors flex items-start gap-4 cursor-default">
                                                    <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${item.type === 'order' ? 'bg-blue-500/10 text-blue-400' :
                                                            item.type === 'stock' ? 'bg-red-500/10 text-red-400' :
                                                                item.type === 'payment' ? 'bg-emerald-500/10 text-emerald-400' :
                                                                    'bg-orange-500/10 text-orange-400'
                                                        }`}>
                                                        {item.type === 'order' && <ShoppingCart size={14} />}
                                                        {item.type === 'stock' && <AlertTriangle size={14} />}
                                                        {item.type === 'payment' && <TrendingUp size={14} />}
                                                        {item.type === 'user' && <Users size={14} />}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-white truncate">{item.title}</p>
                                                        <p className="text-xs text-zinc-500 mt-0.5">{item.time}</p>
                                                    </div>

                                                    <div className="text-right shrink-0">
                                                        <p className="text-sm font-medium text-white font-mono">{item.amount}</p>
                                                        <span className={`inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded ${item.status === 'En attente' ? 'bg-orange-500/10 text-orange-400' :
                                                                item.status === 'Rupture' ? 'bg-red-500/10 text-red-400' :
                                                                    item.status === 'Validé' ? 'bg-emerald-500/10 text-emerald-400' :
                                                                        item.status === 'Nouveau' ? 'bg-blue-500/10 text-blue-400' :
                                                                            'bg-zinc-500/10 text-zinc-400'
                                                            }`}>
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-3 border-t border-[#2A2A2A] text-center bg-[#121212] rounded-b-xl">
                                        <button className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">
                                            Charger plus d'activités
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </main>

            </div>

            {/* Global minimal scrollbar override for this demo page */}
            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #2A2A2A;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #3f3f46;
        }
      `}</style>
        </>
    );
}
