<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(private CategoryRepositoryInterface $categories) {}

    public function index(Request $request)
    {
        $this->authorize('viewAny', Category::class);
        $eid = $request->user()->entreprise_id;

        $data = $this->categories->paginateByEntreprise($eid, $request->all(), (int)$request->get('perPage', 10));
        return response()->json($data);
    }

    public function show(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $cat = $this->categories->findForEntreprise($eid, $id);
        $this->authorize('view', $cat);

        return response()->json(['data' => $cat]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Category::class);
        $eid = $request->user()->entreprise_id;

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
        ]);

        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = null;

        $cat = $this->categories->create($eid, $data);

        return response()->json(['data' => $cat], 201);
    }

    public function update(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $cat = $this->categories->findForEntreprise($eid, $id);
        $this->authorize('update', $cat);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
        ]);

        $data['updated_by'] = $request->user()->id;

        $cat = $this->categories->update($cat, $data);

        return response()->json(['data' => $cat]);
    }

    public function destroy(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $cat = $this->categories->findForEntreprise($eid, $id);
        $this->authorize('delete', $cat);

        $this->categories->delete($cat);

        return response()->json(['message' => 'Catégorie supprimée.']);
    }
}
