<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use App\Services\InvoiceWorkflowService;
use App\Services\StockService;
use App\Services\PdfService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function __construct(
        private InvoiceWorkflowService $workflow,
        private StockService $stockService,
        private PdfService $pdfService
    ) {}

    public function store(Request $request)
    {
        $data = $request->validate([
            'invoice_id' => [
                'required',
                \Illuminate\Validation\Rule::exists('invoices', 'id')->where(function ($query) use ($request) {
                    return $query->where('entreprise_id', $request->user()->entreprise_id);
                }),
            ],
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
            'date' => 'required|date',
            'reference' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $invoice = Invoice::findOrFail($data['invoice_id']);
        $this->authorize('update', $invoice); // Must be allowed to update invoice

        // Invoice must be APPROVED to accept payments
        abort_unless($invoice->status === 'APPROVED', 422, 'La facture doit être approuvée pour recevoir un paiement.');

        DB::transaction(function () use ($data, $request) {
            // Lock the invoice for update inside the transaction against race conditions
            $invoice = Invoice::lockForUpdate()->findOrFail($data['invoice_id']);
            $this->authorize('update', $invoice);

            // Amount cannot exceed due amount
            abort_if($data['amount'] > $invoice->amount_due, 422, 'Le montant dépasse le reste à payer.');

            Payment::create($data);

            // Reload payments to get fresh amount_paid
            $invoice->load('payments');

            // If fully paid, trigger markPaid workflow
            if ($invoice->amount_due <= 0 && $invoice->status !== 'PAID') {
                $this->workflow->markPaid($invoice, $request->user()->id, $this->stockService);
            }
        });

        return response()->json(['message' => 'Paiement enregistré']);
    }

    public function destroy(Request $request, Payment $payment)
    {
        $invoice = $payment->invoice;
        $this->authorize('update', $invoice);

        DB::transaction(function () use ($payment, $invoice, $request) {
            $payment->delete();

            // If it was PAID, revert to APPROVED ? 
            // the workflow `markUnpaid` reverts to PENDING and restores stock.
            // But we might just revert to APPROVED if there are still some payments left.
            // Or use markUnpaid if we want to restore stock? 
            // Wait, if an invoice is PAID and we delete a payment, it ceases to be PAID.
            // Let's just update the status to APPROVED so it needs to be paid again.
            if ($invoice->status === 'PAID') {
                $invoice->update([
                    'status' => 'APPROVED',
                    'paid_by' => null,
                    'paid_at' => null,
                ]);
            }
        });

        return response()->json(['message' => 'Paiement supprimé']);
    }

    public function streamPdf(Payment $payment)
    {
        $this->authorize('view', $payment->invoice);
        return $this->pdfService->streamPaymentReceipt($payment);
    }

    public function downloadPdf(Payment $payment)
    {
        $this->authorize('view', $payment->invoice);
        return $this->pdfService->downloadPaymentReceipt($payment);
    }
}
