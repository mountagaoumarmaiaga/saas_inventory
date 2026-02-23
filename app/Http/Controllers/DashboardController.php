<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\DeliveryNote;
use App\Models\Invoice;
use App\Models\Product;
use App\Models\StockMovement;
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

        // Statistics
        $stats = [
            'total_clients' => Client::where('entreprise_id', $eid)->count(),
            'total_products' => Product::where('entreprise_id', $eid)->count(),
            'total_invoices' => Invoice::where('entreprise_id', $eid)->count(),
            'total_revenue' => Invoice::where('entreprise_id', $eid)
                ->where('status', 'PAID')
                ->sum('total'),
            'pending_invoices' => Invoice::where('entreprise_id', $eid)
                ->where('status', '!=', 'PAID')
                ->count(),
            
            // Revenue by period (unchanged logic for fixed cards)
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

        // Recent Invoices
        $recentInvoices = Invoice::where('entreprise_id', $eid)
            ->with(['client'])
            ->latest()
            ->take(5)
            ->get();

        // Recent Stock Movements
        $recentMovements = StockMovement::where('entreprise_id', $eid)
            ->with(['product', 'user'])
            ->latest()
            ->take(5)
            ->get();

        // Daily Revenue Breakdown (Dynamic Range)
        $dailyRevenue = Invoice::where('entreprise_id', $eid)
            ->where('status', 'PAID')
            ->whereNotNull('paid_at')
            ->where('paid_at', '>=', $startDate)
            ->selectRaw('DATE(paid_at) as date, SUM(total) as revenue')
            ->groupByRaw('DATE(paid_at)')
            ->orderByRaw('DATE(paid_at) asc') // Order ASC for chart
            ->get();

        // Sparkline data (Dynamic Range)
        // ... (Keep simplified or remove if unused by new dashboard, but keeping for compatibility if needed)
        $sparklineData = []; 

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

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentInvoices' => $recentInvoices,
            'recentMovements' => $recentMovements,
            'dailyRevenue' => $dailyRevenue,
            'sparklineData' => $sparklineData,
            'revenueByClient' => $revenueByClient,
            'revenueByStatus' => $revenueByStatus,
            'revenueHeatmap' => $revenueHeatmap,
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
        
        $stats = [
            'my_invoices_count' => Invoice::where('entreprise_id', $eid)->count(),
            'my_delivery_notes_count' => DeliveryNote::where('entreprise_id', $eid)->count(),
            'total_clients' => Client::where('entreprise_id', $eid)->count(),
            'my_revenue' => Invoice::where('entreprise_id', $eid)
                ->where('status', 'PAID')
                ->sum('total'),
            
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
