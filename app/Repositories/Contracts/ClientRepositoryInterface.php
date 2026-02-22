<?php

namespace App\Repositories\Contracts;

use App\Models\Client;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ClientRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 10): LengthAwarePaginator;
    public function findForEntreprise(int $entrepriseId, int $id): Client;
    public function create(int $entrepriseId, array $data): Client;
    public function update(Client $client, array $data): Client;
    public function delete(Client $client): void;
}
