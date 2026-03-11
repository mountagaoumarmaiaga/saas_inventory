<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Facture {{ $purchase->number }}</title>
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
    </style>
</head>
<body>

@php
$entrepriseRecord = $purchase->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#111111';

$formatCurrency = function($amount) use ($currencySymbol, $currencyPosition) {
    if (!is_numeric($amount)) return '-';
    $formatted = number_format((float)$amount, 2, ',', ' ');
    return $currencyPosition === 'left' ? "{$currencySymbol} {$formatted}" : "{$formatted}{$currencySymbol}";
};

$taxAmount = $purchase->tax_amount ?? 0;
$totalAmount = $purchase->total_amount ?? 0;
$subtotal = $totalAmount - $taxAmount;
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
                <div class="facture-title">BON DE COMMANDE</div>
                <div class="facture-meta">
                    BON DE COMMANDE N° : {{ $purchase->number }}<br>
                    DATE : {{ \Carbon\Carbon::parse($purchase->date)->format('d / m / Y') }}<br>
                    ÉCHÉANCE : {{ $purchase->due_date ? \Carbon\Carbon::parse($purchase->due_date)->format('d / m / Y') : 'À RÉCEPTION' }}
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
            </td>
            <td class="addr-right">
                <div class="addr-label">DESTINATAIRE :</div>
                <div class="addr-name">{{ $purchase->client->name ?? '' }}</div>
                <div>{{ $purchase->client->email ?? '' }}</div>
                <div>{!! nl2br(e($purchase->client->address ?? '')) !!}</div>
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
            @foreach($purchase->items as $item)
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

    <!-- TOTALS (right aligned) -->
    <table style="width: 50%; margin-left: 50%;">
        <tr>
            <td style="text-align:right; font-weight:bold; padding: 6px 8px; font-size:13px; text-transform:uppercase;">TOTAL HT :</td>
            <td style="text-align:right; font-weight:bold; padding: 6px 8px; font-size:13px;">{{ $formatCurrency($subtotal) }}</td>
        </tr>
        @if($taxAmount > 0)
        <tr>
            <td style="text-align:right; font-weight:bold; padding: 6px 8px; font-size:13px; text-transform:uppercase;">TAXES ADDITIONNELLES :</td>
            <td style="text-align:right; font-weight:bold; padding: 6px 8px; font-size:13px;">{{ $formatCurrency($taxAmount) }}</td>
        </tr>
        @endif
        <tr>
            <td style="text-align:right; font-weight:bold; padding: 10px 8px; font-size:15px; text-transform:uppercase; border-top: 2px solid #111;">TOTAL TTC :</td>
            <td style="text-align:right; font-weight:bold; padding: 10px 8px; font-size:15px; border-top: 2px solid #111;">{{ $formatCurrency($totalAmount) }}</td>
        </tr>
    </table>

    <!-- BOTTOM SECTION -->
    <table class="bottom-row">
        <tr>
            <td class="reglement-col">
                @if(!empty($purchase->notes))
                <div class="section-title">RÈGLEMENT :</div>
                <div class="section-text">
                    {!! nl2br(e($purchase->notes)) !!}
                </div>
                @endif
                @if(!empty($qrCodeBase64))
                    <div style="margin-top: 10px;"><img src="{{ $qrCodeBase64 }}" style="width:65px;height:65px;"></div>
                @endif
            </td>
            <td class="terms-col">
                <div class="section-title">MONTANT DE LA COMMANDE</div>
                <div class="section-text" style="font-style: italic; padding: 15px; border: 1px dashed #ccc;">
                    Arrêté la présente commande à la somme de :<br>
                    <strong>{{ ucfirst(\App\Helpers\NumberToWords::convert($totalAmount)) }} {{ $currencySymbol }}</strong>
                </div>
            </td>
        </tr>
    </table>

</div>
</body>
</html>
