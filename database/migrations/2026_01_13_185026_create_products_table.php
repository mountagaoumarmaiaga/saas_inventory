<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->foreignId('entreprise_id')->constrained('entreprises')->cascadeOnDelete();

            $table->foreignId('category_id')->nullable()
                ->constrained('categories')->nullOnDelete();

            $table->foreignId('sub_category_id')->nullable()
                ->constrained('sub_categories')->nullOnDelete();

            $table->string('name');
            $table->string('sku')->nullable(); // ref interne
            $table->string('unit')->default('pcs');

            $table->decimal('purchase_price', 12, 2)->default(0);
            $table->decimal('sale_price', 12, 2)->default(0);

            // stock courant (le journal = stock_movements)
            $table->integer('quantity')->default(0);
            $table->integer('min_quantity')->default(0);

            $table->string('image_path')->nullable();

            // crédits
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamps();

            $table->unique(['entreprise_id','sku']);
            $table->index(['entreprise_id','name']);
            $table->index(['entreprise_id','category_id']);
            $table->index(['entreprise_id','sub_category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
