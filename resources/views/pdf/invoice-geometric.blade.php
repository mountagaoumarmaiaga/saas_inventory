@php
$entrepriseRecord = $invoice->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#2d5a27';
@endphp
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Facture {{ $invoice->number }}</title>
    <style>
        @page { margin: 0px; }
        * { box-sizing: border-box; }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 12px;
            color: #111;
            margin: 0;
            padding: 0;
            line-height: 1.5;
        }

        /* ── HEADER ── */
        .header-section {
            padding: 20px 50px 20px 50px;
        }
        .header-table { width: 100%; border-collapse: collapse; }
        .header-table td { vertical-align: top; }

        .logo-cell img {
            max-height: 60px;
            max-width: 180px;
        }
        .logo-fallback {
            font-size: 24px;
            font-weight: 900;
            color: {{ $primaryColor }};
            font-style: italic;
        }

        .meta-cell {
            text-align: right;
            font-size: 12px;
        }
        .meta-cell .meta-row {
            font-weight: bold;
            line-height: 2;
        }
        .facture-number {
            font-size: 14px;
            font-weight: 900;
            color: {{ $primaryColor }};
        }

        /* Big FACTURE title below logo */
        .facture-title-block {
            padding: 10px 50px 0 50px;
        }
        .facture-title {
            font-size: 72px;
            font-weight: 900;
            color: {{ $primaryColor }};
            text-transform: uppercase;
            letter-spacing: 1px;
            line-height: 1;
        }

        /* Separator line */
        .separator {
            height: 2px;
            background-color: {{ $primaryColor }};
            margin: 20px 50px;
        }

        /* ── BODY ── */
        .body-wrapper {
            padding: 20px 50px;
        }

        /* addresses */
        .address-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .address-table td { vertical-align: top; width: 50%; }
        .addr-label {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 6px;
        }
        .addr-name { font-weight: bold; font-size: 13px; }
        .addr-right { text-align: right; }

        /* ── ITEMS TABLE ── */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .items-table thead tr {
            background-color: {{ $primaryColor }};
        }
        .items-table th {
            padding: 12px 14px;
            font-size: 12px;
            font-weight: bold;
            color: #fff;
            text-align: left;
        }
        .items-table th.right { text-align: right; }
        .items-table th.center { text-align: center; }
        .items-table td {
            padding: 14px 14px;
            font-size: 12px;
            border-bottom: 1px solid #ddd;
            vertical-align: middle;
        }
        .items-table td.right { text-align: right; }
        .items-table td.center { text-align: center; }

        /* ── BOTTOM SECTION ── */
        .bottom-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .bottom-table td { vertical-align: top; }
        .reglement-col { width: 50%; padding-right: 20px; }
        .totals-col { width: 50%; }

        .reglement-title {
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 12px;
        }
        .reglement-text {
            font-size: 11px;
            color: #444;
            line-height: 1.6;
        }

        .totals-table { width: 100%; border-collapse: collapse; }
        .totals-table td {
            padding: 9px 14px;
            font-size: 13px;
            font-weight: bold;
            border-bottom: 1px solid #ddd;
        }
        .totals-table td.lbl { text-align: right; color: #555; text-transform: uppercase; }
        .totals-table td.val { text-align: right; }
        .totals-table tr.grand-total td {
            font-size: 15px;
            border-bottom: none;
        }

        /* ── BOTTOM BAND ── */
        .bottom-band {
            position: fixed;
            bottom: 0; left: 0; right: 0;
            height: 18px;
            background-color: {{ $primaryColor }};
        }
    </style>
</head>
<body>

@php
$entrepriseRecord = $invoice->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#2d5a27';

$formatCurrency = function($amount) use ($currencySymbol, $currencyPosition) {
    if (!is_numeric($amount)) return '-';
    $formatted = number_format((float)$amount, 2, ',', ' ');
    return $currencyPosition === 'left' ? "{$currencySymbol} {$formatted}" : "{$formatted}{$currencySymbol}";
};

$tvaAmount = ($invoice->subtotal ?? 0) * ($invoice->tva ?? 0) / 100;
$discount = $invoice->discount ?? 0;
@endphp

<!-- HEADER (logo + date/meta) -->
<div class="header-section">
    <table class="header-table">
        <tr>
            <td class="logo-cell" style="width:50%;">
                @if(!empty($logoBase64))
                    <img src="{{ $logoBase64 }}" alt="Logo">
                @else
                    <div class="logo-fallback">{{ $entrepriseRecord->name ?? '' }}</div>
                @endif
            </td>
            <td class="meta-cell" style="width:50%;">
                <div class="meta-row">DATE : {{ \Carbon\Carbon::parse($invoice->date)->format('d / m / Y') }}</div>
                <div class="meta-row">ÉCHÉANCE : {{ $invoice->due_date ? \Carbon\Carbon::parse($invoice->due_date)->format('d / m / Y') : 'À RÉCEPTION' }}</div>
                <div class="meta-row facture-number">FACTURE N° : {{ $invoice->number }}</div>
            </td>
        </tr>
    </table>
</div>

<!-- GIANT FACTURE TITLE -->
<div class="facture-title-block">
    <div class="facture-title">FACTURE</div>
</div>

<!-- SEPARATOR LINE -->
<div class="separator"></div>

<!-- BODY -->
<div class="body-wrapper">

    <!-- Addresses -->
    <table class="address-table">
        <tr>
            <td>
                <div class="addr-label">ÉMETTEUR :</div>
                <div class="addr-name">{{ $entrepriseRecord->name ?? '' }}</div>
                <div>{!! nl2br(e($entrepriseRecord->address ?? '')) !!}</div>
                @if($entrepriseRecord->phone ?? null)<div>{{ $entrepriseRecord->phone }}</div>@endif
                @if($entrepriseRecord->email ?? null)<div>{{ $entrepriseRecord->email }}</div>@endif
            </td>
            <td class="addr-right">
                <div class="addr-label">DESTINATAIRE :</div>
                <div class="addr-name">{{ $invoice->client->name ?? '' }}</div>
                <div>{!! nl2br(e($invoice->client->address ?? '')) !!}</div>
                @if($invoice->client->phone ?? null)<div>{{ $invoice->client->phone }}</div>@endif
                @if($invoice->client->email ?? null)<div>{{ $invoice->client->email }}</div>@endif
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
            @foreach($invoice->items as $item)
            <tr>
                <td>{{ $item->product ? $item->product->name : $item->description }}</td>
                <td class="right">
                    @if($item->unit_price > 0) {{ $formatCurrency($item->unit_price) }} @else - @endif
                </td>
                <td class="center">{{ $item->quantity }}</td>
                <td class="right">
                    @php $lineTotal = $item->total_price ?? ($item->unit_price * $item->quantity); @endphp
                    @if($lineTotal > 0) {{ $formatCurrency($lineTotal) }} @else OFFERT @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Bottom Spacer to prevent overlap -->
    <div style="height: 200px;"></div>

    <!-- Bottom: Règlement + Totaux -->
    <div style="position: absolute; bottom: 40px; left: 50px; right: 50px;">
        <table class="bottom-table">
            <tr>
                <td class="reglement-col">
                    <div class="reglement-title">RÈGLEMENT :</div>
                    <div class="reglement-text">
                        @if($entrepriseRecord->invoice_header)
                            {!! nl2br(e($entrepriseRecord->invoice_header)) !!}
                        @else
                            <strong>Par virement bancaire :</strong><br>
                            Veuillez indiquer le numéro de facture ({{ $invoice->number }}) lors de votre paiement.
                        @endif
                    </div>
                    <div style="margin-top: 14px;" class="reglement-text">
                        @if($entrepriseRecord->invoice_footer)
                            {!! nl2br(e($entrepriseRecord->invoice_footer)) !!}
                        @else
                            En cas de retard de paiement, une indemnité de 10% par jour de retard ainsi que des frais de recouvrement seront exigibles.<br><br>
                            Conditions générales de vente consultables sur le site.
                        @endif
                    </div>
                    @if(!empty($qrCodeBase64))
                        <div style="margin-top: 10px;"><img src="{{ $qrCodeBase64 }}" style="width:65px;height:65px;"></div>
                    @endif
                </td>
                <td class="totals-col">
                    <table class="totals-table">
                        <tr>
                            <td class="lbl">TOTAL HT :</td>
                            <td class="val">{{ $formatCurrency($invoice->subtotal ?? 0) }}</td>
                        </tr>
                        @if(($invoice->tva ?? 0) > 0)
                        <tr>
                            <td class="lbl">TVA {{ $invoice->tva }}% :</td>
                            <td class="val">{{ $formatCurrency($tvaAmount) }}</td>
                        </tr>
                        @endif
                        <tr>
                            <td class="lbl">REMISE :</td>
                            <td class="val">{{ $discount > 0 ? $formatCurrency($discount) : '-' }}</td>
                        </tr>
                        <tr class="grand-total">
                            <td class="lbl">TOTAL TTC :</td>
                            <td class="val">{{ $formatCurrency($invoice->total ?? 0) }}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>

</div>

<div class="bottom-band"></div>

</body>
</html>
