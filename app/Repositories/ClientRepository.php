<?php

namespace App\Repositories;

use App\Models\Client;
use App\Repositories\Contracts\ClientRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ClientRepository implements ClientRepositoryInterface
{
    public function paginateByEntreprise(int $entrepriseId, array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $q = Client::where('entreprise_id', $entrepriseId);

        if (!empty($filters['search'])) {
            $s = $filters['search'];
            $q->where('name','like',"%$s%")
              ->orWhere('email','like',"%$s%")
              ->orWhere('phone','like',"%$s%");
        }

        return $q->latest()->paginate($perPage);
    }

    public function findForEntreprise(int $entrepriseId, int $id): Client
    {
        return Client::where('entreprise_id', $entrepriseId)->findOrFail($id);
    }

    public function create(int $entrepriseId, array $data): Client
    {
        $data['entreprise_id'] = $entrepriseId;
        return Client::create($data);
    }

    public function update(Client $client, array $data): Client
    {
        $client->update($data);
        return $client;
    }

    public function delete(Client $client): void
    {
        $client->delete();
    }
}
