<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class CircuitBreaker
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Limite agressive : 150 requêtes par minute par IP
        $key = 'circuit-breaker:' . $request->ip();
        $maxAttempts = 150;
        $decayMinutes = 5; // Penalty box pour 5 minutes si dépassé

        if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
            abort(429, 'Circuit Breaker Triggered: Trop de requêtes détectées de cette IP. Veuillez patienter 5 minutes.');
        }

        RateLimiter::hit($key, $decayMinutes * 60);

        $response = $next($request);

        // Si la réponse est un succès 2xx, on pourrait théoriquement relâcher légèrement la pression, 
        // mais le Hit simple par minute est standard.
        // Si la réponse est un 401 ou 403, on pénalise doublement l'attaquant potentiel.
        if (in_array($response->getStatusCode(), [401, 403])) {
            RateLimiter::hit($key, $decayMinutes * 60); // Double hit = atteint la limite 2x plus vite sur les erreurs d'auth
            RateLimiter::hit($key, $decayMinutes * 60);
        }

        return $response;
    }
}
