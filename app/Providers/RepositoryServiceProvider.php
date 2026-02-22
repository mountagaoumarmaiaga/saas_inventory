<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
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

class RepositoryServiceProvider extends ServiceProvider
{
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
}
