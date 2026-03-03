<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\BelongsToTenant;
use App\Traits\HasActivityLogs;

class Purchase extends Model
{
    use HasFactory, BelongsToTenant, HasActivityLogs;

    protected $fillable = [
        'entreprise_id',
        'supplier_id',
        'number',
        'status',
        'order_date',
        'expected_delivery_date',
        'total_amount',
        'amount_paid',
        'tax_amount',
        'payment_status',
        'receipt_path',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function items()
    {
        return $this->hasMany(PurchaseItem::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }
}
