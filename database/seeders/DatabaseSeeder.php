<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Appelle tes seeders ici (ordre)
        $this->call([
            AdminUserSeeder::class,
            // UserSeeder::class,
            // EntrepriseSeeder::class,
        ]);
    }
}
