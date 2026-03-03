<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasActivityLogs;
use App\Models\Traits\BelongsToTenant;

class StockMovement extends Model
{
    use HasActivityLogs, BelongsToTenant;

    protected $fillable = ['product_id', 'type', 'quantity', 'reference', 'invoice_id', 'notes', 'created_by'];

    protected $casts = [
        'quantity' => 'integer',
    ];


    public function product() { return $this->belongsTo(Product::class); }
    public function invoice() { return $this->belongsTo(Invoice::class); }
    public function user() { return $this->belongsTo(User::class, 'created_by'); }
}
