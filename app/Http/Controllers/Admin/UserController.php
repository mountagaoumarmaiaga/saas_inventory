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
        $users = User::where('entreprise_id', auth()->user()->entreprise_id)
            ->where('id', '!=', auth()->id()) // Optional: exclude self, or keep it
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

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'entreprise_id' => auth()->user()->entreprise_id, // Assign to admin's enterprise
            'email_verified_at' => now(), // Auto-verify since admin created it
        ]);

        return response()->json([
            'message' => 'Utilisateur créé avec succès.',
            'user' => $user
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::where('entreprise_id', auth()->user()->entreprise_id)
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

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ]);

        // Accessorly update password if provided
        if ($request->filled('password')) {
            $request->validate([
                'password' => ['confirmed', Rules\Password::defaults()],
            ]);
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        return response()->json([
            'message' => 'Utilisateur mis à jour avec succès.',
            'user' => $user
        ]);
    }

    public function destroy($id)
    {
        $user = User::where('entreprise_id', auth()->user()->entreprise_id)
            ->findOrFail($id);

        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'Impossible de se supprimer soi-même.'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès.']);
    }
}
