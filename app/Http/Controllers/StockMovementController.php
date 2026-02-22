<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockMovement;
use App\Repositories\Contracts\StockMovementRepositoryInterface;
use Illuminate\Http\Request;

class StockMovementController extends Controller
{
    public function __construct(private StockMovementRepositoryInterface $movements) {}

    public function index(Request $request)
    {
        $eid = $request->user()->entreprise_id;

        $data = $this->movements->paginateByEntreprise(
            $eid,
            $request->all(),
            (int)$request->get('perPage', 20)
        );

        return response()->json($data);
    }

    public function show(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;

        $m = $this->movements->findForEntreprise($eid, $id);

        return response()->json(['data' => $m]);
    }

    public function store(Request $request)
    {
        $eid = $request->user()->entreprise_id;

        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'type'       => 'required|in:IN,OUT,ADJUSTMENT',
            'quantity'   => 'required|integer|min:1',
            'reason'     => 'nullable|string|max:255',
            'invoice_id' => 'nullable|exists:invoices,id',
        ]);

        // ✅ sécurité SaaS: produit doit appartenir à l’entreprise
        abort_unless(
            Product::where('entreprise_id', $eid)->where('id', $data['product_id'])->exists(),
            403,
            "Produit invalide."
        );

        $data['created_by'] = $request->user()->id;

        // ✅ Update product quantity
        $product = Product::where('entreprise_id', $eid)->findOrFail($data['product_id']);
        
        if ($data['type'] === 'IN') {
            $product->increment('quantity', $data['quantity']);
        } elseif ($data['type'] === 'OUT') {
             if ($product->quantity < $data['quantity']) {
                abort(422, "Stock insuffisant.");
            }
            $product->decrement('quantity', $data['quantity']);
        } elseif ($data['type'] === 'ADJUSTMENT') {
            // Pour un ajustement, on suppose que la quantité fournie est la variation (+/-)
            // Ou alors c'est la nouvelle quantité absolue ?
            // D'après le formulaire (quantité min 1), c'est une quantité absolue de mouvement.
            // Mais le type ADJUSTMENT est ambigu. 
            // Si on suit la logique stock IN/OUT, ADJUSTMENT pourrait être traité comme une correction.
            // Pour simplifier ici et éviter des bugs, on va considérer ADJUSTMENT comme une mise à jour directe (peu probable avec un champ quantity positif)
            // OU plus simplement, on ne touche pas au stock pour ADJUSTMENT si on n'a pas de signe.
            // MAIS pour "Low stock", c'est souvent suite à une SORTIE.
            
            // NOTE: Pour l'instant, traitons ADJUSTMENT comme un mouvement manuel qui n'impacte pas automatiquement le stock
            // SAUF si le user le demande. 
            // Dans le doute et sans specs précises sur ADJUSTMENT, je vais laisser tel quel pour ADJUSTMENT (pas d'update auto)
            // et seulement update pour IN/OUT qui sont clairs.
        }

        $m = $this->movements->create($eid, $data);

        // ✅ Check low stock
        $warning = null;
        $product->refresh(); // Reload to get new quantity
        if ($product->min_quantity !== null && $product->quantity <= $product->min_quantity) {
            $warning = "Attention : Stock bas ({$product->quantity} restant)";
        }

        return response()->json(['data' => $m, 'warning' => $warning], 201);
    }

    public function update(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;

        $m = $this->movements->findForEntreprise($eid, $id);

        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'type'       => 'required|in:IN,OUT,ADJUSTMENT',
            'quantity'   => 'required|integer|min:1',
            'reason'     => 'nullable|string|max:255',
            'invoice_id' => 'nullable|exists:invoices,id',
        ]);

        abort_unless(
            Product::where('entreprise_id', $eid)->where('id', $data['product_id'])->exists(),
            403,
            "Produit invalide."
        );

        // si tu veux garder created_by intact → on ne touche pas.
        $updated = $this->movements->update($m, $data);

        return response()->json(['data' => $updated]);
    }

    public function destroy(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;

        $m = $this->movements->findForEntreprise($eid, $id);

        $this->movements->delete($m);

        return response()->json(['message' => 'Mouvement supprimé.']);
    }
}
