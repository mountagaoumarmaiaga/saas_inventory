<?php

namespace Database\Seeders;

use App\Models\Entreprise;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // 1️⃣ Créer une entreprise (avec EMAIL obligatoire)
        $entreprise = Entreprise::firstOrCreate(
            ['email' => 'entreprise@demo.com'], // clé unique
            [
                'name' => 'Demo Entreprise',
            ]
        );

        // 2️⃣ Créer un ADMIN
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'entreprise_id' => $entreprise->id,
                'email_verified_at' => now(),
            ]
        );

        // 3️⃣ Créer un USER normal (optionnel)
        User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'User',
                'password' => Hash::make('password'),
                'role' => 'user',
                'entreprise_id' => $entreprise->id,
                'email_verified_at' => now(),
            ]
        );

        // 4️⃣ Créer un SUPER ADMIN
        User::updateOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('superpassword'), // Le mot de passe du super admin
                'role' => 'admin',
                'is_super_admin' => \Illuminate\Support\Facades\DB::raw('true'),
                'entreprise_id' => $entreprise->id,
                'email_verified_at' => now(),
            ]
        );
    }
}
