<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use App\Models\QuoteItem;
use App\Models\Client;
use App\Models\Product;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Services\NumberService;
use App\Services\PdfService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuoteController extends Controller
{
    public function __construct(
        private NumberService $numbers,
        private PdfService $pdf
    ) {}

    public function index(Request $request)
    {
        $eid = $request->user()->entreprise_id;
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');

        $query = Quote::with(['client'])->where('entreprise_id', $eid);

        if ($search) {
            $query->where(function($q) use($search) {
                $q->where('number', 'like', "%{$search}%")
                  ->orWhereHas('client', function($cq) use ($search) {
                      $cq->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $quotes = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json($quotes);
    }

    public function show(Request $request, Quote $quote)
    {
        abort_unless($quote->entreprise_id === $request->user()->entreprise_id, 403);
        
        $quote->load(['client', 'items.product']);
        return response()->json(['data' => $quote]);
    }

    public function store(Request $request)
    {
        $eid = $request->user()->entreprise_id;

        $data = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'tva' => 'nullable|integer|min:0|max:100',
            'date' => 'nullable|date',
            'valid_until' => 'nullable|date',
            'notes' => 'nullable|string',
            'terms' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'nullable|exists:products,id',
            'items.*.description' => 'required|string|max:255',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        abort_unless(Client::where('entreprise_id',$eid)->where('id',$data['client_id'])->exists(), 403);

        foreach ($data['items'] as $it) {
            if (!empty($it['product_id'])) {
                abort_unless(Product::where('entreprise_id',$eid)->where('id',$it['product_id'])->exists(), 403);
            }
        }

        $quote = DB::transaction(function () use ($request, $eid, $data) {
            $quote = Quote::create([
                'entreprise_id' => $eid,
                'number' => $this->numbers->nextQuoteNumber($eid),
                'status' => 'DRAFT',
                'client_id' => $data['client_id'],
                'tva' => $data['tva'] ?? 20,
                'date' => $data['date'] ?? now()->toDateString(),
                'valid_until' => $data['valid_until'] ?? now()->addDays(30)->toDateString(),
                'notes' => $data['notes'] ?? null,
                'terms' => $data['terms'] ?? null,
                'subtotal' => 0,
                'total' => 0,
                'created_by' => $request->user()->id,
                'updated_by' => null,
            ]);

            $subtotal = 0;

            foreach ($data['items'] as $it) {
                $lineTotal = $it['unit_price'] * $it['quantity'];
                $subtotal += $lineTotal;

                QuoteItem::create([
                    'quote_id' => $quote->id,
                    'product_id' => $it['product_id'] ?? null,
                    'description' => $it['description'],
                    'unit_price' => $it['unit_price'],
                    'quantity' => $it['quantity'],
                    'line_total' => $lineTotal,
                ]);
            }

            $total = $subtotal + ($subtotal * $quote->tva / 100);

            $quote->update([
                'subtotal' => $subtotal,
                'total' => $total,
            ]);

            return $quote->load(['client','items']);
        });

        return response()->json(['data' => $quote], 201);
    }

    public function update(Request $request, Quote $quote)
    {
        abort_unless($quote->entreprise_id === $request->user()->entreprise_id, 403);
        $eid = $request->user()->entreprise_id;

        abort_if(in_array($quote->status, ['ACCEPTED', 'REJECTED']), 403, 'Impossible de modifier un devis accepté ou refusé.');

        $data = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'status' => 'nullable|in:DRAFT,SENT,ACCEPTED,REJECTED,CANCELLED',
            'tva' => 'nullable|integer|min:0|max:100',
            'date' => 'nullable|date',
            'valid_until' => 'nullable|date',
            'notes' => 'nullable|string',
            'terms' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'nullable|exists:products,id',
            'items.*.description' => 'required|string|max:255',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        abort_unless(Client::where('entreprise_id',$eid)->where('id',$data['client_id'])->exists(), 403);

        $quote = DB::transaction(function () use ($request, $quote, $data) {
            $quote->update([
                'client_id' => $data['client_id'],
                'status' => $data['status'] ?? $quote->status,
                'tva' => $data['tva'] ?? $quote->tva,
                'date' => $data['date'] ?? $quote->date,
                'valid_until' => $data['valid_until'] ?? $quote->valid_until,
                'notes' => $data['notes'] ?? null,
                'terms' => $data['terms'] ?? null,
                'updated_by' => $request->user()->id,
            ]);

            $quote->items()->delete();

            $subtotal = 0;

            foreach ($data['items'] as $it) {
                $lineTotal = $it['unit_price'] * $it['quantity'];
                $subtotal += $lineTotal;

                QuoteItem::create([
                    'quote_id' => $quote->id,
                    'product_id' => $it['product_id'] ?? null,
                    'description' => $it['description'],
                    'unit_price' => $it['unit_price'],
                    'quantity' => $it['quantity'],
                    'line_total' => $lineTotal,
                ]);
            }

            $total = $subtotal + ($subtotal * $quote->tva / 100);

            $quote->update([
                'subtotal' => $subtotal,
                'total' => $total,
            ]);

            return $quote->load(['client','items']);
        });

        return response()->json(['data' => $quote]);
    }

    public function destroy(Request $request, Quote $quote)
    {
        abort_unless($quote->entreprise_id === $request->user()->entreprise_id, 403);
        $quote->delete();
        return response()->json(['message' => 'Devis supprimé avec succès.']);
    }

    public function convertToInvoice(Request $request, Quote $quote)
    {
        abort_unless($quote->entreprise_id === $request->user()->entreprise_id, 403);
        abort_unless($request->user()->role === 'admin', 403, 'Seuls les administrateurs peuvent approuver et convertir les devis.');

        $eid = $request->user()->entreprise_id;

        $invoice = DB::transaction(function () use ($quote, $eid, $request) {
            $invoice = Invoice::create([
                'entreprise_id' => $eid,
                'number' => $this->numbers->nextInvoiceNumber($eid, 'invoice'),
                'type' => 'invoice',
                'status' => 'DRAFT',
                'client_id' => $quote->client_id,
                'tva' => $quote->tva,
                'date' => now()->toDateString(),
                'notes' => 'Converti depuis le devis ' . $quote->number . ".\n\n" . $quote->notes,
                'subtotal' => $quote->subtotal,
                'total' => $quote->total,
                'created_by' => $request->user()->id,
            ]);

            foreach ($quote->items as $item) {
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'product_id' => $item->product_id,
                    'description' => $item->description,
                    'unit_price' => $item->unit_price,
                    'quantity' => $item->quantity,
                    'line_total' => $item->line_total,
                ]);
            }

            $quote->update(['status' => 'ACCEPTED']);

            return $invoice;
        });

        return response()->json([
            'message' => 'Devis converti en facture avec succès.',
            'invoice_id' => $invoice->id
        ]);
    }

    public function streamPdf(Request $request, Quote $quote)
    {
        abort_unless($quote->entreprise_id === $request->user()->entreprise_id, 403);
        return $this->pdf->streamQuote($quote);
    }

    public function downloadPdf(Request $request, Quote $quote)
    {
        abort_unless($quote->entreprise_id === $request->user()->entreprise_id, 403);
        return $this->pdf->downloadQuote($quote);
    }
}
