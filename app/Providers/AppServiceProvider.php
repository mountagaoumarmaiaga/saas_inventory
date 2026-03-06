<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Vite;
use App\Models\Invoice;
use App\Models\Payment;
use App\Observers\InvoiceObserver;
use App\Observers\PaymentObserver;
use App\Repositories\Contracts\{
    CategoryRepositoryInterface,
    SubCategoryRepositoryInterface,
    ProductRepositoryInterface,
    ClientRepositoryInterface,
    InvoiceRepositoryInterface,
    StockMovementRepositoryInterface,
    DeliveryNoteRepositoryInterface
};
use App\Repositories\{
    CategoryRepository,
    SubCategoryRepository,
    ProductRepository,
    ClientRepository,
    InvoiceRepository,
    StockMovementRepository,
    DeliveryNoteRepository
};

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(SubCategoryRepositoryInterface::class, SubCategoryRepository::class);
        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
        $this->app->bind(ClientRepositoryInterface::class, ClientRepository::class);
        $this->app->bind(InvoiceRepositoryInterface::class, InvoiceRepository::class);
        $this->app->bind(StockMovementRepositoryInterface::class, StockMovementRepository::class);
        $this->app->bind(DeliveryNoteRepositoryInterface::class, DeliveryNoteRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === 'production' || env('FORCE_HTTPS', false)) {
            URL::forceScheme('https');
        }

        Invoice::observe(InvoiceObserver::class);
        Payment::observe(PaymentObserver::class);

        // Vite::useCspNonce();
    }
}
