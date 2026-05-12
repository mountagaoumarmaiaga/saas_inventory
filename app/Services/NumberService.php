<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\DeliveryNote;
use App\Models\Purchase;
use App\Models\Quote;

class NumberService
{
    public function nextInvoiceNumber(int $entrepriseId, string $type): string
    {
        $lastRecord = Invoice::where('entreprise_id', $entrepriseId)
            ->where('type', $type)
            ->latest('id')
            ->first();

        $nextSequence = 1;
        if ($lastRecord && !empty($lastRecord->number)) {
            if (preg_match('/(\d+)$/', $lastRecord->number, $matches)) {
                $nextSequence = (int)$matches[1] + 1;
            }
        }

        $prefix = ($type === 'proforma') ? '' : 'FACT';
        $dateStr = ($type === 'proforma') ? '' : date('Ym') . '-';

        do {
            if ($type === 'proforma') {
                $candidate = sprintf("%05d", $nextSequence);
            } else {
                $candidate = sprintf("%s-%s%03d", $prefix, $dateStr, $nextSequence);
            }
            
            $exists = Invoice::where('entreprise_id', $entrepriseId)
                ->where('number', $candidate)
                ->exists();
                
            if ($exists) {
                $nextSequence++;
            }
        } while ($exists);

        return $candidate;
    }

    public function nextDeliveryNumber(int $entrepriseId): string
    {
        $lastRecord = DeliveryNote::where('entreprise_id', $entrepriseId)
            ->latest('id')
            ->first();
        
        $nextSequence = 1;
        if ($lastRecord && !empty($lastRecord->number)) {
            if (preg_match('/(\d+)$/', $lastRecord->number, $matches)) {
                $nextSequence = (int)$matches[1] + 1;
            }
        }
        
        $prefix = 'BL';
        $dateStr = date('Ym'); // YYYYMM
        
        do {
            $candidate = sprintf("%s-%s-%03d", $prefix, $dateStr, $nextSequence);
            $exists = DeliveryNote::where('entreprise_id', $entrepriseId)->where('number', $candidate)->exists();
            if ($exists) {
                $nextSequence++;
            }
        } while ($exists);

        return $candidate;
    }
    
    public function nextPurchaseNumber(int $entrepriseId): string
    {
        $lastRecord = Purchase::where('entreprise_id', $entrepriseId)
            ->latest('id')
            ->first();
        
        $nextSequence = 1;
        if ($lastRecord && !empty($lastRecord->number)) {
            if (preg_match('/(\d+)$/', $lastRecord->number, $matches)) {
                $nextSequence = (int)$matches[1] + 1;
            }
        }
        
        $prefix = 'BC';
        $dateStr = date('Ym'); // YYYYMM
        
        do {
            $candidate = sprintf("%s-%s-%03d", $prefix, $dateStr, $nextSequence);
            $exists = Purchase::where('entreprise_id', $entrepriseId)->where('number', $candidate)->exists();
            if ($exists) {
                $nextSequence++;
            }
        } while ($exists);

        return $candidate;
    }

    public function nextQuoteNumber(int $entrepriseId): string
    {
        $lastRecord = Quote::where('entreprise_id', $entrepriseId)
            ->latest('id')
            ->first();

        $nextSequence = 1;
        if ($lastRecord && !empty($lastRecord->number)) {
            if (preg_match('/(\d+)$/', $lastRecord->number, $matches)) {
                $nextSequence = (int)$matches[1] + 1;
            }
        }

        $prefix = 'DEV';
        $dateStr = date('Ym');
        
        do {
            $candidate = sprintf("%s-%s-%03d", $prefix, $dateStr, $nextSequence);
            $exists = Quote::where('entreprise_id', $entrepriseId)->where('number', $candidate)->exists();
            if ($exists) {
                $nextSequence++;
            }
        } while ($exists);

        return $candidate;
    }
}
