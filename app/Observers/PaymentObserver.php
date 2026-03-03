<?php

namespace App\Observers;

use App\Models\Payment;
use App\Models\Activity;

class PaymentObserver
{
    public function created(Payment $payment): void
    {
        // Load invoice to get enterprise context
        $payment->load('invoice');
        if (!$payment->invoice) return;

        Activity::create([
            'entreprise_id' => $payment->invoice->entreprise_id,
            'user_id' => auth()->id(),
            'type' => 'payment_received',
            'description' => "Paiement de " . number_format($payment->amount, 0, ',', ' ') . " CFA reçu pour {$payment->invoice->number}",
            'subject_type' => Payment::class,
            'subject_id' => $payment->id,
            'properties' => ['amount' => $payment->amount, 'method' => $payment->payment_method]
        ]);
    }

    public function deleted(Payment $payment): void
    {
        //
    }
}
