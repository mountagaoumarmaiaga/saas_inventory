<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'entreprise_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        $entreprise = \App\Models\Entreprise::create([
            'name' => $input['entreprise_name'],
            'email' => $input['email'],
        ]);

        $user = new User();
        $user->fill([
            'name' => $input['name'],
            'email' => $input['email'],
        ]);
        
        $user->forceFill([
            'password' => \Illuminate\Support\Facades\Hash::make($input['password']),
            'entreprise_id' => $entreprise->id,
            'role' => 'admin', // The first user of an enterprise is its admin
            'is_super_admin' => false,
        ])->save();
        
        $user->assignRole('admin');
        
        return $user;
    }
}
