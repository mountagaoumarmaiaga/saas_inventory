<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index()
    {
        // Get users belonging to the same enterprise as the logged-in admin
        // Exclude super admins so regular admins cannot see or manage them
        $users = User::where('entreprise_id', auth()->user()->entreprise_id)
            ->whereRaw('is_super_admin = false')
            ->where('id', '!=', auth()->id()) // Exclude self
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'in:admin,user'],
        ]);

        $user = new User();
        // Safe attributes via fillable
        $user->fill([
            'name' => $request->name,
            'email' => $request->email,
        ]);
        
        $user->role = $request->role; // Assuming role is also explicitly set or handled by another package
        
        // Critical and protected attributes
        $user->forceFill([
            'password' => Hash::make($request->password),
            'entreprise_id' => auth()->user()->entreprise_id, 
            'email_verified_at' => now(), 
        ]);
        
        $user->save();
        $user->syncRoles([$request->role]);

        return response()->json([
            'message' => 'Utilisateur créé avec succès.',
            'user' => $user
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::where('entreprise_id', auth()->user()->entreprise_id)
            ->whereRaw('is_super_admin = false')
            ->findOrFail($id);

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($user->id),
            ],
            'role' => ['required', 'in:admin,user'],
        ]);

        $user->fill([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // Authorization check: Only current admins can assign the 'admin' role
        if ($request->role === 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Action non autorisée.'], 403);
        }

        $user->role = $request->role; // Keep string property
        $user->syncRoles([$request->role]); // Apply Spatie role

        // Accessorly update password if provided
        if ($request->filled('password')) {
            $request->validate([
                'password' => ['confirmed', Rules\Password::defaults()],
            ]);
            
            $user->forceFill([
                'password' => Hash::make($request->password),
            ]);
        }
        
        $user->save();

        return response()->json([
            'message' => 'Utilisateur mis à jour avec succès.',
            'user' => $user
        ]);
    }

    public function destroy($id)
    {
        $user = User::where('entreprise_id', auth()->user()->entreprise_id)
            ->whereRaw('is_super_admin = false')
            ->findOrFail($id);

        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'Impossible de se supprimer soi-même.'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès.']);
    }
}
