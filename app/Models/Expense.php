<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\BelongsToTenant;
use App\Models\User;
use App\Traits\HasActivityLogs;

class Expense extends Model
{
    use HasFactory, BelongsToTenant, HasActivityLogs;

    protected $fillable = [
        'category_id',
        'amount',
        'date',
        'description',
        'reference',
        'receipt_url',
        'created_by',
        'entreprise_id',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function category()
    {
        return $this->belongsTo(ExpenseCategory::class, 'category_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
