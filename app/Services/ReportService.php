<?php

namespace App\Services;

use App\Models\Entreprise;
use App\Models\Invoice;
use App\Models\Expense;
use App\Models\Purchase;
use App\Models\Client;
use Carbon\Carbon;

class ReportService
{
    /**
     * Generate financial metrics for a specific period (e.g., 'daily', 'weekly', 'monthly')
     */
    public function generateMetrics(Entreprise $entreprise, string $period = 'monthly'): array
    {
        $eid = $entreprise->id;
        $now = now();
        
        // Define timeframe based on period string
        $startDate = match ($period) {
            'daily' => $now->copy()->startOfDay(),
            'weekly' => $now->copy()->startOfWeek(),
            'monthly' => $now->copy()->startOfMonth(),
            'quarterly' => $now->copy()->startOfQuarter(),
            'yearly' => $now->copy()->startOfYear(),
            default => $now->copy()->subDays(30),
        };

        // Revenue (paid invoices only)
        $revenue = Invoice::where('entreprise_id', $eid)
            ->where('status', 'PAID')
            ->whereBetween('paid_at', [$startDate, $now])
            ->sum('total');

        // Pending Revenue (sent or pending invoices)
        $pendingRevenue = Invoice::where('entreprise_id', $eid)
            ->whereIn('status', ['SENT', 'PENDING'])
            ->whereBetween('created_at', [$startDate, $now])
            ->sum('total');

        // Expenses
        $expensesDocs = Expense::where('entreprise_id', $eid)
            ->whereBetween('date', [$startDate, $now])
            ->sum('amount');
            
        $purchases = Purchase::where('entreprise_id', $eid)
            ->whereNotIn('status', ['DRAFT', 'CANCELLED'])
            ->whereBetween('created_at', [$startDate, $now])
            ->sum('total_amount');
            
        $totalExpenses = $expensesDocs + $purchases;

        // Net Profit
        $netProfit = $revenue - $totalExpenses;

        // Count metrics
        $newClients = Client::where('entreprise_id', $eid)
            ->whereBetween('created_at', [$startDate, $now])
            ->count();
            
        $newInvoicesCount = Invoice::where('entreprise_id', $eid)
            ->whereBetween('created_at', [$startDate, $now])
            ->count();

        // Top Products
        $topProducts = \App\Models\InvoiceItem::whereHas('invoice', function ($q) use ($eid, $startDate, $now) {
                $q->where('entreprise_id', $eid)
                  ->where('status', 'PAID')
                  ->whereBetween('paid_at', [$startDate, $now]);
            })
            ->selectRaw('product_id, SUM(quantity) as total_quantity, SUM(line_total) as total_revenue')
            ->groupBy('product_id')
            ->orderByDesc('total_revenue')
            ->with('product:id,name')
            ->take(5)
            ->get();

        // Sales Evolution
        $salesEvolutionQuery = Invoice::where('entreprise_id', $eid)
            ->where('status', 'PAID')
            ->whereBetween('paid_at', [$startDate, $now]);

        $driver = \Illuminate\Support\Facades\DB::connection()->getDriverName();
        $formatYearly = match ($driver) {
            'pgsql' => "TO_CHAR(paid_at, 'YYYY-MM')",
            'sqlite' => "strftime('%Y-%m', paid_at)",
            default => "DATE_FORMAT(paid_at, '%Y-%m')",
        };
        $formatOther = match ($driver) {
            'pgsql' => "TO_CHAR(paid_at, 'YYYY-MM-DD')",
            'sqlite' => "date(paid_at)",
            default => "DATE(paid_at)",
        };

        if ($period === 'yearly') {
            $salesEvolution = $salesEvolutionQuery
                ->selectRaw("$formatYearly as date_label, SUM(total) as revenue")
                ->groupBy('date_label')
                ->orderBy('date_label')
                ->get();
        } else {
            $salesEvolution = $salesEvolutionQuery
                ->selectRaw("$formatOther as date_label, SUM(total) as revenue")
                ->groupBy('date_label')
                ->orderBy('date_label')
                ->get();
        }

        return [
            'period' => $period,
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $now->format('Y-m-d'),
            'revenue' => $revenue,
            'pending_revenue' => $pendingRevenue,
            'expenses' => $totalExpenses,
            'net_profit' => $netProfit,
            'new_clients' => $newClients,
            'new_invoices_count' => $newInvoicesCount,
            'top_products' => $topProducts,
            'sales_evolution' => $salesEvolution,
        ];
    }
}
