<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\StockService;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function __construct(private StockService $stock) {}

    public function restock(Request $request, int $productId)
    {
        $product = Product::findOrFail($productId);
        $this->authorize('update', $product); // admin only via ProductPolicy

        $data = $request->validate([
            'quantity' => 'required|integer|min:1',
            'reason' => 'nullable|string|max:255'
        ]);

        $eid = $request->user()->entreprise_id;

        $this->stock->restock($eid, $productId, $data['quantity'], $request->user()->id, $data['reason'] ?? 'restock');

        return response()->json(['message' => 'Stock ajouté.']);
    }
}
