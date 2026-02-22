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
            font-family: 'Helvetica', 'Arial', sans-serif; 
            font-size: 12px; 
            color: #27272a; 
            line-height: 1.5;
            padding: 40px;
        }

        .stripe {
            position: absolute;
            top: 0;
            left: 0;
            width: 15px;
            height: 100%;
            background-color: #facc15; /* Yellow 400 */
            z-index: -1;
        }

        .header-bar {
            background-color: #27272a;
            color: white;
            padding: 20px 30px;
            margin: -40px -40px 30px -40px;
            width: calc(100% + 80px);
        }

        .header-table { width: 100%; border-collapse: collapse; }
        .header-table td { vertical-align: middle; }

        .company-name {
            font-size: 28px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #facc15;
            margin-bottom: 5px;
        }

        .invoice-title {
            font-size: 34px;
            font-weight: 900;
            text-transform: uppercase;
            text-align: right;
            letter-spacing: 2px;
        }

        .info-grid {
            width: 100%;
            margin-bottom: 30px;
            border-collapse: collapse;
        }

        .info-grid td {
            width: 50%;
            vertical-align: top;
            padding: 20px;
            background-color: #f4f4f5;
        }

        .info-grid td.left-cell {
            border-right: 5px solid white;
            border-left: 4px solid #facc15;
        }

        .info-grid td.right-cell {
            border-left: 5px solid white;
            border-right: 4px solid #27272a;
        }

        .label {
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            color: #71717a;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }

        .heavy-text {
            font-size: 16px;
            font-weight: 900;
            color: #18181b;
            margin-bottom: 5px;
            text-transform: uppercase;
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
            background-color: #27272a;
            color: white;
            padding: 12px 10px;
            text-align: left;
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: 2px solid #27272a;
        }

        table.items-table td {
            padding: 12px 10px;
            border: 2px solid #e4e4e7;
            vertical-align: middle;
        }

        .text-right { text-align: right; }
        .text-center { text-align: center; }

        .qty-badge {
            background-color: #facc15;
            color: #27272a;
            font-weight: 900;
            padding: 4px 8px;
            display: inline-block;
        }

        .val-mono {
            font-family: monospace;
            font-size: 14px;
            font-weight: bold;
        }

        .totals-wrapper { width: 100%; page-break-inside: avoid; }
        .totals-left { float: left; width: 45%; }
        .totals-right { float: right; width: 45%; }

        table.totals-table {
            width: 100%;
            border-collapse: collapse;
        }

        table.totals-table td {
            padding: 10px 15px;
            border: 2px solid #e4e4e7;
            font-size: 13px;
            font-weight: bold;
        }

        table.totals-table td.val {
            text-align: right;
            background-color: #f4f4f5;
        }

        .grand-total td {
            background-color: #27272a !important;
            color: white !important;
            border-color: #27272a !important;
            font-size: 16px !important;
            text-transform: uppercase;
        }

        .grand-total td.val {
            color: #facc15 !important;
            font-size: 18px !important;
        }

        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 10px;
            color: #71717a;
            font-weight: bold;
            text-transform: uppercase;
            padding-top: 20px;
            border-top: 4px solid #facc15;
        }

        .clear { clear: both; }
    </style>
</head>
<body>
    <div class="header-bar">
        <table class="header-table">
            <tr>
                <td style="width: 50%;">
                    @if($logoBase64)
                        <img src="{{ $logoBase64 }}" style="max-height: 50px; margin-bottom: 10px; background-color: white; padding: 5px;">
                    @endif
                    <div class="company-name">{{ $invoice->entreprise->name ?? 'INDUSTRIE & BTP' }}</div>
                    @if($invoice->entreprise->invoice_header)
                    <div style="font-size: 11px; color: #a1a1aa; margin-top: 2px;">
                        {{ $invoice->entreprise->invoice_header }}
                    </div>
                    @endif
                </td>
                <td style="width: 50%; text-align: right;">
                    <div class="invoice-title">FACTURE</div>
                    <div style="font-size: 14px; font-weight: bold; margin-top: 5px; color: #facc15;">N° {{ $invoice->number }}</div>
                    <div style="font-size: 12px; color: #a1a1aa;">DATE : {{ \Carbon\Carbon::parse($invoice->date)->format('d/m/Y') }}</div>
                </td>
            </tr>
        </table>
    </div>

    <table class="info-grid">
        <tr>
            <td class="left-cell">
                <div class="label">ENTREPRENEUR / ÉMETTEUR</div>
                <div style="color: #3f3f46; line-height: 1.5; font-weight: bold;">
                    {{ $invoice->entreprise->address ?? '' }}<br>
                    TÉL : {{ $invoice->entreprise->phone ?? '' }}<br>
                    EMAIL : {{ $invoice->entreprise->email ?? '' }}
                </div>
            </td>
            <td class="right-cell">
                <div class="label">MAÎTRE D'OUVRAGE / CLIENT</div>
                <div class="heavy-text">{{ $invoice->client->name ?? 'Client Inconnu' }}</div>
                <div style="color: #3f3f46; line-height: 1.5; font-weight: bold;">
                    @if($invoice->client->address){{ $invoice->client->address }}<br>@endif
                    @if($invoice->client->phone)TÉL : {{ $invoice->client->phone }}<br>@endif
                    @if($invoice->client->email)EMAIL : {{ $invoice->client->email }}@endif
                </div>
            </td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 10%; text-align: center;">QTÉ</th>
                <th style="width: 50%;">DÉTAIL MATÉRIAUX / MAIN D'ŒUVRE</th>
                <th class="text-right" style="width: 20%;">PRIX UNIT. HT</th>
                <th class="text-right" style="width: 20%;">TOTAL HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td class="text-center">
                    <span class="qty-badge">{{ $item->quantity }}</span>
                </td>
                <td>
                    <div style="font-weight: 900; font-size: 13px; text-transform: uppercase;">{{ $item->description }}</div>
                    @if($item->product && $item->product->reference)
                        <div style="font-size: 11px; color: #71717a; margin-top: 4px; font-weight: bold;">RÉF ARTICLE : {{ $item->product->reference }}</div>
                    @endif
                </td>
                <td class="text-right val-mono" style="color: #52525b;">{{ $formatCurrency($item->unit_price) }}</td>
                <td class="text-right val-mono">{{ $formatCurrency($item->line_total) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals-wrapper">
        <div class="totals-left">
            @if(isset($qrCodeBase64) && $qrCodeBase64)
                <div style="margin-top: 10px; background-color: #f4f4f5; padding: 10px; display: inline-block; border: 2px solid #e4e4e7;">
                    <img src="{{ $qrCodeBase64 }}" style="width: 90px; height: 90px;" alt="QR Code Paiement">
                    <div style="font-size: 10px; font-weight: 900; color: #27272a; margin-top: 5px; text-align: center;">SCAN PAY</div>
                </div>
            @endif
            @if(isset($exchangeRate) && $exchangeRate)
                <div style="margin-top: 15px; font-size: 11px; color: #71717a; font-weight: bold; background-color: #f4f4f5; padding: 10px; border-left: 4px solid #facc15;">
                    TAUX DE CHANGE : 1 {{ $currencySymbol }} = {{ number_format($exchangeRate, 2, ',', ' ') }}
                </div>
            @endif
        </div>
        
        <div class="totals-right">
            <table class="totals-table">
                <tr>
                    <td>TOTAL MATÉRIEL & MO HT</td>
                    <td class="val val-mono">{{ $formatCurrency($invoice->subtotal) }}</td>
                </tr>
                @if($invoice->tva > 0)
                <tr>
                    <td>TVA ({{ $invoice->tva }}%)</td>
                    <td class="val val-mono">{{ $formatCurrency($invoice->subtotal * $invoice->tva / 100) }}</td>
                </tr>
                @endif
                <tr class="grand-total">
                    <td>TOTAL À PAYER TTC</td>
                    <td class="val val-mono">{{ $formatCurrency($invoice->total) }}</td>
                </tr>
            </table>
        </div>
        <div class="clear"></div>
    </div>

    <div class="footer">
        @if($invoice->entreprise->invoice_footer)
            {{ $invoice->entreprise->invoice_footer }}
        @else
            <div>CHANTIER RÉCEPTIONNÉ SOUS RÉSERVE DE NOTIFICATION SOUS 8 JOURS.</div>
            <div style="margin-top: 5px; color: #a1a1aa;">{{ $invoice->entreprise->name ?? 'INDUSTRIE & BTP' }}</div>
        @endif
    </div>
</body>
</html>
