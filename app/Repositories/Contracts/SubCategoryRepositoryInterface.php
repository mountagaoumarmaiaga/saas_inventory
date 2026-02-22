<?php

namespace App\Repositories\Contracts;

use App\Models\SubCategory;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface SubCategoryRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 10): LengthAwarePaginator;
    public function findForEntreprise(int $entrepriseId, int $id): SubCategory;
    public function create(int $entrepriseId, array $data): SubCategory;
    public function update(SubCategory $subCategory, array $data): SubCategory;
    public function delete(SubCategory $subCategory): void;
}
