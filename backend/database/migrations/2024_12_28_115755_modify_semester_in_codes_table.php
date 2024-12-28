<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifySemesterInCodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('codes', function (Blueprint $table) {
            // Modifying 'semester' to be an enum with '1st' and '2nd' as valid options
            $table->enum('semester', ['1st', '2nd'])->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('codes', function (Blueprint $table) {
            // Revert 'semester' column back to string (if needed)
            $table->string('semester')->nullable()->change();
        });
    }
}
