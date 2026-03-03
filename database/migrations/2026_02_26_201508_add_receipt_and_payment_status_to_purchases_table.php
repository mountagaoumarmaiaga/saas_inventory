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
        Schema::table('purchases', function (Blueprint $table) {
            $table->string('receipt_path')->nullable();
            $table->string('payment_status')->default('UNPAID'); // UNPAID, PARTIAL, PAID
            $table->decimal('amount_paid', 12, 2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('purchases', function (Blueprint $table) {
            $table->dropColumn(['receipt_path', 'payment_status', 'amount_paid']);
        });
    }
};
