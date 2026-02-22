<?php

namespace App\Repositories;

use App\Models\Invoice;
use App\Repositories\Contracts\InvoiceRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class InvoiceRepository implements InvoiceRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $q = Invoice::where('entreprise_id', $entrepriseId)->with(['client','items','deliveryNotes']);

        if (!empty($filters['type'])) $q->where('type', $filters['type']);
        if (!empty($filters['status'])) $q->where('status', $filters['status']);
        if (!empty($filters['search'])) {
            $s = $filters['search'];
            $q->where('number','like',"%$s%");
        }

        return $q->latest()->paginate($perPage);
    }

    public function findForEntreprise(int $entrepriseId, int $id): Invoice
    {
        return Invoice::where('entreprise_id', $entrepriseId)
            ->with(['client','items.product'])
            ->findOrFail($id);
    }

    public function create(int $entrepriseId, array $data): Invoice
    {
        $data['entreprise_id'] = $entrepriseId;
        return Invoice::create($data);
    }

    public function update(Invoice $invoice, array $data): Invoice
    {
        $invoice->update($data);
        return $invoice;
    }

    public function delete(Invoice $invoice): void
    {
        $invoice->delete();
    }
}
