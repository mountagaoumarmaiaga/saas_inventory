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
            font-family: 'Georgia', serif; 
            font-size: 13px; 
            color: #1a1a1a; 
            line-height: 1.6;
        }

        .gold-text { color: #d4af37; }
        .gold-bg { background-color: #d4af37; color: #ffffff; }
        .dark-bg { background-color: #121212; color: #ffffff; }

        .header {
            width: 100%;
            border-bottom: 2px solid #d4af37;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .header td { vertical-align: middle; }
        
        .company-name {
            font-size: 26px;
            font-weight: normal;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .invoice-title {
            font-size: 32px;
            letter-spacing: 4px;
            text-transform: uppercase;
            text-align: right;
        }

        .info-grid {
            width: 100%;
            margin-bottom: 40px;
        }

        .info-grid td {
            width: 50%;
            vertical-align: top;
        }

        .label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #666;
            margin-bottom: 8px;
            font-family: 'Arial', sans-serif;
        }

        .client-name {
            font-size: 16px;
            font-style: italic;
            margin-bottom: 5px;
        }

        table.items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
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
            border-bottom: 1px solid #d4af37;
            border-top: 1px solid #d4af37;
            padding: 12px 10px;
            text-align: left;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Arial', sans-serif;
            font-weight: normal;
        }

        table.items-table td {
            padding: 15px 10px;
            border-bottom: 1px solid #eaeaea;
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
            padding: 10px 0;
            font-size: 13px;
        }

        table.totals-table td.val {
            text-align: right;
            font-family: 'Arial', sans-serif;
        }

        .grand-total {
            border-top: 2px solid #1a1a1a;
            border-bottom: 2px solid #1a1a1a;
            font-weight: bold;
            font-size: 16px;
        }

        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 11px;
            color: #666;
            font-style: italic;
        }

        .clear { clear: both; }
    </style>
</head>
<body>
    <table class="header">
        <tr>
            <td style="width: 50%;">
                @if($logoBase64)
                    <img src="{{ $logoBase64 }}" style="max-height: 70px; margin-bottom: 15px;">
                @endif
                <div class="company-name">{{ $invoice->entreprise->name ?? 'Maison de Luxe' }}</div>
                @if($invoice->entreprise->invoice_header)
                <div style="font-size: 11px; color: #666; margin-top: 4px;">
                    {{ $invoice->entreprise->invoice_header }}
                </div>
                @endif
            </td>
            <td style="width: 50%; text-align: right;">
                <div class="invoice-title gold-text">FACTURE</div>
                <div style="font-family: 'Arial', sans-serif; font-size: 12px; margin-top: 5px;">N° {{ $invoice->number }}</div>
                <div style="font-family: 'Arial', sans-serif; font-size: 12px; color: #666;">Date : {{ \Carbon\Carbon::parse($invoice->date)->format('d/m/Y') }}</div>
            </td>
        </tr>
    </table>

    <table class="info-grid">
        <tr>
            <td style="padding-right: 20px;">
                <div class="label">Émetteur</div>
                <div style="font-family: 'Arial', sans-serif; color: #444; line-height: 1.5;">
                    {{ $invoice->entreprise->address ?? '' }}<br>
                    {{ $invoice->entreprise->phone ?? '' }}<br>
                    {{ $invoice->entreprise->email ?? '' }}
                </div>
            </td>
            <td style="padding-left: 20px;">
                <div class="label">Client</div>
                <div class="client-name">{{ $invoice->client->name ?? 'Client Inconnu' }}</div>
                <div style="font-family: 'Arial', sans-serif; color: #444; line-height: 1.5;">
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
                <th style="width: 50%;">Désignation</th>
                <th class="text-center" style="width: 15%;">Qté</th>
                <th class="text-right" style="width: 15%;">PU HT</th>
                <th class="text-right" style="width: 20%;">Total HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td>
                    <div style="font-weight: bold; font-size: 14px;">{{ $item->description }}</div>
                    @if($item->product && $item->product->reference)
                        <div style="font-size: 11px; color: #888; margin-top: 4px; font-family: 'Arial', sans-serif;">Réf : {{ $item->product->reference }}</div>
                    @endif
                </td>
                <td class="text-center" style="font-family: 'Arial', sans-serif;">{{ $item->quantity }}</td>
                <td class="text-right" style="font-family: 'Arial', sans-serif;">{{ $formatCurrency($item->unit_price) }}</td>
                <td class="text-right" style="font-family: 'Arial', sans-serif; font-weight: bold;">{{ $formatCurrency($item->line_total) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals-wrapper">
        <div class="totals-left">
            @if(isset($qrCodeBase64) && $qrCodeBase64)
                <div style="margin-top: 10px;">
                    <img src="{{ $qrCodeBase64 }}" style="width: 90px; height: 90px; border: 1px solid #d4af37; padding: 5px;" alt="QR Code Paiement">
                    <div class="label" style="margin-top: 8px;">Scan pour Payer</div>
                </div>
            @endif
            @if(isset($exchangeRate) && $exchangeRate)
                <div style="margin-top: 15px; font-size: 11px; color: #666;">
                    Taux de change : 1 {{ $currencySymbol }} = {{ number_format($exchangeRate, 2, ',', ' ') }}
                </div>
            @endif
        </div>
        
        <div class="totals-right">
            <table class="totals-table">
                <tr>
                    <td>Total HT</td>
                    <td class="val">{{ $formatCurrency($invoice->subtotal) }}</td>
                </tr>
                @if($invoice->tva > 0)
                <tr>
                    <td>TVA ({{ $invoice->tva }}%)</td>
                    <td class="val">{{ $formatCurrency($invoice->subtotal * $invoice->tva / 100) }}</td>
                </tr>
                @endif
                <tr>
                    <td colspan="2" style="padding: 5px 0;"></td>
                </tr>
                <tr class="grand-total">
                    <td style="padding: 15px 0;">TOTAL TTC</td>
                    <td class="val" style="padding: 15px 0;">{{ $formatCurrency($invoice->total) }}</td>
                </tr>
            </table>
        </div>
        <div class="clear"></div>
    </div>

    <div class="footer">
        @if($invoice->entreprise->invoice_footer)
            {{ $invoice->entreprise->invoice_footer }}
        @else
            <div>L'élégance à votre service. Merci de votre confiance.</div>
            <div style="margin-top: 5px;">{{ $invoice->entreprise->name ?? 'Maison de Luxe' }}</div>
        @endif
    </div>
</body>
</html>
