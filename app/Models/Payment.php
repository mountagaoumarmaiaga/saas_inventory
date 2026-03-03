<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\BelongsToTenant;
use App\Traits\HasActivityLogs;

class Payment extends Model
{
    use HasFactory, BelongsToTenant, HasActivityLogs;

    protected $fillable = [
        'invoice_id',
        'amount',
        'payment_method',
        'date',
        'reference',
        'notes',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
