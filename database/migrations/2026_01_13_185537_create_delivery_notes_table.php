<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('delivery_notes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('entreprise_id')->constrained('entreprises')->cascadeOnDelete();
            $table->string('number');

            $table->enum('status', ['DRAFT','DELIVERED','CANCELLED'])->default('DRAFT');

            $table->foreignId('invoice_id')->constrained('invoices')->cascadeOnDelete();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();

            $table->date('delivery_date')->nullable();
            $table->text('notes')->nullable();

            // crédits
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();

            $table->timestamps();

            $table->unique(['entreprise_id','number']);
            $table->index(['entreprise_id','invoice_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('delivery_notes');
    }
};
