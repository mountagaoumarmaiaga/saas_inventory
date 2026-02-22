<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();

            $table->foreignId('entreprise_id')->constrained('entreprises')->cascadeOnDelete();

            $table->string('number');
            $table->enum('type', ['invoice','proforma'])->default('invoice');

            $table->enum('status', [
                'DRAFT',      // créé/modifié par user/admin
                'PENDING',    // facture soumise
                'APPROVED',   // admin approuve
                'PAID',       // admin confirme paiement => stock OUT
                'SENT',       // proforma validée/envoyée (pas de stock)
                'CANCELLED',
                'REJECTED'
            ])->default('DRAFT');

            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();

            $table->decimal('subtotal', 12, 2)->default(0);
            $table->unsignedInteger('tva')->default(20);
            $table->decimal('total', 12, 2)->default(0);

            $table->date('date')->nullable();
            $table->text('notes')->nullable();

            // crédits
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();

            // approbation admin
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('approved_at')->nullable();

            // paiement admin
            $table->foreignId('paid_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('paid_at')->nullable();

            // anti double déduction stock
            $table->timestamp('stock_deducted_at')->nullable();

            $table->string('rejection_reason')->nullable();

            $table->timestamps();

            $table->unique(['entreprise_id','number']);
            $table->index(['entreprise_id','type','status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
