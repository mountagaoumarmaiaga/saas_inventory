<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bon de Livraison {{ $deliveryNote->number }}</title>
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
            font-size: 48px;
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
            margin-top: 30px;
        }
        .address-row td { vertical-align: top; width: 50%; padding: 15px; border: 1px solid #eee; background-color: #fafafa; }
        .addr-label {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 10px;
            color: #777;
        }
        .addr-name { font-weight: bold; font-size: 15px; margin-bottom: 5px; color: #111; }

        /* ── ITEMS TABLE ── */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }
        .items-table th {
            padding: 12px 8px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            text-align: left;
            border-top: 2px solid #111;
            border-bottom: 2px solid #111;
            background-color: #f7f7f7;
        }
        .items-table th.center { text-align: center; }
        .items-table td {
            padding: 15px 8px;
            font-size: 12px;
            border-bottom: 1px solid #eee;
            vertical-align: middle;
        }
        .items-table td.center { text-align: center; font-weight: bold; }
        .items-table tbody tr:last-child td { border-bottom: 2px solid #111; }

        /* ── SIGNATURES ── */
        .signatures-table { width: 100%; border-collapse: collapse; margin-top: 40px; page-break-inside: avoid; }
        .signatures-table td { width: 50%; vertical-align: top; }
        .sig-box { padding: 0; }
        .sig-title { font-weight: bold; font-size: 13px; text-transform: uppercase; color: #111; margin-bottom: 15px; }
        .sig-date { font-size: 11px; color: #555; margin-bottom: 80px; }
        .sig-line { width: 80%; border-bottom: 1px solid #111; }
    </style>
</head>
<body>

@php
$entrepriseRecord = $deliveryNote->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#111111';
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
                <div class="facture-title" style="color: {{ $primaryColor }};">BON DE LIVRAISON</div>
                <div class="facture-meta">
                    N° : {{ $deliveryNote->number }}<br>
                    DATE : {{ \Carbon\Carbon::parse($deliveryNote->date)->format('d / m / Y') }}<br>
                    RÉF FACTURE : {{ $deliveryNote->invoice ? $deliveryNote->invoice->number : '-' }}
                </div>
            </td>
        </tr>
    </table>

    <!-- ADDRESSES -->
    <table class="address-row">
        <tr>
            <td style="border-right: 15px solid #fff;">
                <div class="addr-label">LIVRÉ PAR :</div>
                <div class="addr-name" style="color: {{ $primaryColor }};">{{ $entrepriseRecord->name ?? '' }}</div>
                <div>{!! nl2br(e($entrepriseRecord->address ?? '')) !!}</div>
                <div>{!! nl2br(e($entrepriseRecord->phone ?? '')) !!}</div>
                <div>{{ $entrepriseRecord->email ?? '' }}</div>
            </td>
            <td>
                <div class="addr-label">LIVRÉ À :</div>
                <div class="addr-name" style="color: {{ $primaryColor }};">{{ $deliveryNote->client->name ?? '' }}</div>
                <div>{!! nl2br(e($deliveryNote->client->address ?? '')) !!}</div>
                <div>{{ $deliveryNote->client->phone ?? '' }}</div>
                <div>{{ $deliveryNote->client->email ?? '' }}</div>
            </td>
        </tr>
    </table>

    <!-- ITEMS TABLE -->
    <table class="items-table">
        <thead>
            <tr>
                <th class="center" style="width:20%;">QUANTITÉ</th>
                <th style="width:80%;">DESCRIPTION</th>
            </tr>
        </thead>
        <tbody>
            @foreach($deliveryNote->items as $item)
            <tr>
                <td class="center">{{ $item->quantity }}</td>
                <td>
                    {{ $item->product ? $item->product->name : $item->description }}
                    @if($item->product && $item->product->reference)
                        <br><span style="font-size: 10px; color: #777;">Réf: {{ $item->product->reference }}</span>
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <!-- SIGNATURES -->
    <table class="signatures-table">
        <tr>
            <td>
                <div class="sig-box">
                    <div class="sig-title">SIGNATURE LIVREUR</div>
                    <div class="sig-date"><br></div>
                    <div class="sig-line"></div>
                </div>
            </td>
            <td style="text-align: right;">
                <div class="sig-box" style="display: inline-block; text-align: left;">
                    <div class="sig-title" style="text-align: right;">SIGNATURE CLIENT</div>
                    <div class="sig-date" style="text-align: right;">Reçu le : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="sig-line" style="width: 100%;"></div>
                </div>
            </td>
        </tr>
    </table>

</div>
</body>
</html>
