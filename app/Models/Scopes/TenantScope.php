<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TenantScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        if (auth()->hasUser()) {
            $user = auth()->user();
            
            // Bypass isolation completely if SuperAdmin
            if (!$user->is_super_admin) {
                $builder->where($model->getTable() . '.entreprise_id', $user->entreprise_id);
            }
        }
    }
}
