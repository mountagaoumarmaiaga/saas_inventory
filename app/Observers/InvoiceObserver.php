<?php

namespace App\Observers;

use App\Models\Invoice;
use App\Models\Activity;

class InvoiceObserver
{
    public function created(Invoice $invoice): void
    {
        $activity = new Activity();
        $activity->forceFill([
            'entreprise_id' => $invoice->entreprise_id,
            'user_id' => auth()->id() ?? $invoice->created_by,
            'type' => 'invoice_created',
            'description' => "Création de la facture {$invoice->number}",
            'subject_type' => Invoice::class,
            'subject_id' => $invoice->id,
            'properties' => ['number' => $invoice->number, 'total' => $invoice->total]
        ])->save();
    }

    public function updated(Invoice $invoice): void
    {
        if ($invoice->isDirty('status') && $invoice->status === 'APPROVED') {
            $activity = new Activity();
            $activity->forceFill([
                'entreprise_id' => $invoice->entreprise_id,
                'user_id' => auth()->id(),
                'type' => 'invoice_approved',
                'description' => "Approbation de la facture {$invoice->number}",
                'subject_type' => Invoice::class,
                'subject_id' => $invoice->id,
            ])->save();
        }
    }

    public function deleted(Invoice $invoice): void
    {
        //
    }
}
