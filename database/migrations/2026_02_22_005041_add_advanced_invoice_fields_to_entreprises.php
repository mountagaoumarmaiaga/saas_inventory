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
        Schema::table('entreprises', function (Blueprint $table) {
            $table->string('currency')->default('FCFA')->after('invoice_template');
            $table->string('currency_symbol')->default('FCFA')->after('currency');
            $table->enum('currency_position', ['left', 'right'])->default('right')->after('currency_symbol');
            $table->string('qr_payment_link')->nullable()->after('currency_position');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entreprises', function (Blueprint $table) {
            $table->dropColumn(['currency', 'currency_symbol', 'currency_position', 'qr_payment_link']);
        });
    }
};
