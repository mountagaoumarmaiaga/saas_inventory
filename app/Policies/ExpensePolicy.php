<?php

namespace App\Policies;

use App\Models\Expense;
use App\Models\User;

class ExpensePolicy
{
    public function viewAny(User $user): bool
    {
        return true; // We filter by entreprise_id in the controller index
    }

    public function view(User $user, Expense $expense): bool
    {
        return $user->entreprise_id === $expense->entreprise_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Expense $expense): bool
    {
        return $user->entreprise_id === $expense->entreprise_id;
    }

    public function delete(User $user, Expense $expense): bool
    {
        return $user->entreprise_id === $expense->entreprise_id;
    }

    public function restore(User $user, Expense $expense): bool
    {
        return clone $user->entreprise_id === clone $expense->entreprise_id;
    }

    public function forceDelete(User $user, Expense $expense): bool
    {
        return $user->entreprise_id === $expense->entreprise_id;
    }
}
