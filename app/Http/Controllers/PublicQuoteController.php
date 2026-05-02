<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicQuoteController extends Controller
{
    public function show($uuid)
    {
        $quote = Quote::with([
            'client:id,name,address',
            'items', 
            'entreprise:id,name,logo_url,address,city,country,email,phone,invoice_header,invoice_footer'
        ])->where('uuid', $uuid)->firstOrFail();

        return Inertia::render('public/Quote', [
            'quote' => $quote
        ]);
    }
}
