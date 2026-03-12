<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Alias de middleware
        $middleware->alias([
            'entreprise' => \App\Http\Middleware\EnsureEntreprise::class,
            'role'       => \App\Http\Middleware\RoleMiddleware::class,
        ]);
    })
    ->withMiddleware(function (Middleware $middleware): void {
        // Confiance des proxys (pour Koyeb et l'HTTPS)
        $trustedProxies = env('TRUSTED_PROXIES', null);
        if ($trustedProxies === '*') {
            $middleware->trustProxies(at: '*');
        } elseif ($trustedProxies) {
            $middleware->trustProxies(at: explode(',', $trustedProxies));
        }

        // Configuration des cookies
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        // Configuration CSRF (Exemptions si nécessaire)
        // Les routes admin/api/* sont protegees par l'auth session, pas besoin du CSRF token separement
        $middleware->validateCsrfTokens(except: [
            'admin/api/*',
            // 'stripe/*',
        ]);

        // Middlewares web supplémentaires
        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\SecurityHeadersMiddleware::class,
            \Spatie\Csp\AddCspHeaders::class,
            \App\Http\Middleware\PayloadSizeLimit::class,
            \App\Http\Middleware\CircuitBreaker::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->reportable(function (\Throwable $e) {
            if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface) {
                $statusCode = $e->getStatusCode();
                
                // Tracker les accès interdits (403) ou cachés derrière des scopes (404 / ModelNotFound) -> Intrusion Detection
                if (in_array($statusCode, [403, 404])) {
                    $request = request();
                    if ($request) {
                        \Illuminate\Support\Facades\Log::channel('single')->warning("Suspicious {$statusCode} Error Triggered", [
                            'ip' => $request->ip(),
                            'url' => $request->fullUrl(),
                            'method' => $request->method(),
                            'user_id' => auth()->id(),
                            'user_agent' => $request->userAgent()
                        ]);
                    }
                }
            }
        });
    })
    ->withProviders([
        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        App\Providers\FortifyServiceProvider::class,
        App\Providers\RepositoryServiceProvider::class,
    ])
    ->create();
