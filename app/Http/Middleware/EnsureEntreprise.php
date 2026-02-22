<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureEntreprise
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (!$user || !$user->entreprise_id) {
            return redirect()->route('pending.approval');
        }

        return $next($request);
    }
}
