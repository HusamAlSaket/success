<?php
// database/seeders/CodeSeeder.php

namespace Database\Seeders;

use App\Models\Code;
use App\Models\Package;
use Illuminate\Database\Seeder;

class CodeSeeder extends Seeder
{
    public function run()
    {
        // Ensure that at least one package exists
        $package = Package::first();

        // If no package is found, create a default one
        if (!$package) {
            $package = Package::create([
                'package_name' => 'Default Package',
                'content' => 'Default package content',
                'price' => 19.99,
            ]);
            echo "Package created: " . $package->id . "\n";  // Debugging to confirm package creation
        }

        // Check if package_id is valid
        if (!$package->id) {
            echo "No valid package ID found. Exiting seeder.\n";
            return;
        }

        // Insert codes with the valid package_id
        Code::create([
            'code' => 'CODE1234',
            'package_id' => $package->id,
            'status' => 'unused',
        ]);

        Code::create([
            'code' => 'CODE5678',
            'package_id' => $package->id,
            'status' => 'used',
        ]);
    }
}
