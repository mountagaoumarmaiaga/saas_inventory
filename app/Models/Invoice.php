<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $guarded = [];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'total' => 'decimal:2',
        'approved_at' => 'datetime',
        'paid_at' => 'datetime',
        'stock_deducted_at' => 'datetime',
        'date' => 'date',
    ];

    public function entreprise() { return $this->belongsTo(Entreprise::class); }
    public function client() { return $this->belongsTo(Client::class); }
    public function items() { return $this->hasMany(InvoiceItem::class); }

    public function deliveryNotes() { return $this->hasMany(DeliveryNote::class); }
}
