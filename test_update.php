<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$user = App\Models\User::find(23);
$entreprise = $user->entreprise;

$request = Illuminate\Http\Request::create(
    '/admin/api/settings/invoice', 'PUT', 
    ['name' => 'Société', 'email' => 'contact@saranmedical.ml']
);
$request->setUserResolver(function() use ($user) { return $user; });

$response = $kernel->handle($request);
echo "Status: " . $response->getStatusCode() . "\n";
echo "Content: " . $response->getContent() . "\n";
