<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('entreprise_id')->constrained('entreprises')->cascadeOnDelete();
            
            $table->string('number');
            $table->enum('status', [
                'DRAFT',      // Brouillon
                'SENT',       // Envoyé au client
                'ACCEPTED',   // Accepté par le client
                'REJECTED',   // Refusé par le client
                'CANCELLED'   // Annulé
            ])->default('DRAFT');
            
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            
            $table->decimal('subtotal', 12, 2)->default(0);
            $table->unsignedInteger('tva')->default(0);
            $table->decimal('total', 12, 2)->default(0);
            
            $table->date('date')->nullable();
            $table->date('valid_until')->nullable();
            
            $table->text('notes')->nullable();
            $table->text('terms')->nullable();
            
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            
            $table->timestamps();
            
            $table->unique(['entreprise_id', 'number']);
            $table->index(['entreprise_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};
