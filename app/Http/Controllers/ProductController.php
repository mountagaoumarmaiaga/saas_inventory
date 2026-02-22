<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\SubCategory;
use App\Repositories\Contracts\ProductRepositoryInterface;
use App\Services\ImageService;
use Illuminate\Http\Request;

use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    public function __construct(
        private ProductRepositoryInterface $products,
        private ImageService $images
    ) {}

    public function index(Request $request)
    {
        $this->authorize('viewAny', Product::class);
        $eid = $request->user()->entreprise_id;

        $data = $this->products->paginateByEntreprise($eid, $request->all(), (int)$request->get('perPage', 10));

        return response()->json($data);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Product::class);
        $eid = $request->user()->entreprise_id;

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products')->where(function ($query) use ($eid) {
                    return $query->where('entreprise_id', $eid);
                }),
            ],
            'unit' => 'nullable|string|max:30',
            'purchase_price' => 'nullable|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'min_quantity' => 'nullable|integer|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
            'image' => 'nullable|string', // Changed from nullable|image|max:2048 to string (URL)
        ]);

        // sécurité entreprise: category/subcat doivent appartenir à l'entreprise
        if (!empty($data['category_id'])) {
            abort_unless(Category::where('entreprise_id',$eid)->where('id',$data['category_id'])->exists(), 403);
        }
        if (!empty($data['sub_category_id'])) {
            $subOk = SubCategory::where('entreprise_id',$eid)->where('id',$data['sub_category_id'])
                ->when(!empty($data['category_id']), fn($q) => $q->where('category_id',$data['category_id']))
                ->exists();
            abort_unless($subOk, 403);
        }

        // Frontend upload handling: 'image' input is now a URL string
        if (!empty($data['image'])) {
            $data['image_path'] = $data['image'];
            unset($data['image']); // Remove 'image' key so it doesn't conflict if model doesn't have it
        } elseif ($request->hasFile('image')) {
             // Fallback if file is still sent for some reason (e.g. API usage)
             $data['image_path'] = $this->images->storeProductImage($request->file('image'));
        }

        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = null;

        $p = $this->products->create($eid, $data);

        return response()->json(['data' => $p], 201);
    }

    public function show(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $p = $this->products->findForEntreprise($eid, $id);
        $this->authorize('view', $p);

        return response()->json(['data' => $p->load(['category','subCategory'])]);
    }

    public function update(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $p = $this->products->findForEntreprise($eid, $id);
        $this->authorize('update', $p);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'nullable|string|max:255',
            'unit' => 'nullable|string|max:30',
            'purchase_price' => 'nullable|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'min_quantity' => 'nullable|integer|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
            'image' => 'nullable|string',
        ]);

        if (!empty($data['category_id'])) {
            abort_unless(Category::where('entreprise_id',$eid)->where('id',$data['category_id'])->exists(), 403);
        }
        if (!empty($data['sub_category_id'])) {
            $subOk = SubCategory::where('entreprise_id',$eid)->where('id',$data['sub_category_id'])
                ->when(!empty($data['category_id']), fn($q) => $q->where('category_id',$data['category_id']))
                ->exists();
            abort_unless($subOk, 403);
        }

        if (!empty($data['image'])) {
            // New Image URL provided
            // Note: We cannot delete the old remote file easily without S3 keys, so we just overwrite the path reference.
            $data['image_path'] = $data['image'];
            unset($data['image']);
        } elseif ($request->hasFile('image')) {
            $this->images->deleteIfExists($p->image_path);
            $data['image_path'] = $this->images->storeProductImage($request->file('image'));
        }

        $data['updated_by'] = $request->user()->id;

        $p = $this->products->update($p, $data);

        return response()->json(['data' => $p]);
    }

    public function destroy(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $p = $this->products->findForEntreprise($eid, $id);
        $this->authorize('delete', $p);

        $this->images->deleteIfExists($p->image_path);
        $this->products->delete($p);

        return response()->json(['message' => 'Produit supprimé.']);
    }
}
