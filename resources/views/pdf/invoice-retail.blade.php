<!DOCTYPE html>
<html>
@php
$formatCurrency = function($amount) use ($currencySymbol, $currencyPosition) {
    $formatted = number_format($amount, 0, ',', ' ');
    return $currencyPosition === 'left' ? "{$currencySymbol} {$formatted}" : "{$formatted} {$currencySymbol}";
};
@endphp
<head>
    <meta charset="utf-8">
    <title>Facture {{ $invoice->number }}</title>
    <style>
        @page { margin: 40px; }
        body { 
            font-family: 'Helvetica Neue', 'Arial', sans-serif; 
            font-size: 12px; 
            color: #1f2937; 
            line-height: 1.5;
            background-color: #ffffff;
        }

        .header {
            width: 100%;
            margin-bottom: 30px;
        }
        
        .company-name {
            font-size: 20px;
            font-weight: 800;
            color: #111827;
        }

        .badge-facture {
            display: inline-block;
            background-color: #10b981; /* Emerald 500 */
            color: white;
            padding: 5px 15px;
            border-radius: 9999px;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .info-panel {
            width: 100%;
            background-color: #f3f4f6; /* Gray 100 */
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
        }

        table.info-table { width: 100%; border-collapse: collapse; }
        table.info-table td { width: 33.33%; vertical-align: top; }

        .label {
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            color: #6b7280;
            margin-bottom: 5px;
            letter-spacing: 0.5px;
        }

        .value-text {
            color: #374151;
            font-size: 13px;
            line-height: 1.6;
        }

        table.items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            page-break-inside: auto;
        }

        table.items-table tr {
            page-break-inside: avoid;
            page-break-after: auto;
        }

        table.items-table thead {
            display: table-header-group;
        }

        table.items-table th {
            border-bottom: 2px solid #e5e7eb;
            color: #4b5563;
            padding: 12px 10px;
            text-align: left;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
        }

        table.items-table td {
            padding: 15px 10px;
            border-bottom: 1px solid #f3f4f6;
            vertical-align: middle;
        }

        .item-details { font-weight: bold; color: #111827; font-size: 14px; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }

        .totals-wrapper { width: 100%; page-break-inside: avoid; }
        .totals-left { float: left; width: 50%; }
        .totals-right { float: right; width: 45%; }

        table.totals-table {
            width: 100%;
            border-collapse: collapse;
            background-color: #f9fafb;
            border-radius: 8px;
            overflow: hidden;
        }

        table.totals-table td {
            padding: 12px 20px;
            color: #4b5563;
            font-size: 13px;
            border-bottom: 1px solid #e5e7eb;
        }

        table.totals-table td.val {
            text-align: right;
            font-weight: bold;
            color: #111827;
        }

        .grand-total td {
            background-color: #10b981;
            color: white !important;
            font-size: 16px;
            font-weight: bold;
            border-bottom: none;
        }

        .grand-total td.val {
            color: white !important;
        }

        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 11px;
            color: #9ca3af;
        }

        .clear { clear: both; }
    </style>
</head>
<body>
    <table class="header">
        <tr>
            <td style="width: 50%; vertical-align: middle;">
                @if($logoBase64)
                    <img src="{{ $logoBase64 }}" style="max-height: 50px; margin-bottom: 10px;">
                @endif
                <div class="company-name">{{ $invoice->entreprise->name ?? 'Retail Store' }}</div>
                @if($invoice->entreprise->invoice_header)
                <div style="font-size: 12px; color: #6b7280; font-style: italic; margin-top: 5px;">
                    {{ $invoice->entreprise->invoice_header }}
                </div>
                @endif
            </td>
            <td style="width: 50%; text-align: right; vertical-align: middle;">
                <div class="badge-facture">FACTURE</div>
                <div style="margin-top: 10px; font-size: 14px; font-weight: bold; color: #374151;">N° {{ $invoice->number }}</div>
                <div style="font-size: 12px; color: #6b7280;">Le {{ \Carbon\Carbon::parse($invoice->date)->format('d/m/Y') }}</div>
            </td>
        </tr>
    </table>

    <div class="info-panel">
        <table class="info-table">
            <tr>
                <td style="padding-right: 15px;">
                    <div class="label">Client / Livré à</div>
                    <div class="value-text" style="font-weight: bold; color: #111827; font-size: 14px;">{{ $invoice->client->name ?? 'Client Inconnu' }}</div>
                    <div class="value-text">
                        @if($invoice->client->address){{ $invoice->client->address }}<br>@endif
                        @if($invoice->client->phone){{ $invoice->client->phone }}<br>@endif
                        @if($invoice->client->email){{ $invoice->client->email }}@endif
                    </div>
                </td>
                <td style="padding-left: 15px; border-left: 1px solid #d1d5db; padding-right: 15px;">
                    <div class="label">Vendeur / Émetteur</div>
                    <div class="value-text">
                        {{ $invoice->entreprise->name ?? 'Retail Store' }}<br>
                        {{ $invoice->entreprise->address ?? '' }}<br>
                        {{ $invoice->entreprise->phone ?? '' }}<br>
                        {{ $invoice->entreprise->email ?? '' }}
                    </div>
                </td>
                <td style="padding-left: 15px; border-left: 1px solid #d1d5db;">
                    <div class="label">Détails de Commande</div>
                    <div class="value-text">
                        Réf Commande : N/A<br>
                        Mode de paiement : À réception<br>
                        Devise : {{ $currencySymbol }}
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 45%;">Article</th>
                <th class="text-center" style="width: 15%;">Qté</th>
                <th class="text-right" style="width: 20%;">Prix HT</th>
                <th class="text-right" style="width: 20%;">Total HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td>
                    <div class="item-details">{{ $item->description }}</div>
                    @if($item->product && $item->product->reference)
                        <div style="font-size: 11px; color: #6b7280; margin-top: 4px;">Code: {{ $item->product->reference }}</div>
                    @endif
                </td>
                <td class="text-center" style="font-weight: bold; color: #4b5563;">{{ $item->quantity }}</td>
                <td class="text-right" style="color: #6b7280;">{{ $formatCurrency($item->unit_price) }}</td>
                <td class="text-right" style="font-weight: bold; color: #111827;">{{ $formatCurrency($item->line_total) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals-wrapper">
        <div class="totals-left">
            @if(isset($qrCodeBase64) && $qrCodeBase64)
                <div style="background-color: #f3f4f6; padding: 10px; border-radius: 8px; display: inline-block;">
                    <img src="{{ $qrCodeBase64 }}" style="width: 80px; height: 80px;" alt="QR Paiement">
                    <div style="text-align: center; font-size: 10px; font-weight: bold; color: #4b5563; margin-top: 5px;">Payer via QR</div>
                </div>
            @endif
            @if(isset($exchangeRate) && $exchangeRate)
                <div style="margin-top: 15px; font-size: 11px; color: #6b7280; background-color: #f9fafb; padding: 8px; border-radius: 4px; border: 1px dashed #d1d5db;">
                    Information de change : 1 {{ $currencySymbol }} = {{ number_format($exchangeRate, 2, ',', ' ') }}
                </div>
            @endif
        </div>
        
        <div class="totals-right">
            <table class="totals-table">
                <tr>
                    <td>Sous-total (HT)</td>
                    <td class="val">{{ $formatCurrency($invoice->subtotal) }}</td>
                </tr>
                @if($invoice->tva > 0)
                <tr>
                    <td>TVA ({{ $invoice->tva }}%)</td>
                    <td class="val">{{ $formatCurrency($invoice->subtotal * $invoice->tva / 100) }}</td>
                </tr>
                @endif
                <tr class="grand-total">
                    <td>TOTAL TTC</td>
                    <td class="val">{{ $formatCurrency($invoice->total) }}</td>
                </tr>
            </table>
        </div>
        <div class="clear"></div>
    </div>

    <div class="footer">
        @if($invoice->entreprise->invoice_footer)
            {{ $invoice->entreprise->invoice_footer }}
        @else
            <div>Merci pour votre achat ! Les retours sont acceptés sous 14 jours avec ticket d'origine.</div>
            <div style="margin-top: 5px;">{{ $invoice->entreprise->name ?? 'Retail Store' }} — Service Client</div>
        @endif
    </div>
</body>
</html>
