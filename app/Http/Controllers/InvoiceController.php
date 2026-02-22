<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Client;
use App\Models\Product;
use App\Repositories\Contracts\InvoiceRepositoryInterface;
use App\Services\InvoiceWorkflowService;
use App\Services\NumberService;
use App\Services\PdfService;
use App\Services\StockService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function __construct(
        private InvoiceRepositoryInterface $invoices,
        private InvoiceWorkflowService $workflow,
        private NumberService $numbers,
        private PdfService $pdf,
        private StockService $stock
    ) {}

    public function index(Request $request)
    {
        $this->authorize('viewAny', Invoice::class);
        $eid = $request->user()->entreprise_id;

        $data = $this->invoices->paginateByEntreprise($eid, $request->all(), (int)$request->get('perPage', 10));
        
        return response()->json($data);
    }

    public function show(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $invoice = $this->invoices->findForEntreprise($eid, $id);
        $this->authorize('view', $invoice);

        return response()->json(['data' => $invoice]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Invoice::class);
        $eid = $request->user()->entreprise_id;

        $data = $request->validate([
            'type' => 'required|in:invoice,proforma',
            'client_id' => 'required|exists:clients,id',
            'tva' => 'nullable|integer|min:0|max:100',
            'date' => 'nullable|date',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'nullable|exists:products,id',
            'items.*.description' => 'required|string|max:255',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        // client doit appartenir à l'entreprise
        abort_unless(Client::where('entreprise_id',$eid)->where('id',$data['client_id'])->exists(), 403);

        // produits doivent appartenir à l'entreprise
        foreach ($data['items'] as $it) {
            if (!empty($it['product_id'])) {
                abort_unless(Product::where('entreprise_id',$eid)->where('id',$it['product_id'])->exists(), 403);
            }
        }

        $invoice = DB::transaction(function () use ($request, $eid, $data) {
            $invoice = Invoice::create([
                'entreprise_id' => $eid,
                'number' => $this->numbers->nextInvoiceNumber($eid, $data['type']),
                'type' => $data['type'],
                'status' => 'DRAFT',
                'client_id' => $data['client_id'],
                'tva' => $data['tva'] ?? 20,
                'date' => $data['date'] ?? now()->toDateString(),
                'notes' => $data['notes'] ?? null,
                'subtotal' => 0,
                'total' => 0,
                'created_by' => $request->user()->id,
                'updated_by' => null,
            ]);

            foreach ($data['items'] as $it) {
                $lineTotal = $it['unit_price'] * $it['quantity'];
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'product_id' => $it['product_id'] ?? null,
                    'description' => $it['description'],
                    'unit_price' => $it['unit_price'],
                    'quantity' => $it['quantity'],
                    'line_total' => $lineTotal,
                ]);
            }

            $this->workflow->recalcTotals($invoice);

            return $invoice->load(['client','items']);
        });

        return response()->json(['data' => $invoice], 201);
    }

    public function update(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $invoice = $this->invoices->findForEntreprise($eid, $id);
        $this->authorize('update', $invoice);

        // Bloquer la modification si la facture est déjà approuvée ou payée
        abort_if(
            in_array($invoice->status, ['APPROVED', 'PAID']), 
            403, 
            'Impossible de modifier une facture approuvée. Veuillez annuler le paiement/approbation d\'abord.'
        );

        $data = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'tva' => 'nullable|integer|min:0|max:100',
            'date' => 'nullable|date',
            'notes' => 'nullable|string',
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

        $invoice = DB::transaction(function () use ($request, $invoice, $data) {
            $invoice->update([
                'client_id' => $data['client_id'],
                'tva' => $data['tva'] ?? $invoice->tva,
                'date' => $data['date'] ?? $invoice->date,
                'notes' => $data['notes'] ?? null,
                'updated_by' => $request->user()->id,
            ]);

            $invoice->items()->delete();

            foreach ($data['items'] as $it) {
                $lineTotal = $it['unit_price'] * $it['quantity'];
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'product_id' => $it['product_id'] ?? null,
                    'description' => $it['description'],
                    'unit_price' => $it['unit_price'],
                    'quantity' => $it['quantity'],
                    'line_total' => $lineTotal,
                ]);
            }

            $this->workflow->recalcTotals($invoice);

            return $invoice->load(['client','items']);
        });

        return response()->json(['data' => $invoice]);
    }

    // ---- WORKFLOW ----

    public function submit(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $invoice = $this->invoices->findForEntreprise($eid, $id);
        $this->authorize('submit', $invoice);

        $this->workflow->submitInvoice($invoice);

        return response()->json(['data' => $invoice->refresh()]);
    }

    public function approve(Request $request, int $id)
    {
        // For admins, find invoice by ID directly, policy will check entreprise match
        $invoice = $request->user()->isAdmin() 
            ? Invoice::findOrFail($id)
            : $this->invoices->findForEntreprise($request->user()->entreprise_id, $id);
            
        $this->authorize('approve', $invoice);

        $this->workflow->approveInvoice($invoice, $request->user()->id, $this->stock);

        return response()->json(['data' => $invoice->refresh()]);
    }

    public function markPaid(Request $request, int $id)
    {
        // For admins, find invoice by ID directly, policy will check entreprise match
        $invoice = $request->user()->isAdmin() 
            ? Invoice::with('items')->findOrFail($id)
            : $this->invoices->findForEntreprise($request->user()->entreprise_id, $id)->load('items');
            
        $this->authorize('markPaid', $invoice);

        $this->workflow->markPaid($invoice, $request->user()->id, $this->stock);

        return response()->json(['data' => $invoice->refresh()]);
    }

    public function markUnpaid(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $invoice = $this->invoices->findForEntreprise($eid, $id)->load('items');
        $this->authorize('markUnpaid', $invoice);

        $this->workflow->markUnpaid($invoice, $request->user()->id, $this->stock);

        return response()->json(['data' => $invoice->refresh()]);
    }

    public function validateProforma(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $invoice = $this->invoices->findForEntreprise($eid, $id);
        $this->authorize('validateProforma', $invoice);

        $this->workflow->validateProforma($invoice);

        return response()->json(['data' => $invoice->refresh()]);
    }

    public function requestModification(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $invoice = $this->invoices->findForEntreprise($eid, $id);
        
        try {
            $this->authorize('requestModification', $invoice);
        } catch (\Illuminate\Auth\Access\AuthorizationException $e) {
            return response()->json([
                'success' => false,
                'message' => "Action réservée à l'administrateur ou au créateur du document.",
                'requires_admin' => true,
            ], 403);
        }

        $this->workflow->requestModification($invoice);
        
        return response()->json(['data' => $invoice->refresh()]);
    }

    public function approveModification(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $invoice = $this->invoices->findForEntreprise($eid, $id)->load('items');
        
        $this->authorize('approveModification', $invoice);

        $this->workflow->approveModificationRequest($invoice, $request->user()->id, $this->stock);
        
        return response()->json(['data' => $invoice->refresh()]);
    }

    // ---- PDF ----
    public function pdfView(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $invoice = $this->invoices->findForEntreprise($eid, $id);
        $this->authorize('view', $invoice);

        return $this->pdf->streamInvoice($invoice);
    }

    public function pdfDownload(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $invoice = $this->invoices->findForEntreprise($eid, $id);
        $this->authorize('view', $invoice);

        return $this->pdf->downloadInvoice($invoice);
    }
    public function destroy(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $invoice = $this->invoices->findForEntreprise($eid, $id);
        $this->authorize('delete', $invoice);

        $this->invoices->delete($invoice);

        return response()->json(['message' => 'Document supprimé.']);
    }

    public function clientsList(Request $request) {
        $eid = $request->user()->entreprise_id;
        // Simple list for dropdown
        return Client::where('entreprise_id', $eid)->select('id', 'name', 'email', 'phone', 'address')->get();
    }

}
