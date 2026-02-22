<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    protected $guarded = [];

    public function users() { return $this->hasMany(User::class); }
    public function categories() { return $this->hasMany(Category::class); }
    public function subCategories() { return $this->hasMany(SubCategory::class); }
    public function products() { return $this->hasMany(Product::class); }
    public function clients() { return $this->hasMany(Client::class); }
    public function invoices() { return $this->hasMany(Invoice::class); }
    public function stockMovements() { return $this->hasMany(StockMovement::class); }
    public function deliveryNotes() { return $this->hasMany(DeliveryNote::class); }
}
