<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\BelongsToTenant;
use App\Traits\HasActivityLogs;

class Expense extends Model
{
    use HasFactory, BelongsToTenant, HasActivityLogs;

    protected $fillable = [
        'category_id',
        'amount',
        'date',
        'description',
        'receipt_url',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function category()
    {
        return $this->belongsTo(ExpenseCategory::class, 'category_id');
    }
}
