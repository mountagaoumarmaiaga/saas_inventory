import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Search,
    ChevronDown,
    Plus,
    MoreHorizontal,
    LayoutDashboard,
    Package,
    ShoppingCart,
    FileText,
    Settings,
    Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const INVENTORY_DATA = [
    {
        id: 1,
        name: 'MacBook Pro M3 Max',
        sku: 'SKU-MBP-14-M3',
        category: 'Électronique',
        stock: 45,
        maxStock: 100,
        price: '2 150 000 FCFA',
        status: 'En Stock',
    },
    {
        id: 2,
        name: 'Chaise Ergonomique Herman Miller',
        sku: 'SKU-HM-AERON-BLK',
        category: 'Mobilier Bureau',
        stock: 12,
        maxStock: 50,
        price: '850 000 FCFA',
        status: 'Stock Faible',
    },
    {
        id: 3,
        name: 'Sony A7 IV Appareil Photo',
        sku: 'SKU-SONY-A7M4',
        category: 'Photographie',
        stock: 0,
        maxStock: 25,
        price: '1 600 000 FCFA',
        status: 'Rupture',
    },
    {
        id: 4,
        name: 'Écran Dell UltraSharp 32"',
        sku: 'SKU-DELL-U3223QE',
        category: 'Électronique',
        stock: 128,
        maxStock: 200,
        price: '650 000 FCFA',
        status: 'En Stock',
    },
    {
        id: 5,
        name: 'Clavier Mécanique Keychron Q1',
        sku: 'SKU-KEY-Q1-PRO',
        category: 'Accessoires',
        stock: 8,
        maxStock: 40,
        price: '145 000 FCFA',
        status: 'Stock Faible',
    }
];

export default function ProductInventory() {
    return (
        <>
            <Head title="Inventaire / Produits - NextGenStock" />

            {/* FULL PAGE LAYOUT */}
            <div className="h-screen w-full flex bg-[#0A0A0A] text-white font-sans overflow-hidden">

                {/* SIDEBAR */}
                <aside className="w-64 bg-[#121212] flex flex-col border-r border-[#2A2A2A] shrink-0">
                    <div className="h-16 flex items-center px-6 border-b border-[#2A2A2A]">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-sm bg-orange-500"></div>
                            <span className="font-bold tracking-tight text-white">NextGenStock</span>
                        </div>
                    </div>

                    <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-[#2A2A2A]/50 transition-colors duration-200">
                            <LayoutDashboard size={18} />
                            <span className="text-sm font-medium">Tableau de bord</span>
                        </Link>

                        <div className="pt-4 pb-1">
                            <span className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Catalogue</span>
                        </div>

                        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#2A2A2A]/30 text-white border border-[#2A2A2A]/50 transition-colors duration-200">
                            <Package size={18} className="text-orange-500" />
                            <span className="text-sm font-medium">Produits</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-[#2A2A2A]/50 transition-colors duration-200">
                            <ShoppingCart size={18} />
                            <span className="text-sm font-medium">Commandes</span>
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
                        <div className="text-sm font-medium text-zinc-500">
                            Inventaire <span className="mx-2">/</span> <span className="text-white">Produits</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-[#2A2A2A]/50">
                                <Bell size={18} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 border border-[#0A0A0A]"></span>
                            </button>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500 border border-[#2A2A2A]"></div>
                        </div>
                    </header>

                    {/* Page Content Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-8">
                        <div className="max-w-7xl mx-auto space-y-6">

                            {/* PAGE HEADER & ACTIONS */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <h1 className="text-2xl font-semibold text-white tracking-tight">Inventaire</h1>

                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    {/* Search */}
                                    <div className="relative group">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 size-4 group-focus-within:text-orange-500 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Search products, SKU..."
                                            className="h-10 w-full sm:w-64 pl-10 pr-4 rounded-md bg-[#121212] border border-[#2A2A2A] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200"
                                        />
                                    </div>

                                    {/* Filters */}
                                    <button className="h-10 px-4 flex items-center gap-2 rounded-md bg-[#121212] border border-[#2A2A2A] text-sm font-medium text-zinc-300 hover:bg-[#2A2A2A]/50 transition-colors duration-200">
                                        Catégorie
                                        <ChevronDown size={14} className="text-zinc-500" />
                                    </button>
                                    <button className="h-10 px-4 flex items-center gap-2 rounded-md bg-[#121212] border border-[#2A2A2A] text-sm font-medium text-zinc-300 hover:bg-[#2A2A2A]/50 transition-colors duration-200">
                                        Statut
                                        <ChevronDown size={14} className="text-zinc-500" />
                                    </button>

                                    {/* CTA */}
                                    <button className="h-10 px-4 flex items-center gap-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors duration-200 shadow-[0_0_15px_rgba(249,115,22,0.15)] ml-auto sm:ml-0">
                                        <Plus size={16} />
                                        Nouveau Produit
                                    </button>
                                </div>
                            </div>

                            {/* DATA TABLE CONTAINER */}
                            <div className="bg-[#18181B] rounded-lg border border-[#2A2A2A] overflow-hidden flex flex-col shadow-2xl">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse whitespace-nowrap">
                                        <thead>
                                            <tr className="border-b border-[#2A2A2A]">
                                                <th className="px-6 py-4 w-12 text-center">
                                                    <input type="checkbox" className="rounded-sm border-[#2A2A2A] bg-[#121212] checked:bg-orange-500 checked:border-orange-500 focus:ring-orange-500 focus:ring-offset-[#18181B]" />
                                                </th>
                                                <th className="px-6 py-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Produit</th>
                                                <th className="px-6 py-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Catégorie</th>
                                                <th className="px-6 py-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Niveau de Stock</th>
                                                <th className="px-6 py-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-right">Prix Unitaire</th>
                                                <th className="px-6 py-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Statut</th>
                                                <th className="px-6 py-4 w-16"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#2A2A2A]">
                                            {INVENTORY_DATA.map((product) => {
                                                const stockRatio = product.stock / product.maxStock;
                                                const barColor = stockRatio > 0.5 ? 'bg-emerald-500' : stockRatio > 0 ? 'bg-orange-500' : 'bg-red-500';

                                                return (
                                                    <tr key={product.id} className="group hover:bg-[#2A2A2A]/30 transition-colors duration-200 cursor-pointer">
                                                        <td className="px-6 py-4 align-middle text-center">
                                                            <input type="checkbox" className="rounded-sm border-[#2A2A2A] bg-[#121212] checked:bg-orange-500 checked:border-orange-500 opacity-50 group-hover:opacity-100 transition-opacity focus:ring-orange-500 focus:ring-offset-[#18181B]" />
                                                        </td>
                                                        <td className="px-6 py-4 align-middle">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-md bg-[#2A2A2A]/50 border border-[#2A2A2A] flex items-center justify-center shrink-0 overflow-hidden">
                                                                    <Package size={16} className="text-zinc-600" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-medium text-white">{product.name}</span>
                                                                    <span className="text-xs text-zinc-500 mt-0.5">{product.sku}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 align-middle text-sm text-zinc-400">
                                                            {product.category}
                                                        </td>
                                                        <td className="px-6 py-4 align-middle">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-sm font-medium text-white w-8">{product.stock}</span>
                                                                <div className="w-24 h-1.5 rounded-full bg-[#2A2A2A] overflow-hidden">
                                                                    <div
                                                                        className={`h-full rounded-full ${barColor}`}
                                                                        style={{ width: `${Math.max(2, stockRatio * 100)}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 align-middle text-sm font-medium text-white text-right font-mono">
                                                            {product.price}
                                                        </td>
                                                        <td className="px-6 py-4 align-middle">
                                                            <span className={cn(
                                                                "inline-flex items-center px-2 py-1 rounded-md text-[11px] font-semibold tracking-wide",
                                                                product.status === 'En Stock' && "bg-emerald-500/10 text-emerald-400",
                                                                product.status === 'Stock Faible' && "bg-orange-500/10 text-orange-400",
                                                                product.status === 'Rupture' && "bg-red-500/10 text-red-400",
                                                            )}>
                                                                {product.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 align-middle text-right">
                                                            <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-[#2A2A2A] rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                                                <MoreHorizontal size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* TABLE FOOTER / PAGINATION */}
                                <div className="px-6 py-4 border-t border-[#2A2A2A] bg-[#18181B] flex items-center justify-between">
                                    <span className="text-sm text-zinc-500">
                                        Affichage de <span className="font-medium text-zinc-300">1</span> à <span className="font-medium text-zinc-300">5</span> sur <span className="font-medium text-zinc-300">245</span> résultats
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 text-sm font-medium text-zinc-400 bg-[#121212] border border-[#2A2A2A] rounded-md hover:bg-[#2A2A2A]/50 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                            Précédent
                                        </button>
                                        <button className="px-3 py-1.5 text-sm font-medium text-zinc-400 bg-[#121212] border border-[#2A2A2A] rounded-md hover:bg-[#2A2A2A]/50 hover:text-white transition-colors">
                                            Suivant
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </main>

            </div>
        </>
    );
}
