<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductRepository implements ProductRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $q = Product::where('entreprise_id', $entrepriseId)->with(['category','subCategory']);

        if (!empty($filters['search'])) {
            $s = $filters['search'];
            $q->where(fn($qq) => $qq->where('name','like',"%$s%")->orWhere('sku','like',"%$s%"));
        }
        if (!empty($filters['category_id'])) $q->where('category_id', $filters['category_id']);
        if (!empty($filters['sub_category_id'])) $q->where('sub_category_id', $filters['sub_category_id']);

        return $q->latest()->paginate($perPage);
    }

    public function findForEntreprise(int $entrepriseId, int $id): Product
    {
        return Product::where('entreprise_id', $entrepriseId)->findOrFail($id);
    }

    public function create(int $entrepriseId, array $data): Product
    {
        $data['entreprise_id'] = $entrepriseId;
        return Product::create($data);
    }

    public function update(Product $product, array $data): Product
    {
        $product->update($data);
        return $product;
    }

    public function delete(Product $product): void
    {
        $product->delete();
    }
}
