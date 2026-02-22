<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CategoryRepository implements CategoryRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $q = Category::where('entreprise_id', $entrepriseId);

        if (!empty($filters['search'])) {
            $s = $filters['search'];
            $q->where('name', 'like', "%$s%");
        }

        return $q->latest()->paginate($perPage);
    }

    public function findForEntreprise(int $entrepriseId, int $id): Category
    {
        return Category::where('entreprise_id', $entrepriseId)->findOrFail($id);
    }

    public function create(int $entrepriseId, array $data): Category
    {
        $data['entreprise_id'] = $entrepriseId;
        return Category::create($data);
    }

    public function update(Category $category, array $data): Category
    {
        $category->update($data);
        return $category;
    }

    public function delete(Category $category): void
    {
        $category->delete();
    }
}
