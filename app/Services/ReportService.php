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
        ];
    }
}
