<?php

namespace App\Services;

use thiagoalessio\TesseractOCR\TesseractOCR;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;

class ReceiptOCRService
{
    /**
     * Extracts date, amount, and supplier name from an uploaded receipt image.
     *
     * @param string $filePath Absolute path to the uploaded image inside the storage folder
     * @return array|null An array containing 'date', 'amount', 'supplier_name' or null on generic failure.
     */
    public function extractData(string $filePath): ?array
    {
        try {
            // Check if Tesseract is installed and text can be extracted
            $text = (new TesseractOCR($filePath))->run();

            if (!$text) {
                return null;
            }

            return [
                'supplier_name' => $this->extractSupplierName($text),
                'amount' => $this->extractAmount($text),
                'date' => $this->extractDate($text),
                'raw_text' => $text, // useful for debugging returning to UI
            ];
        } catch (\Exception $e) {
            Log::error('OCR Extraction failed: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Attempt to extract the supplier name.
     * Usually, it's the very first line of a receipt.
     */
    private function extractSupplierName(string $text): ?string
    {
        $lines = explode("\n", trim($text));
        
        // Filter out empty lines and non-alphanumeric noise
        $validLines = array_filter($lines, function ($line) {
            $line = trim($line);
            return !empty($line) && preg_match('/[a-zA-Z]/', $line);
        });
        
        $validLines = array_values($validLines);
        
        if (count($validLines) > 0) {
            // First valid line is often the company name
            return substr($validLines[0], 0, 100); 
        }

        return null;
    }

    /**
     * Extract the total amount from text.
     * Looking for keywords like Total, Montant, TTC, Sum followed by numbers.
     */
    private function extractAmount(string $text): ?float
    {
        // Many receipts have "TOTAL" or "MONTANT TTC"
        // Regex: looks for "total" or "ttc", might have colon or space, then captures digits (with optional dot/comma)
        $pattern = '/(?:total|montant ttc|ttc|somme|amount)[\s\:\.\-]*([0-9]+(?:[\.\,][0-9]{1,2})?)/i';
        
        if (preg_match($pattern, $text, $matches)) {
            // Normalize comma to dot
            $amountString = str_replace(',', '.', $matches[1]);
            return (float) $amountString;
        }
        
        // Fallback: look for the largest number on the receipt that has 2 decimal places or looks like thousands
        preg_match_all('/([0-9]+\s*[0-9]*(?:[\.\,][0-9]{1,2})?)/', $text, $allNumbers);
        if (!empty($allNumbers[1])) {
            $max = 0;
            foreach ($allNumbers[1] as $numStr) {
                // remove spaces and normalize
                $clean = str_replace([' ', ','], ['', '.'], $numStr);
                $val = (float) $clean;
                if ($val > $max) {
                    $max = $val;
                }
            }
            // Return largest found number assuming it might be the total (not always true but a good guess for simple receipts)
            return $max > 0 ? $max : null;
        }

        return null;
    }

    /**
     * Extract a date from the text.
     * Looking for formats like DD/MM/YYYY or YYYY-MM-DD
     */
    private function extractDate(string $text): ?string
    {
        // Match DD/MM/YYYY or DD-MM-YYYY
        if (preg_match('/([0-3][0-9])[\/\-]([0-1][0-9])[\/\-](20[0-9]{2})/', $text, $matches)) {
            // matches[1] = day, matches[2] = month, matches[3] = year
            return $matches[3] . '-' . $matches[2] . '-' . $matches[1];
        }

        // Match YYYY-MM-DD
        if (preg_match('/(20[0-9]{2})[\/\-]([0-1][0-9])[\/\-]([0-3][0-9])/', $text, $matches)) {
            return $matches[1] . '-' . $matches[2] . '-' . $matches[3];
        }

        return null;
    }
}
