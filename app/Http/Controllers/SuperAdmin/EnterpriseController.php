<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Entreprise;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EnterpriseController extends Controller
{
    public function index()
    {
        $enterprises = Entreprise::withCount('users')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('super-admin/enterprises/index', [
            'enterprises' => $enterprises
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:entreprises,email',
        ]);

        // 1. Create Enterprise
        $enterprise = Entreprise::create([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // 2. Generate Admin Credentials
        $adminEmail = 'admin@' . Str::slug($request->name) . '.com';
        // Ensure email is unique (simple check)
        if (User::where('email', $adminEmail)->exists()) {
             $adminEmail = 'admin' . rand(100, 999) . '@' . Str::slug($request->name) . '.com';
        }

        $password = Str::password(10); // Generate secure random password

        // 3. Create Admin User
        $user = User::create([
            'name' => 'Admin ' . $request->name,
            'email' => $adminEmail,
            'password' => Hash::make($password),
            'role' => 'admin',
            'entreprise_id' => $enterprise->id,
            'email_verified_at' => now(),
        ]);

        return redirect()->back()->with('flash', [
            'success' => 'Entreprise créée avec succès.',
            'created_credentials' => [
                'email' => $adminEmail,
                'password' => $password,
                'enterprise' => $enterprise->name
            ]
        ]);
    }

    public function resetPassword($id)
    {
        $enterprise = Entreprise::findOrFail($id);
        
        // Find the admin user for this enterprise
        $user = User::where('entreprise_id', $enterprise->id)
                    ->where('role', 'admin')
                    ->first();

        if (! $user) {
            return back()->with('flash', [
                'error' => 'Aucun administrateur trouvé pour cette entreprise.'
            ]);
        }

        $password = Str::password(10);
        $user->update([
            'password' => Hash::make($password)
        ]);

        return back()->with('flash', [
            'success' => 'Mot de passe réinitialisé avec succès.',
            'created_credentials' => [
                'email' => $user->email,
                'password' => $password,
                'enterprise' => $enterprise->name
            ]
        ]);
    }
}
