<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use App\Models\Category;
use App\Repositories\Contracts\SubCategoryRepositoryInterface;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    public function __construct(private SubCategoryRepositoryInterface $subs) {}

    public function index(Request $request)
    {
        $this->authorize('viewAny', SubCategory::class);
        $eid = $request->user()->entreprise_id;

        $data = $this->subs->paginateByEntreprise($eid, $request->all(), (int)$request->get('perPage', 10));
        return response()->json($data);
    }

    public function show(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $sub = $this->subs->findForEntreprise($eid, $id);
        $this->authorize('view', $sub);

        return response()->json(['data' => $sub]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', SubCategory::class);
        $eid = $request->user()->entreprise_id;

        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
        ]);

        // sécurité SaaS : category appartient à l'entreprise
        abort_unless(Category::where('entreprise_id',$eid)->where('id',$data['category_id'])->exists(), 403);

        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = null;

        $sub = $this->subs->create($eid, $data);

        return response()->json(['data' => $sub->load('category')], 201);
    }

    public function update(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $sub = $this->subs->findForEntreprise($eid, $id);
        $this->authorize('update', $sub);

        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
        ]);

        abort_unless(Category::where('entreprise_id',$eid)->where('id',$data['category_id'])->exists(), 403);

        $data['updated_by'] = $request->user()->id;

        $sub = $this->subs->update($sub, $data);

        return response()->json(['data' => $sub->load('category')]);
    }

    public function destroy(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $sub = $this->subs->findForEntreprise($eid, $id);
        $this->authorize('delete', $sub);

        $this->subs->delete($sub);

        return response()->json(['message' => 'Sous-catégorie supprimée.']);
    }
}
