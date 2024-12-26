<?php

// database/seeders/PackageSeeder.php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run()
    {
        Package::create([
            'package_name' => 'Beginner Course',
            'content' => 'This is a beginner-level course for programming.',
            'price' => 49.99,
        ]);

        Package::create([
            'package_name' => 'Advanced Course',
            'content' => 'This is an advanced-level course for programming.',
            'price' => 99.99,
        ]);
    }
}
