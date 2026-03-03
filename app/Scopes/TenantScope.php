<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class TenantScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        // Si l'utilisateur est authentifié
        if (Auth::hasUser()) {
            $user = Auth::user();

            // S'il est super_admin, on ne filtre PAS (il voit toutes les entreprises)
            if ($user->is_super_admin) {
                return;
            }

            // Sinon, l'utilisateur normal/admin est restreint à son entreprise_id
            if ($user->entreprise_id) {
                $builder->where($model->getTable() . '.entreprise_id', $user->entreprise_id);
            }
        }
        // Si pas de User (via console / jobs), c'est la responsabilité du job d'appliquer un filtrage ou withoutGlobalScope()
    }
}
