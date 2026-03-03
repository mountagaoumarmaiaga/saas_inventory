<?php

namespace App\Traits;

use App\Models\Entreprise;
use App\Scopes\TenantScope;
use Illuminate\Support\Facades\Auth;

trait BelongsToEntreprise
{
    /**
     * Add the global scope to the model.
     */
    public static function bootBelongsToEntreprise()
    {
        // 1. Appliquer le Global Scope de lecture
        static::addGlobalScope(new TenantScope);

        // 2. Automatiquement injecter entreprise_id à la création
        static::creating(function ($model) {
            if (!$model->entreprise_id && Auth::hasUser()) {
                $user = Auth::user();
                if (!$user->is_super_admin && $user->entreprise_id) {
                    $model->entreprise_id = $user->entreprise_id;
                }
            }
        });
    }

    /**
     * Get the entreprise that owns the model.
     */
    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }
}
