<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockMovementController;
use App\Http\Controllers\SubCategoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/inventory-demo', fn() => Inertia::render('demo-inventory'));
Route::get('/dashboard-demo', fn() => Inertia::render('demo-dashboard'));
Route::get('/saas-dashboard', fn() => Inertia::render('saas-dashboard'));
Route::get('/saas-invoice-models', fn() => Inertia::render('saas-invoice-models'));

/*
|--------------------------------------------------------------------------
| Auth pages (GET) - pages Inertia
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/login', fn() => Inertia::render('auth/login'))->name('login');
    Route::get('/register', fn() => Inertia::render('auth/register'))->name('register');
    Route::get('/forgot-password', fn() => Inertia::render('auth/forgot-password'))->name('password.request');
});

/*
|--------------------------------------------------------------------------
| Pending Approval Page (For users without an entreprise)
|--------------------------------------------------------------------------
*/
Route::get('/pending-approval', fn() => Inertia::render('PendingApproval'))->name('pending.approval');

Route::post('/request-access', function (\Illuminate\Http\Request $request) {
    $data = $request->validate([
        'company_name' => 'required|string|max:255',
        'phone' => 'required|string|max:255',
        'message' => 'nullable|string'
    ]);

    // Send email to CEO
    try {
        \Illuminate\Support\Facades\Mail::to('mountagaoumarmaiga@gmail.com')
            ->send(new \App\Mail\AccessRequestMail($data, $request->user()));
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error('Erreur lors de l\'envoi de l\'email de demande d\'accès: ' . $e->getMessage());
        // We still return success to the user so they aren't blocked, but log the error
    }

    return back()->with('success', 'Votre demande a bien été envoyée.');
})->middleware('auth')->name('access.request');

/*
|--------------------------------------------------------------------------
| Logout (POST)
|--------------------------------------------------------------------------
*/
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();

    return redirect()->route('login');
})->middleware('auth')->name('logout');

/*
|--------------------------------------------------------------------------
| Dashboard dispatcher
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function () {
    $user = Auth::user();

    if (! $user) {
        return redirect()->route('login');
    }

    if (! $user->entreprise_id) {
        return redirect()->route('pending.approval');
    }

    if ($user->isSuperAdmin()) {
        return redirect()->route('super-admin.dashboard');
    }

    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }

    return redirect()->route('user.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| User routes (pages)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])
    ->prefix('user')
    ->name('user.')
    ->group(function () {

        Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'indexUser'])
            ->name('dashboard');

        Route::get('/clients', fn() => Inertia::render('user/clients/index'))->name('clients.index');
        Route::get('/clients/create', fn() => Inertia::render('user/clients/Create'))->name('clients.create');
        Route::get('/clients/{id}/edit', fn($id) => Inertia::render('user/clients/Edit', ['id' => $id]))->name('clients.edit');

        Route::get('/products', fn() => Inertia::render('user/products/index'))
            ->name('products.index');

        Route::get('/invoices', fn() => Inertia::render('user/invoices/index'))
            ->name('invoices.index');
        Route::get('/invoices/create', fn() => Inertia::render('user/invoices/Create'))
            ->name('invoices.create');
        Route::get('/invoices/{id}/edit', fn($id) => Inertia::render('user/invoices/Edit', ['id' => $id]))
            ->name('invoices.edit');

        Route::get('/proformas', fn() => Inertia::render('user/proformas/index'))
            ->name('proformas.index');

        Route::get('/delivery-notes', fn() => Inertia::render('user/delivery-notes/index'))
            ->name('delivery-notes.index');
        Route::get('/delivery-notes/{id}/edit', fn($id) => Inertia::render('user/delivery-notes/Edit', ['id' => $id]))
            ->name('delivery-notes.edit');
        Route::get('/delivery-notes/{id}', fn($id) => Inertia::render('user/delivery-notes/Show', ['id' => $id]))
            ->name('delivery-notes.show');
        Route::get('/delivery-notes/{id}/edit', fn($id) => Inertia::render('user/delivery-notes/Edit', ['id' => $id]))
            ->name('delivery-notes.edit');
        Route::get('/delivery-notes/{id}/print', fn($id) => Inertia::render('user/delivery-notes/Print', ['id' => $id]))
            ->name('delivery-notes.print');

    });

/*
|--------------------------------------------------------------------------
| Admin routes (pages)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'indexAdmin'])
            ->name('dashboard');

        Route::get('/categories', fn() => Inertia::render('admin/categories/index'))
            ->name('categories.index');

        Route::get('/sub-categories', fn() => Inertia::render('admin/sub-categories/index'))
            ->name('sub-categories.index');



        Route::get('/users', fn() => Inertia::render('admin/users/index'))
            ->name('users.index');

        Route::get('/stock-movements', fn() => Inertia::render('admin/stock-movements/index'))
            ->name('stock-movements.index');

        Route::get('/invoices', fn() => Inertia::render('admin/invoices/index'))
            ->name('invoices.index');
        Route::get('/invoices/create', fn() => Inertia::render('admin/invoices/Create'))
            ->name('invoices.create');
        Route::get('/invoices/{id}/edit', fn($id) => Inertia::render('admin/invoices/Edit', ['id' => $id]))
            ->name('invoices.edit');
        Route::get('/invoices/{id}', fn($id) => Inertia::render('admin/invoices/Show', ['id' => $id]))
            ->name('invoices.show');
        
        Route::get('/settings/invoice-customization', fn() => Inertia::render('admin/settings/invoice-customization/index'))
            ->name('settings.invoice-customization');

        Route::get('/delivery-notes', fn() => Inertia::render('admin/delivery-notes/index'))
            ->name('delivery-notes.index');
        Route::get('/delivery-notes/{id}/edit', fn($id) => Inertia::render('admin/delivery-notes/Edit', ['id' => $id]))
            ->name('delivery-notes.edit');

        Route::get('/products', fn() => Inertia::render('admin/products/index'))
            ->name('products.index');
        Route::get('/products/create', fn() => Inertia::render('admin/products/Create'))
            ->name('products.create');
        Route::get('/products/{id}/edit', fn($id) => Inertia::render('admin/products/Edit', ['id' => $id]))
            ->name('products.edit');

        /*
        |--------------------------------------------------------------------------
        | ✅ ADMIN API (JSON) - pour fetch React
        |--------------------------------------------------------------------------
        | Tu appelles /admin/api/products depuis React.
        | Donc on le déclare ici (middleware web + csrf OK).
        */
        Route::prefix('api')->group(function () {
            Route::get('/products', [ProductController::class, 'index'])->name('api.products.index');
            Route::post('/products', [ProductController::class, 'store'])->name('api.products.store');
            Route::get('/products/{id}', [ProductController::class, 'show'])->name('api.products.show');
            Route::put('/products/{id}', [ProductController::class, 'update'])->name('api.products.update');
            Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('api.products.destroy');

            Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
            Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
            Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
            Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
            Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');

            Route::get('/sub-categories', [SubCategoryController::class, 'index'])->name('sub-categories.index');
            Route::post('/sub-categories', [SubCategoryController::class, 'store'])->name('sub-categories.store');
            Route::get('/sub-categories/{id}', [SubCategoryController::class, 'show'])->name('sub-categories.show');
            Route::put('/sub-categories/{id}', [SubCategoryController::class, 'update'])->name('sub-categories.update');
            Route::delete('/sub-categories/{id}', [SubCategoryController::class, 'destroy'])->name('sub-categories.destroy');

            Route::get('/stock-movements', [StockMovementController::class, 'index'])->name('stock-movements.index');
            Route::post('/stock-movements', [StockMovementController::class, 'store'])->name('stock-movements.store');
            Route::get('/stock-movements/{id}', [StockMovementController::class, 'show'])->name('stock-movements.show');
            Route::put('/stock-movements/{id}', [StockMovementController::class, 'update'])->name('stock-movements.update');
            Route::delete('/stock-movements/{id}', [StockMovementController::class, 'destroy'])->name('stock-movements.destroy');

            Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('api.users.index');
            Route::post('/users', [\App\Http\Controllers\Admin\UserController::class, 'store'])->name('api.users.store');
            Route::put('/users/{id}', [\App\Http\Controllers\Admin\UserController::class, 'update'])->name('api.users.update');
            Route::delete('/users/{id}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('api.users.destroy');
            
            Route::get('/invoices', [\App\Http\Controllers\InvoiceController::class, 'index'])->name('api.invoices.index');
            Route::get('/clients-list', [\App\Http\Controllers\InvoiceController::class, 'clientsList'])->name('api.invoices.clients'); // Helper route
            Route::post('/invoices', [\App\Http\Controllers\InvoiceController::class, 'store'])->name('api.invoices.store');
            Route::get('/invoices/{id}', [\App\Http\Controllers\InvoiceController::class, 'show'])->name('api.invoices.show');
            Route::put('/invoices/{id}', [\App\Http\Controllers\InvoiceController::class, 'update'])->name('api.invoices.update');
            Route::delete('/invoices/{id}', [\App\Http\Controllers\InvoiceController::class, 'destroy'])->name('api.invoices.destroy');
            
            // Workflow routes
            Route::post('/invoices/{id}/submit', [\App\Http\Controllers\InvoiceController::class, 'submit'])->name('api.invoices.submit');
            Route::post('/invoices/{id}/approve', [\App\Http\Controllers\InvoiceController::class, 'approve'])->name('api.invoices.approve');
            Route::post('/invoices/{id}/mark-paid', [\App\Http\Controllers\InvoiceController::class, 'markPaid'])->name('api.invoices.mark-paid');
            Route::post('/invoices/{id}/mark-unpaid', [\App\Http\Controllers\InvoiceController::class, 'markUnpaid'])->name('api.invoices.mark-unpaid');
            Route::post('/invoices/{id}/request-modification', [\App\Http\Controllers\InvoiceController::class, 'requestModification'])->name('api.invoices.request-modification');
            Route::post('/invoices/{id}/approve-modification', [\App\Http\Controllers\InvoiceController::class, 'approveModification'])->name('api.invoices.approve-modification');
            Route::post('/invoices/{id}/validate-proforma', [\App\Http\Controllers\InvoiceController::class, 'validateProforma'])->name('api.invoices.validate-proforma');
            
            // PDF routes
            Route::get('/invoices/{id}/pdf/view', [\App\Http\Controllers\InvoiceController::class, 'pdfView'])->name('api.invoices.pdf.view');
            Route::get('/invoices/{id}/pdf/download', [\App\Http\Controllers\InvoiceController::class, 'pdfDownload'])->name('api.invoices.pdf.download');

            // Clients API
            Route::get('/clients', [\App\Http\Controllers\ClientController::class, 'index'])->name('api.clients.index');
            Route::post('/clients', [\App\Http\Controllers\ClientController::class, 'store'])->name('api.clients.store');
            Route::get('/clients/{id}', [\App\Http\Controllers\ClientController::class, 'show'])->name('api.clients.show');
            Route::put('/clients/{id}', [\App\Http\Controllers\ClientController::class, 'update'])->name('api.clients.update');
            Route::delete('/clients/{id}', [\App\Http\Controllers\ClientController::class, 'destroy'])->name('api.clients.destroy');
            
            // Settings API
            Route::get('/settings/invoice', [\App\Http\Controllers\EntrepriseSettingsController::class, 'show'])->name('api.settings.invoice.show');
            Route::put('/settings/invoice', [\App\Http\Controllers\EntrepriseSettingsController::class, 'update'])->name('api.settings.invoice.update');
            Route::post('/settings/invoice/logo', [\App\Http\Controllers\EntrepriseSettingsController::class, 'uploadLogo'])->name('api.settings.invoice.logo');

            // Delivery Notes API
            Route::get('/delivery-notes', [\App\Http\Controllers\DeliveryNoteController::class, 'index'])->name('api.delivery-notes.index');
            Route::get('/delivery-notes/{id}', [\App\Http\Controllers\DeliveryNoteController::class, 'show'])->name('api.delivery-notes.show');
            Route::put('/delivery-notes/{id}', [\App\Http\Controllers\DeliveryNoteController::class, 'update'])->name('api.delivery-notes.update');
            Route::post('/delivery-notes/from-invoice/{id}', [\App\Http\Controllers\DeliveryNoteController::class, 'createFromInvoice'])->name('api.delivery-notes.create-from-invoice');
            Route::get('/delivery-notes/{id}/pdf', [\App\Http\Controllers\DeliveryNoteController::class, 'downloadPdf'])->name('api.delivery-notes.pdf');
        });
        
        // Admin Page Routes for Clients
        Route::get('/clients/create', fn() => Inertia::render('admin/clients/Create'))->name('clients.create');
        Route::get('/clients/{id}/edit', fn($id) => Inertia::render('admin/clients/Edit', ['id' => $id]))->name('clients.edit');
        Route::get('/clients', fn() => Inertia::render('admin/clients/index'))->name('clients.index'); // Check if index route existed? Yes, line 111 in original file, but let's confirm.
        // Line 111-131 in original shows other indexes. Clients index was missing in the Page Block (lines 108-131).
        // Wait, User routes (74-96) had /clients. Admin routes didn't.
        // I will add the Admin Page Routes here.
    });

/*
|--------------------------------------------------------------------------
| User API Routes (NEW)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])
    ->prefix('user/api')
    ->name('user.api.')
    ->group(function () {
        Route::get('/clients', [\App\Http\Controllers\ClientController::class, 'index'])->name('clients.index');
        Route::post('/clients', [\App\Http\Controllers\ClientController::class, 'store'])->name('clients.store');
        Route::get('/clients/{id}', [\App\Http\Controllers\ClientController::class, 'show'])->name('clients.show');
        Route::put('/clients/{id}', [\App\Http\Controllers\ClientController::class, 'update'])->name('clients.update');
        Route::get('/clients/{id}', [\App\Http\Controllers\ClientController::class, 'show'])->name('clients.show');
        Route::put('/clients/{id}', [\App\Http\Controllers\ClientController::class, 'update'])->name('clients.update');
        Route::delete('/clients/{id}', [\App\Http\Controllers\ClientController::class, 'destroy'])->name('clients.destroy');

        // Invoices API for User
        Route::get('/invoices', [\App\Http\Controllers\InvoiceController::class, 'index'])->name('invoices.index');
        Route::get('/clients-list', [\App\Http\Controllers\InvoiceController::class, 'clientsList'])->name('invoices.clients');
        Route::post('/invoices', [\App\Http\Controllers\InvoiceController::class, 'store'])->name('invoices.store');
        Route::get('/invoices/{id}', [\App\Http\Controllers\InvoiceController::class, 'show'])->name('invoices.show');
        Route::put('/invoices/{id}', [\App\Http\Controllers\InvoiceController::class, 'update'])->name('invoices.update');
        Route::delete('/invoices/{id}', [\App\Http\Controllers\InvoiceController::class, 'destroy'])->name('invoices.destroy');
        
        // Workflow for User
        Route::post('/invoices/{id}/submit', [\App\Http\Controllers\InvoiceController::class, 'submit'])->name('invoices.submit');
        Route::post('/invoices/{id}/request-modification', [\App\Http\Controllers\InvoiceController::class, 'requestModification'])->name('invoices.request-modification');
        Route::post('/invoices/{id}/validate-proforma', [\App\Http\Controllers\InvoiceController::class, 'validateProforma'])->name('invoices.validate-proforma');

        // PDF for User
        Route::get('/invoices/{id}/pdf/view', [\App\Http\Controllers\InvoiceController::class, 'pdfView'])->name('invoices.pdf.view');
        Route::get('/invoices/{id}/pdf/download', [\App\Http\Controllers\InvoiceController::class, 'pdfDownload'])->name('invoices.pdf.download');

        // Products API for User (needed for dropdowns)
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');

        // Delivery Notes API
        Route::get('/delivery-notes', [\App\Http\Controllers\DeliveryNoteController::class, 'index'])->name('delivery-notes.index');
        Route::get('/delivery-notes/{id}', [\App\Http\Controllers\DeliveryNoteController::class, 'show'])->name('delivery-notes.show');
        Route::put('/delivery-notes/{id}', [\App\Http\Controllers\DeliveryNoteController::class, 'update'])->name('delivery-notes.update');
        Route::post('/delivery-notes/from-invoice/{id}', [\App\Http\Controllers\DeliveryNoteController::class, 'createFromInvoice'])->name('delivery-notes.create-from-invoice');
        
        // PDF for Delivery Notes (API)
        Route::get('/delivery-notes/{id}/pdf', [\App\Http\Controllers\DeliveryNoteController::class, 'downloadPdf'])->name('delivery-notes.pdf');

        // Settings API for User (Read-only)
        Route::get('/settings/invoice', [\App\Http\Controllers\EntrepriseSettingsController::class, 'show'])->name('settings.invoice.show');
    });

/*
|--------------------------------------------------------------------------
| Super Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', \App\Http\Middleware\EnsureUserIsSuperAdmin::class])
    ->prefix('super-admin')
    ->name('super-admin.')
    ->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('super-admin/dashboard');
        })->name('dashboard');

        Route::get('/enterprises', [\App\Http\Controllers\SuperAdmin\EnterpriseController::class, 'index'])->name('enterprises.index');
        Route::post('/enterprises', [\App\Http\Controllers\SuperAdmin\EnterpriseController::class, 'store'])->name('enterprises.store');
        Route::post('/enterprises/{id}/reset-password', [\App\Http\Controllers\SuperAdmin\EnterpriseController::class, 'resetPassword'])->name('enterprises.reset-password');
    });

/*
|--------------------------------------------------------------------------
| Breeze/Fortify
|--------------------------------------------------------------------------
*/
if (file_exists(__DIR__ . '/auth.php')) {
    require __DIR__ . '/auth.php';
}

if (file_exists(__DIR__ . '/settings.php')) {
    require __DIR__ . '/settings.php';
}
