<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

// Login as admin
$user = App\Models\User::where('email', 'admin@oumar.com')->first();
auth()->login($user);

// We must bypass VerifyCsrfToken for testing easily
$request = Illuminate\Http\Request::create('/admin/api/quotes', 'GET');
$request->setUserResolver(function() use ($user) { return $user; });

try {
    $response = $kernel->handle($request);
    echo "STATUS: " . $response->getStatusCode() . "\n";
    if ($response->getStatusCode() == 500) {
        echo "EXCEPTION: " . $response->exception->getMessage() . "\n";
    }
} catch (\Exception $e) {
    echo "CAUGHT EXCEPTION: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
