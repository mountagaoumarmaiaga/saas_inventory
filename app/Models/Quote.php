<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\BelongsToTenant;
use App\Traits\HasActivityLogs;

class Quote extends Model
{
    use HasFactory, BelongsToTenant, HasActivityLogs;

    protected $fillable = [
        'entreprise_id',
        'number',
        'status',
        'client_id',
        'subtotal',
        'tva',
        'total',
        'date',
        'valid_until',
        'notes',
        'terms',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'valid_until' => 'date',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function items()
    {
        return $this->hasMany(QuoteItem::class);
    }
}
