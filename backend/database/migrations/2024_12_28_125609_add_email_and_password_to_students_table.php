<?php

// database/migrations/xxxx_xx_xx_xxxxxx_add_email_and_password_to_students_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEmailAndPasswordToStudentsTable extends Migration
{
    public function up()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->string('email')->nullable()->unique()->after('full_name');
            $table->string('password')->after('email');
        });
    }


    public function down()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn('email');
            $table->dropColumn('password');
        });
    }
}

