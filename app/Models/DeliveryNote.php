<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryNote extends Model
{
    protected $guarded = [];

    protected $casts = [
        'delivery_date' => 'date',
    ];

    public function entreprise() { return $this->belongsTo(Entreprise::class); }
    public function invoice() { return $this->belongsTo(Invoice::class); }
    public function client() { return $this->belongsTo(Client::class); }
    public function items() { return $this->hasMany(DeliveryItem::class); }
}
