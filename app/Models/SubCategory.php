<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Traits\BelongsToTenant;

class SubCategory extends Model
{
    use BelongsToTenant;

    protected $fillable = ['name', 'description', 'is_active', 'category_id'];
    public function category() { return $this->belongsTo(Category::class); }
    public function products() { return $this->hasMany(Product::class); }
}
