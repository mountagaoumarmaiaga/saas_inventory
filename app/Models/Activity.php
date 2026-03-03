<?php

namespace App\Models;
use App\Models\Traits\BelongsToTenant;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = ['user_id', 'subject_type', 'subject_id', 'description', 'type', 'properties'];

    protected $casts = [
        'properties' => 'array',
    ];



    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subject()
    {
        return $this->morphTo();
    }
}
