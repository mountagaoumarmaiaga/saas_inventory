<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'entreprise_id' => \App\Models\Entreprise::factory(),
            'name' => fake()->word(),
            'sku' => fake()->unique()->numerify('PRD-#####'),
            'purchase_price' => fake()->randomFloat(2, 5, 50),
            'sale_price' => fake()->randomFloat(2, 50, 200),
            'quantity' => fake()->numberBetween(10, 100),
            'min_quantity' => fake()->numberBetween(1, 10),
            'created_by' => \App\Models\User::factory(),
        ];
    }
}
