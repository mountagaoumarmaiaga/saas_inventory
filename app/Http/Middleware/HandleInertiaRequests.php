<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user() ? $request->user()->load('entreprise') : null,
                'permissions' => $request->user() ? $request->user()->getAllPermissions()->pluck('name') : [],
                'roles' => $request->user() ? $request->user()->getRoleNames() : [],
            ],
            'honeypot' => [
                'enabled' => config('honeypot.enabled'),
                'nameFieldName' => config('honeypot.name_field_name'),
                'validFromFieldName' => config('honeypot.valid_from_field_name'),
                'encryptedValidFrom' => \Spatie\Honeypot\EncryptedTime::create(\Carbon\Carbon::now()),
            ],
            'flash' => fn () => $request->session()->get('flash') ?? [],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'env' => [
                'supabaseUrl' => env('VITE_SUPABASE_URL'),
                'supabaseAnonKey' => env('VITE_SUPABASE_ANON_KEY'),
            ],
        ];
    }
}
