<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];

    protected $casts = [
        'purchase_price' => 'decimal:2',
        'sale_price' => 'decimal:2',
    ];

    public function entreprise() { return $this->belongsTo(Entreprise::class); }
    public function category() { return $this->belongsTo(Category::class); }
    public function subCategory() { return $this->belongsTo(SubCategory::class); }
    public function stockMovements() { return $this->hasMany(StockMovement::class); }

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image_path) return null;
        if (filter_var($this->image_path, FILTER_VALIDATE_URL)) {
            return $this->image_path;
        }
        
        // Use same logic as ImageService to determine disk
        $disk = (config('filesystems.disks.supabase.key') && config('filesystems.disks.supabase.secret')) 
            ? 'supabase' 
            : 'public';
            
        return \Illuminate\Support\Facades\Storage::disk($disk)->url($this->image_path);
    }
}
