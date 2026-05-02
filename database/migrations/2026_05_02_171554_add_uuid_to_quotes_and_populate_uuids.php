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
        Schema::table('quotes', function (Blueprint $table) {
            $table->uuid('uuid')->nullable()->after('id')->unique();
        });

        // Populate UUIDs for quotes
        \Illuminate\Support\Facades\DB::table('quotes')->whereNull('uuid')->orderBy('id')->chunk(100, function ($quotes) {
            foreach ($quotes as $quote) {
                \Illuminate\Support\Facades\DB::table('quotes')->where('id', $quote->id)->update(['uuid' => (string) \Illuminate\Support\Str::uuid()]);
            }
        });

        // Populate UUIDs for invoices
        \Illuminate\Support\Facades\DB::table('invoices')->whereNull('uuid')->orderBy('id')->chunk(100, function ($invoices) {
            foreach ($invoices as $invoice) {
                \Illuminate\Support\Facades\DB::table('invoices')->where('id', $invoice->id)->update(['uuid' => (string) \Illuminate\Support\Str::uuid()]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quotes', function (Blueprint $table) {
            $table->dropColumn('uuid');
        });
    }
};
