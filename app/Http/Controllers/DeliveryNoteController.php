<?php

namespace App\Http\Controllers;

use App\Models\DeliveryNote;
use App\Repositories\Contracts\InvoiceRepositoryInterface;
use App\Repositories\Contracts\DeliveryNoteRepositoryInterface;
use App\Services\DeliveryNoteService;
use App\Services\NumberService;
use Illuminate\Http\Request;

class DeliveryNoteController extends Controller
{
    public function __construct(
        private DeliveryNoteService $dns,
        private NumberService $numbers,
        private InvoiceRepositoryInterface $invoices,
        private DeliveryNoteRepositoryInterface $deliveryNotes,
        private \App\Services\PdfService $pdf
    ) {}

    // ... (rest of the file remains same until downloadPdf)

    public function downloadPdf(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $dn = $this->deliveryNotes->findForEntreprise($eid, $id);
        $this->authorize('view', $dn);

        if ($request->get('action') === 'stream') {
            return $this->pdf->streamDeliveryNote($dn);
        }

        return $this->pdf->downloadDeliveryNote($dn);
    }

    /**
     * Liste des bordereaux de livraison
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', DeliveryNote::class);

        $eid = $request->user()->entreprise_id;
        $data = $this->deliveryNotes->paginateByEntreprise(
            $eid,
            $request->all(),
            (int) $request->get('perPage', 10)
        );

        return response()->json($data);
    }

    /**
     * Afficher un bordereau
     */
    public function show(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $dn = $this->deliveryNotes->findForEntreprise($eid, $id);

        $this->authorize('view', $dn);

        return response()->json(['data' => $dn]);
    }

    /**
     * Créer un BL depuis une facture validée
     */
    public function createFromInvoice(Request $request, int $invoiceId)
    {
        $this->authorize('createFromInvoice', DeliveryNote::class);

        $eid = $request->user()->entreprise_id;

        $invoice = $this->invoices
            ->findForEntreprise($eid, $invoiceId)
            ->load('items');

        $dn = $this->dns->createFromInvoice(
            $invoice,
            $request->user()->id,
            $this->numbers
        );

        return response()->json(['data' => $dn->load('items')], 201);
    }


    /**
     * Mettre à jour un BL
     */
    public function update(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $dn = $this->deliveryNotes->findForEntreprise($eid, $id);

        $this->authorize('update', $dn);

        $data = $request->validate([
            'delivery_date' => 'required|date',
            'delivery_person' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:0', // 0 allows removing effectively? or should be min 1?
            'items.*.description' => 'nullable|string',
        ]);

        $dn = $this->dns->update($dn, $data);

        return response()->json(['data' => $dn->load('items')]);
    }


}
