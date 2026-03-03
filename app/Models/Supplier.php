<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\BelongsToTenant;

class Supplier extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'tax_number',
        'notes',
    ];

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }
}
