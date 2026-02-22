import { useState } from 'react';
import { router } from '@inertiajs/react';
import { startOfMonth, subMonths, subDays, startOfYear } from 'date-fns';

export type DateRange = '7d' | '30d' | '90d' | 'year';

interface DashboardStats {
    total_clients: number;
    total_products: number;
    total_invoices: number;
    total_revenue: number;
    pending_invoices: number;
    revenue_today: number;
    revenue_this_week: number;
    revenue_this_month: number;
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
        pending_invoices: safeNumber(initialStats.pending_invoices),
        revenue_today: safeNumber(initialStats.revenue_today),
        revenue_this_week: safeNumber(initialStats.revenue_this_week),
        revenue_this_month: safeNumber(initialStats.revenue_this_month),
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
