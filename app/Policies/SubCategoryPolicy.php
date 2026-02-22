<?php

namespace App\Policies;

use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SubCategoryPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // Autoriser tous les utilisateurs authentifiés
        return $user !== null;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, SubCategory $subCategory): bool
    {
        // Autoriser si même entreprise
        return $user->entreprise_id === $subCategory->entreprise_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Autoriser admin ou manager
        return in_array($user->role, ['admin', 'manager']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, SubCategory $subCategory): bool
    {
        // Autoriser admin/manager ET même entreprise
        return in_array($user->role, ['admin', 'manager'])
            && $user->entreprise_id === $subCategory->entreprise_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, SubCategory $subCategory): bool
    {
        // Autoriser seulement admin ET même entreprise
        return $user->role === 'admin'
            && $user->entreprise_id === $subCategory->entreprise_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, SubCategory $subCategory): bool
    {
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, SubCategory $subCategory): bool
    {
        return $user->role === 'admin';
    }
}
