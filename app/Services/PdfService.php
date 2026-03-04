<?php

namespace App\Services;

use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

class PdfService
{
    public function streamInvoice(Invoice $invoice)
    {
        $template = $this->getInvoiceTemplate($invoice);
        $data = $this->prepareInvoiceData($invoice);
        $pdf = Pdf::loadView($template, $data);
        return $pdf->stream($invoice->number . '.pdf');
    }

    public function downloadInvoice(Invoice $invoice)
    {
        $template = $this->getInvoiceTemplate($invoice);
        $data = $this->prepareInvoiceData($invoice);
        $pdf = Pdf::loadView($template, $data);
        return $pdf->download($invoice->number . '.pdf');
    }

    public function streamPaymentReceipt(\App\Models\Payment $payment)
    {
        $payment->load(['invoice.client', 'invoice.entreprise']);
        $logoBase64 = $this->prepareLogo($payment->invoice->entreprise);
        
        $pdf = Pdf::loadView('pdf.payment-receipt', [
            'payment' => $payment,
            'invoice' => $payment->invoice,
            'logoBase64' => $logoBase64,
            'currencySymbol' => $payment->invoice->entreprise->currency_symbol ?? 'FCFA',
            'currencyPosition' => $payment->invoice->entreprise->currency_position ?? 'right',
        ]);
        
        return $pdf->stream('Reçu-' . str_pad($payment->id, 5, '0', STR_PAD_LEFT) . '.pdf');
    }

    public function downloadPaymentReceipt(\App\Models\Payment $payment)
    {
        $payment->load(['invoice.client', 'invoice.entreprise']);
        $logoBase64 = $this->prepareLogo($payment->invoice->entreprise);
        
        $pdf = Pdf::loadView('pdf.payment-receipt', [
            'payment' => $payment,
            'invoice' => $payment->invoice,
            'logoBase64' => $logoBase64,
            'currencySymbol' => $payment->invoice->entreprise->currency_symbol ?? 'FCFA',
            'currencyPosition' => $payment->invoice->entreprise->currency_position ?? 'right',
        ]);
        
        return $pdf->download('Reçu-' . str_pad($payment->id, 5, '0', STR_PAD_LEFT) . '.pdf');
    }

    public function streamDeliveryNote(\App\Models\DeliveryNote $dn)
    {
        $dn->load(['client', 'items', 'entreprise', 'invoice']);
        $logoBase64 = $this->prepareLogo($dn->entreprise);
        $template = $this->getDeliveryNoteTemplate($dn->entreprise);
        
        $pdf = Pdf::loadView($template, [
            'dn' => $dn,
            'logoBase64' => $logoBase64
        ]);
        
        $filename = ($dn->reference ?? $dn->number ?? 'BL') . '.pdf';
        return $pdf->stream($filename);
    }

    public function downloadDeliveryNote(\App\Models\DeliveryNote $dn)
    {
        $dn->load(['client', 'items', 'entreprise', 'invoice']);
        $logoBase64 = $this->prepareLogo($dn->entreprise);
        $template = $this->getDeliveryNoteTemplate($dn->entreprise);
        
        $pdf = Pdf::loadView($template, [
            'dn' => $dn,
            'logoBase64' => $logoBase64
        ]);
        
        $filename = ($dn->reference ?? $dn->number ?? 'BL') . '.pdf';
        return $pdf->download($filename);
    }

    public function streamPurchase(\App\Models\Purchase $purchase)
    {
        $template = $this->getPurchaseTemplate($purchase->entreprise);
        $data = $this->preparePurchaseData($purchase);
        $pdf = Pdf::loadView($template, $data);
        return $pdf->stream('BC-' . $purchase->number . '.pdf');
    }

    public function downloadPurchase(\App\Models\Purchase $purchase)
    {
        $template = $this->getPurchaseTemplate($purchase->entreprise);
        $data = $this->preparePurchaseData($purchase);
        $pdf = Pdf::loadView($template, $data);
        return $pdf->download('BC-' . $purchase->number . '.pdf');
    }

    public function streamQuote(\App\Models\Quote $quote)
    {
        $template = $this->getQuoteTemplate($quote->entreprise);
        $data = $this->prepareQuoteData($quote);
        $pdf = Pdf::loadView($template, $data);
        return $pdf->stream('Devis-' . $quote->number . '.pdf');
    }

    public function downloadQuote(\App\Models\Quote $quote)
    {
        $template = $this->getQuoteTemplate($quote->entreprise);
        $data = $this->prepareQuoteData($quote);
        $pdf = Pdf::loadView($template, $data);
        return $pdf->download('Devis-' . $quote->number . '.pdf');
    }

    private function prepareQuoteData(\App\Models\Quote $quote): array
    {
        $quote->load(['client', 'items.product', 'entreprise']);
        
        return [
            'quote' => $quote,
            'logoBase64' => $this->prepareLogo($quote->entreprise),
            'currencySymbol' => $quote->entreprise->currency_symbol ?? 'FCFA',
            'currencyPosition' => $quote->entreprise->currency_position ?? 'right',
        ];
    }

    private function prepareInvoiceData(Invoice $invoice): array
    {
        $invoice->load(['client', 'items', 'entreprise']);
        
        $qrCodeBase64 = null;
        if (!empty($invoice->entreprise->qr_payment_link)) {
            try {
                $renderer = new ImageRenderer(
                    new RendererStyle(120),
                    new SvgImageBackEnd()
                );
                $writer = new Writer($renderer);
                $svg = $writer->writeString($invoice->entreprise->qr_payment_link);
                $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
            } catch (\Exception $e) {
                \Log::warning('Failed to generate QR Code for PDF: ' . $e->getMessage());
            }
        }

        return [
            'invoice' => $invoice,
            'logoBase64' => $this->prepareLogo($invoice->entreprise),
            'qrCodeBase64' => $qrCodeBase64,
            'currencySymbol' => $invoice->currency_symbol ?? $invoice->entreprise->currency_symbol ?? 'FCFA',
            'currencyPosition' => $invoice->currency_position ?? $invoice->entreprise->currency_position ?? 'right',
            'exchangeRate' => $invoice->exchange_rate ?? null,
        ];
    }

    private function preparePurchaseData(\App\Models\Purchase $purchase): array
    {
        $purchase->load(['supplier', 'items.product', 'entreprise']);
        
        return [
            'purchase' => $purchase,
            'logoBase64' => $this->prepareLogo($purchase->entreprise),
            'currencySymbol' => $purchase->entreprise->currency_symbol ?? 'FCFA',
            'currencyPosition' => $purchase->entreprise->currency_position ?? 'right',
        ];
    }

    private function prepareLogo($entreprise): ?string
    {
        if (!$entreprise->logo_url) return null;

        try {
            $imageContent = null;
            
            // Check if it's a local storage URL
            if (str_contains($entreprise->logo_url, '/storage/')) {
                // Extract path from URL (e.g., /storage/logos/2/file.png -> logos/2/file.png)
                $path = ltrim(str_replace('/storage/', '', parse_url($entreprise->logo_url, PHP_URL_PATH)), '/');
                
                // Try to get from public disk
                if (\Storage::disk('public')->exists($path)) {
                    $imageContent = \Storage::disk('public')->get($path);
                }
            } elseif (str_starts_with($entreprise->logo_url, 'http')) {
                // External URL (Supabase) - use file_get_contents with timeout
                // For direct file fetch
                $context = stream_context_create([
                    'http' => [
                        'timeout' => 2,
                        'ignore_errors' => true,
                    ],
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                    ]
                ]);
                
                $imageContent = @file_get_contents($entreprise->logo_url, false, $context);
            }
            
            if ($imageContent && strlen($imageContent) > 0) {
                $finfo = new \finfo(FILEINFO_MIME_TYPE);
                $mimeType = $finfo->buffer($imageContent);
                // Fix: some finfo versions return "text/plain" or fail for SVG
                if ($mimeType === 'text/plain' && str_ends_with($entreprise->logo_url, '.svg')) {
                    $mimeType = 'image/svg+xml';
                }
                return 'data:' . $mimeType . ';base64,' . base64_encode($imageContent);
            }
        } catch (\Exception $e) {
            \Log::warning('Failed to load logo for PDF: ' . $e->getMessage());
        }

        return null;
    }

    private function getInvoiceTemplate(Invoice $invoice): string
    {
        $templateName = $invoice->entreprise->invoice_template ?? 'classic';
        return "pdf.invoice-{$templateName}";
    }

    private function getDeliveryNoteTemplate(\App\Models\Entreprise $entreprise): string
    {
        $templateName = $entreprise->delivery_note_template ?? 'classic';
        return "pdf.delivery-note-{$templateName}";
    }

    private function getPurchaseTemplate(\App\Models\Entreprise $entreprise): string
    {
        $templateName = $entreprise->purchase_template ?? 'classic';
        return "pdf.purchase-{$templateName}";
    }

    private function getQuoteTemplate(\App\Models\Entreprise $entreprise): string
    {
        $templateName = $entreprise->quote_template ?? $entreprise->invoice_template ?? 'classic';
        return "pdf.quote-{$templateName}";
    }
}
