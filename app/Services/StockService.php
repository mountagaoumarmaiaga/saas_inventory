<?php

namespace App\Services;

use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class StockService
{
    public function restock(int $entrepriseId, int $productId, int $qty, int $userId, ?string $reason = 'restock'): void
    {
        DB::transaction(function () use ($entrepriseId, $productId, $qty, $userId, $reason) {
            $product = Product::where('entreprise_id', $entrepriseId)->lockForUpdate()->findOrFail($productId);

            $product->update(['quantity' => $product->quantity + $qty]);

            StockMovement::create([
                'entreprise_id' => $entrepriseId,
                'product_id' => $product->id,
                'type' => 'IN',
                'quantity' => $qty,
                'reason' => $reason,
                'invoice_id' => null,
                'created_by' => $userId,
            ]);
        });
    }

    /**
     * Validate that sufficient stock is available for an invoice
     * @throws ValidationException if stock is insufficient
     */
    public function validateStockAvailability(int $entrepriseId, \App\Models\Invoice $invoice): void
    {
        $productTotals = [];
        
        // Calculate cumulative quantities for each product
        foreach ($invoice->items as $item) {
            if (!$item->product_id) continue;
            
            if (!isset($productTotals[$item->product_id])) {
                $productTotals[$item->product_id] = 0;
            }
            $productTotals[$item->product_id] += $item->quantity;
        }
        
        // Check each product's availability
        foreach ($productTotals as $productId => $totalQuantity) {
            $product = Product::where('entreprise_id', $entrepriseId)->findOrFail($productId);
            
            if ($product->quantity < $totalQuantity) {
                throw ValidationException::withMessages([
                    'stock' => ["Quantité insuffisante pour \"{$product->name}\". Total demandé: {$totalQuantity}, Stock disponible: {$product->quantity}"]
                ]);
            }
        }
    }

    public function deductForPaidInvoice(int $entrepriseId, \App\Models\Invoice $invoice, int $adminUserId): void
    {
        // anti-double déduction
        if ($invoice->stock_deducted_at) return;

        DB::transaction(function () use ($entrepriseId, $invoice, $adminUserId) {
            $invoice->refresh();
            if ($invoice->stock_deducted_at) return;

            // 1) vérifier stock suffisant pour chaque item produit
            foreach ($invoice->items as $item) {
                if (!$item->product_id) continue;

                $product = Product::where('entreprise_id', $entrepriseId)->lockForUpdate()->findOrFail($item->product_id);

                if ($product->quantity < $item->quantity) {
                    throw ValidationException::withMessages([
                        'stock' => ["Stock insuffisant pour: {$product->name}"]
                    ]);
                }
            }

            // 2) déduire + journaliser
            foreach ($invoice->items as $item) {
                if (!$item->product_id) continue;

                $product = Product::where('entreprise_id', $entrepriseId)->lockForUpdate()->findOrFail($item->product_id);
                $product->update(['quantity' => $product->quantity - $item->quantity]);

                StockMovement::create([
                    'entreprise_id' => $entrepriseId,
                    'product_id' => $product->id,
                    'type' => 'OUT',
                    'quantity' => $item->quantity,
                    'reason' => 'invoice_paid',
                    'invoice_id' => $invoice->id,
                    'created_by' => $adminUserId,
                ]);
            }

            $invoice->update(['stock_deducted_at' => now()]);
        });
    }
    public function restoreStockForUnpaidInvoice(int $entrepriseId, \App\Models\Invoice $invoice, int $adminUserId): void
    {
        // Si stock pas déduit, rien à faire
        if (!$invoice->stock_deducted_at) return;

        DB::transaction(function () use ($entrepriseId, $invoice, $adminUserId) {
            $invoice->refresh();
            if (!$invoice->stock_deducted_at) return;

            foreach ($invoice->items as $item) {
                if (!$item->product_id) continue;

                $product = Product::where('entreprise_id', $entrepriseId)->lockForUpdate()->findOrFail($item->product_id);
                // On ré-augmente le stock
                $product->update(['quantity' => $product->quantity + $item->quantity]);

                StockMovement::create([
                    'entreprise_id' => $entrepriseId,
                    'product_id' => $product->id,
                    'type' => 'IN',
                    'quantity' => $item->quantity,
                    'reason' => 'invoice_unpaid', // ou 'cancellation'
                    'invoice_id' => $invoice->id,
                    'created_by' => $adminUserId,
                ]);
            }

            // On retire le marqueur de déduction
            $invoice->update(['stock_deducted_at' => null]);
        });
    }
}

