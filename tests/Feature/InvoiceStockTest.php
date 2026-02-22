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
    // use RefreshDatabase; // We might want to use this to not pollute DB, but for now I'll use a test enterprise

    public function test_stock_deduction_on_mark_paid()
    {
        $user = User::first(); // Assuming a user exists
        $entrepriseId = $user->entreprise_id;
        
        $stockService = new StockService();
        $workflowService = new InvoiceWorkflowService();

        // 1. Create Product with Stock
        $product = Product::create([
            'entreprise_id' => $entrepriseId,
            'name' => 'Test Product ' . uniqid(),
            'sku' => 'TEST-' . uniqid(),
            'quantity' => 100,
            'purchase_price' => 10,
            'sale_price' => 20,
            'min_quantity' => 5,
        ]);

        echo "Created Product: {$product->name} (Stock: {$product->quantity})\n";

        // 2. Create Invoice
        $client = Client::where('entreprise_id', $entrepriseId)->first();
        if (!$client) {
             $client = Client::create([
                'entreprise_id' => $entrepriseId,
                'name' => 'Test Client',
                'email' => 'test@client.com',
                'type' => 'individual'
             ]);
        }

        $invoice = Invoice::create([
            'entreprise_id' => $entrepriseId,
            'client_id' => $client->id,
            'type' => 'invoice',
            'status' => 'PENDING', // Skip DRAFT for test
            'date' => now(),
            'number' => 'TEST-INV-' . uniqid(),
            'created_by' => $user->id,
        ]);

        InvoiceItem::create([
            'invoice_id' => $invoice->id,
            'product_id' => $product->id,
            'description' => 'Item 1',
            'quantity' => 10,
            'unit_price' => 20,
            'line_total' => 200,
        ]);
        
        $workflowService->recalcTotals($invoice);

        echo "Created Invoice: {$invoice->number} (Status: {$invoice->status})\n";

        // 3. Approve Invoice
        $workflowService->approveInvoice($invoice, $user->id);
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
        } else {
            echo "FAILURE: Stock NOT deducted correctly.\n";
        }
    }
}
