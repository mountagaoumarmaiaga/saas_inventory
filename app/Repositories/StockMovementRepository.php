<?php

namespace App\Repositories;

use App\Models\StockMovement;
use App\Repositories\Contracts\StockMovementRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class StockMovementRepository implements StockMovementRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 20): LengthAwarePaginator
    {
        $q = StockMovement::where('entreprise_id', $entrepriseId)
            ->with(['product', 'invoice'])
            ->latest();

        if (!empty($filters['product_id'])) $q->where('product_id', (int)$filters['product_id']);
        if (!empty($filters['type'])) $q->where('type', $filters['type']);
        if (!empty($filters['invoice_id'])) $q->where('invoice_id', (int)$filters['invoice_id']);

        return $q->paginate($perPage);
    }

    public function findForEntreprise(int $entrepriseId, int $id): StockMovement
    {
        return StockMovement::where('entreprise_id', $entrepriseId)
            ->with(['product', 'invoice'])
            ->findOrFail($id);
    }

    public function create(int $entrepriseId, array $data): StockMovement
    {
        $data['entreprise_id'] = $entrepriseId;

        $m = StockMovement::create($data);

        return $m->load(['product', 'invoice']);
    }

    public function update(StockMovement $movement, array $data): StockMovement
    {
        $movement->update($data);

        return $movement->fresh()->load(['product', 'invoice']);
    }

    public function delete(StockMovement $movement): void
    {
        $movement->delete();
    }
}
