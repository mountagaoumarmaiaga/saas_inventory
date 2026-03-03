<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePurchaseRequest;
use App\Http\Requests\UpdatePurchaseRequest;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseItem;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Models\Activity;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Purchase::class);

        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');

        $query = Purchase::with(['supplier'])
            ->where('entreprise_id', $request->user()->entreprise_id);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('number', 'like', "%{$search}%")
                  ->orWhereHas('supplier', function($sq) use ($search) {
                      $sq->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $purchases = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json($purchases);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePurchaseRequest $request)
    {
        $this->authorize('create', Purchase::class);

        try {
            DB::beginTransaction();

            // Generate PO Number using NumberService
            $poNumber = app(\App\Services\NumberService::class)->nextPurchaseNumber($request->user()->entreprise_id);

            $purchase = Purchase::create([
                'entreprise_id' => $request->user()->entreprise_id,
                'supplier_id' => $request->supplier_id,
                'number' => $poNumber,
                'status' => 'DRAFT',
                'order_date' => $request->order_date,
                'expected_delivery_date' => $request->expected_delivery_date,
                'notes' => $request->notes,
                'tax_amount' => $request->tax_amount ?? 0,
                'created_by' => $request->user()->id,
                'total_amount' => 0, // Calculated below
            ]);

            $totalAmount = 0;

            foreach ($request->items as $itemData) {
                $totalPrice = $itemData['quantity'] * $itemData['unit_price'];
                $totalAmount += $totalPrice;

                PurchaseItem::create([
                    'purchase_id' => $purchase->id,
                    'product_id' => $itemData['product_id'],
                    'quantity' => $itemData['quantity'],
                    'unit_price' => $itemData['unit_price'],
                    'total_price' => $totalPrice,
                ]);
            }

            $purchase->update([
                'total_amount' => $totalAmount + ($request->tax_amount ?? 0)
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Bon de commande créé avec succès',
                'purchase' => $purchase->load(['items.product', 'supplier']),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur création achat: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de la création du bon de commande.'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Purchase $purchase)
    {
        $this->authorize('view', $purchase);
        $purchase->load(['items.product', 'supplier', 'createdBy', 'stockMovements']);
        return response()->json($purchase);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePurchaseRequest $request, Purchase $purchase)
    {
        $this->authorize('update', $purchase);

        if ($purchase->status !== 'DRAFT') {
            return response()->json(['message' => 'Impossible de modifier un bon de commande validé.'], 403);
        }

        try {
            DB::beginTransaction();

            $purchase->update([
                'supplier_id' => $request->supplier_id,
                'order_date' => $request->order_date,
                'expected_delivery_date' => $request->expected_delivery_date,
                'notes' => $request->notes,
                'tax_amount' => $request->tax_amount ?? 0,
            ]);

            // Sync items (Delete old ones that are not in the new request, update existing, create new)
            $existingItemIds = $purchase->items()->pluck('id')->toArray();
            $newItemIds = [];
            $totalAmount = 0;

            foreach ($request->items as $itemData) {
                $totalPrice = $itemData['quantity'] * $itemData['unit_price'];
                $totalAmount += $totalPrice;

                if (isset($itemData['id']) && in_array($itemData['id'], $existingItemIds)) {
                    // Update existing
                    $purchaseItem = PurchaseItem::find($itemData['id']);
                    $purchaseItem->update([
                        'product_id' => $itemData['product_id'],
                        'quantity' => $itemData['quantity'],
                        'unit_price' => $itemData['unit_price'],
                        'total_price' => $totalPrice,
                    ]);
                    $newItemIds[] = $itemData['id'];
                } else {
                    // Create new
                    $newItem = PurchaseItem::create([
                        'purchase_id' => $purchase->id,
                        'product_id' => $itemData['product_id'],
                        'quantity' => $itemData['quantity'],
                        'unit_price' => $itemData['unit_price'],
                        'total_price' => $totalPrice,
                    ]);
                    $newItemIds[] = $newItem->id;
                }
            }

            // Delete items not present in the new payload
            $itemsToDelete = array_diff($existingItemIds, $newItemIds);
            if (!empty($itemsToDelete)) {
                PurchaseItem::whereIn('id', $itemsToDelete)->delete();
            }

            $purchase->update([
                'total_amount' => $totalAmount + ($request->tax_amount ?? 0)
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Bon de commande mis à jour avec succès',
                'purchase' => $purchase->load(['items.product', 'supplier']),
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur MAJ achat: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de la mise à jour.'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Purchase $purchase)
    {
        $this->authorize('delete', $purchase);

        if ($purchase->status !== 'DRAFT' && $purchase->status !== 'CANCELLED') {
            return response()->json(['message' => 'Impossible de supprimer ce bon de commande.'], 403);
        }

        $purchase->delete();

        return response()->json(['message' => 'Bon de commande supprimé avec succès']);
    }

    /**
     * Mark the Purchase Order as ORDERED
     */
    public function markAsOrdered(Purchase $purchase)
    {
        $this->authorize('update', $purchase);
        abort_unless(auth()->user()->role === 'admin', 403, 'Seuls les administrateurs peuvent commander ce bon.');

        if ($purchase->status !== 'DRAFT') {
            return response()->json(['message' => 'Statut invalide pour cette action.'], 400);
        }

        $purchase->update(['status' => 'ORDERED']);
        return response()->json(['message' => 'Le bon de commande a été marqué comme commandé.', 'purchase' => $purchase]);
    }

    /**
     * Cancel the Purchase Order
     */
    public function cancel(Purchase $purchase)
    {
        $this->authorize('update', $purchase);

        if (in_array($purchase->status, ['RECEIVED', 'PARTIALLY_RECEIVED', 'CANCELLED'])) {
            return response()->json(['message' => 'Le bon de commande ne peut pas être annulé.'], 400);
        }

        $purchase->update(['status' => 'CANCELLED']);
        return response()->json(['message' => 'Le bon de commande a été annulé.', 'purchase' => $purchase]);
    }

    /**
     * Process receiving items and generate stock movements
     */
    public function receiveItems(Request $request, Purchase $purchase)
    {
        $this->authorize('update', $purchase);

        if (!in_array($purchase->status, ['ORDERED', 'PARTIALLY_RECEIVED'])) {
            return response()->json(['message' => 'Ce bon de commande n\'est pas en attente de réception.'], 400);
        }

        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:purchase_items,id',
            'items.*.receive_quantity' => 'required|integer|min:0',
        ]);

        try {
            DB::beginTransaction();

            $allFullyReceived = true;
            $hasAnyReception = false;

            foreach ($request->items as $itemInput) {
                if ($itemInput['receive_quantity'] > 0) {
                    $purchaseItem = PurchaseItem::find($itemInput['id']);
                    
                    // Security check: ensure item belongs to this PO
                    if ($purchaseItem->purchase_id !== $purchase->id) {
                        continue;
                    }

                    $totalReceivedNow = $purchaseItem->received_quantity + $itemInput['receive_quantity'];
                    
                    if ($totalReceivedNow > $purchaseItem->quantity) {
                        throw new \Exception("La quantité reçue dépasse la quantité commandée pour le produit ID {$purchaseItem->product_id}");
                    }

                    // 1. Update received quantity on the PurchaseItem
                    $purchaseItem->update(['received_quantity' => $totalReceivedNow]);

                    // 2. Generate Stock Movement IN
                    StockMovement::create([
                        'entreprise_id' => $purchase->entreprise_id,
                        'product_id' => $purchaseItem->product_id,
                        'purchase_id' => $purchase->id,
                        'type' => 'IN',
                        'quantity' => $itemInput['receive_quantity'],
                        'reason' => 'Reception Bon de Commande ' . $purchase->number,
                        'created_by' => $request->user()->id,
                    ]);

                    // 3. Update Product overall stock quantity
                    $product = Product::find($purchaseItem->product_id);
                    $product->increment('quantity', $itemInput['receive_quantity']);

                    $hasAnyReception = true;
                }
            }

            // Calculate new PO Status
            foreach ($purchase->items()->get() as $item) {
                if ($item->received_quantity < $item->quantity) {
                    $allFullyReceived = false;
                }
            }

            if ($allFullyReceived) {
                $purchase->update(['status' => 'RECEIVED']);
            } elseif ($hasAnyReception) {
                $purchase->update(['status' => 'PARTIALLY_RECEIVED']);
            }

            DB::commit();

            return response()->json([
                'message' => 'Réception enregistrée et stock mis à jour avec succès.',
                'purchase' => $purchase->fresh()->load(['items.product', 'supplier', 'stockMovements'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur réception commande: ' . $e->getMessage());
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function streamPdf(Purchase $purchase, \App\Services\PdfService $pdfService)
    {
        $this->authorize('view', $purchase);
        return $pdfService->streamPurchase($purchase);
    }

    public function downloadPdf(Purchase $purchase, \App\Services\PdfService $pdfService)
    {
        $this->authorize('view', $purchase);
        return $pdfService->downloadPurchase($purchase);
    }

    /**
     * Record a payment for a purchase order (cashflow outflow)
     */
    public function recordPayment(Request $request, Purchase $purchase)
    {
        $this->authorize('update', $purchase);

        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'receipt' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($request->amount > $purchase->amount_due) {
            return response()->json(['message' => 'Le montant dépasse le reste à payer.'], 400);
        }

        try {
            DB::beginTransaction();

            $newAmountPaid = $purchase->amount_paid + $request->amount;
            
            $status = 'UNPAID';
            if ($newAmountPaid >= $purchase->total_amount) {
                $status = 'PAID';
            } elseif ($newAmountPaid > 0) {
                $status = 'PARTIAL';
            }

            $updateData = [
                'amount_paid' => $newAmountPaid,
                'payment_status' => $status
            ];

            if ($request->hasFile('receipt')) {
                // Delete old receipt if exists
                if ($purchase->receipt_path) {
                    Storage::disk('public')->delete($purchase->receipt_path);
                }
                $path = $request->file('receipt')->store('receipts', 'public');
                $updateData['receipt_path'] = $path;
            }

            $purchase->update($updateData);

            // Create an Expense record to represent the outgoing money in Cashflow
            $expense = \App\Models\Expense::create([
                'entreprise_id' => $purchase->entreprise_id,
                'amount' => $request->amount,
                'date' => now()->format('Y-m-d'),
                'description' => "Règlement Bon de Commande {$purchase->number}",
                'reference' => $purchase->number,
                'receipt_path' => $updateData['receipt_path'] ?? null,
                'created_by' => $request->user()->id,
            ]);

            Activity::create([
                'entreprise_id' => $purchase->entreprise_id,
                'user_id' => $request->user()->id,
                'type' => 'purchase_payment',
                'description' => "Paiement fournisseur de " . number_format($request->amount, 0, ',', ' ') . " CFA pour {$purchase->number}",
                'subject_type' => Purchase::class,
                'subject_id' => $purchase->id,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Paiement enregistré avec succès.',
                'purchase' => $purchase->fresh()->load(['items.product', 'supplier'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur paiement achat: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de l\'enregistrement du paiement.'], 500);
        }
    }
}
