<?php

// database/seeders/StudentSeeder.php

// database/seeders/StudentSeeder.php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StudentSeeder extends Seeder
{
    public function run()
    {
        // Example to insert multiple students with unique codes
        $users = User::all();  // Assuming you have user records to link students with

        foreach ($users as $user) {
            // Generate a unique code for each student
            $code = 'STU' . strtoupper(Str::random(4));  // Generate a random 4-character code

            // Insert student data with a unique code
            Student::create([
                'user_id' => $user->id,
                'full_name' => 'John Doe',  // You can customize this for your actual data
                'phone_number' => '1234567890',
                'code' => $code,  // Unique code
                'year' => 2024,
                'city' => 'New York',
                'specialty' => 'Computer Science',
            ]);
        }
    }
}
