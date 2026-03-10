<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasActivityLogs;
use App\Models\Traits\BelongsToTenant;

class Invoice extends Model
{
    use HasFactory, HasActivityLogs, BelongsToTenant;

    protected $fillable = [
        'entreprise_id', 'client_id', 'number', 'type', 'status',
        'subtotal', 'tva', 'total', 'date', 'due_date', 'notes',
        'created_by', 'updated_by', 'approved_by', 'approved_at',
        'paid_by', 'paid_at', 'stock_deducted_at', 'rejection_reason',
        'public_uuid', 'modification_requested_at', 'uuid', 'viewed_at',
        'currency_symbol', 'currency_position', 'exchange_rate'
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'total' => 'decimal:2',
        'approved_at' => 'datetime',
        'paid_at' => 'datetime',
        'stock_deducted_at' => 'datetime',
        'modification_requested_at' => 'datetime',
        'date' => 'date',
    ];


    public function client() { return $this->belongsTo(Client::class); }
    public function items() { return $this->hasMany(InvoiceItem::class); }

    public function deliveryNotes() { return $this->hasMany(DeliveryNote::class); }
}
