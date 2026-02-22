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
        @page { margin: 30px 40px; }
        body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            font-size: 12px; 
            color: #1e293b; 
            line-height: 1.4;
        }

        .accent { background-color: #ea580c; color: white; } /* Orange 600 */
        .accent-text { color: #ea580c; }
        .dark-bg { background-color: #1e293b; color: white; }

        .banner {
            width: 100%;
            background-color: #1e293b;
            color: #ffffff;
            padding: 30px;
            margin-top: -30px;
            margin-left: -40px;
            margin-right: -40px;
            width: calc(100% + 40px);
            margin-bottom: 30px;
        }

        table.banner-table {
            width: 100%;
            border-collapse: collapse;
        }

        .b-left { width: 50%; vertical-align: middle; }
        .b-right { width: 50%; text-align: right; vertical-align: middle; }

        .company-name {
            font-size: 28px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }

        .doc-type {
            font-size: 34px;
            font-weight: 900;
            color: #ea580c;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .header-content {
            width: 100%;
            margin-bottom: 30px;
        }

        table.info-split {
            width: 100%;
            border-collapse: collapse;
        }

        .info-col {
            width: 33.33%;
            vertical-align: top;
            padding: 0 10px;
        }

        .info-col.first { padding-left: 0; }
        .info-col.last { padding-right: 0; }

        .info-box {
            border-top: 4px solid #1e293b;
            padding-top: 10px;
        }

        .info-box.orange {
            border-top: 4px solid #ea580c;
        }

        .box-title {
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            color: #64748b;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }

        .heavy-text {
            font-weight: 900;
            font-size: 15px;
            color: #0f172a;
            margin-bottom: 4px;
        }

        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            border: 2px solid #e2e8f0;
            page-break-inside: auto;
        }

        table.data-table tr {
            page-break-inside: avoid;
            page-break-after: auto;
        }

        table.data-table thead {
            display: table-header-group;
        }

        table.data-table th {
            background-color: #1e293b;
            color: #ffffff;
            padding: 12px 10px;
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 0.5px;
            border: 1px solid #1e293b;
        }

        table.data-table td {
            padding: 12px 10px;
            border: 1px solid #e2e8f0;
        }

        table.data-table tbody tr:nth-child(even) {
            background-color: #f8fafc;
        }

        .qty-strong {
            font-weight: 900;
            font-size: 14px;
            text-align: center;
        }

        .text-right { text-align: right; }
        .text-center { text-align: center; }

        .amount-val {
            font-family: monospace;
            font-size: 14px;
            font-weight: bold;
            color: #0f172a;
        }

        .summary-wrapper {
            width: 100%;
        }

        .summary-table {
            width: 350px;
            float: right;
            border-collapse: collapse;
            border: 2px solid #1e293b;
        }

        .summary-table td {
            padding: 10px 15px;
            font-weight: bold;
            font-size: 13px;
        }

        .summary-table td.val {
            text-align: right;
            font-family: monospace;
            font-size: 15px;
        }

        .summary-table tr {
            border-bottom: 1px solid #e2e8f0;
        }

        .summary-table tr.total-row {
            background-color: #ea580c;
            color: #ffffff;
            border-bottom: none;
        }

        .summary-table tr.total-row td {
            font-size: 16px;
            font-weight: 900;
            text-transform: uppercase;
        }

        .summary-table tr.total-row td.val {
            font-size: 18px;
        }

        .terms {
            margin-top: 30px;
            width: 50%;
            padding: 15px;
            background-color: #f8fafc;
            border-left: 4px solid #1e293b;
            float: left;
        }

        .footer {
            margin-top: 60px;
            text-align: center;
            font-size: 10px;
            color: #64748b;
            border-top: 2px solid #e2e8f0;
            padding-top: 15px;
        }

        .clear { clear: both; }
    </style>
</head>
<body>
    <div class="banner">
        <table class="banner-table">
            <tr>
                <td class="b-left">
                    <div class="company-name">{{ $invoice->entreprise->name ?? 'Logistique & Transport' }}</div>
                    <div style="color: #cbd5e1;">NINEA / SIRET : {{ $invoice->entreprise->ninea ?? 'Non renseigné' }}</div>
                </td>
                <td class="b-right">
                    <div class="doc-type">FACTURE</div>
                    <div style="font-size: 16px; font-weight: bold; margin-top: 5px;">RÉF : {{ $invoice->number }}</div>
                </td>
            </tr>
        </table>
    </div>

    @if($logoBase64)
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="{{ $logoBase64 }}" style="max-height: 50px;">
        </div>
    @endif

    <div class="header-content">
        <table class="info-split">
            <tr>
                <td class="info-col first">
                    <div class="info-box">
                        <div class="box-title">Expéditeur / Transporteur</div>
                        <div class="heavy-text">{{ $invoice->entreprise->name ?? 'Entreprise' }}</div>
                        @if($invoice->entreprise->invoice_header)
                        <div style="font-size: 11px; color: #64748b; margin-top: 2px; margin-bottom: 5px; font-style: italic;">
                            {{ $invoice->entreprise->invoice_header }}
                        </div>
                        @endif
                        <div style="color: #475569;">
                            {{ $invoice->entreprise->address ?? '' }}<br>
                            Tél : {{ $invoice->entreprise->phone ?? '' }}<br>
                            Email : {{ $invoice->entreprise->email ?? '' }}
                        </div>
                    </div>
                </td>
                <td class="info-col">
                    <div class="info-box orange">
                        <div class="box-title accent-text">Destinataire / Client</div>
                        <div class="heavy-text">{{ $invoice->client->name ?? 'Client Inconnu' }}</div>
                        <div style="color: #475569;">
                            @if($invoice->client->address){{ $invoice->client->address }}<br>@endif
                            @if($invoice->client->phone)Tél : {{ $invoice->client->phone }}<br>@endif
                            @if($invoice->client->email)Email : {{ $invoice->client->email }}@endif
                        </div>
                    </div>
                </td>
                <td class="info-col last">
                    <div class="info-box">
                        <div class="box-title">Détails de l'expédition</div>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 4px 0; color: #64748b; font-weight: bold;">Date :</td>
                                <td style="text-align: right; font-weight: 900;">{{ \Carbon\Carbon::parse($invoice->date)->format('d/m/Y') }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; color: #64748b; font-weight: bold;">Échéance :</td>
                                <td style="text-align: right; font-weight: 900; color: #ea580c;">{{ \Carbon\Carbon::parse($invoice->date)->addDays(30)->format('d/m/Y') }}</td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <table class="data-table">
        <thead>
            <tr>
                <th style="width: 15%; text-align: center;">Colis / Palettes</th>
                <th style="width: 45%;">Description / Itinéraire / Marchandise</th>
                <th style="width: 20%; text-align: right;">Prix Unitaire</th>
                <th style="width: 20%; text-align: right;">Total HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td class="qty-strong accent-text">{{ $item->quantity }}</td>
                <td>
                    <div style="font-weight: bold; color: #0f172a; font-size: 13px;">{{ $item->description }}</div>
                    @if($item->product && $item->product->reference)
                        <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Code Suivi / BL : {{ $item->product->reference }}</div>
                    @endif
                </td>
                <td class="text-right amount-val" style="color: #64748b;">{{ $formatCurrency($item->unit_price) }}</td>
                <td class="text-right amount-val">{{ $formatCurrency($item->line_total) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary-wrapper" style="page-break-inside: avoid;">
        <div class="terms">
            <div class="box-title">Conditions de transport & Notes</div>
            <div style="font-size: 11px; color: #475569;">
                Les marchandises voyagent aux risques et périls du destinataire. Toute réclamation doit être formulée sous 48h après livraison.
            </div>
            @if(isset($qrCodeBase64) && $qrCodeBase64)
                <div style="margin-top: 15px;">
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

        <table class="summary-table">
            <tr>
                <td>Total Marchandise HT</td>
                <td class="val text-right">{{ $formatCurrency($invoice->subtotal) }}</td>
            </tr>
            @if($invoice->tva > 0)
            <tr>
                <td>TVA ({{ $invoice->tva }}%)</td>
                <td class="val text-right">{{ $formatCurrency($invoice->subtotal * $invoice->tva / 100) }}</td>
            </tr>
            @endif
            <tr class="total-row">
                <td>NET À PAYER TTC</td>
                <td class="val text-right">{{ $formatCurrency($invoice->total) }}</td>
            </tr>
        </table>
        <div class="clear"></div>
    </div>

    <div class="footer">
        @if($invoice->entreprise->invoice_footer)
            {{ $invoice->entreprise->invoice_footer }}
        @else
            <div><strong>{{ $invoice->entreprise->name ?? 'Entreprise' }}</strong></div>
            <div>RIB: SN11 XXXX XXXX XXXX XXXX — Merci de préciser le numéro de facture lors de votre virement.</div>
        @endif
    </div>
</body>
</html>
