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
            background-color: #fffef8; /* very slight cream tone */
        }

        /* ── OUTER BORDER ── */
        .outer-border {
            border: 1.5px solid #ccc;
            margin: 20px;
            padding: 40px 45px 45px 45px;
            position: relative;
        }

        /* ── HEADER ROW ── */
        .header-row {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .header-row td { vertical-align: top; }

        .logo-cell img {
            max-height: 80px;
            max-width: 180px;
        }
        .logo-text {
            font-size: 36px;
            font-weight: 900;
            color: #111;
            letter-spacing: -2px;
            line-height: 1;
        }
        .logo-sub {
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #777;
            margin-top: 4px;
        }

        .title-cell {
            text-align: right;
        }
        .facture-title {
            font-size: 64px;
            font-weight: 900;
            color: #111;
            text-transform: uppercase;
            letter-spacing: 1px;
            line-height: 1;
        }
        .facture-meta {
            font-size: 12px;
            font-weight: bold;
            text-align: right;
            margin-top: 8px;
            line-height: 1.9;
            color: #111;
        }

        /* ── ADDRESSES ── */
        .address-row {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 35px;
        }
        .address-row td { vertical-align: top; width: 50%; }
        .addr-label {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 6px;
        }
        .addr-right { text-align: right; }
        .addr-name { font-weight: bold; font-size: 13px; }

        /* ── ITEMS TABLE ── */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .items-table th {
            padding: 10px 8px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            text-align: left;
            border-top: 2px solid #111;
            border-bottom: 2px solid #111;
        }
        .items-table th.right { text-align: right; }
        .items-table th.center { text-align: center; }
        .items-table td {
            padding: 12px 8px;
            font-size: 12px;
            border-bottom: 1px solid #ccc;
            vertical-align: middle;
        }
        .items-table td.right { text-align: right; }
        .items-table td.center { text-align: center; }
        .items-table tbody tr:last-child td { border-bottom: 2px solid #111; }

        /* ── TOTALS ── */
        .totals-table {
            width: 100%;
            border-collapse: collapse;
            margin-left: auto;
            margin-top: 8px;
        }
        .totals-table td {
            padding: 7px 8px;
            font-size: 13px;
            font-weight: bold;
        }
        .totals-table td.lbl {
            text-align: right;
            color: #444;
            text-transform: uppercase;
        }
        .totals-table td.val { text-align: right; color: #111; }
        .totals-table tr.grand-total td {
            font-size: 16px;
            padding-top: 10px;
        }

        /* ── BOTTOM SECTION ── */
        .bottom-row {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
            border-top: 1px solid #ccc;
            padding-top: 20px;
        }
        .bottom-row td { vertical-align: top; }
        .reglement-col { width: 50%; padding-right: 20px; }
        .terms-col { width: 50%; padding-left: 20px; }
        .section-title {
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .section-text {
            font-size: 11px;
            color: #444;
            line-height: 1.6;
        }

        /* ── FOOTER ── */
        .page-footer {
            position: fixed;
            bottom: 25px;
            left: 65px;
            right: 65px;
            text-align: center;
            font-size: 10px;
            color: #777;
        }
    </style>
</head>
<body>

@php
$entrepriseRecord = $invoice->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#111111';

$formatCurrency = function($amount) use ($currencySymbol, $currencyPosition) {
    if (!is_numeric($amount)) return '-';
    $formatted = number_format((float)$amount, 2, ',', ' ');
    return $currencyPosition === 'left' ? "{$currencySymbol} {$formatted}" : "{$formatted}{$currencySymbol}";
};

$tvaAmount = ($invoice->subtotal ?? 0) * ($invoice->tva ?? 0) / 100;
$discount = $invoice->discount ?? 0;
@endphp

<div class="outer-border">

    <!-- HEADER -->
    <table class="header-row">
        <tr>
            <td class="logo-cell" style="width:45%;">
                @if(!empty($logoBase64))
                    <img src="{{ $logoBase64 }}" alt="Logo">
                @else
                    <div class="logo-text">{{ strtolower(substr($entrepriseRecord->name ?? 'na', 0, 2)) }}.</div>
                    <div class="logo-sub">{{ $entrepriseRecord->name ?? '' }}</div>
                @endif
            </td>
            <td class="title-cell" style="width:55%;">
                <div class="facture-title">FACTURE</div>
                <div class="facture-meta">
                    FACTURE N° : {{ $invoice->number }}<br>
                    DATE : {{ \Carbon\Carbon::parse($invoice->date)->format('d / m / Y') }}<br>
                    ÉCHÉANCE : {{ $invoice->due_date ? \Carbon\Carbon::parse($invoice->due_date)->format('d / m / Y') : 'À RÉCEPTION' }}
                </div>
            </td>
        </tr>
    </table>

    <!-- ADDRESSES -->
    <table class="address-row">
        <tr>
            <td>
                <div class="addr-label">ÉMETTEUR :</div>
                <div>{!! nl2br(e($entrepriseRecord->phone ?? '')) !!}</div>
                <div>{{ $entrepriseRecord->email ?? '' }}</div>
                <div>{!! nl2br(e($entrepriseRecord->address ?? '')) !!}</div>
                @if($entrepriseRecord->invoice_header)
                    <div style="margin-top: 10px; font-style: italic; color: #555;">
                        {!! nl2br(e($entrepriseRecord->invoice_header)) !!}
                    </div>
                @endif
            </td>
            <td class="addr-right">
                <div class="addr-label">DESTINATAIRE :</div>
                <div class="addr-name">{{ $invoice->client->name ?? '' }}</div>
                <div>{{ $invoice->client->email ?? '' }}</div>
                <div>{!! nl2br(e($invoice->client->address ?? '')) !!}</div>
            </td>
        </tr>
    </table>

    <!-- ITEMS TABLE -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width:40%;">DESCRIPTION :</th>
                <th class="center" style="width:15%;">QUANTITÉ :</th>
                <th class="right" style="width:25%;">PRIX UNITAIRE HT:</th>
                <th class="right" style="width:20%;">TOTAL HT :</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $item)
            <tr>
                <td>{{ $item->product ? $item->product->name : $item->description }}</td>
                <td class="center">{{ $item->quantity }}</td>
                <td class="right">
                    @if($item->unit_price > 0) {{ $formatCurrency($item->unit_price) }} @else - @endif
                </td>
                <td class="right">
                    @php $lineTotal = $item->total_price ?? ($item->unit_price * $item->quantity); @endphp
                    @if($lineTotal > 0) {{ $formatCurrency($lineTotal) }} @else OFFERT @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <!-- SEPARATOR LINE -->
    <div style="border-top: 2px solid #111; margin-top: 30px; margin-bottom: 20px;"></div>

    <!-- NOTES & RÈGLEMENT -->
    @if(!empty($invoice->notes) || !empty($qrCodeBase64))
    <div style="margin-bottom: 15px;">
        @if(!empty($invoice->notes))
        <div class="section-title">RÈGLEMENT :</div>
        <div class="section-text">{!! nl2br(e($invoice->notes)) !!}</div>
        @endif
        @if(!empty($qrCodeBase64))
            <div style="margin-top: 10px;"><img src="{{ $qrCodeBase64 }}" style="width:65px;height:65px;"></div>
        @endif
    </div>
    @endif

    <!-- ARRÊTÉ + TOTALS right-aligned -->
    <div style="width: 48%; font-style: italic; font-size: 11px; padding: 10px; border: 1px dashed #ccc; margin-bottom: 15px;">
        Arrêté la présente facture à la somme de :<br>
        <strong>{{ ucfirst(\App\Helpers\NumberToWords::convert($invoice->total ?? 0)) }} {{ $currencySymbol }}</strong>
    </div>

    <!-- TOTALS TABLE (standalone, right-aligned) -->
    <table style="width: 48%; margin-left: 52%; border-collapse: collapse;">
        <tr>
            <td style="padding: 8px 14px; font-weight: bold; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #ccc;">TOTAL HT :</td>
            <td style="padding: 8px 14px; font-weight: bold; font-size: 13px; text-align: right; border-bottom: 1px solid #ccc;">{{ $formatCurrency($invoice->subtotal ?? 0) }}</td>
        </tr>
        @if(($invoice->tva ?? 0) > 0)
        <tr>
            <td style="padding: 8px 14px; font-weight: bold; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #ccc;">TVA ({{ $invoice->tva }}%) :</td>
            <td style="padding: 8px 14px; font-weight: bold; font-size: 13px; text-align: right; border-bottom: 1px solid #ccc;">{{ $formatCurrency($tvaAmount) }}</td>
        </tr>
        @endif
        @if($discount > 0)
        <tr>
            <td style="padding: 8px 14px; font-weight: bold; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #ccc;">REMISE :</td>
            <td style="padding: 8px 14px; font-weight: bold; font-size: 13px; text-align: right; border-bottom: 1px solid #ccc;">-{{ $formatCurrency($discount) }}</td>
        </tr>
        @endif
        <tr>
            <td style="padding: 10px 14px; font-weight: bold; font-size: 14px; text-transform: uppercase; border-top: 2px solid #111;">TOTAL TTC :</td>
            <td style="padding: 10px 14px; font-weight: bold; font-size: 16px; text-align: right; border-top: 2px solid #111;">{{ $formatCurrency($invoice->total ?? 0) }}</td>
        </tr>
    </table>

    <!-- SIGNATURE (standalone table) -->
    <table style="width: 40%; margin-left: 60%; border-collapse: collapse; margin-top: 25px;">
        <tr>
            <td style="text-align: center; font-weight: bold; font-size: 10px; text-transform: uppercase; padding: 8px; border: 2px solid #111; background-color: #f8f8f8;">CACHET ET SIGNATURE</td>
        </tr>
        <tr>
            <td style="height: 80px; border: 1px solid #ccc; border-top: none;"></td>
        </tr>
    </table>



</div>

<!-- FOOTER -->
<div class="page-footer">
    @if($entrepriseRecord->invoice_footer)
        {!! nl2br(e($entrepriseRecord->invoice_footer)) !!}
    @else
        En cas de retard de paiement, et conformément au code de commerce, une indemnité calculée à trois fois le taux d'intérêt légal ainsi qu'un frais de recouvrement de 40 euros sont exigibles. Conditions générales de vente consultables sur le site.
    @endif
</div>

</body>
</html>
