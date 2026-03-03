<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Definition des Permissions granulaires
        $permissions = [
            'view dashboard',
            'manage users',
            'manage billing',
            'manage inventory',
            'manage settings',
            'view reports',
            'export data',
            'create invoices',
            'delete products',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        // 2. Definition des Roles
        $roleSuperAdmin = Role::findOrCreate('super-admin');
        $roleSuperAdmin->givePermissionTo(Permission::all());

        $roleAdmin = Role::findOrCreate('admin');
        $roleAdmin->givePermissionTo([
            'view dashboard', 'manage users', 'manage inventory', 'view reports', 'export data', 'create invoices', 'delete products', 'manage settings'
        ]);
        
        $roleManager = Role::findOrCreate('manager');
        $roleManager->givePermissionTo([
            'view dashboard', 'manage inventory', 'view reports', 'export data', 'create invoices'
        ]);
        
        $roleCaissier = Role::findOrCreate('caissier');
        $roleCaissier->givePermissionTo([
            'view dashboard', 'create invoices'
        ]);

        $roleUser = Role::findOrCreate('user');
        $roleUser->givePermissionTo([
            'view dashboard'
        ]);

        // 3. Migration des utilisateurs existants vers les Roles Spatie
        $users = User::all();
        foreach ($users as $user) {
            if ($user->is_super_admin && !$user->hasRole('super-admin')) {
                $user->assignRole('super-admin');
            } else if ($user->role === 'admin') {
                if (!$user->hasRole('admin')) {
                    $user->assignRole('admin');
                }
            } else {
                if (!$user->hasRole('user')) {
                    $user->assignRole('user');
                }
            }
        }
    }
}
