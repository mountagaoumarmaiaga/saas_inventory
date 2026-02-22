<?php

namespace App\Services;

use App\Models\DeliveryNote;
use App\Models\DeliveryItem;
use App\Models\Invoice;
use Illuminate\Support\Facades\DB;

class DeliveryNoteService
{
    public function createFromInvoice(
        Invoice $invoice,
        int $userId,
        NumberService $numbers
    ): DeliveryNote {
        abort_unless(
            in_array($invoice->status, ['APPROVED', 'PAID'], true), 
            422, 
            "La facture doit être approuvée ou payée pour générer un bon de livraison. Statut actuel: {$invoice->status}"
        );

        return DB::transaction(function () use ($invoice, $userId, $numbers) {
            $dn = DeliveryNote::create([
                'entreprise_id' => $invoice->entreprise_id,
                'number' => $numbers->nextDeliveryNumber($invoice->entreprise_id),
                'status' => 'DRAFT',
                'invoice_id' => $invoice->id,
                'client_id' => $invoice->client_id,
                'delivery_date' => now()->toDateString(),
                'created_by' => $userId,
            ]);

            foreach ($invoice->items as $item) {
                DeliveryItem::create([
                    'delivery_note_id' => $dn->id,
                    'product_id' => $item->product_id,
                    'description' => $item->description,
                    'quantity' => $item->quantity,
                ]);
            }

            return $dn;
        });
    }

    public function update(DeliveryNote $dn, array $data): DeliveryNote
    {
        return DB::transaction(function () use ($dn, $data) {
            $dn->update([
                'delivery_date' => $data['delivery_date'] ?? $dn->delivery_date,
                'delivery_person' => $data['delivery_person'] ?? $dn->delivery_person,
                'notes' => $data['notes'] ?? $dn->notes,
            ]);

            if (isset($data['items'])) {
                // On supprime les items existants et on recrée ? 
                // Ou on update ?
                // Simple: Delete all and recreate. 
                // Better: Update existing, add new, delete missing.
                // Given the UI will likely send the full list, syncing is easier.
                
                // For simplicity and since we don't track item IDs in frontend edit form easily without complexity:
                // We will wipe and recreate items based on the provided list. 
                // BUT we need to obtain product_id and description from somewhere if not provided?
                // The frontend should send full item objects.

                $dn->items()->delete();

                foreach ($data['items'] as $item) {
                    DeliveryItem::create([
                        'delivery_note_id' => $dn->id,
                        'product_id' => $item['product_id'],
                        'description' => $item['description'] ?? '',
                        'quantity' => $item['quantity'],
                    ]);
                }
            }

            return $dn;
        });
    }
}
