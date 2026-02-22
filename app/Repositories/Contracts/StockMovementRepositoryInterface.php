<?php

namespace App\Repositories\Contracts;

use App\Models\StockMovement;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface StockMovementRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 20): LengthAwarePaginator;

    public function findForEntreprise(int $entrepriseId, int $id): StockMovement;

    public function create(int $entrepriseId, array $data): StockMovement;

    public function update(StockMovement $movement, array $data): StockMovement;

    public function delete(StockMovement $movement): void;
}
