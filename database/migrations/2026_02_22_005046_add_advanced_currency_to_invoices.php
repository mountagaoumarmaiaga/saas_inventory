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
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('currency_symbol')->default('FCFA')->after('total');
            $table->enum('currency_position', ['left', 'right'])->default('right')->after('currency_symbol');
            $table->decimal('exchange_rate', 15, 6)->nullable()->after('currency_position');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn(['currency_symbol', 'currency_position', 'exchange_rate']);
        });
    }
};
