<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Traits\BelongsToTenant;

class Category extends Model
{
    use BelongsToTenant;

    protected $fillable = ['name', 'description', 'is_active'];
    public function subCategories() { return $this->hasMany(SubCategory::class); }
    public function products() { return $this->hasMany(Product::class); }
}
