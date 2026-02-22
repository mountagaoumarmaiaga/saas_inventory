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
            $table->string('logo_url')->nullable()->after('email');
            $table->string('phone')->nullable()->after('logo_url');
            $table->text('address')->nullable()->after('phone');
            $table->text('invoice_header')->nullable()->after('address');
            $table->text('invoice_footer')->nullable()->after('invoice_header');
            $table->string('invoice_template')->default('classic')->after('invoice_footer');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entreprises', function (Blueprint $table) {
            $table->dropColumn(['logo_url', 'phone', 'address', 'invoice_header', 'invoice_footer', 'invoice_template']);
        });
    }
};
