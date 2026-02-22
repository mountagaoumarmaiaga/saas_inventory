<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bon de Livraison {{ $dn->reference ?? $dn->number }}</title>
    <style>
        @page { margin: 20px; }
        body { 
            font-family: 'DejaVu Sans', sans-serif; 
            font-size: 13px; 
            color: #333; 
            line-height: 1.5;
        }
        .header { 
            display: table;
            width: 100%; 
            margin-bottom: 30px; 
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
        }
        .header-left {
            display: table-cell;
            width: 60%;
            vertical-align: top;
        }
        .header-right {
            display: table-cell;
            width: 40%;
            text-align: right;
            vertical-align: top;
        }
        .logo-container {
            float: left;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .logo {
            max-width: 65px;
            max-height: 65px;
            border: 1px solid #ddd;
            padding: 2px;
        }
        .company-info {
            overflow: hidden;
            text-align: left;
        }
        .company-name { 
            font-size: 14px; 
            font-weight: bold; 
            margin-bottom: 3px;
        }
        .doc-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .doc-number {
            font-size: 16px;
            font-weight: bold;
        }
        
        .client-box {
            border: 1px solid #ddd;
            background-color: #f9f9f9;
            padding: 12px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .client-title {
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        table.items {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table.items th {
            background-color: #f3f4f6;
            padding: 8px;
            text-align: left;
            border-bottom: 2px solid #000;
            font-size: 12px;
            font-weight: bold;
        }
        table.items td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }
        table.items .text-right { text-align: right; }
        table.items .reference {
            font-size: 11px;
            color: #666;
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
            border-top: 1px solid #000;
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
            border-top: 1px solid #ddd;
        }
        .clear { clear: both; }
    </style>
</head>
<body>
    <!-- HEADER -->
    <div class="header">
        <div class="header-left">
            @if(isset($dn->entreprise->logo) && $dn->entreprise->logo)
                <div class="logo-container">
                    {{-- Assuming logo path handling is verified otherwise use base64 logic if needed, but invoice used base64 var passed from controller --}}
                    {{-- To keep it simple and safe if base64 var isn't passed yet, we rely on text or ensure controller passes it. 
                         The previous file didn't use logo. Invoice used $logoBase64. 
                         We should use company name for now if logo logic differs or update controller. 
                         Let's assume we want to match invoice layout structure first. --}}
                    @if(isset($logoBase64))
                        <img src="{{ $logoBase64 }}" alt="Logo" class="logo">
                    @endif
                </div>
            @endif
            
            <div class="company-info">
                <div class="company-name">{{ $dn->entreprise->name ?? 'Entreprise' }}</div>
                
                @if($dn->entreprise->invoice_header)
                    <div style="font-size: 11px; line-height: 1.4; font-style: italic;">
                        {{ $dn->entreprise->invoice_header }}
                    </div>
                @endif
                
                <div>{{ $dn->entreprise->address ?? '' }}</div>
                <div>{{ $dn->entreprise->phone ?? '' }}</div>
                <div>{{ $dn->entreprise->email ?? '' }}</div>
            </div>
        </div>
        <div class="header-right">
            <div class="doc-title">BON DE LIVRAISON</div>
            <div class="doc-number">N°: {{ $dn->reference ?? $dn->number }}</div>
            <div><strong>Date :</strong> {{ \Carbon\Carbon::parse($dn->delivery_date)->format('d/m/Y') }}</div>
            @if($dn->delivery_person)
            <div><strong>Livreur :</strong> {{ $dn->delivery_person }}</div>
            @endif
            @if($dn->invoice)
            <div style="margin-top:5px; font-size:11px;">Réf. Facture : {{ $dn->invoice->number ?? $dn->invoice->reference }}</div>
            @endif
        </div>
    </div>

    <!-- CLIENT INFO -->
    <div class="client-box">
        <div class="client-title">DESTINATAIRE</div>
        <div><strong>Nom :</strong> {{ $dn->client->name ?? 'Client Inconnu' }}</div>
        @if($dn->client->address)
            <div><strong>Adresse :</strong> {{ $dn->client->address }}</div>
        @endif
        @if($dn->client->phone)
            <div><strong>Téléphone :</strong> {{ $dn->client->phone }}</div>
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
