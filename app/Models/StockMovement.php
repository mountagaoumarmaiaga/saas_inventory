<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    protected $guarded = [];

    protected $casts = [
        'quantity' => 'integer',
    ];

    public function entreprise() { return $this->belongsTo(Entreprise::class); }
    public function product() { return $this->belongsTo(Product::class); }
    public function invoice() { return $this->belongsTo(Invoice::class); }
    public function user() { return $this->belongsTo(User::class, 'created_by'); }
}
