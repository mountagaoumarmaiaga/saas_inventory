@php
$entrepriseRecord = $quote->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#1e3a8a';
@endphp
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Facture {{ $quote->number }}</title>
    <style>
        @page { margin: 0px; }
        * { box-sizing: border-box; }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 12px;
            color: #222;
            margin: 0;
            padding: 0;
            line-height: 1.5;
        }

        /* ── HEADER BAND ── */
        .header-band {
            background-color: #dde3ee; /* light blue-grey as in the image */
            padding: 40px 50px 30px 50px;
        }
        .header-inner {
            width: 100%;
        }
        .header-inner td {
            vertical-align: middle;
        }
        .facture-title {
            font-size: 60px;
            font-weight: 900;
            color: {{ $primaryColor }};
            letter-spacing: 2px;
            line-height: 1;
            text-transform: uppercase;
            margin: 0;
        }
        .header-meta {
            font-size: 11px;
            font-weight: bold;
            color: {{ $primaryColor }};
            text-transform: uppercase;
            margin-top: 10px;
            line-height: 1.8;
        }
        .header-meta .number {
            font-size: 13px;
        }
        .logo-cell {
            text-align: right;
            vertical-align: top;
            padding-top: 5px;
        }
        .logo-cell img {
            max-height: 110px;
            max-width: 220px;
        }
        .company-name-fallback {
            color: {{ $primaryColor }};
            font-size: 28px;
            font-weight: bold;
            font-style: italic;
        }

        /* ── BOTTOM BLUE BAND ── */
        .bottom-band {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 18px;
            background-color: {{ $primaryColor }};
        }

        /* ── BODY ── */
        .body-wrapper {
            padding: 30px 50px 50px 50px;
        }

        /* Address section */
        .address-section {
            width: 100%;
            margin-bottom: 30px;
        }
        .address-section td {
            vertical-align: top;
            width: 50%;
        }
        .addr-label {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 6px;
            color: #222;
        }
        .addr-name {
            font-weight: bold;
            font-size: 13px;
        }
        .addr-right {
            text-align: right;
        }

        /* Items Table */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .items-table thead tr {
            background-color: {{ $primaryColor }};
            color: #ffffff;
        }
        .items-table th {
            padding: 12px 14px;
            font-size: 12px;
            font-weight: bold;
            text-align: left;
        }
        .items-table th.right { text-align: right; }
        .items-table th.center { text-align: center; }
        .items-table td {
            padding: 13px 14px;
            font-size: 12px;
            border-bottom: 1px solid #ddd;
            vertical-align: middle;
        }
        .items-table td.right { text-align: right; }
        .items-table td.center { text-align: center; }
        .items-table tbody tr:last-child td {
            border-bottom: none;
        }

        /* Bottom section */
        .bottom-section {
            width: 100%;
            margin-top: 20px;
        }
        .bottom-section td {
            vertical-align: top;
        }
        .reglement-col {
            width: 50%;
            padding-right: 20px;
        }
        .reglement-title {
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 12px;
        }
        .reglement-text {
            font-size: 11px;
            line-height: 1.6;
            color: #444;
        }
        .reglement-text strong {
            font-size: 12px;
        }

        .totals-col {
            width: 50%;
        }
        .totals-table {
            width: 100%;
            border-collapse: collapse;
        }
        .totals-table td {
            padding: 9px 14px;
            font-size: 13px;
            font-weight: bold;
            border-bottom: 1px solid #ddd;
        }
        .totals-table td.lbl {
            text-align: right;
            text-transform: uppercase;
            color: #555;
        }
        .totals-table td.val {
            text-align: right;
            color: #222;
        }
        .totals-table tr.grand-total td {
            background-color: #f0f3f8;
            font-size: 15px;
            color: #222;
            border-bottom: none;
        }
    </style>
</head>
<body>

@php
$entrepriseRecord = $quote->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#1e3a8a';

$formatCurrency = function($amount) use ($currencySymbol, $currencyPosition) {
    if (!is_numeric($amount)) return '-';
    $formatted = number_format((float)$amount, 2, ',', ' ');
    return $currencyPosition === 'left' ? "{$currencySymbol} {$formatted}" : "{$formatted}{$currencySymbol}";
};

$tvaAmount = ($quote->subtotal ?? 0) * ($quote->tva ?? 0) / 100;
$discount = $quote->discount ?? 0;
@endphp

<!-- HEADER BAND -->
<div class="header-band">
    <table class="header-inner" style="width:100%;">
        <tr>
            <td style="width:55%;">
                <div class="facture-title">DEVIS</div>
                <div class="header-meta">
                    DATE : {{ \Carbon\Carbon::parse($quote->date)->format('d / m / Y') }}<br>
                    ÉCHÉANCE : {{ $quote->due_date ? \Carbon\Carbon::parse($quote->due_date)->format('d / m / Y') : 'À RÉCEPTION' }}<br>
                    <span class="number">DEVIS N° : {{ $quote->number }}</span>
                </div>
            </td>
            <td class="logo-cell" style="width:45%;">
                @if(!empty($logoBase64))
                    <img src="{{ $logoBase64 }}" alt="Logo">
                @else
                    <div class="company-name-fallback">{{ $entrepriseRecord->name ?? '' }}</div>
                @endif
            </td>
        </tr>
    </table>
</div>

<!-- BODY -->
<div class="body-wrapper">

    <!-- Addresses -->
    <table class="address-section">
        <tr>
            <td>
                <div class="addr-label">ÉMETTEUR :</div>
                <div class="addr-name">{{ $entrepriseRecord->name ?? '' }}</div>
                <div>{!! nl2br(e($entrepriseRecord->address ?? '')) !!}</div>
                @if($entrepriseRecord->phone)<div>{{ $entrepriseRecord->phone }}</div>@endif
                @if($entrepriseRecord->email)<div>{{ $entrepriseRecord->email }}</div>@endif
            </td>
            <td class="addr-right">
                <div class="addr-label">DESTINATAIRE :</div>
                <div class="addr-name">{{ $quote->client->name ?? '' }}</div>
                <div>{!! nl2br(e($quote->client->address ?? '')) !!}</div>
                @if($quote->client->phone ?? null)<div>{{ $quote->client->phone }}</div>@endif
                @if($quote->client->email ?? null)<div>{{ $quote->client->email }}</div>@endif
            </td>
        </tr>
    </table>

    <!-- Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width:45%;">Description :</th>
                <th class="right" style="width:20%;">Prix Unitaire :</th>
                <th class="center" style="width:15%;">Quantité :</th>
                <th class="right" style="width:20%;">Total :</th>
            </tr>
        </thead>
        <tbody>
            @foreach($quote->items as $item)
            <tr>
                <td>{{ $item->product ? $item->product->name : $item->description }}</td>
                <td class="right">
                    @if($item->unit_price > 0)
                        {{ $formatCurrency($item->unit_price) }}
                    @else
                        -
                    @endif
                </td>
                <td class="center">{{ $item->quantity }}</td>
                <td class="right">
                    @php $lineTotal = $item->total_price ?? ($item->unit_price * $item->quantity); @endphp
                    @if($lineTotal > 0)
                        {{ $formatCurrency($lineTotal) }}
                    @else
                        OFFERT
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Bottom: Règlement + Totaux -->
    <table class="bottom-section">
        <tr>
            <td class="reglement-col">
                <div class="reglement-title">RÈGLEMENT :</div>
                <div class="reglement-text">
                    @if($entrepriseRecord->invoice_header)
                        {!! nl2br(e($entrepriseRecord->invoice_header)) !!}
                    @else
                        <strong>Par virement bancaire :</strong><br>
                        Veuillez indiquer le numéro de facture ({{ $quote->number }}) lors de votre paiement.
                    @endif
                </div>
                <div style="margin-top: 16px;" class="reglement-text">
                    @if($entrepriseRecord->invoice_footer)
                        {!! nl2br(e($entrepriseRecord->invoice_footer)) !!}
                    @else
                        En cas de retard de paiement, une indemnité de 10% par jour de retard ainsi que des frais de recouvrement seront exigibles.<br>
                        <br>
                        Conditions générales de vente consultables sur demande.
                    @endif
                </div>
                @if(!empty($qrCodeBase64))
                    <div style="margin-top: 12px;">
                        <img src="{{ $qrCodeBase64 }}" style="width:70px;height:70px;" alt="QR Code">
                    </div>
                @endif
            </td>
            <td class="totals-col">
                <table class="totals-table">
                    <tr>
                        <td class="lbl">TOTAL HT :</td>
                        <td class="val">{{ $formatCurrency($quote->subtotal ?? 0) }}</td>
                    </tr>
                    @if(($quote->tva ?? 0) > 0)
                    <tr>
                        <td class="lbl">TVA {{ $quote->tva }}% :</td>
                        <td class="val">{{ $formatCurrency($tvaAmount) }}</td>
                    </tr>
                    @endif
                    <tr>
                        <td class="lbl">REMISE :</td>
                        <td class="val">{{ $discount > 0 ? $formatCurrency($discount) : '-' }}</td>
                    </tr>
                    <tr class="grand-total">
                        <td class="lbl">TOTAL TTC :</td>
                        <td class="val">{{ $formatCurrency($quote->total ?? 0) }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</div>

<!-- BOTTOM BAND -->
<div class="bottom-band"></div>

</body>
</html>
