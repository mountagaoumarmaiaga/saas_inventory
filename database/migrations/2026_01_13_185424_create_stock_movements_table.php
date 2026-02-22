<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();

            $table->foreignId('entreprise_id')->constrained('entreprises')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();

            $table->enum('type', ['IN','OUT','ADJUSTMENT']);
            $table->integer('quantity'); // positive
            $table->string('reason')->nullable(); // restock, invoice_paid, adjustment...

            // lien optionnel facture payée
            $table->foreignId('invoice_id')->nullable()->constrained('invoices')->nullOnDelete();

            // crédits
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();

            $table->timestamps();

            $table->index(['entreprise_id','product_id','type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
