<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bon de Livraison {{ $dn->reference ?? $dn->number }}</title>
    <style>
        @page { margin: 50px; }
        body { 
            font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; 
            font-size: 11px; 
            color: #333333; 
            line-height: 1.8;
            font-weight: 300;
        }

        .header {
            width: 100%;
            margin-bottom: 60px;
        }

        .header td { vertical-align: top; }
        
        .company-name {
            font-size: 16px;
            font-weight: bold;
            color: #111111;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        .invoice-title {
            font-size: 12px;
            color: #888888;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 5px;
        }

        .invoice-number {
            font-size: 24px;
            color: #111111;
            font-weight: 300;
            letter-spacing: 1px;
        }

        .info-grid {
            width: 100%;
            margin-bottom: 50px;
        }

        .info-grid td {
            width: 50%;
            vertical-align: top;
        }

        .label {
            font-size: 9px;
            color: #999999;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 15px;
        }

        .client-name {
            font-size: 14px;
            font-weight: bold;
            color: #111111;
            margin-bottom: 5px;
        }

        table.items {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 50px;
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
            border-bottom: 1px solid #eeeeee;
            padding: 10px 0;
            text-align: left;
            font-size: 9px;
            color: #999999;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: normal;
        }

        table.items td {
            padding: 15px 0;
            border-bottom: 1px solid #f9f9f9;
            vertical-align: top;
        }

        .signature {
            margin-top: 60px;
            width: 100%;
        }
        .signature-box {
            width: 45%;
            float: left;
        }
        .signature-box:last-child {
            float: right;
            text-align: right;
        }
        .signature-line {
            border-top: 1px solid #eeeeee;
            width: 160px;
            margin-top: 40px;
            display: inline-block;
        }

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            margin-top: 80px;
            font-size: 9px;
            color: #aaaaaa;
            text-align: center;
            letter-spacing: 1px;
        }

        .clear { clear: both; }
    </style>
</head>
<body>
    <table class="header">
        <tr>
            <td style="width: 50%;">
                @if(isset($logoBase64) && $logoBase64)
                    <img src="{{ $logoBase64 }}" style="max-height: 40px; margin-bottom: 20px;">
                @endif
                <div class="company-name">{{ $dn->entreprise->name ?? 'Entreprise' }}</div>
                <div style="color: #666666;">
                    {{ $dn->entreprise->address ?? '' }}<br>
                    {{ $dn->entreprise->phone ?? '' }}<br>
                    {{ $dn->entreprise->email ?? '' }}
                </div>
            </td>
            <td style="width: 50%; text-align: right;">
                <div class="invoice-title">Bon de Livraison</div>
                <div class="invoice-number">N° {{ $dn->reference ?? $dn->number }}</div>
                <div style="color: #888888; margin-top: 15px;">Date : {{ \Carbon\Carbon::parse($dn->delivery_date)->format('d.m.Y') }}</div>
                @if($dn->delivery_person)
                    <div style="color: #888888; margin-top: 5px;">Livreur : {{ $dn->delivery_person }}</div>
                @endif
                @if($dn->invoice)
                    <div style="color: #888888; margin-top: 5px;">Réf. Facture : {{ $dn->invoice->number ?? $dn->invoice->reference }}</div>
                @endif
            </td>
        </tr>
    </table>

    <table class="info-grid">
        <tr>
            <td style="padding-right: 40px;">
                <div class="label">Instructions</div>
                @if($dn->entreprise->invoice_header)
                <div style="font-size: 11px; color: #444444; line-height: 1.6;">
                    {{ $dn->entreprise->invoice_header }}
                </div>
                @else
                <div style="font-size: 11px; color: #888888; font-style: italic;">
                    Document de livraison accompagnant la marchandise.
                </div>
                @endif
            </td>
            <td style="padding-left: 40px;">
                <div class="label">Livré à</div>
                <div class="client-name">{{ $dn->client->name ?? 'Client Inconnu' }}</div>
                <div style="color: #666666;">
                    @if($dn->client->address){{ $dn->client->address }}<br>@endif
                    @if($dn->client->phone){{ $dn->client->phone }}<br>@endif
                </div>
            </td>
        </tr>
    </table>

    <!-- ITEMS TABLE -->
    <table class="items">
        <thead>
            <tr>
                <th style="width: 80px;">QTÉ</th>
                <th>Désignation</th>
            </tr>
        </thead>
        <tbody>
            @foreach($dn->items as $item)
            <tr>
                <td style="font-weight:bold;">{{ $item->quantity }}</td>
                <td>
                    {{ $item->description }}
                    @if($item->product && $item->product->reference)
                        <div class="reference">Réf : {{ $item->product->reference }}</div>
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="clear"></div>

    <!-- SIGNATURE -->
    <div class="signature">
        <div class="signature-box">
            <div style="font-weight: bold;">SIGNATURE LIVREUR</div>
            <div class="signature-line"></div>
        </div>
        <div class="signature-box" style="text-align: right;">
            <div style="font-weight: bold;">SIGNATURE CLIENT</div>
            <div style="margin-top:5px; font-size:10px;">Reçu le : ____/____/_______</div>
            <div class="signature-line"></div>
        </div>
        <div class="clear"></div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
        @if($dn->entreprise->invoice_footer)
            {{ $dn->entreprise->invoice_footer }}
        @else
            <div><strong>{{ $dn->entreprise->name ?? 'Entreprise' }}</strong></div>
            <div>{{ $dn->entreprise->address ?? '' }} — {{ $dn->entreprise->phone ?? '' }}</div>
            @if($dn->entreprise->email)
                <div>Email : {{ $dn->entreprise->email }}</div>
            @endif
        @endif
    </div>
</body>
</html>
