<?php

namespace App\Repositories\Contracts;

use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 10): LengthAwarePaginator;
    public function findForEntreprise(int $entrepriseId, int $id): Product;
    public function create(int $entrepriseId, array $data): Product;
    public function update(Product $product, array $data): Product;
    public function delete(Product $product): void;
}
