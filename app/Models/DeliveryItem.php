<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryItem extends Model
{
    protected $fillable = ['delivery_note_id', 'product_id', 'description', 'quantity', 'notes'];
    protected $appends = ['product_name'];

    public function deliveryNote() { return $this->belongsTo(DeliveryNote::class); }
    public function product() { return $this->belongsTo(Product::class); }
    
    public function getProductNameAttribute()
    {
        return $this->product?->name ?? $this->description ?? 'Produit inconnu';
    }
}
