<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$user = App\Models\User::where('email', 'admin@oumar.com')->first();
auth()->login($user);

$request = Illuminate\Http\Request::create('/admin/api/purchases', 'GET');
$request->setUserResolver(function() use ($user) { return $user; });

try {
    $response = $kernel->handle($request);
    echo "STATUS: " . $response->getStatusCode() . "\n";
    if ($response->getStatusCode() == 500 && isset($response->exception)) {
        echo "EXCEPTION: " . $response->exception->getMessage() . "\n";
        echo $response->exception->getTraceAsString();
    }
} catch (\Exception $e) {
    echo "CAUGHT EXCEPTION: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
