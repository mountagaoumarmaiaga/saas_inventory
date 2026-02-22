<?php

namespace App\Repositories\Contracts;

use App\Models\DeliveryNote;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface DeliveryNoteRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 10): LengthAwarePaginator;
    public function findForEntreprise(int $entrepriseId, int $id): DeliveryNote;
}
