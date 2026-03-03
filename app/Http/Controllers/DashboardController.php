<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\DeliveryNote;
use App\Models\Invoice;
use App\Models\Product;
use App\Models\StockMovement;
use App\Models\Activity;
use App\Models\Expense;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function indexAdmin(Request $request)
    {
        $eid = $request->user()->entreprise_id;

        $range = $request->input('range', '7d');
        $startDate = match ($range) {
            '30d' => now()->subDays(30),
            '90d' => now()->subDays(90),
            'year' => now()->startOfYear(),
            default => now()->subDays(7),
        };

        // --- CALCULATION OF PERIOD COMPARISONS (M/M-1) ---
        $currentMonthStart = now()->startOfMonth();
        $currentDate = now();
        $lastMonthStart = now()->subMonth()->startOfMonth();
        $lastMonthSameDay = now()->subMonth(); // Last MTD comparison

        // Revenue (MTD vs Last MTD)
        $revenueMTD = Invoice::where('entreprise_id', $eid)->where('status', 'PAID')
            ->whereBetween('paid_at', [$currentMonthStart, $currentDate])->sum('total');
        $revenueLastMTD = Invoice::where('entreprise_id', $eid)->where('status', 'PAID')
            ->whereBetween('paid_at', [$lastMonthStart, $lastMonthSameDay])->sum('total');
        $revenueDelta = $revenueLastMTD > 0 ? round((($revenueMTD - $revenueLastMTD) / $revenueLastMTD) * 100, 1) : ($revenueMTD > 0 ? 100 : 0);

        // Purchases & Expenses (MTD vs Last MTD)
        $expensesDocsMTD = \App\Models\Expense::where('entreprise_id', $eid)->whereBetween('date', [$currentMonthStart, $currentDate])->sum('amount');
        $purchasesMTD = \App\Models\Purchase::where('entreprise_id', $eid)->whereNotIn('status', ['DRAFT', 'CANCELLED'])->whereBetween('created_at', [$currentMonthStart, $currentDate])->sum('total_amount');
        $expensesMTD = $expensesDocsMTD + $purchasesMTD;

        $expensesDocsLastMTD = \App\Models\Expense::where('entreprise_id', $eid)->whereBetween('date', [$lastMonthStart, $lastMonthSameDay])->sum('amount');
        $purchasesLastMTD = \App\Models\Purchase::where('entreprise_id', $eid)->whereNotIn('status', ['DRAFT', 'CANCELLED'])->whereBetween('created_at', [$lastMonthStart, $lastMonthSameDay])->sum('total_amount');
        $expensesLastMTD = $expensesDocsLastMTD + $purchasesLastMTD;
        $expensesDelta = $expensesLastMTD > 0 ? round((($expensesMTD - $expensesLastMTD) / $expensesLastMTD) * 100, 1) : ($expensesMTD > 0 ? 100 : 0);

        // Net Profit (MTD vs Last MTD)
        $netProfitMTD = $revenueMTD - $expensesMTD;
        $netProfitLastMTD = $revenueLastMTD - $expensesLastMTD;
        $netProfitDelta = $netProfitLastMTD > 0 ? round((($netProfitMTD - $netProfitLastMTD) / abs($netProfitLastMTD)) * 100, 1) : ($netProfitMTD > 0 ? 100 : ($netProfitMTD < 0 ? -100 : 0));

        // Global Cashflow
        $totalRevenue = Invoice::where('entreprise_id', $eid)->where('status', 'PAID')->sum('total');
        $totalExpensesDocs = Expense::where('entreprise_id', $eid)->sum('amount');
        $totalPurchases = Purchase::where('entreprise_id', $eid)->whereNotIn('status', ['DRAFT', 'CANCELLED'])->sum('total_amount');
        $totalExpenses = $totalExpensesDocs + $totalPurchases;
        $netProfit = $totalRevenue - $totalExpenses;

        // Sparkline Data Generation (Last 14 days)
        $sparklineStartDate = now()->subDays(14)->startOfDay();
        $sparklineRevenueQuery = Invoice::where('entreprise_id', $eid)->where('status', 'PAID')
            ->where('paid_at', '>=', $sparklineStartDate)
            ->selectRaw('DATE(paid_at) as date, SUM(total) as total')
            ->groupByRaw('DATE(paid_at)')
            ->pluck('total', 'date');

        // Sparklines logic
        $sparklineExpenseQuery = Expense::where('entreprise_id', $eid)
            ->where('date', '>=', $sparklineStartDate)
            ->selectRaw('DATE(date) as date, SUM(amount) as total')
            ->groupByRaw('DATE(date)')
            ->pluck('total', 'date');

        $sparklinePurchaseQuery = Purchase::where('entreprise_id', $eid)
            ->whereNotIn('status', ['DRAFT', 'CANCELLED'])
            ->where('created_at', '>=', $sparklineStartDate)
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
            ->groupByRaw('DATE(created_at)')
            ->pluck('total', 'date');

        $sparklineRevenue = [];
        $sparklineExpenses = [];
        for ($i = 14; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            
            // Revenue node
            $sparklineRevenue[] = [
                'date' => $date,
                'value' => (float) ($sparklineRevenueQuery[$date] ?? 0)
            ];

            // Expense node (using plucked array instead of loops of N+1 DB queries)
            $dailyExpense = (float) ($sparklineExpenseQuery[$date] ?? 0);
            $dailyPurchase = (float) ($sparklinePurchaseQuery[$date] ?? 0);
            $sparklineExpenses[] = [
                'date' => $date,
                'value' => $dailyExpense + $dailyPurchase
            ];
        }

        // Statistics payload
        $stats = [
            'total_clients' => Client::where('entreprise_id', $eid)->count(),
            'total_products' => Product::where('entreprise_id', $eid)->count(),
            'total_invoices' => Invoice::where('entreprise_id', $eid)->count(),
            'total_revenue' => $totalRevenue,
            'total_expenses' => $totalExpenses,
            'net_profit' => $netProfit,
            'pending_invoices' => Invoice::where('entreprise_id', $eid)->where('status', '!=', 'PAID')->count(),
            
            // Period over Period
            'pop_revenue' => ['mtd' => $revenueMTD, 'last_mtd' => $revenueLastMTD, 'delta' => $revenueDelta],
            'pop_expenses' => ['mtd' => $expensesMTD, 'last_mtd' => $expensesLastMTD, 'delta' => $expensesDelta],
            'pop_net_profit' => ['mtd' => $netProfitMTD, 'last_mtd' => $netProfitLastMTD, 'delta' => $netProfitDelta],

            // Sparklines
            'sparkline_revenue' => $sparklineRevenue,
            'sparkline_expenses' => $sparklineExpenses,
            
            // Revenue by period (unchanged logic for fixed cards)
            'revenue_today' => Invoice::where('entreprise_id', $eid)->where('status', 'PAID')->whereDate('paid_at', today())->sum('total'),
            'revenue_this_week' => Invoice::where('entreprise_id', $eid)->where('status', 'PAID')->whereBetween('paid_at', [now()->startOfWeek(), now()->endOfWeek()])->sum('total'),
            'revenue_this_month' => Invoice::where('entreprise_id', $eid)->where('status', 'PAID')->whereMonth('paid_at', now()->month)->whereYear('paid_at', now()->year)->sum('total'),
        ];

        // Recent Invoices
        $recentInvoices = Invoice::where('entreprise_id', $eid)->with(['client'])->latest()->take(5)->get();

        // Recent Stock Movements
        $recentMovements = StockMovement::where('entreprise_id', $eid)->with(['product', 'user'])->latest()->take(5)->get();

        // Daily Revenue Breakdown (Dynamic Range)
        $dailyRevenue = Invoice::where('entreprise_id', $eid)
            ->where('status', 'PAID')
            ->whereNotNull('paid_at')
            ->where('paid_at', '>=', $startDate)
            ->selectRaw('DATE(paid_at) as date, SUM(total) as revenue')
            ->groupByRaw('DATE(paid_at)')
            ->orderByRaw('DATE(paid_at) asc') 
            ->get();

        // Revenue distribution by client (Dynamic Range)
        $revenueByClient = Invoice::where('invoices.entreprise_id', $eid)
            ->where('status', 'PAID')
            ->where('paid_at', '>=', $startDate)
            ->join('clients', 'invoices.client_id', '=', 'clients.id')
            ->selectRaw('clients.name as client_name, SUM(invoices.total) as total')
            ->groupBy('clients.id', 'clients.name')
            ->orderByRaw('SUM(invoices.total) desc')
            ->take(5)
            ->get();

        // Revenue by status over time (Dynamic Range)
        $revenueByStatus = Invoice::where('entreprise_id', $eid)
            ->where('created_at', '>=', $startDate)
            ->selectRaw('DATE(created_at) as date, status, SUM(total) as total')
            ->groupByRaw('DATE(created_at), status')
            ->orderByRaw('DATE(created_at) asc')
            ->get()
            ->groupBy('date')
            ->map(function ($items) {
                return [
                    'date' => $items->first()->date,
                    'PAID' => $items->where('status', 'PAID')->sum('total'),
                    'PENDING' => $items->where('status', 'PENDING')->sum('total'),
                    'SENT' => $items->where('status', 'SENT')->sum('total'),
                ];
            })
            ->values();

        // Revenue heatmap (Dynamic Range)
        $revenueHeatmap = Invoice::where('entreprise_id', $eid)
            ->where('status', 'PAID')
            ->whereNotNull('paid_at')
            ->where('paid_at', '>=', $startDate)
            ->selectRaw('EXTRACT(DOW FROM paid_at) as day_of_week, EXTRACT(HOUR FROM paid_at) as hour, SUM(total) as total')
            ->groupByRaw('EXTRACT(DOW FROM paid_at), EXTRACT(HOUR FROM paid_at)')
            ->get();

        // Out of Stock Products (Stock Rupture)
        $stockRuptures = Product::where('entreprise_id', $eid)
            ->whereRaw('quantity <= min_quantity')
            ->orderBy('quantity', 'asc')
            ->take(8)
            ->get();

        // Cashflow Forecasting (Prévisions de Trésorerie) - Prochains 30 Jours
        $currentBalance = $netProfit; // Starting point: Solde global actuel
        $cashflowForecast = [];
        $today = now()->startOfDay();

        // 1. Fetch upcoming positive cashflows (Invoices pending/sent with due dates)
        $upcomingInvoices = Invoice::where('entreprise_id', $eid)
            ->whereIn('status', ['PENDING', 'SENT', 'APPROVED'])
            ->whereNotNull('due_date')
            ->where('due_date', '>=', $today)
            ->where('due_date', '<=', $today->copy()->addDays(30))
            ->selectRaw('DATE(due_date) as date, SUM(total) as amount')
            ->groupByRaw('DATE(due_date)')
            ->pluck('amount', 'date');

        // 2. Fetch upcoming negative cashflows (Purchases pending with expected delivery/payment dates or just created_at + 30 days as due_date if none exists)
        // Since Purchase model doesn't seem to have a strict 'due_date' in schema, let's assume 'PENDING' purchases will be paid within 15 days of creation for forecast.
        // Let's check if there is an expected date.
        
        // For accurate forecasting without due_date on purchases, we'll assume pending purchases are paid based on a default 15-day term from creation.
        $upcomingPurchases = Purchase::where('entreprise_id', $eid)
            ->where('status', 'PENDING')
            ->selectRaw('DATE(created_at + INTERVAL \'15 days\') as date, SUM(total_amount) as amount')
            ->groupByRaw('DATE(created_at + INTERVAL \'15 days\')')
            ->havingRaw('DATE(created_at + INTERVAL \'15 days\') >= ?', [$today->format('Y-m-d')])
            ->havingRaw('DATE(created_at + INTERVAL \'15 days\') <= ?', [$today->copy()->addDays(30)->format('Y-m-d')])
            ->pluck('amount', 'date');

        $runningBalance = $currentBalance;
        
        for ($i = 0; $i <= 30; $i++) {
            $forecastDate = $today->copy()->addDays($i)->format('Y-m-d');
            
            $incoming = (float) ($upcomingInvoices[$forecastDate] ?? 0);
            $outgoing = (float) ($upcomingPurchases[$forecastDate] ?? 0);
            
            $runningBalance = $runningBalance + $incoming - $outgoing;
            
            $cashflowForecast[] = [
                'date' => $forecastDate,
                'balance' => $runningBalance,
                'in' => $incoming,
                'out' => $outgoing,
            ];
        }

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentInvoices' => $recentInvoices,
            'recentMovements' => $recentMovements,
            'dailyRevenue' => $dailyRevenue,
            'revenueByClient' => $revenueByClient,
            'revenueByStatus' => $revenueByStatus,
            'revenueHeatmap' => $revenueHeatmap,
            'stockRuptures' => $stockRuptures,
            'cashflowForecast' => $cashflowForecast,
        ]);
    }

    public function indexUser(Request $request)
    {
        $user = $request->user();
        $eid = $user->entreprise_id;

        // Statistics for User (Global or Personal? Plan said 'My Invoices'. 
        // But usually dashboard shows global info the user has access to.
        // Let's stick to "My actions" if relevant, or "Global" if that makes more sense.
        // For "Simple SaaS", usually users see everything in their company unless restricted.
        // But the previous plan said "My Invoices count".
        // Let's provide both or just company wide if policies allow viewAny.
        // Policies allow viewAny for same enterprise. So we can show company stats.
        // OR we can filter by `created_by`. 
        // Let's go with Company Wide for now as it's more standard for this app type, 
        // unless "User" is strictly limited. User can see all invoices/clients.
        
        $totalRevenue = Invoice::where('entreprise_id', $eid)
            ->where('status', 'PAID')
            ->sum('total');

        $totalExpensesDocs = \App\Models\Expense::where('entreprise_id', $eid)->sum('amount');
        $totalPurchases = \App\Models\Purchase::where('entreprise_id', $eid)
            ->whereNotIn('status', ['DRAFT', 'CANCELLED'])
            ->sum('total_amount');
        
        $totalExpenses = $totalExpensesDocs + $totalPurchases;
        $netProfit = $totalRevenue - $totalExpenses;

        $stats = [
            'my_invoices_count' => Invoice::where('entreprise_id', $eid)->count(),
            'my_delivery_notes_count' => DeliveryNote::where('entreprise_id', $eid)->count(),
            'total_clients' => Client::where('entreprise_id', $eid)->count(),
            'my_revenue' => $totalRevenue,
            'total_expenses' => $totalExpenses,
            'net_profit' => $netProfit,
            
            // Revenue by period
            'revenue_today' => Invoice::where('entreprise_id', $eid)
                ->where('status', 'PAID')
                ->whereDate('paid_at', today())
                ->sum('total'),
            'revenue_this_week' => Invoice::where('entreprise_id', $eid)
                ->where('status', 'PAID')
                ->whereBetween('paid_at', [now()->startOfWeek(), now()->endOfWeek()])
                ->sum('total'),
            'revenue_this_month' => Invoice::where('entreprise_id', $eid)
                ->where('status', 'PAID')
                ->whereMonth('paid_at', now()->month)
                ->whereYear('paid_at', now()->year)
                ->sum('total'),
        ];

        $recentInvoices = Invoice::where('entreprise_id', $eid)
            ->with(['client'])
            ->latest()
            ->take(5)
            ->get();

        // Daily Revenue Breakdown (last 7 days)
        $dailyRevenue = Invoice::where('entreprise_id', $eid)
            ->where('status', 'PAID')
            ->whereNotNull('paid_at')
            ->where('paid_at', '>=', now()->subDays(7))
            ->selectRaw('DATE(paid_at) as date, SUM(total) as revenue')
            ->groupByRaw('DATE(paid_at)')
            ->orderByRaw('DATE(paid_at) desc')
            ->get();

        return Inertia::render('user/dashboard', [
            'stats' => $stats,
            'recentInvoices' => $recentInvoices,
            'dailyRevenue' => $dailyRevenue,
        ]);
    }
}
