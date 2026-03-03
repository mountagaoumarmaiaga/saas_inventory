import { useState } from 'react';
import { router } from '@inertiajs/react';
import { startOfMonth, subMonths, subDays, startOfYear } from 'date-fns';

export type DateRange = '7d' | '30d' | '90d' | 'year';

interface DashboardStats {
    total_clients: number;
    total_products: number;
    total_invoices: number;
    total_revenue: number;
    total_expenses: number;
    net_profit: number;
    pending_invoices: number;
    revenue_today: number;
    revenue_this_week: number;
    revenue_this_month: number;
    pop_revenue?: { mtd: number; last_mtd: number; delta: number };
    pop_expenses?: { mtd: number; last_mtd: number; delta: number };
    pop_net_profit?: { mtd: number; last_mtd: number; delta: number };
    sparkline_revenue?: { date: string; value: number }[];
    sparkline_expenses?: { date: string; value: number }[];
}

export function useDashboardStats(initialStats: DashboardStats) {
    const [dateRange, setDateRange] = useState<DateRange>('7d');
    const [loading, setLoading] = useState(false);

    const handleRangeChange = (range: DateRange) => {
        setDateRange(range);
        setLoading(true);

        // Reload dashboard with new range param
        router.get(
            '/admin/dashboard',
            { range },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['stats', 'dailyRevenue', 'revenueByClient', 'revenueByStatus', 'sparklineData'],
                onFinish: () => setLoading(false),
            }
        );
    };

    // Helper to safely parse numbers
    const safeNumber = (val: any) => {
        const num = Number(val);
        return isNaN(num) ? 0 : num;
    };

    // Sanitize stats to ensure numbers (Laravel SUM() can return null or strings)
    const sanitizedStats = {
        total_clients: safeNumber(initialStats.total_clients),
        total_products: safeNumber(initialStats.total_products),
        total_invoices: safeNumber(initialStats.total_invoices),
        total_revenue: safeNumber(initialStats.total_revenue),
        total_expenses: safeNumber(initialStats.total_expenses),
        net_profit: safeNumber(initialStats.net_profit),
        pending_invoices: safeNumber(initialStats.pending_invoices),
        revenue_today: safeNumber(initialStats.revenue_today),
        revenue_this_week: safeNumber(initialStats.revenue_this_week),
        revenue_this_month: safeNumber(initialStats.revenue_this_month),
        pop_revenue: initialStats.pop_revenue,
        pop_expenses: initialStats.pop_expenses,
        pop_net_profit: initialStats.pop_net_profit,
        sparkline_revenue: initialStats.sparkline_revenue,
        sparkline_expenses: initialStats.sparkline_expenses,
    };

    // Derived KPIs
    const averageBasket = sanitizedStats.total_invoices > 0
        ? sanitizedStats.total_revenue / sanitizedStats.total_invoices
        : 0;


    return {
        stats: sanitizedStats,
        dateRange,
        loading,
        setDateRange: handleRangeChange,
        kpis: {
            averageBasket,
        }
    };
}
