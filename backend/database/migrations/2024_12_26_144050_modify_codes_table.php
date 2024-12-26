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
        Schema::table('codes', function (Blueprint $table) {
            // Make package_id nullable
            $table->bigInteger('package_id')->nullable()->change(); // Allows package_id to be null
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('codes', function (Blueprint $table) {
            // Revert the package_id back to non-nullable if rolling back
            $table->bigInteger('package_id')->nullable(false)->change();
        });
    }
};
