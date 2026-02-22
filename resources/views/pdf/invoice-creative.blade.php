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
            font-family: 'Helvetica', 'Arial', sans-serif; 
            font-size: 12px; 
            color: #27272a; 
            line-height: 1.6;
        }

        .center { text-align: center; }
        .right { text-align: right; }
        .bold { font-weight: bold; }

        .invoice-title {
            font-size: 32px;
            font-weight: 300;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: #18181b;
            margin-bottom: 5px;
        }

        .invoice-number {
            font-size: 14px;
            color: #71717a;
            letter-spacing: 1px;
            margin-bottom: 40px;
        }

        /* FLEX FALLBACK GRID */
        table.grid {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }

        .grid td {
            width: 50%;
            vertical-align: top;
        }

        .info-block {
            padding: 20px;
            background-color: #f4f4f5;
            border-radius: 4px;
        }

        .info-block.bordered {
            background-color: transparent;
            border: 1px solid #e4e4e7;
        }

        .label {
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #a1a1aa;
            margin-bottom: 10px;
        }

        .name {
            font-size: 16px;
            font-weight: bold;
            color: #18181b;
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
            border-bottom: 1px solid #18181b;
            padding: 10px;
            text-align: left;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #18181b;
        }

        table.items-table td {
            padding: 15px 10px;
            border-bottom: 1px solid #f4f4f5;
            vertical-align: middle;
        }

        .item-desc {
            font-size: 13px;
            font-weight: bold;
            color: #27272a;
        }

        .qty-val {
            background-color: #f4f4f5;
            padding: 4px 0;
            display: inline-block;
            width: 40px;
            text-align: center;
            border-radius: 4px;
            font-weight: bold;
        }

        .val-mono {
            font-family: 'Courier New', Courier, monospace;
            font-size: 13px;
            color: #3f3f46;
        }

        .totals-wrapper {
            width: 100%;
        }

        .totals-table {
            width: 300px;
            float: right;
            border-collapse: collapse;
        }

        .totals-table td {
            padding: 10px 0;
            border-bottom: 1px solid #f4f4f5;
            color: #52525b;
            font-weight: bold;
        }

        .totals-table td.val {
            text-align: right;
            color: #18181b;
            font-family: 'Courier New', Courier, monospace;
        }

        .totals-table tr.total-final td {
            border-bottom: none;
            border-top: 2px solid #18181b;
            padding-top: 15px;
            color: #18181b;
            font-size: 16px;
            text-transform: uppercase;
        }

        .totals-table tr.total-final td.val {
            font-size: 18px;
            font-weight: bold;
        }

        .signature-area {
            float: left;
            width: 40%;
            margin-top: 20px;
        }

        .footer {
            margin-top: 80px;
            padding-top: 20px;
            border-top: 1px solid #e4e4e7;
            text-align: center;
            font-size: 10px;
            color: #a1a1aa;
        }

        .clear { clear: both; }
    </style>
</head>
<body>

    @if($logoBase64)
        <div class="center" style="margin-bottom: 20px;">
            <img src="{{ $logoBase64 }}" style="max-height: 80px;">
        </div>
    @endif

    <div class="center">
        <div class="invoice-title">Facture</div>
        <div class="invoice-number">Réf : {{ $invoice->number }} | Date : {{ \Carbon\Carbon::parse($invoice->date)->format('d/m/Y') }}</div>
    </div>

    <table class="grid">
        <tr>
            <td style="padding-right: 20px;">
                <div class="info-block bordered">
                    <div class="label">Émetteur</div>
                    <div class="name">{{ $invoice->entreprise->name ?? 'Entreprise' }}</div>
                    @if($invoice->entreprise->invoice_header)
                    <div style="font-size: 11px; color: #a1a1aa; margin-top: 2px; margin-bottom: 5px; font-style: italic;">
                        {{ $invoice->entreprise->invoice_header }}
                    </div>
                    @endif
                    <div style="color: #71717a;">
                        {{ $invoice->entreprise->address ?? '' }}<br>
                        Tél : {{ $invoice->entreprise->phone ?? '' }}<br>
                        Email : {{ $invoice->entreprise->email ?? '' }}
                    </div>
                </div>
            </td>
            <td style="padding-left: 20px;">
                <div class="info-block">
                    <div class="label">Destinataire</div>
                    <div class="name">{{ $invoice->client->name ?? 'Client Inconnu' }}</div>
                    <div style="color: #71717a;">
                        @if($invoice->client->address){{ $invoice->client->address }}<br>@endif
                        @if($invoice->client->phone)Tél : {{ $invoice->client->phone }}<br>@endif
                        @if($invoice->client->email)Email : {{ $invoice->client->email }}@endif
                    </div>
                </div>
            </td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 50%;">Description</th>
                <th class="center" style="width: 15%;">Qté</th>
                <th class="right" style="width: 15%;">Prix Unit.</th>
                <th class="right" style="width: 20%;">Total HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td>
                    <div class="item-desc">{{ $item->description }}</div>
                    @if($item->product && $item->product->reference)
                        <div style="font-size: 10px; color: #a1a1aa; margin-top: 4px;">Réf : {{ $item->product->reference }}</div>
                    @endif
                </td>
                <td class="center"><span class="qty-val">{{ $item->quantity }}</span></td>
                <td class="right val-mono">{{ $formatCurrency($item->unit_price) }}</td>
                <td class="right val-mono" style="font-weight: bold; color: #18181b;">{{ $formatCurrency($item->line_total) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals-wrapper" style="page-break-inside: avoid;">
        <div class="signature-area">
            @if(isset($qrCodeBase64) && $qrCodeBase64)
                <div>
                    <img src="{{ $qrCodeBase64 }}" style="width: 100px; height: 100px;" alt="QR Code Paiement">
                    <div style="font-size: 10px; color: #a1a1aa; margin-top: 5px;">Scanner pour payer</div>
                </div>
            @endif
            @if(isset($exchangeRate) && $exchangeRate)
                <div style="margin-top: 15px; font-size: 11px; color: #a1a1aa; font-style: italic;">
                    Taux de change appliqué : 1 {{ $currencySymbol }} = {{ number_format($exchangeRate, 2, ',', ' ') }}
                </div>
            @endif
        </div>

        <table class="totals-table">
            <tr>
                <td>Sous-total HT</td>
                <td class="val">{{ $formatCurrency($invoice->subtotal) }}</td>
            </tr>
            @if($invoice->tva > 0)
            <tr>
                <td>TVA ({{ $invoice->tva }}%)</td>
                <td class="val">{{ $formatCurrency($invoice->subtotal * $invoice->tva / 100) }}</td>
            </tr>
            @endif
            <tr class="total-final">
                <td>NET À PAYER TTC</td>
                <td class="val">{{ $formatCurrency($invoice->total) }}</td>
            </tr>
        </table>
        <div class="clear"></div>
    </div>

    <div class="footer">
        @if($invoice->entreprise->invoice_footer)
            {{ $invoice->entreprise->invoice_footer }}
        @else
            <div><strong>{{ $invoice->entreprise->name ?? 'Entreprise' }}</strong></div>
            <div>Merci de votre confiance. Paiement à réception.</div>
        @endif
    </div>

</body>
</html>
