<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicInvoiceController extends Controller
{
    public function show($uuid)
    {
        $invoice = Invoice::with([
            'client:id,name,address,city,country', // Exclude email, phone if sensitive, but address needed for PDF
            'items', 
            'entreprise:id,name,logo_url,address,city,country,email,phone,invoice_header,invoice_footer', 
            'payments:id,invoice_id,amount,date,payment_method,reference'
        ])->where('uuid', $uuid)->firstOrFail();

        // Si c'est la première fois qu'elle est vue, ou la mettre à jour l'heure de vue
        if (!$invoice->viewed_at) {
            $invoice->update(['viewed_at' => now()]);
        }

        return Inertia::render('public/Invoice', [
            'invoice' => $invoice
        ]);
    }
}
