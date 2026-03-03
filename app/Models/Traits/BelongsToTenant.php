<?php

namespace App\Models\Traits;

use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Model;

trait BelongsToTenant
{
    /**
     * Boot the trait to add the global scope.
     */
    protected static function bootBelongsToTenant(): void
    {
        static::addGlobalScope(new TenantScope);
        
        static::creating(function (Model $model) {
            // Automatically assign the user's tenant if not explicitly set (and the user is logged in)
            if (auth()->hasUser() && empty($model->entreprise_id) && !auth()->user()->is_super_admin) {
                $model->entreprise_id = auth()->user()->entreprise_id;
            }
        });
    }

    /**
     * Relationship to the owning enterprise.
     */
    public function entreprise()
    {
        return $this->belongsTo(\App\Models\Entreprise::class);
    }
}
