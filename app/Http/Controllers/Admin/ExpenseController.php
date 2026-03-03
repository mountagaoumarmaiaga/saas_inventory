<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ExpenseController extends Controller
{
    use AuthorizesRequests;

    public function viewIndex(Request $request)
    {
        $eid = $request->user()->entreprise_id;
        
        $totalRevenue = \App\Models\Invoice::where('entreprise_id', $eid)
            ->where('status', 'PAID')
            ->sum('total');

        $totalExpensesDocs = Expense::where('entreprise_id', $eid)->sum('amount');
        $totalPurchases = \App\Models\Purchase::where('entreprise_id', $eid)
            ->whereNotIn('status', ['DRAFT', 'CANCELLED'])
            ->sum('total_amount');
        
        $totalExpenses = $totalExpensesDocs + $totalPurchases;
        $netProfit = $totalRevenue - $totalExpenses;

        return \Inertia\Inertia::render('admin/expenses/index', [
            'stats' => [
                'total_revenue'      => $totalRevenue,
                'manual_expenses'    => $totalExpensesDocs,
                'purchase_expenses'  => $totalPurchases,
                'total_expenses'     => $totalExpenses,
                'net_profit'         => $netProfit,
            ]
        ]);
    }

    public function viewIndexUser(Request $request)
    {
        $eid = $request->user()->entreprise_id;
        
        $totalRevenue = \App\Models\Invoice::where('entreprise_id', $eid)
            ->where('status', 'PAID')
            ->sum('total');

        $totalExpensesDocs = Expense::where('entreprise_id', $eid)->sum('amount');
        $totalPurchases = \App\Models\Purchase::where('entreprise_id', $eid)
            ->whereNotIn('status', ['DRAFT', 'CANCELLED'])
            ->sum('total_amount');
        
        $totalExpenses = $totalExpensesDocs + $totalPurchases;
        $netProfit = $totalRevenue - $totalExpenses;

        return \Inertia\Inertia::render('user/expenses/index', [
            'stats' => [
                'total_revenue'      => $totalRevenue,
                'manual_expenses'    => $totalExpensesDocs,
                'purchase_expenses'  => $totalPurchases,
                'total_expenses'     => $totalExpenses,
                'net_profit'         => $netProfit,
            ]
        ]);
    }

    public function index(Request $request)
    {
        $entrepriseId = $request->user()->entreprise_id;
        $expenses = Expense::with(['category', 'creator'])
            ->where('entreprise_id', $entrepriseId)
            ->latest()
            ->paginate($request->get('per_page', 10));

        return response()->json($expenses);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:expense_categories,id',
            'amount' => 'required|numeric|min:0.01',
            'date' => 'required|date',
            'description' => 'required|string|max:255',
            'reference' => 'nullable|string|max:255',
        ]);

        $data['entreprise_id'] = $request->user()->entreprise_id;
        $data['created_by'] = $request->user()->id;

        $expense = Expense::create($data);

        return response()->json(['message' => 'Dépense enregistrée avec succès', 'data' => $expense]);
    }

    public function show(Expense $expense)
    {
        $this->authorize('view', $expense);
        $expense->load(['category', 'creator']);
        return response()->json(['data' => $expense]);
    }

    public function update(Request $request, Expense $expense)
    {
        $this->authorize('update', $expense);

        $data = $request->validate([
            'category_id' => 'sometimes|required|exists:expense_categories,id',
            'amount' => 'sometimes|required|numeric|min:0.01',
            'date' => 'sometimes|required|date',
            'description' => 'sometimes|required|string|max:255',
            'reference' => 'nullable|string|max:255',
        ]);

        $expense->update($data);

        return response()->json(['message' => 'Dépense mise à jour avec succès', 'data' => $expense]);
    }

    public function destroy(Expense $expense)
    {
        $this->authorize('delete', $expense);
        $expense->delete();
        return response()->json(['message' => 'Dépense supprimée']);
    }

    public function analyzeReceipt(Request $request, \App\Services\ReceiptOCRService $ocrService)
    {
        $request->validate([
            'receipt' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $file = $request->file('receipt');
        $path = $file->path(); // UploadedFile temporary path

        $extractedData = $ocrService->extractData($path);

        if (!$extractedData) {
            return response()->json(['message' => 'Impossible d\'analyser le reçu. Veuillez vérifier la qualité de l\'image.'], 422);
        }

        return response()->json(['data' => $extractedData]);
    }
}
