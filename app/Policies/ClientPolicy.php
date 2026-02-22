<?php

namespace App\Policies;

use App\Models\Client;
use App\Models\User;

class ClientPolicy
{
    public function viewAny(User $user): bool { return (bool)$user->entreprise_id; }
    public function view(User $user, Client $client): bool { return $user->entreprise_id === $client->entreprise_id; }

    public function create(User $user): bool { return (bool)$user->entreprise_id; } // user & admin
    public function update(User $user, Client $client): bool { return $user->entreprise_id === $client->entreprise_id; }
    public function delete(User $user, Client $client): bool { return $user->isAdmin() && $user->entreprise_id === $client->entreprise_id; } // au choix
}
