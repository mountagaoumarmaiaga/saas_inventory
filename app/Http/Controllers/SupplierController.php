<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Supplier::class);
        
        $query = Supplier::where('entreprise_id', $request->user()->entreprise_id);

        if ($search = $request->input('q')) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('tax_number', 'like', "%{$search}%");
            });
        }

        $perPage = (int) $request->input('perPage', 10);
        $suppliers = $query->orderBy('name')->paginate($perPage);

        return response()->json($suppliers);
    }

    public function store(StoreSupplierRequest $request)
    {
        $this->authorize('create', Supplier::class);

        $validated = $request->validated();
        $validated['entreprise_id'] = $request->user()->entreprise_id;

        $supplier = Supplier::create($validated);

        return response()->json(['data' => $supplier], 201);
    }

    public function show(Supplier $supplier)
    {
        $this->authorize('view', $supplier);
        return response()->json(['data' => $supplier]);
    }

    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        $this->authorize('update', $supplier);

        $supplier->update($request->validated());

        return response()->json(['data' => $supplier]);
    }

    public function destroy(Supplier $supplier)
    {
        $this->authorize('delete', $supplier);

        $supplier->delete();

        return response()->json(['message' => 'Fournisseur supprimé avec succès']);
    }

    public function list(Request $request)
    {
        $this->authorize('viewAny', Supplier::class);
        $suppliers = Supplier::where('entreprise_id', $request->user()->entreprise_id)
            ->orderBy('name')
            ->select('id', 'name', 'email', 'phone')
            ->get();
            
        return response()->json(['data' => $suppliers]);
    }
}
