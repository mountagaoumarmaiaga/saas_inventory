<?php

namespace App\Repositories\Contracts;

use App\Models\Invoice;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface InvoiceRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 10): LengthAwarePaginator;
    public function findForEntreprise(int $entrepriseId, int $id): Invoice;
    public function create(int $entrepriseId, array $data): Invoice;
    public function update(Invoice $invoice, array $data): Invoice;
    public function delete(Invoice $invoice): void;
}
