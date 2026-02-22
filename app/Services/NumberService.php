<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\DeliveryNote;

class NumberService
{
    public function nextInvoiceNumber(int $entrepriseId, string $type): string
    {
        $prefix = $type === 'proforma' ? 'PF' : 'FV';
        
        // Get the highest number for this enterprise and type
        $lastNumber = Invoice::where('entreprise_id', $entrepriseId)
            ->where('type', $type)
            ->orderBy('number', 'desc')
            ->value('number');

        if (!$lastNumber) {
            return sprintf("%s-000001", $prefix);
        }

        // Extract the numeric part (everything after the prefix and dash)
        // Format is PREFIX-XXXXXX, so we skip strlen($prefix) + 1
        $numericPart = (int) substr($lastNumber, strlen($prefix) + 1);
        $nextNumber = $numericPart + 1;

        return sprintf("%s-%06d", $prefix, $nextNumber);
    }

    public function nextDeliveryNumber(int $entrepriseId): string
    {
        // Get the highest number for this enterprise
        $lastNumber = DeliveryNote::where('entreprise_id', $entrepriseId)
            ->orderBy('number', 'desc')
            ->value('number');
        
        if (!$lastNumber) {
            return 'BL-000001';
        }
        
        // Extract the numeric part and increment
        $numericPart = (int) substr($lastNumber, 3); // Remove "BL-" prefix
        $nextNumber = $numericPart + 1;
        
        return sprintf("BL-%06d", $nextNumber);
    }
}
