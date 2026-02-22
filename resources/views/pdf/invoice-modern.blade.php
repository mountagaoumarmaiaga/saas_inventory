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
            font-family: 'Helvetica', 'Arial', sans-serif; 
            font-size: 12px; 
            color: #1e293b; 
            line-height: 1.5;
        }

        .primary-color { color: #0284c7; }
        .bg-primary { background-color: #0284c7; color: #fff; }

        .invoice-header {
            width: 100%;
            margin-bottom: 25px;
        }

        .header-top {
            width: 100%;
            border-bottom: 3px solid #0284c7;
            padding-bottom: 20px;
        }

        .company-zone {
            width: 50%;
            vertical-align: top;
        }

        .invoice-title-zone {
            width: 50%;
            text-align: right;
            vertical-align: text-top;
        }

        .company-name {
            font-size: 24px;
            font-weight: 900;
            color: #0f172a;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: -0.5px;
        }

        .invoice-word {
            font-size: 32px;
            font-weight: 900;
            color: #0284c7;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .meta-grid {
            width: 100%;
            margin-top: 15px;
            margin-bottom: 35px;
        }

        .meta-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 15px;
            vertical-align: top;
        }

        .meta-box.client-box {
            width: 55%;
        }
        
        .meta-box.details-box {
            width: 40%;
        }

        .box-label {
            font-size: 10px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            margin-bottom: 8px;
            letter-spacing: 1px;
        }

        .client-name {
            font-size: 16px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 4px;
        }

        .detail-row {
            margin-bottom: 6px;
            font-size: 13px;
        }

        .detail-label {
            color: #64748b;
            font-weight: bold;
            display: inline-block;
            width: 80px;
        }

        .detail-value {
            color: #0f172a;
            font-weight: bold;
            font-family: monospace;
            font-size: 14px;
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
            background-color: #0f172a;
            color: #ffffff;
            padding: 12px 10px;
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 1px;
        }

        table.items-table td {
            padding: 12px 10px;
            border-bottom: 1px solid #e2e8f0;
        }

        table.items-table tbody tr:nth-child(even) {
            background-color: #f8fafc;
        }

        .item-name {
            font-weight: bold;
            color: #0f172a;
            font-size: 13px;
        }

        .item-ref {
            font-size: 10px;
            color: #64748b;
            font-family: monospace;
            margin-top: 3px;
        }

        .qty-badge {
            background-color: #e0f2fe;
            color: #0369a1;
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: bold;
        }

        .price-val {
            font-family: monospace;
            font-size: 13px;
        }

        .text-right { text-align: right; }
        .text-center { text-align: center; }

        .totals-section {
            width: 100%;
        }

        .totals-box {
            width: 350px;
            float: right;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
        }

        .totals-table {
            width: 100%;
            border-collapse: collapse;
        }

        .totals-table td {
            padding: 10px 15px;
            font-size: 13px;
            color: #475569;
            font-weight: bold;
        }

        .totals-table td.val {
            text-align: right;
            color: #0f172a;
            font-family: monospace;
            font-size: 14px;
        }

        .totals-table tr.grand-total {
            background-color: #0284c7;
        }

        .totals-table tr.grand-total td {
            color: #ffffff;
            font-size: 16px;
        }

        .totals-table tr.grand-total td.val {
            color: #ffffff;
            font-size: 18px;
        }

        .notes {
            margin-top: 20px;
            width: 50%;
            font-size: 11px;
            color: #64748b;
            padding: 10px;
            border-left: 3px solid #0284c7;
            background-color: #f8fafc;
        }

        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 10px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
        }

        .clear { clear: both; }
    </style>
</head>
<body>
    <table class="header-top">
        <tr>
            <td class="company-zone">
                @if($logoBase64)
                    <img src="{{ $logoBase64 }}" style="max-height: 60px; margin-bottom: 15px;">
                @endif
                <div class="company-name">{{ $invoice->entreprise->name ?? 'Entreprise' }}</div>
                @if($invoice->entreprise->invoice_header)
                <div style="font-size: 11px; color: #64748b; margin-bottom: 10px; font-style: italic;">
                    {{ $invoice->entreprise->invoice_header }}
                </div>
                @endif
                <div style="color: #475569; font-size: 12px; line-height: 1.4;">
                    {{ $invoice->entreprise->address ?? '' }}<br>
                    Tél: {{ $invoice->entreprise->phone ?? '' }}<br>
                    Email: {{ $invoice->entreprise->email ?? '' }}
                </div>
            </td>
            <td class="invoice-title-zone">
                <div class="invoice-word">FACTURE</div>
                <div style="font-size: 14px; color: #64748b; margin-top: 5px;">Technologie & Services IT</div>
            </td>
        </tr>
    </table>

    <table class="meta-grid">
        <tr>
            <td class="meta-box client-box">
                <div class="box-label">Facturé à</div>
                <div class="client-name">{{ $invoice->client->name ?? 'Client Inconnu' }}</div>
                <div style="color: #475569; font-size: 13px; line-height: 1.4;">
                    @if($invoice->client->address){{ $invoice->client->address }}<br>@endif
                    @if($invoice->client->phone)Tél: {{ $invoice->client->phone }}<br>@endif
                    @if($invoice->client->email)Email: {{ $invoice->client->email }}@endif
                </div>
            </td>
            <td style="width: 5%;"></td>
            <td class="meta-box details-box">
                <div class="box-label">Détails de la transaction</div>
                <div class="detail-row">
                    <span class="detail-label">N° Facture</span>
                    <span class="detail-value">{{ $invoice->number }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date</span>
                    <span class="detail-value">{{ \Carbon\Carbon::parse($invoice->date)->format('d/m/Y') }}</span>
                </div>
                @if($invoice->total > 0)
                <div class="detail-row" style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                    <span class="detail-label" style="color: #0284c7;">Montant Dû</span>
                    <span class="detail-value" style="color: #0284c7; font-size: 16px;">{{ $formatCurrency($invoice->total) }}</span>
                </div>
                @endif
            </td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 45%;">Description (Matériel / Licence / Service)</th>
                <th class="text-center" style="width: 15%;">Quantité</th>
                <th class="text-right" style="width: 20%;">Prix Unitaire</th>
                <th class="text-right" style="width: 20%;">Total HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td>
                    <div class="item-name">{{ $item->description }}</div>
                    @if($item->product && $item->product->reference)
                        <div class="item-ref">S/N - {{ $item->product->reference }}</div>
                    @endif
                </td>
                <td class="text-center">
                    <span class="qty-badge">{{ $item->quantity }}</span>
                </td>
                <td class="text-right price-val">{{ $formatCurrency($item->unit_price) }}</td>
                <td class="text-right price-val" style="color: #0f172a; font-weight: bold;">{{ $formatCurrency($item->line_total) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals-section" style="page-break-inside: avoid;">
        <div style="float: left; width: 40%;">
            @if(isset($qrCodeBase64) && $qrCodeBase64)
                <div style="margin-top: 10px;">
                    <img src="{{ $qrCodeBase64 }}" style="width: 100px; height: 100px;" alt="QR Code Paiement">
                    <div style="font-size: 10px; color: #64748b; margin-top: 5px;">Scanner pour payer</div>
                </div>
            @endif
            @if(isset($exchangeRate) && $exchangeRate)
                <div style="margin-top: 15px; font-size: 11px; color: #64748b; font-style: italic;">
                    Taux de change appliqué : 1 {{ $currencySymbol }} = {{ number_format($exchangeRate, 2, ',', ' ') }}
                </div>
            @endif
        </div>

        <div class="totals-box">
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
            <div><strong>{{ $invoice->entreprise->name ?? 'Entreprise' }}</strong></div>
            <div>Matériel garanti selon les conditions constructeur. Les licences logicielles sont non-remboursables.</div>
        @endif
    </div>
</body>
</html>
