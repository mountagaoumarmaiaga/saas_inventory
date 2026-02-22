<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Product;
use App\Models\Client;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Services\InvoiceWorkflowService;
use App\Services\StockService;
use Illuminate\Support\Facades\DB;

// Use first user and enterprise
$user = User::first();
if (!$user) {
    die("No user found. Please migrate and seed database.\n");
}

if (!$user->entreprise_id) {
    // Check if any enterprise exists
    $ent = \App\Models\Entreprise::first();
    if (!$ent) {
        $ent = \App\Models\Entreprise::create([
            'name' => 'Test Entreprise',
            'email' => 'test@entreprise.com',
            // Add other required fields if any
        ]);
    }
    $user->update(['entreprise_id' => $ent->id]);
    $user->refresh();
}

$entrepriseId = $user->entreprise_id;
echo "User: {$user->name} (Entreprise: {$entrepriseId})\n";

// Start transaction to rollback later (optional, but good for testing)
// DB::beginTransaction();

try {
    $stockService = new StockService();
    $workflowService = new InvoiceWorkflowService();

    // 1. Create Product
    $product = Product::create([
        'entreprise_id' => $entrepriseId,
        'name' => 'Test Product ' . uniqid(),
        'sku' => 'TEST-' . uniqid(),
        'quantity' => 100, // Initial stock
        'purchase_price' => 10,
        'sale_price' => 20,
        'min_quantity' => 5,
        'created_by' => $user->id,
    ]);
    echo "Created Product: {$product->name} (Initial Stock: {$product->quantity})\n";

    // 2. Create Client if needed
    $client = Client::where('entreprise_id', $entrepriseId)->first();
    if (!$client) {
         $client = Client::create([
            'entreprise_id' => $entrepriseId,
            'name' => 'Test Client',
            'email' => 'test@client.com',
            'type' => 'individual'
         ]);
    }

    // 3. Create Invoice
    $number = 'TEST-INV-' . uniqid();
    $invoice = Invoice::create([
        'entreprise_id' => $entrepriseId,
        'client_id' => $client->id,
        'type' => 'invoice',
        'status' => 'DRAFT',
        'date' => now(),
        'number' => $number,
        'created_by' => $user->id,
    ]);
    // Important: Invoice must have items
    InvoiceItem::create([
        'invoice_id' => $invoice->id,
        'product_id' => $product->id,
        'description' => 'Item 1',
        'quantity' => 10, // Deduct 10
        'unit_price' => 20,
        'line_total' => 200,
    ]);
    $workflowService->recalcTotals($invoice);

    echo "Created Invoice: {$invoice->number} (Status: {$invoice->status})\n";

    // 4. Workflow: Submit -> Approve
    $workflowService->submitInvoice($invoice);
    echo "Submitted. Status: {$invoice->fresh()->status}\n";

    echo "Approving...\n";
    // NOTE: In the new flow, approval requires StockService and triggers deduction
    $workflowService->approveInvoice($invoice, $user->id, $stockService);
    echo "Approved. Status: {$invoice->fresh()->status}\n";

    $invoice->refresh();
    $product->refresh();
    
    echo "Invoice Stock Deducted At (After Approve): {$invoice->stock_deducted_at}\n";
    echo "Product Stock (After Approve): {$product->quantity}\n";

    if ($product->quantity == 90 && $invoice->status === 'APPROVED') {
        echo "SUCCESS: Stock deducted at APPROVAL (100 -> 90).\n";
    } else {
        echo "FAILURE: Stock NOT deducted at APPROVAL.\n";
    }

    echo "Marking Paid...\n";
    $workflowService->markPaid($invoice, $user->id, $stockService);
    
    $invoice->refresh();
    $product->refresh();
    
    echo "Invoice Status: {$invoice->status}\n";
    echo "Product Stock (After Paid): {$product->quantity}\n";

    if ($product->quantity == 90) {
        echo "VERIFIED: Stock remains deduced (no double deduction).\n";
    } else {
        echo "FAILURE: Stock changed after payment!\n";
    }

    echo "Marking Unpaid...\n";
    $workflowService->markUnpaid($invoice, $user->id, $stockService);

    $invoice->refresh();
    $product->refresh();

    echo "Invoice Status (After Unpaid): {$invoice->status}\n";
    echo "Product Stock (After Unpaid): {$product->quantity}\n";

    if ($product->quantity == 100 && $invoice->status === 'PENDING') {
        echo "SUCCESS: Stock restored and status reverted to PENDING.\n";
    } else {
        echo "FAILURE: Stock not restored or status incorrect.\n";
    }

} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
} finally {
    // Cleanup
    // DB::rollBack(); 
    // Or just delete the test data
    if (isset($invoice)) $invoice->delete();
    if (isset($product)) $product->delete();
    echo "Cleanup done.\n";
}
