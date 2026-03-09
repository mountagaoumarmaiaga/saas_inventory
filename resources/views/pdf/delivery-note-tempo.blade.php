@php
$entrepriseRecord = $deliveryNote->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#1e3a8a';
@endphp
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
            color: #222;
            margin: 0;
            padding: 0;
            line-height: 1.5;
        }

        /* ── HEADER BAND ── */
        .header-band {
            background-color: #dde3ee; /* light blue-grey */
            padding: 40px 50px 30px 50px;
        }
        .header-inner {
            width: 100%;
        }
        .header-inner td {
            vertical-align: middle;
        }
        .doc-title {
            font-size: 50px;
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
            margin-bottom: 40px;
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
            color: {{ $primaryColor }};
            text-transform: uppercase;
        }
        .addr-right {
            text-align: right;
        }

        /* Items Table */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }
        .items-table thead tr {
            background-color: {{ $primaryColor }};
            color: #ffffff;
        }
        .items-table th {
            padding: 12px 14px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
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
        .items-table td.center { text-align: center; font-weight: bold; }
        .items-table tbody tr:last-child td {
            border-bottom: 2px solid {{ $primaryColor }};
        }

        /* Bottom Signatures Section */
        .signatures-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
            page-break-inside: avoid;
        }
        .signatures-table td {
            width: 50%;
            vertical-align: top;
        }
        .sig-box {
            padding: 15px 0;
        }
        .sig-title {
            font-weight: bold;
            font-size: 13px;
            text-transform: uppercase;
            color: {{ $primaryColor }};
            margin-bottom: 15px;
        }
        .sig-date {
            font-size: 11px;
            color: #444;
            margin-bottom: 80px;
        }
        .sig-line {
            width: 80%;
            border-bottom: 1.5px solid #222;
        }
    </style>
</head>
<body>

<!-- HEADER BAND -->
<div class="header-band">
    <table class="header-inner" style="width:100%;">
        <tr>
            <td style="width:55%;">
                <div class="doc-title">BON DE LIVRAISON</div>
                <div class="header-meta">
                    DATE : {{ \Carbon\Carbon::parse($deliveryNote->date)->format('d / m / Y') }}<br>
                    RÉF FACTURE : {{ $deliveryNote->invoice ? $deliveryNote->invoice->number : '-' }}<br>
                    <span class="number">N° : {{ $deliveryNote->number }}</span>
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
            <td style="padding-right: 20px;">
                <div class="addr-label">LIVRÉ PAR :</div>
                <div class="addr-name">{{ $entrepriseRecord->name ?? '' }}</div>
                <div>{!! nl2br(e($entrepriseRecord->address ?? '')) !!}</div>
                @if($entrepriseRecord->phone)<div>{{ $entrepriseRecord->phone }}</div>@endif
                @if($entrepriseRecord->email)<div>{{ $entrepriseRecord->email }}</div>@endif
            </td>
            <td class="addr-right" style="padding-left: 20px;">
                <div class="addr-label">LIVRÉ À :</div>
                <div class="addr-name">{{ $deliveryNote->client->name ?? '' }}</div>
                <div>{!! nl2br(e($deliveryNote->client->address ?? '')) !!}</div>
                @if($deliveryNote->client->phone ?? null)<div>{{ $deliveryNote->client->phone }}</div>@endif
                @if($deliveryNote->client->email ?? null)<div>{{ $deliveryNote->client->email }}</div>@endif
            </td>
        </tr>
    </table>

    <!-- Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th class="center" style="width:15%;">Quantité</th>
                <th style="width:85%;">Description</th>
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
            <td style="padding-right: 20px;">
                <div class="sig-box">
                    <div class="sig-title">SIGNATURE LIVREUR</div>
                    <div class="sig-date"><br></div>
                    <div class="sig-line"></div>
                </div>
            </td>
            <td style="padding-left: 20px; text-align: right;">
                <div class="sig-box" style="display: inline-block; text-align: left;">
                    <div class="sig-title" style="text-align: right;">SIGNATURE CLIENT</div>
                    <div class="sig-date" style="text-align: right;">Reçu le : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="sig-line" style="width: 100%;"></div>
                </div>
            </td>
        </tr>
    </table>

</div>

<!-- BOTTOM BAND -->
<div class="bottom-band"></div>

</body>
</html>
