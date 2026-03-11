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
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        $user = new User();
        $user->fill([
            'name' => $input['name'],
            'email' => $input['email'],
        ]);
        
        $user->forceFill([
            'password' => \Illuminate\Support\Facades\Hash::make($input['password']),
            'entreprise_id' => null,
            'role' => 'user', 
            'is_super_admin' => false,
        ])->save();
        
        $user->assignRole('user');
        
        return $user;
    }
}
