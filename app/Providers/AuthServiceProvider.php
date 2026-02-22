<?php

namespace App\Providers;

use App\Models\{Product,Category,SubCategory,Client,Invoice,DeliveryNote};
use App\Policies\{ProductPolicy,CategoryPolicy,SubCategoryPolicy,ClientPolicy,InvoicePolicy,DeliveryNotePolicy};
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Product::class => ProductPolicy::class,
        Category::class => CategoryPolicy::class,
        SubCategory::class => SubCategoryPolicy::class,
        Client::class => ClientPolicy::class,
        Invoice::class => InvoicePolicy::class,
        DeliveryNote::class => DeliveryNotePolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
