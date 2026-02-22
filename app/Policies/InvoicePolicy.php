<?php

namespace App\Policies;

use App\Models\Invoice;
use App\Models\User;

class InvoicePolicy
{
    public function viewAny(User $user): bool { return (bool)$user->entreprise_id; }
    public function view(User $user, Invoice $invoice): bool { return $user->entreprise_id === $invoice->entreprise_id; }

    public function create(User $user): bool { return (bool)$user->entreprise_id; } // user/admin

    public function update(User $user, Invoice $invoice): bool
    {
        if ($user->entreprise_id !== $invoice->entreprise_id) return false;
        if ($invoice->status === 'PAID') return false;
        // user peut modifier seulement ses docs
        return $user->isAdmin() || $invoice->created_by === $user->id;
    }

    public function delete(User $user, Invoice $invoice): bool
    {
        if ($user->entreprise_id !== $invoice->entreprise_id) return false;
        if ($invoice->status === 'PAID') return false;
        return $user->isAdmin() || $invoice->created_by === $user->id;
    }

    // actions workflow
    public function submit(User $user, Invoice $invoice): bool
    {
        return $this->update($user, $invoice) && $invoice->type === 'invoice' && $invoice->status === 'DRAFT';
    }

    public function approve(User $user, Invoice $invoice): bool
    {
        return $user->isAdmin()
            && $user->entreprise_id === $invoice->entreprise_id
            && $invoice->type === 'invoice'
            && $invoice->status === 'PENDING';
    }

    public function markPaid(User $user, Invoice $invoice): bool
    {
        return $user->isAdmin()
            && $user->entreprise_id === $invoice->entreprise_id
            && $invoice->type === 'invoice'
            && $invoice->status === 'APPROVED';
    }

    public function markUnpaid(User $user, Invoice $invoice): bool
    {
        return $user->isAdmin()
            && $user->entreprise_id === $invoice->entreprise_id
            && $invoice->type === 'invoice'
            && $invoice->status === 'PAID';
    }

    public function validateProforma(User $user, Invoice $invoice): bool
    {
        return $this->update($user, $invoice)
            && $invoice->type === 'proforma'
            && $invoice->status === 'DRAFT';
    }

    public function requestModification(User $user, Invoice $invoice): bool
    {
        \Illuminate\Support\Facades\Log::info('InvoicePolicy@requestModification', [
            'user_id' => $user->id,
            'user_role' => $user->role,
            'user_ent' => $user->entreprise_id,
            'inv_id' => $invoice->id,
            'inv_ent' => $invoice->entreprise_id,
            'inv_status' => $invoice->status,
            'inv_mod_req' => $invoice->modification_requested_at,
            'is_admin' => $user->isAdmin(),
            'created_by' => $invoice->created_by
        ]);

        // User can request if it's their invoice (or admin) and status is valid
        return ($user->isAdmin() || $invoice->created_by === $user->id)
            && $user->entreprise_id === $invoice->entreprise_id
            && in_array($invoice->status, ['APPROVED', 'PAID'])
            && is_null($invoice->modification_requested_at);
    }

    public function approveModification(User $user, Invoice $invoice): bool
    {
        // Only Admin can approve modification request
        return $user->isAdmin()
            && $user->entreprise_id === $invoice->entreprise_id
            && !is_null($invoice->modification_requested_at);
    }
}
