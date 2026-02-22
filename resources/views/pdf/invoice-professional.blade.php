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
            font-size: 13px; 
            color: #3f51b5; /* Fallback for safe rendering, will use mostly slate/teal */
            color: #334155;
            line-height: 1.5;
        }

        /* Essential Pharmacy colors: #0f766e (Teal 700), #f0fdfa (Teal 50) */
        .color-primary { color: #0f766e; }
        .bg-primary-light { background-color: #f0fdfa; }
        .border-primary { border-color: #0f766e; }

        .header-table {
            width: 100%;
            margin-bottom: 40px;
        }

        .header-left {
            width: 50%;
        }

        .header-right {
            width: 50%;
            text-align: right;
        }

        .company-name {
            font-size: 26px;
            font-weight: 800;
            color: #0f766e;
            margin-bottom: 5px;
        }

        .invoice-box {
            background-color: #0f766e;
            color: #ffffff;
            padding: 15px 20px;
            border-radius: 8px;
            display: inline-block;
            text-align: left;
        }

        .invoice-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }

        .divider {
            border-bottom: 2px solid #e2e8f0;
            margin-bottom: 30px;
        }

        .info-table {
            width: 100%;
            margin-bottom: 30px;
            border-collapse: separate;
            border-spacing: 20px 0;
            margin-left: -20px;
            margin-right: -20px;
        }

        .info-cell {
            vertical-align: top;
            width: 50%;
            padding: 20px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background-color: #f8fafc;
        }

        .info-cell.client {
            background-color: #f0fdfa;
            border-color: #ccfbf1;
        }

        .cell-label {
            font-size: 11px;
            font-weight: bold;
            color: #64748b;
            text-transform: uppercase;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }
        
        .client .cell-label {
            color: #0f766e;
        }

        table.items {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            page-break-inside: auto;
        }

        table.items tr {
            page-break-inside: avoid;
            page-break-after: auto;
        }

        table.items thead {
            display: table-header-group;
        }

        table.items th {
            color: #0f766e;
            padding: 12px;
            text-align: left;
            font-size: 12px;
            border-bottom: 2px solid #0f766e;
        }

        table.items td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
        }

        /* Zebra striping for readability */
        table.items tbody tr:nth-child(even) {
            background-color: #f8fafc;
        }

        .text-right { text-align: right; }
        .text-center { text-align: center; }

        .totals-container {
            width: 400px;
            float: right;
            background-color: #f0fdfa;
            border-radius: 8px;
            padding: 20px;
            border: 1px solid #ccfbf1;
        }

        .totals-table {
            width: 100%;
            border-collapse: collapse;
        }

        .totals-table td {
            padding: 8px 0;
            font-size: 14px;
        }

        .totals-table tr.total-row td {
            border-top: 2px solid #0f766e;
            padding-top: 15px;
            margin-top: 5px;
            font-weight: 900;
            font-size: 18px;
            color: #0f766e;
        }

        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 11px;
            color: #64748b;
        }

        .clear { clear: both; }
    </style>
</head>
<body>
    <table class="header-table">
        <tr>
            <td class="header-left">
                @if($logoBase64)
                    <img src="{{ $logoBase64 }}" style="max-height: 80px; margin-bottom: 10px;">
                @endif
                <div class="company-name">{{ $invoice->entreprise->name ?? 'Entreprise' }}</div>
                @if($invoice->entreprise->invoice_header)
                <div style="font-size: 11px; color: #64748b; margin-top: 5px; font-style: italic;">
                    {{ $invoice->entreprise->invoice_header }}
                </div>
                @endif
            </td>
            <td class="header-right">
                <div class="invoice-box">
                    <div class="invoice-title">FACTURE</div>
                    <div><strong>N° :</strong> {{ $invoice->number }}</div>
                    <div><strong>Date :</strong> {{ \Carbon\Carbon::parse($invoice->date)->format('d/m/Y') }}</div>
                </div>
            </td>
        </tr>
    </table>

    <div class="divider"></div>

    <table class="info-table">
        <tr>
            <td class="info-cell">
                <div class="cell-label">Émetteur</div>
                <div style="font-weight: bold; font-size: 14px; color: #0f172a; margin-bottom: 5px;">{{ $invoice->entreprise->name ?? 'Entreprise' }}</div>
                <div>{{ $invoice->entreprise->address ?? '' }}</div>
                <div>{{ $invoice->entreprise->phone ?? '' }}</div>
                <div style="color: #0f766e;">{{ $invoice->entreprise->email ?? '' }}</div>
            </td>
            <td class="info-cell client">
                <div class="cell-label">Client</div>
                <div style="font-weight: bold; font-size: 16px; color: #0f766e; margin-bottom: 5px;">{{ $invoice->client->name ?? 'Client Inconnu' }}</div>
                <div>{{ $invoice->client->address ?? '' }}</div>
                <div>{{ $invoice->client->phone ?? '' }}</div>
                <div>{{ $invoice->client->email ?? '' }}</div>
            </td>
        </tr>
    </table>



    <table class="items">
        <thead>
            <tr>
                <th>Médicaments / Soins / Appareillages</th>
                <th class="text-center" style="width: 80px;">Quantité</th>
                <th class="text-right" style="width: 100px;">Prix U. HT</th>
                <th class="text-right" style="width: 120px;">Montant HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td>
                    <strong style="color: #0f172a;">{{ $item->description }}</strong>
                    @if($item->product && $item->product->reference)
                        <div style="font-size: 11px; color: #64748b; margin-top: 4px;">CIP/Réf : {{ $item->product->reference }}</div>
                    @endif
                </td>
                <td class="text-center" style="font-weight: bold;">{{ $item->quantity }}</td>
                <td class="text-right">{{ $formatCurrency($item->unit_price) }}</td>
                <td class="text-right" style="font-weight: bold; color: #0f766e;">{{ $formatCurrency($item->line_total) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div style="page-break-inside: avoid; width: 100%;">
        <div style="float: left; width: 45%;">
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

        <div class="totals-container" style="float: right;">
            <table class="totals-table">
                <tr>
                    <td style="color: #475569;">Total Hors Taxes</td>
                    <td class="text-right" style="font-weight: bold;">{{ $formatCurrency($invoice->subtotal) }}</td>
                </tr>
                @if($invoice->tva > 0)
                <tr>
                    <td style="color: #475569;">TVA ({{ $invoice->tva }}%)</td>
                    <td class="text-right" style="font-weight: bold;">{{ $formatCurrency($invoice->subtotal * $invoice->tva / 100) }}</td>
                </tr>
                @endif
                <tr class="total-row">
                    <td>TOTAL À RÉGLER TTC</td>
                    <td class="text-right">{{ $formatCurrency($invoice->total) }}</td>
                </tr>
            </table>
        </div>
        <div class="clear"></div>
    </div>

    <div class="footer">
        @if($invoice->entreprise->invoice_footer)
            {{ $invoice->entreprise->invoice_footer }}
        @else
            <div>Merci de votre confiance. Prenez soin de vous.</div>
            <div style="margin-top: 5px;">{{ $invoice->entreprise->name ?? 'Pharmacie' }} - {{ $invoice->entreprise->phone ?? '' }}</div>
        @endif
    </div>
</body>
</html>
