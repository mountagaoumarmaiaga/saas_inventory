<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ReportService;
use Barryvdh\DomPDF\Facade\Pdf;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController extends Controller
{
    /**
     * Display the analytics and reports page.
     */
    public function index(Request $request, ReportService $reportService)
    {
        $entreprise = $request->user()->entreprise;
        
        // Let's generate a full set of metrics to display on the page
        $weeklyMetrics = $reportService->generateMetrics($entreprise, 'weekly');
        $monthlyMetrics = $reportService->generateMetrics($entreprise, 'monthly');
        $yearlyMetrics = $reportService->generateMetrics($entreprise, 'yearly');

        return Inertia::render('admin/reports/index', [
            'metrics' => [
                'weekly' => $weeklyMetrics,
                'monthly' => $monthlyMetrics,
                'yearly' => $yearlyMetrics,
            ],
            // Optionally pass more data for dynamic charts if needed
        ]);
    }

    /**
     * Export the current report data as PDF.
     */
    public function exportPdf(Request $request, ReportService $reportService)
    {
        $entreprise = $request->user()->entreprise;
        $period = $request->query('period', 'monthly');
        
        $metrics = $reportService->generateMetrics($entreprise, $period);
        
        $pdf = Pdf::loadView('reports.performance_pdf', [
            'entreprise' => $entreprise,
            'metrics' => $metrics,
            'period' => $period,
            'date' => now()->format('Y-m-d H:i')
        ]);
        
        return $pdf->download("Rapport_Performances_{$period}_" . now()->format('Ymd') . ".pdf");
    }

    /**
     * Export the current report data as CSV (Excel compatible).
     */
    public function exportExcel(Request $request, ReportService $reportService)
    {
        $entreprise = $request->user()->entreprise;
        $period = $request->query('period', 'monthly');
        
        $metrics = $reportService->generateMetrics($entreprise, $period);
        $fileName = "Rapport_Performances_{$period}_" . now()->format('Ymd') . ".csv";
        
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['Métrique', 'Valeur', 'Description'];

        $callback = function() use($metrics, $columns) {
            $file = fopen('php://output', 'w');
            
            // Add BOM for UTF-8 Excel support
            fputs($file, "\xEF\xBB\xBF");
            
            fputcsv($file, $columns, ';');

            $data = [
                ['Période', ucfirst($metrics['period']), "Du {$metrics['start_date']} au {$metrics['end_date']}"],
                ['Revenu Brut', number_format($metrics['revenue'], 0, ',', ' ') . ' XOF', 'Revenu total généré'],
                ['Revenu en attente', number_format($metrics['pending_revenue'], 0, ',', ' ') . ' XOF', 'Dû non perçu'],
                ['Dépenses & Achats', number_format($metrics['expenses'], 0, ',', ' ') . ' XOF', 'Total des sorties d\'argent'],
                ['Bénéfice Net', number_format($metrics['net_profit'], 0, ',', ' ') . ' XOF', 'Revenu brut - Dépenses'],
                ['Nouveaux Clients', $metrics['new_clients'], 'Clients acquis sur la période'],
                ['Factures Émises', $metrics['new_invoices_count'], 'Nombre de factures générées'],
            ];

            foreach ($data as $row) {
                fputcsv($file, $row, ';');
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
}
