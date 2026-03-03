<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AccountingExportController extends Controller
{
    /**
     * Export Invoices to a CSV suitable for Accounting Software (Xero, Quickbooks, Excel)
     */
    public function exportCsv(Request $request)
    {
        $eid = $request->user()->entreprise_id;
        
        $month = $request->input('month', now()->month);
        $year = $request->input('year', now()->year);

        $invoices = Invoice::with(['client', 'items'])
            ->where('entreprise_id', $eid)
            ->whereMonth('date', $month)
            ->whereYear('date', $year)
            ->whereIn('status', ['APPROVED', 'PAID'])
            ->get();

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="accounting_export_' . $year . '_' . str_pad($month, 2, '0', STR_PAD_LEFT) . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $columns = [
            'ContactName', 
            'InvoiceNumber', 
            'InvoiceDate', 
            'DueDate', 
            'Description', 
            'Quantity', 
            'UnitAmount', 
            'TaxAmount', 
            'TotalAmount', 
            'Status'
        ];

        $callback = function () use ($invoices, $columns) {
            $file = fopen('php://output', 'w');
            
            // Add BOM to fix UTF-8 in Excel
            fputs($file, $bom =(chr(0xEF) . chr(0xBB) . chr(0xBF)));

            fputcsv($file, $columns, ';');

            foreach ($invoices as $invoice) {
                if ($invoice->items && $invoice->items->count() > 0) {
                    foreach ($invoice->items as $item) {
                        $taxAmount = ($item->line_total * $invoice->tva) / 100;
                        fputcsv($file, [
                            $invoice->client ? $invoice->client->name : 'Unknown',
                            $invoice->number,
                            $invoice->date->format('Y-m-d'),
                            $invoice->due_date ? $invoice->due_date->format('Y-m-d') : '',
                            $item->description,
                            $item->quantity,
                            $item->unit_price,
                            $taxAmount,
                            $item->line_total + $taxAmount,
                            $invoice->status
                        ], ';');
                    }
                } else {
                    $taxAmount = ($invoice->subtotal * $invoice->tva) / 100;
                    fputcsv($file, [
                        $invoice->client ? $invoice->client->name : 'Unknown',
                        $invoice->number,
                        $invoice->date->format('Y-m-d'),
                        $invoice->due_date ? $invoice->due_date->format('Y-m-d') : '',
                        'Vente globale',
                        1,
                        $invoice->subtotal,
                        $taxAmount,
                        $invoice->total,
                        $invoice->status
                    ], ';');
                }
            }
            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
}
