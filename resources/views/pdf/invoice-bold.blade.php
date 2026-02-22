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
        @page { margin: 0; }
        body { 
            font-family: 'Helvetica Black', 'Arial', sans-serif; 
            font-size: 13px; 
            color: #000000; 
            line-height: 1.4;
            padding: 50px;
        }

        .primary { color: #8b5cf6; } /* Violet 500 */
        .bg-primary { background-color: #8b5cf6; color: white; }

        .header {
            width: 100%;
            margin-bottom: 50px;
        }
        
        .company-name {
            font-size: 40px;
            font-weight: 900;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: -1px;
            line-height: 1;
            margin-bottom: 10px;
        }

        .invoice-title {
            font-size: 60px;
            font-weight: 900;
            color: #8b5cf6;
            text-transform: uppercase;
            letter-spacing: -3px;
            line-height: 0.8;
            margin-bottom: 5px;
        }

        .info-grid {
            width: 100%;
            margin-bottom: 50px;
            border-top: 5px solid #000000;
            padding-top: 20px;
        }

        .info-grid td { width: 33.33%; vertical-align: top; }

        .label {
            font-size: 13px;
            font-weight: 900;
            text-transform: uppercase;
            color: #8b5cf6;
            margin-bottom: 10px;
        }

        .value-text {
            color: #000000;
            font-size: 14px;
            font-weight: bold;
            line-height: 1.5;
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
            border-bottom: 4px solid #000000;
            color: #000000;
            padding: 15px 10px;
            text-align: left;
            font-size: 14px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        table.items-table td {
            padding: 20px 10px;
            border-bottom: 1px solid #e5e5e5;
            vertical-align: top;
        }

        .item-details { font-weight: 900; color: #000000; font-size: 18px; line-height: 1.2; text-transform: uppercase; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }

        .items-qty {
            font-size: 20px;
            font-weight: 900;
            color: #8b5cf6;
        }

        .val-mono {
            font-size: 18px;
            font-weight: 900;
        }

        .totals-wrapper { width: 100%; page-break-inside: avoid; }
        .totals-left { float: left; width: 45%; }
        .totals-right { float: right; width: 50%; }

        table.totals-table { width: 100%; border-collapse: collapse; }

        table.totals-table td {
            padding: 15px 10px;
            color: #000000;
            font-size: 16px;
            font-weight: 900;
            text-transform: uppercase;
            border-bottom: 2px solid #e5e5e5;
        }

        table.totals-table td.val { text-align: right; font-size: 20px; }

        .grand-total td {
            background-color: #8b5cf6;
            color: white !important;
            font-size: 24px;
            border-bottom: none;
            padding: 20px 15px;
        }

        .grand-total td.val { color: white !important; font-size: 30px; }

        .footer {
            margin-top: 60px;
            font-size: 14px;
            font-weight: 900;
            color: #000000;
            text-transform: uppercase;
            border-top: 5px solid #000000;
            padding-top: 20px;
            text-align: center;
        }

        .clear { clear: both; }
    </style>
</head>
<body>
    <table class="header">
        <tr>
            <td style="width: 60%; vertical-align: top;">
                <div class="invoice-title">FACTURE</div>
                <div style="font-size: 24px; font-weight: 900; color: #000000; margin-top: 10px;">N° {{ $invoice->number }}</div>
            </td>
            <td style="width: 40%; text-align: right; vertical-align: top;">
                @if($logoBase64)
                    <img src="{{ $logoBase64 }}" style="max-height: 80px; margin-bottom: 15px;">
                @endif
                <div class="company-name">{{ $invoice->entreprise->name ?? 'AGENCY BOLD' }}</div>
                @if($invoice->entreprise->invoice_header)
                <div style="font-size: 14px; font-weight: 900; color: #8b5cf6; text-transform: uppercase;">
                    {{ $invoice->entreprise->invoice_header }}
                </div>
                @endif
            </td>
        </tr>
    </table>

    <table class="info-grid">
        <tr>
            <td style="padding-right: 20px;">
                <div class="label">DATE D'ÉMISSION</div>
                <div class="value-text" style="font-size: 18px;">{{ \Carbon\Carbon::parse($invoice->date)->format('d.m.Y') }}</div>
            </td>
            <td style="padding-right: 20px;">
                <div class="label">CLIENT</div>
                <div class="value-text" style="font-size: 18px; color: #8b5cf6;">{{ $invoice->client->name ?? 'INVITÉ' }}</div>
                <div class="value-text">
                    @if($invoice->client->address){{ $invoice->client->address }}<br>@endif
                    @if($invoice->client->phone){{ $invoice->client->phone }}<br>@endif
                    @if($invoice->client->email){{ $invoice->client->email }}@endif
                </div>
            </td>
            <td>
                <div class="label">ÉMETTEUR</div>
                <div class="value-text">
                    {{ $invoice->entreprise->address ?? '' }}<br>
                    TÉL : {{ $invoice->entreprise->phone ?? '' }}<br>
                    {{ $invoice->entreprise->email ?? '' }}
                </div>
            </td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 50%;">PROJET / SERVICE</th>
                <th class="text-center" style="width: 10%;">QTY</th>
                <th class="text-right" style="width: 20%;">TARIF HT</th>
                <th class="text-right" style="width: 20%;">TOTAL HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td>
                    <div class="item-details">{{ $item->description }}</div>
                    @if($item->product && $item->product->reference)
                        <div style="font-size: 12px; color: #8b5cf6; margin-top: 5px; font-weight: 900;">RÉF: {{ $item->product->reference }}</div>
                    @endif
                </td>
                <td class="text-center"><span class="items-qty">{{ $item->quantity }}</span></td>
                <td class="text-right val-mono">{{ $formatCurrency($item->unit_price) }}</td>
                <td class="text-right val-mono">{{ $formatCurrency($item->line_total) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals-wrapper">
        <div class="totals-left">
            @if(isset($qrCodeBase64) && $qrCodeBase64)
                <div style="margin-top: 10px;">
                    <img src="{{ $qrCodeBase64 }}" style="width: 120px; height: 120px; border: 4px solid #000000; padding: 5px;" alt="QR Code Paiement">
                    <div style="font-size: 14px; font-weight: 900; color: #8b5cf6; margin-top: 10px; text-transform: uppercase;">SCAN & PAY</div>
                </div>
            @endif
            @if(isset($exchangeRate) && $exchangeRate)
                <div style="margin-top: 20px; font-size: 13px; font-weight: 900; color: #000000; border-left: 5px solid #8b5cf6; padding-left: 10px;">
                    TAUX : 1 {{ $currencySymbol }} = {{ number_format($exchangeRate, 2, ',', ' ') }}
                </div>
            @endif
        </div>
        
        <div class="totals-right">
            <table class="totals-table">
                <tr>
                    <td>TOTAL HT</td>
                    <td class="val">{{ $formatCurrency($invoice->subtotal) }}</td>
                </tr>
                @if($invoice->tva > 0)
                <tr>
                    <td>TVA ({{ $invoice->tva }}%)</td>
                    <td class="val">{{ $formatCurrency($invoice->subtotal * $invoice->tva / 100) }}</td>
                </tr>
                @endif
                <tr class="grand-total">
                    <td>TTC</td>
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
            WE MAKE IT BOLD. MERCI DE VOTRE CONFIANCE.
        @endif
    </div>
</body>
</html>
