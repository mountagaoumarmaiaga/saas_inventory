<?php

namespace Tests\Feature;

use App\Models\Entreprise;
use App\Models\User;
use App\Models\Client;
use App\Models\Product;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Services\InvoiceWorkflowService;
use App\Services\StockService;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InvoiceStockTest extends TestCase
{
    public function test_stock_deduction_on_mark_paid()
    {
        // Use RefreshDatabase to reset DB state for tests
        $this->artisan('migrate:fresh');

        $entreprise = Entreprise::factory()->create();
        $user = User::factory()->create(['entreprise_id' => $entreprise->id]);
        $entrepriseId = $user->entreprise_id;
        
        $stockService = new StockService();
        $workflowService = app(InvoiceWorkflowService::class);

        // 1. Create Product with Stock
        $product = Product::factory()->make([
            'name' => 'Test Product ' . uniqid(),
            'sku' => 'TEST-' . uniqid(),
            'quantity' => 100,
            'purchase_price' => 10,
            'sale_price' => 20,
            'min_quantity' => 5,
        ]);
        $product->forceFill(['entreprise_id' => $entrepriseId, 'created_by' => $user->id])->save();

        echo "Created Product: {$product->name} (Stock: {$product->quantity})\n";

        // 2. Create Invoice
        $client = Client::factory()->make([
            'name' => 'Test Client',
            'email' => 'test@client.com',
        ]);
        $client->forceFill(['entreprise_id' => $entrepriseId])->save();

        $invoice = Invoice::factory()->make([
            'client_id' => $client->id,
            'status' => 'PENDING', // Skip DRAFT for test
            'date' => now(),
            'number' => 'TEST-INV-' . uniqid(),
        ]);
        $invoice->forceFill(['entreprise_id' => $entrepriseId, 'created_by' => $user->id, 'type' => 'invoice'])->save();

        $item = InvoiceItem::factory()->make([
            'product_id' => $product->id,
            'description' => 'Item 1',
            'quantity' => 10,
            'unit_price' => 20,
            'line_total' => 200,
        ]);
        $item->forceFill(['invoice_id' => $invoice->id])->save();
        
        $workflowService->recalcTotals($invoice);

        echo "Created Invoice: {$invoice->number} (Status: {$invoice->status})\n";

        // 3. Approve Invoice
        $workflowService->approveInvoice($invoice, $user->id, $stockService);
        $invoice->refresh();
        echo "Approved Invoice. Status: {$invoice->status}\n";

        // 4. Mark Paid
        echo "Marking Paid...\n";
        $workflowService->markPaid($invoice, $user->id, $stockService);
        
        $invoice->refresh();
        $product->refresh();
        
        echo "Invoice Status: {$invoice->status}\n";
        echo "Invoice Stock Deducted At: {$invoice->stock_deducted_at}\n";
        echo "Product Stock: {$product->quantity}\n";

        if ($product->quantity === 90) {
            echo "SUCCESS: Stock deducted correctly.\n";
            $this->assertTrue(true);
        } else {
            echo "FAILURE: Stock NOT deducted correctly.\n";
            $this->fail("Stock NOT deducted correctly.");
        }
    }
}
