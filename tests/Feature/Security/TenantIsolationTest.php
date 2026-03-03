<?php

namespace Tests\Feature\Security;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Entreprise;
use App\Models\Invoice;
use App\Models\Product;

class TenantIsolationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_cannot_read_invoices_from_other_entreprise_via_query_builder()
    {
        $entreprise1 = Entreprise::factory()->create();
        $entreprise2 = Entreprise::factory()->create();

        $user1 = User::factory()->create(['entreprise_id' => $entreprise1->id]);
        
        // Use force-fill pattern to simulate system seeding where mass assignment is blocked
        $client1 = \App\Models\Client::factory()->create(['entreprise_id' => $entreprise1->id]);
        $client2 = \App\Models\Client::factory()->create(['entreprise_id' => $entreprise2->id]);

        for ($i=0; $i<5; $i++) {
            $inv = \App\Models\Invoice::factory()->make(['client_id' => $client1->id]);
            $inv->forceFill(['entreprise_id' => $entreprise1->id])->save();
        }
        for ($i=0; $i<5; $i++) {
            $inv = \App\Models\Invoice::factory()->make(['client_id' => $client2->id]);
            $inv->forceFill(['entreprise_id' => $entreprise2->id])->save();
        }

        $this->actingAs($user1);
        
        $invoices = Invoice::all();

        $this->assertCount(5, $invoices);
        $this->assertEquals($entreprise1->id, $invoices->first()->entreprise_id);
    }

    public function test_user_cannot_access_other_tenant_invoice_endpoint()
    {
        $entreprise1 = Entreprise::factory()->create();
        $entreprise2 = Entreprise::factory()->create();

        $user1 = User::factory()->create(['entreprise_id' => $entreprise1->id]);
        $client2 = \App\Models\Client::factory()->create(['entreprise_id' => $entreprise2->id]);
        
        $invoice2 = Invoice::factory()->make(['client_id' => $client2->id]);
        $invoice2->forceFill(['entreprise_id' => $entreprise2->id])->save();

        $response = $this->actingAs($user1)->get('/invoices/' . $invoice2->id);

        $response->assertStatus(404);
    }
}
