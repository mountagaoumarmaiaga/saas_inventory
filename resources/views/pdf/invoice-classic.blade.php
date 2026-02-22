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
            font-family: 'Times New Roman', Times, serif; 
            font-size: 13px; 
            color: #1e293b; 
            line-height: 1.6;
        }

        .header-table {
            width: 100%;
            border-bottom: 2px solid #1e3a8a;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .header-left {
            width: 60%;
            vertical-align: top;
        }

        .header-right {
            width: 40%;
            text-align: right;
            vertical-align: top;
        }

        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .invoice-title {
            font-size: 28px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 10px;
            letter-spacing: 2px;
        }

        .invoice-meta {
            font-size: 14px;
            margin-bottom: 3px;
        }

        .info-table {
            width: 100%;
            margin-bottom: 40px;
        }

        .info-table td {
            width: 50%;
            vertical-align: top;
        }

        .box-title {
            font-weight: bold;
            font-size: 11px;
            text-transform: uppercase;
            color: #64748b;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 5px;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }

        .client-name {
            font-size: 16px;
            font-weight: bold;
            color: #0f172a;
        }

        table.items {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
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
            background-color: #f8fafc;
            color: #1e3a8a;
            padding: 12px 8px;
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
            border-top: 2px solid #1e3a8a;
            border-bottom: 2px solid #1e3a8a;
            letter-spacing: 1px;
        }

        table.items td {
            padding: 12px 8px;
            border-bottom: 1px solid #e2e8f0;
        }

        .text-right { text-align: right; }
        .text-center { text-align: center; }

        .totals-table {
            width: 350px;
            float: right;
            border-collapse: collapse;
        }

        .totals-table td {
            padding: 8px 12px;
            font-size: 13px;
        }

        .totals-table tr.total-row td {
            border-top: 2px solid #1e3a8a;
            border-bottom: 2px double #1e3a8a;
            font-weight: bold;
            font-size: 16px;
            color: #1e3a8a;
        }

        .footer {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #cbd5e1;
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
                    <img src="{{ $logoBase64 }}" style="max-height: 70px; margin-bottom: 15px;">
                @endif
                <div class="company-name">{{ $invoice->entreprise->name ?? 'Entreprise' }}</div>
                @if($invoice->entreprise->invoice_header)
                <div style="color: #475569; margin-bottom: 10px; font-style: italic;">
                    {{ $invoice->entreprise->invoice_header }}
                </div>
                @endif
                <div>
                    {{ $invoice->entreprise->address ?? '' }}<br>
                    Tél : {{ $invoice->entreprise->phone ?? '' }}<br>
                    Email : {{ $invoice->entreprise->email ?? '' }}
                </div>
            </td>
            <td class="header-right">
                <div class="invoice-title">FACTURE</div>
                <div class="invoice-meta"><strong>N° Facture :</strong> {{ $invoice->number }}</div>
                <div class="invoice-meta"><strong>Date :</strong> {{ \Carbon\Carbon::parse($invoice->date)->format('d/m/Y') }}</div>
            </td>
        </tr>
    </table>

    <table class="info-table">
        <tr>
            <td style="padding-right: 40px;">
                <div class="box-title">INFORMATIONS DE FACTURATION</div>
                <div class="client-name">{{ $invoice->client->name ?? 'Client Inconnu' }}</div>
                <div style="margin-top: 5px;">
                    @if($invoice->client->address){{ $invoice->client->address }}<br>@endif
                    @if($invoice->client->phone)Tél : {{ $invoice->client->phone }}<br>@endif
                    @if($invoice->client->email)Email : {{ $invoice->client->email }}@endif
                </div>
            </td>
            <td>
            </td>
        </tr>
    </table>

    <table class="items">
        <thead>
            <tr>
                <th>Désignation des Prestations / Produits</th>
                <th class="text-center" style="width: 80px;">Quantité</th>
                <th class="text-right" style="width: 120px;">Prix U. HT</th>
                <th class="text-right" style="width: 120px;">Montant HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td>
                    <strong>{{ $item->description }}</strong>
                    @if($item->product && $item->product->reference)
                        <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Réf : {{ $item->product->reference }}</div>
                    @endif
                </td>
                <td class="text-center">{{ $item->quantity }}</td>
                <td class="text-right">{{ $formatCurrency($item->unit_price) }}</td>
                <td class="text-right">{{ $formatCurrency($item->line_total) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <table style="width: 100%; margin-bottom: 30px; page-break-inside: avoid;">
        <tr>
            <td style="width: 60%; vertical-align: bottom;">
                @if(isset($qrCodeBase64) && $qrCodeBase64)
                    <div style="margin-top: 20px;">
                        <img src="{{ $qrCodeBase64 }}" style="width: 100px; height: 100px;" alt="QR Code Paiement">
                        <div style="font-size: 10px; color: #64748b; margin-top: 5px;">Scanner pour payer</div>
                    </div>
                @endif
                @if(isset($exchangeRate) && $exchangeRate)
                    <div style="margin-top: 10px; font-size: 11px; color: #64748b; font-style: italic;">
                        Taux de change appliqué : 1 {{ $currencySymbol }} = {{ number_format($exchangeRate, 2, ',', ' ') }}
                    </div>
                @endif
            </td>
            <td style="width: 40%; vertical-align: top;">
                <table class="totals-table" style="width: 100%;">
                    <tr>
                        <td>Total HT</td>
                        <td class="text-right">{{ $formatCurrency($invoice->subtotal) }}</td>
                    </tr>
                    @if($invoice->tva > 0)
                    <tr>
                        <td>TVA ({{ $invoice->tva }}%)</td>
                        <td class="text-right">{{ $formatCurrency($invoice->subtotal * $invoice->tva / 100) }}</td>
                    </tr>
                    @endif
                    <tr class="total-row">
                        <td>NET À PAYER TTC</td>
                        <td class="text-right">{{ $formatCurrency($invoice->total) }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <div class="clear"></div>

    <div class="footer">
        @if($invoice->entreprise->invoice_footer)
            {{ $invoice->entreprise->invoice_footer }}
        @else
            <div><strong>{{ $invoice->entreprise->name ?? 'Entreprise' }}</strong></div>
            <div>{{ $invoice->entreprise->address ?? '' }} — {{ $invoice->entreprise->email ?? '' }}</div>
            <div>En cas de retard de paiement, une pénalité égale à 3 fois le taux d'intérêt légal sera appliquée.</div>
        @endif
    </div>
</body>
</html>
