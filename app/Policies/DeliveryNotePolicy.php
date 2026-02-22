<?php

namespace App\Policies;

use App\Models\DeliveryNote;
use App\Models\User;

class DeliveryNotePolicy
{
    public function viewAny(User $user): bool { return (bool)$user->entreprise_id; }
    public function view(User $user, DeliveryNote $dn): bool { return $user->entreprise_id === $dn->entreprise_id; }

    // création BL depuis facture : autoriser user/admin si même entreprise
    public function createFromInvoice(User $user): bool { return (bool)$user->entreprise_id; }

    public function update(User $user, DeliveryNote $dn): bool { 
        return $user->entreprise_id === $dn->entreprise_id; 
    }
}
