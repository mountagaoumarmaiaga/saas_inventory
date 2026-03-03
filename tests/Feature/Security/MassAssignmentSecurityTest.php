<?php

namespace Tests\Feature\Security;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Entreprise;

class MassAssignmentSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_cannot_mass_assign_super_admin_role()
    {
        $entreprise = Entreprise::factory()->create();
        
        $user = new User;
        $user->name = 'Test';
        $user->email = 't3@test.com';
        $user->forceFill([
            'password' => 'pass',
            'entreprise_id' => $entreprise->id, 
            'is_super_admin' => false
        ])->save();

        $this->actingAs($user);

        $payload = [
            'name' => 'Hacker',
            'email' => 'hacker@example.com',
            'is_super_admin' => true,
        ];

        // This will ignore is_super_admin since it's not fillable
        $user->update($payload);
        $user->refresh();

        $this->assertFalse($user->is_super_admin);
    }
}
