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
        @page { margin: 50px; }
        body { 
            font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; 
            font-size: 11px; 
            color: #333333; 
            line-height: 1.8;
            font-weight: 300;
        }

        .header {
            width: 100%;
            margin-bottom: 60px;
        }

        .header td { vertical-align: top; }
        
        .company-name {
            font-size: 16px;
            font-weight: bold;
            color: #111111;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        .invoice-title {
            font-size: 12px;
            color: #888888;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 5px;
        }

        .invoice-number {
            font-size: 24px;
            color: #111111;
            font-weight: 300;
            letter-spacing: 1px;
        }

        .info-grid {
            width: 100%;
            margin-bottom: 50px;
        }

        .info-grid td {
            width: 50%;
            vertical-align: top;
        }

        .label {
            font-size: 9px;
            color: #999999;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 15px;
        }

        .client-name {
            font-size: 14px;
            font-weight: bold;
            color: #111111;
            margin-bottom: 5px;
        }

        table.items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 50px;
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
            border-bottom: 1px solid #eeeeee;
            padding: 10px 0;
            text-align: left;
            font-size: 9px;
            color: #999999;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: normal;
        }

        table.items-table td {
            padding: 15px 0;
            border-bottom: 1px solid #f9f9f9;
            vertical-align: top;
        }

        .text-right { text-align: right; }
        .text-center { text-align: center; }

        .totals-wrapper { width: 100%; page-break-inside: avoid; }
        .totals-left { float: left; width: 50%; }
        .totals-right { float: right; width: 40%; }

        table.totals-table {
            width: 100%;
            border-collapse: collapse;
        }

        table.totals-table td {
            padding: 12px 0;
            border-bottom: 1px solid #f9f9f9;
        }

        table.totals-table td.val {
            text-align: right;
            color: #111111;
        }

        .grand-total {
            font-size: 14px;
            font-weight: bold;
            color: #111111;
            border-top: 2px solid #111111;
        }

        .grand-total td {
            border-bottom: none !important;
            padding-top: 15px !important;
        }

        .footer {
            margin-top: 80px;
            font-size: 9px;
            color: #aaaaaa;
            text-align: center;
            letter-spacing: 1px;
        }

        .clear { clear: both; }
    </style>
</head>
<body>
    <table class="header">
        <tr>
            <td style="width: 50%;">
                @if($logoBase64)
                    <img src="{{ $logoBase64 }}" style="max-height: 40px; margin-bottom: 20px;">
                @endif
                <div class="company-name">{{ $invoice->entreprise->name ?? 'Studio Créatif' }}</div>
                <div style="color: #666666;">
                    {{ $invoice->entreprise->address ?? '' }}<br>
                    {{ $invoice->entreprise->phone ?? '' }}<br>
                    {{ $invoice->entreprise->email ?? '' }}
                </div>
            </td>
            <td style="width: 50%; text-align: right;">
                <div class="invoice-title">Facture</div>
                <div class="invoice-number">{{ $invoice->number }}</div>
                <div style="color: #888888; margin-top: 15px;">Date d'émission : {{ \Carbon\Carbon::parse($invoice->date)->format('d.m.Y') }}</div>
            </td>
        </tr>
    </table>

    <table class="info-grid">
        <tr>
            <td style="padding-right: 40px;">
                <div class="label">Objet de la facturation</div>
                @if($invoice->entreprise->invoice_header)
                <div style="font-size: 12px; color: #444444; line-height: 1.6;">
                    {{ $invoice->entreprise->invoice_header }}
                </div>
                @else
                <div style="font-size: 12px; color: #888888; font-style: italic;">
                    Prestations de services numériques et consulting.
                </div>
                @endif
            </td>
            <td style="padding-left: 40px;">
                <div class="label">Facturé à</div>
                <div class="client-name">{{ $invoice->client->name ?? 'Client Inconnu' }}</div>
                <div style="color: #666666;">
                    @if($invoice->client->address){{ $invoice->client->address }}<br>@endif
                    @if($invoice->client->phone){{ $invoice->client->phone }}<br>@endif
                    @if($invoice->client->email){{ $invoice->client->email }}@endif
                </div>
            </td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 50%;">Description</th>
                <th class="text-center" style="width: 15%;">Quantité</th>
                <th class="text-right" style="width: 15%;">Tarif unitaire</th>
                <th class="text-right" style="width: 20%;">Montant</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td>
                    <div style="font-weight: bold; color: #111111;">{{ $item->description }}</div>
                    @if($item->product && $item->product->reference)
                        <div style="font-size: 10px; color: #999999; margin-top: 4px;">{{ $item->product->reference }}</div>
                    @endif
                </td>
                <td class="text-center">{{ $item->quantity }}</td>
                <td class="text-right">{{ $formatCurrency($item->unit_price) }}</td>
                <td class="text-right" style="font-weight: bold; color: #111111;">{{ $formatCurrency($item->line_total) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals-wrapper">
        <div class="totals-left">
            @if(isset($qrCodeBase64) && $qrCodeBase64)
                <div style="margin-top: 20px;">
                    <img src="{{ $qrCodeBase64 }}" style="width: 80px; height: 80px; opacity: 0.9;" alt="QR Code Paiement">
                    <div style="font-size: 9px; color: #999999; margin-top: 8px; letter-spacing: 1px; text-transform: uppercase;">Scan pour Payer</div>
                </div>
            @endif
            @if(isset($exchangeRate) && $exchangeRate)
                <div style="margin-top: 20px; font-size: 10px; color: #888888;">
                    Taux applicable : 1 {{ $currencySymbol }} = {{ number_format($exchangeRate, 2, ',', ' ') }}
                </div>
            @endif
        </div>
        
        <div class="totals-right">
            <table class="totals-table">
                <tr>
                    <td style="color: #666666;">Sous-total HT</td>
                    <td class="val">{{ $formatCurrency($invoice->subtotal) }}</td>
                </tr>
                @if($invoice->tva > 0)
                <tr>
                    <td style="color: #666666;">TVA ({{ $invoice->tva }}%)</td>
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
            <div>Merci pour votre collaboration.</div>
        @endif
    </div>
</body>
</html>
