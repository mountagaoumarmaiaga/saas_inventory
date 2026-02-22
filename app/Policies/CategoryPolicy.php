<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CategoryPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // Autoriser tous les utilisateurs authentifiés à voir la liste
        return $user !== null; // ou return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Category $category): bool
    {
        // Autoriser si l'utilisateur appartient à la même entreprise
        return $user->entreprise_id === $category->entreprise_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Autoriser si l'utilisateur est admin ou manager
        return in_array($user->role, ['admin', 'manager']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Category $category): bool
    {
        // Autoriser si admin/manager ET même entreprise
        return in_array($user->role, ['admin', 'manager'])
            && $user->entreprise_id === $category->entreprise_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Category $category): bool
    {
        // Autoriser seulement admin ET même entreprise
        return $user->role === 'admin'
            && $user->entreprise_id === $category->entreprise_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Category $category): bool
    {
        // Autoriser seulement admin
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Category $category): bool
    {
        // Autoriser seulement admin
        return $user->role === 'admin';
    }
}
