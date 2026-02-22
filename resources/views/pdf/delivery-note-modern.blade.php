<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bon de Livraison {{ $dn->reference ?? $dn->number }}</title>
    <style>
        @page { margin: 40px; }
        body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            font-size: 12px; 
            color: #1e293b; 
            line-height: 1.5;
        }

        .primary-color { color: #0284c7; }
        .bg-primary { background-color: #0284c7; color: #fff; }

        .invoice-header {
            width: 100%;
            margin-bottom: 25px;
            border-bottom: 3px solid #0284c7;
            padding-bottom: 20px;
            display: table;
        }

        .company-zone {
            width: 50%;
            display: table-cell;
            vertical-align: top;
        }

        .invoice-title-zone {
            width: 50%;
            display: table-cell;
            text-align: right;
            vertical-align: top;
        }

        .company-name {
            font-size: 24px;
            font-weight: 900;
            color: #0f172a;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: -0.5px;
        }

        .invoice-word {
            font-size: 28px;
            font-weight: 900;
            color: #0284c7;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .meta-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 20px;
        }

        .box-label {
            font-size: 10px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            margin-bottom: 8px;
            letter-spacing: 1px;
        }

        .client-name {
            font-size: 16px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 4px;
        }

        table.items {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table.items th {
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            color: #64748b;
            padding: 12px 10px;
            background-color: #f1f5f9;
            text-align: left;
            border-bottom: 2px solid #cbd5e1;
        }

        table.items th:first-child { border-top-left-radius: 6px; }
        table.items th:last-child { border-top-right-radius: 6px; }

        table.items td {
            padding: 15px 10px;
            border-bottom: 1px solid #e2e8f0;
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
            border-top: 1px solid #cbd5e1;
            width: 160px;
            margin-top: 40px;
            display: inline-block;
        }
        
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 11px;
            padding: 10px 0;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
        }
        .clear { clear: both; }
    </style>
</head>
<body>
    <!-- HEADER -->
    <div class="invoice-header">
        <div class="company-zone">
            @if(isset($logoBase64) && $logoBase64)
                <img src="{{ $logoBase64 }}" style="max-height: 60px; margin-bottom: 15px;">
            @endif
            <div class="company-name">{{ $dn->entreprise->name ?? 'Entreprise' }}</div>
            @if($dn->entreprise->invoice_header)
                <div style="font-size: 11px; margin-bottom: 8px; color: #64748b;">
                    {{ $dn->entreprise->invoice_header }}
                </div>
            @endif
            <div style="color: #475569;">
                {{ $dn->entreprise->address ?? '' }}<br>
                {{ $dn->entreprise->phone ?? '' }}<br>
                {{ $dn->entreprise->email ?? '' }}
            </div>
        </div>
        <div class="invoice-title-zone">
            <div class="invoice-word">BON DE LIVRAISON</div>
            <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 5px;">
                N° {{ $dn->reference ?? $dn->number }}
            </div>
            <div style="margin-top: 10px; color: #475569;">
                <strong>Date :</strong> {{ \Carbon\Carbon::parse($dn->delivery_date)->format('d/m/Y') }}<br>
                @if($dn->delivery_person)
                    <strong>Livreur :</strong> {{ $dn->delivery_person }}<br>
                @endif
                @if($dn->invoice)
                    <strong>Réf. Facture :</strong> {{ $dn->invoice->number ?? $dn->invoice->reference }}
                @endif
            </div>
        </div>
    </div>

    <!-- CLIENT INFO -->
    <div class="meta-box client-box">
        <div class="box-label">LIVRÉ À</div>
        <div class="client-name">{{ $dn->client->name ?? 'Client Inconnu' }}</div>
        @if($dn->client->address)
            <div style="color: #475569;">{{ $dn->client->address }}</div>
        @endif
        @if($dn->client->phone)
            <div style="color: #475569; margin-top: 5px;">{{ $dn->client->phone }}</div>
        @endif
    </div>

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
