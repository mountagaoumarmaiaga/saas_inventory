<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryNote extends Model
{
    use \App\Models\Traits\BelongsToTenant;

    protected $fillable = ['invoice_id', 'client_id', 'number', 'status', 'delivery_date', 'notes'];

    protected $casts = [
        'delivery_date' => 'date',
    ];


    public function invoice() { return $this->belongsTo(Invoice::class); }
    public function client() { return $this->belongsTo(Client::class); }
    public function items() { return $this->hasMany(DeliveryItem::class); }
}
