<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('students', function (Blueprint $table) {
            // Only modify the 'user_id' column, no need to add 'email' or 'password'
            $table->foreignId('user_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('students', function (Blueprint $table) {
            // Revert the 'user_id' column to be non-nullable
            $table->foreignId('user_id')->nullable(false)->change();
        });
    }
};

