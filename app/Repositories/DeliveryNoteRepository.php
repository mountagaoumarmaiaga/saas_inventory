<?php

namespace App\Repositories;

use App\Models\DeliveryNote;
use App\Repositories\Contracts\DeliveryNoteRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class DeliveryNoteRepository implements DeliveryNoteRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $q = DeliveryNote::where('entreprise_id', $entrepriseId)->with(['client','invoice','entreprise'])->latest();

        if (!empty($filters['status'])) $q->where('status', $filters['status']);
        if (!empty($filters['search'])) $q->where('number', 'like', '%'.$filters['search'].'%');

        return $q->paginate($perPage);
    }

    public function findForEntreprise(int $entrepriseId, int $id): DeliveryNote
    {
        return DeliveryNote::where('entreprise_id', $entrepriseId)
            ->with(['client','invoice','items.product','entreprise'])
            ->findOrFail($id);
    }
}
