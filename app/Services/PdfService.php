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

    private function prepareLogo($entreprise): ?string
    {
        if (!$entreprise->logo_url) return null;

        try {
            $imageContent = null;
            
            // Check if it's a local storage URL
            if (str_contains($entreprise->logo_url, '/storage/')) {
                // Extract path from URL (e.g., /storage/logos/2/file.png -> logos/2/file.png)
                $path = str_replace('/storage/', '', parse_url($entreprise->logo_url, PHP_URL_PATH));
                
                // Try to get from public disk
                if (\Storage::disk('public')->exists($path)) {
                    $imageContent = \Storage::disk('public')->get($path);
                }
            } elseif (str_starts_with($entreprise->logo_url, 'http')) {
                // External URL (Supabase) - use file_get_contents with timeout
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
}
