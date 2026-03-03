<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Invoice;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    protected $model = Invoice::class;
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'entreprise_id' => \App\Models\Entreprise::factory(),
            'client_id' => \App\Models\Client::factory(),
            'date' => fake()->date(),
            'due_date' => fake()->date(),
            'number' => 'INV-' . fake()->unique()->numerify('######'),
            'subtotal' => fake()->randomFloat(2, 100, 1000),
            'total' => fake()->randomFloat(2, 100, 1000),
            'status' => 'DRAFT',
            'created_by' => \App\Models\User::factory(),
        ];
    }
}
