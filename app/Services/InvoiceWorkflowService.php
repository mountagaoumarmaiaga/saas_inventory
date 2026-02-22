<?php

namespace App\Services;

use App\Models\Invoice;
use Illuminate\Support\Facades\DB;
use App\Services\DeliveryNoteService;
use App\Services\NumberService;

class InvoiceWorkflowService
{
    public function __construct(
        private DeliveryNoteService $deliveryNoteService,
        private NumberService $numberService
    ) {}

    public function recalcTotals(Invoice $invoice): void
    {
        $subtotal = $invoice->items()->sum('line_total');
        $tva = (int)($invoice->tva ?? 20);
        $total = $subtotal + ($subtotal * $tva / 100);

        $invoice->update([
            'subtotal' => $subtotal,
            'total' => $total,
        ]);
    }

    public function submitInvoice(Invoice $invoice): void
    {
        abort_unless($invoice->type === 'invoice' && $invoice->status === 'DRAFT', 422);
        $invoice->update(['status' => 'PENDING']);
    }

    public function approveInvoice(Invoice $invoice, int $adminId, StockService $stockService): void
    {
        abort_unless($invoice->type === 'invoice' && $invoice->status === 'PENDING', 422, 'La facture doit être de type "invoice" et avoir le statut "PENDING" pour être approuvée.');

        // Validate stock availability BEFORE starting the transaction
        $stockService->validateStockAvailability($invoice->entreprise_id, $invoice->load('items'));

        DB::transaction(function () use ($invoice, $adminId, $stockService) {
            $invoice->update([
                'status' => 'APPROVED',
                'approved_by' => $adminId,
                'approved_at' => now(),
            ]);

            // déduction stock DES l'approbation
            $stockService->deductForPaidInvoice($invoice->entreprise_id, $invoice->load('items'), $adminId);
        });
    }

    public function markPaid(Invoice $invoice, int $adminId, StockService $stockService): void
    {
        abort_unless($invoice->type === 'invoice' && $invoice->status === 'APPROVED', 422);

        DB::transaction(function () use ($invoice, $adminId) {
            $invoice->update([
                'status' => 'PAID',
                'paid_by' => $adminId,
                'paid_at' => now(),
            ]);

            // Auto-create Delivery Note
            // We need to check if one already exists to avoid duplicates? 
            // The service doesn't check, but maybe we should.
            // For now, let's assume one flow. 
            // Check if DN exists for this invoice?
            $exists = \App\Models\DeliveryNote::where('invoice_id', $invoice->id)->exists();
            if (!$exists) {
                $this->deliveryNoteService->createFromInvoice($invoice, $adminId, $this->numberService);
            }
        });
        
        // Stock déjà déduit à l'approbation, on ne fait rien ici (le service a un check idempotent de toute façon)
    }

    public function validateProforma(Invoice $invoice): void
    {
        abort_unless($invoice->type === 'proforma' && $invoice->status === 'DRAFT', 422);
        // pas de stock
        $invoice->update(['status' => 'SENT']);
    }
    
    public function markUnpaid(Invoice $invoice, int $adminId, StockService $stockService): void
    {
        abort_unless($invoice->type === 'invoice' && $invoice->status === 'PAID', 422);

        // Restaurer le stock (car on revient de PAID -> PENDING, on annule tout le cycle)
        $stockService->restoreStockForUnpaidInvoice($invoice->entreprise_id, $invoice->load('items'), $adminId);

        $invoice->update([
            'status' => 'PENDING', // On revient à PENDING (brouillon soumis) pour pouvoir ré-approuver
            'paid_by' => null,
            'paid_at' => null,
            'approved_by' => null,
            'approved_at' => null,
        ]);
    }
    public function requestModification(Invoice $invoice): void
    {
        abort_unless(in_array($invoice->status, ['APPROVED', 'PAID']), 422, 'Statut invalide pour modification');
        $invoice->update(['modification_requested_at' => now()]);
    }

    public function approveModificationRequest(Invoice $invoice, int $adminId, StockService $stockService): void
    {
        abort_if(is_null($invoice->modification_requested_at), 422, 'Aucune demande de modification en cours');
        
        // Si payée ou approuvée, on annule tout (rembourse stock)
        if (in_array($invoice->status, ['APPROVED', 'PAID'])) {
            $stockService->restoreStockForUnpaidInvoice($invoice->entreprise_id, $invoice->load('items'), $adminId);
        }

        $invoice->update([
            'status' => 'PENDING', // Revient à PENDING pour modification
            'modification_requested_at' => null, // Clear request
            'paid_by' => null,
            'paid_at' => null,
            'approved_by' => null,
            'approved_at' => null,
        ]);
    }
}
