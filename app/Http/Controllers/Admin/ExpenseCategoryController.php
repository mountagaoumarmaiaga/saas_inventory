<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;

class ExpenseCategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = ExpenseCategory::where('entreprise_id', $request->user()->entreprise_id)
            ->orderBy('name')
            ->get();

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $data['entreprise_id'] = $request->user()->entreprise_id;

        $category = ExpenseCategory::create($data);

        return response()->json(['message' => 'Catégorie créée', 'data' => $category]);
    }

    public function update(Request $request, ExpenseCategory $expenseCategory)
    {
        if ($expenseCategory->entreprise_id !== $request->user()->entreprise_id) {
            abort(403);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $expenseCategory->update($data);

        return response()->json(['message' => 'Catégorie mise à jour', 'data' => $expenseCategory]);
    }

    public function destroy(Request $request, ExpenseCategory $expenseCategory)
    {
        if ($expenseCategory->entreprise_id !== $request->user()->entreprise_id) {
            abort(403);
        }

        if ($expenseCategory->expenses()->count() > 0) {
            return response()->json(['message' => 'Impossible de supprimer cette catégorie car elle contient des dépenses.'], 422);
        }

        $expenseCategory->delete();
        return response()->json(['message' => 'Catégorie supprimée']);
    }
}
