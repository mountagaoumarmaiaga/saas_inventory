<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasActivityLogs;

class Entreprise extends Model
{
    use HasActivityLogs, HasFactory;

    protected $fillable = [
        'name', 'address', 'phone', 'email', 'tax_number', 'logo_path', 'settings',
        'invoice_header', 'invoice_footer', 'invoice_template',
        'delivery_note_template', 'purchase_template', 'quote_template',
        'currency', 'currency_symbol', 'currency_position', 'qr_payment_link',
        'logo_url', 'rccm', 'niu'
    ];
    public function users() { return $this->hasMany(User::class); }
    public function categories() { return $this->hasMany(Category::class); }
    public function subCategories() { return $this->hasMany(SubCategory::class); }
    public function products() { return $this->hasMany(Product::class); }
    public function clients() { return $this->hasMany(Client::class); }
    public function invoices() { return $this->hasMany(Invoice::class); }
    public function stockMovements() { return $this->hasMany(StockMovement::class); }
    public function deliveryNotes() { return $this->hasMany(DeliveryNote::class); }
}
