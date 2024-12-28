<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToCodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('codes', function (Blueprint $table) {
            $table->string('subject')->nullable();  // Adding 'subject' field
            $table->integer('year')->nullable();    // Adding 'year' field
            $table->string('semester')->nullable(); // Adding 'semester' field
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
            $table->dropColumn('subject');   // Dropping 'subject' field
            $table->dropColumn('year');      // Dropping 'year' field
            $table->dropColumn('semester');  // Dropping 'semester' field
        });
    }
}
