<?php

namespace App\Repositories;

use App\Models\SubCategory;
use App\Repositories\Contracts\SubCategoryRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SubCategoryRepository implements SubCategoryRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $q = SubCategory::where('entreprise_id', $entrepriseId)->with('category');

        if (!empty($filters['category_id'])) $q->where('category_id', $filters['category_id']);
        if (!empty($filters['search'])) {
            $s = $filters['search'];
            $q->where('name', 'like', "%$s%");
        }

        return $q->latest()->paginate($perPage);
    }

    public function findForEntreprise(int $entrepriseId, int $id): SubCategory
    {
        return SubCategory::where('entreprise_id', $entrepriseId)->with('category')->findOrFail($id);
    }

    public function create(int $entrepriseId, array $data): SubCategory
    {
        $data['entreprise_id'] = $entrepriseId;
        return SubCategory::create($data);
    }

    public function update(SubCategory $subCategory, array $data): SubCategory
    {
        $subCategory->update($data);
        return $subCategory;
    }

    public function delete(SubCategory $subCategory): void
    {
        $subCategory->delete();
    }
}
