<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_codes_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCodesTable extends Migration
{
    public function up()
    {
        Schema::create('codes', function (Blueprint $table) {
            $table->id('code_id');
            $table->string('code')->unique();
            $table->foreignId('package_id')->constrained('packages');
            $table->enum('status', ['used', 'unused'])->default('unused');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('codes');
    }
}
