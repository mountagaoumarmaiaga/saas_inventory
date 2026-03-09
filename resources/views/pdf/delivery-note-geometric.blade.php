@php
$entrepriseRecord = $deliveryNote->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#2d5a27';
@endphp
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bon de Livraison {{ $deliveryNote->number }}</title>
    <style>
        @page { margin: 0px; }
        * { box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: #333; margin: 0; padding: 0; }
        .page-container { padding: 40px; }
        
        /* Header table */
        .header-table { width: 100%; margin-bottom: 30px; border-collapse: collapse; }
        .header-table td { vertical-align: top; }
        .logo-img { max-height: 80px; max-width: 200px; }
        .logo-fallback { font-size: 24px; font-weight: 900; color: {{ $primaryColor }}; font-style: italic; }
        .doc-title { font-size: 28px; font-weight: bold; color: {{ $primaryColor }}; text-transform: uppercase; text-align: right; letter-spacing: 1px;}
        .doc-meta { text-align: right; font-size: 12px; margin-top: 5px; color: #666; }
        .doc-meta .meta-label { font-weight: bold; color: #333; }
        
        /* Company & Client blocks */
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; margin-top: 10px; }
        .info-table td { width: 50%; vertical-align: top; padding: 15px; border: 1px solid #ddd; }
        .info-table .bg-tint { background-color: #fcfcfc; }
        .block-title { font-size: 10px; font-weight: bold; text-transform: uppercase; color: {{ $primaryColor }}; border-bottom: 2px solid {{ $primaryColor }}; padding-bottom: 5px; margin-bottom: 10px; letter-spacing: 1px; }
        .company-name, .client-name { font-weight: bold; font-size: 14px; margin-bottom: 5px; color: #111; text-transform: uppercase; }
        
        /* Items table */
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 50px; }
        .items-table th { background-color: {{ $primaryColor }}; color: #fff; text-transform: uppercase; font-size: 10px; padding: 10px; text-align: left; letter-spacing: 1px; border: 1px solid {{ $primaryColor }}; }
        .items-table th.center { text-align: center; }
        .items-table td { padding: 10px; border: 1px solid #ddd; font-size: 11px; color: #333; }
        .items-table td.center { text-align: center; font-weight: bold; }
        .items-table tr:nth-child(even) { background-color: #fafafa; }
        
        /* Signatures block */
        .signatures-table { width: 100%; border-collapse: collapse; page-break-inside: avoid; margin-top: 20px; }
        .signatures-table td { width: 50%; vertical-align: top; }
        .sig-box { padding: 0; }
        .sig-title { font-weight: bold; font-size: 12px; text-transform: uppercase; color: {{ $primaryColor }}; margin-bottom: 15px; }
        .sig-date { font-size: 11px; color: #555; margin-bottom: 60px; }
        .sig-line { width: 70%; border-bottom: 1px solid #666; }
        
        /* Geometric accents */
        .top-accent { width: 100%; height: 12px; background-color: {{ $primaryColor }}; position: absolute; top: 0; left: 0; }
        .bottom-accent { width: 100%; height: 12px; background-color: {{ $primaryColor }}; position: absolute; bottom: 0; left: 0; }
    </style>
</head>
<body>
    <div class="top-accent"></div>
    <div class="bottom-accent"></div>
    
    <div class="page-container">
        <table class="header-table">
            <tr>
                <td style="width: 50%;">
                    @if(!empty($logoBase64))
                        <img src="{{ $logoBase64 }}" class="logo-img" alt="Logo">
                    @else
                        <div class="logo-fallback">{{ $entrepriseRecord->name ?? '' }}</div>
                    @endif
                </td>
                <td style="width: 50%;">
                    <div class="doc-title">BON DE LIVRAISON</div>
                    <div class="doc-meta">
                        <span class="meta-label">N° :</span> {{ $deliveryNote->number }}<br>
                        <span class="meta-label">DATE :</span> {{ \Carbon\Carbon::parse($deliveryNote->date)->format('d/m/Y') }}<br>
                        <span class="meta-label">STATUT :</span> {{ $deliveryNote->status ?? 'Livré' }}
                    </div>
                </td>
            </tr>
        </table>
        
        <table class="info-table">
            <tr>
                <td class="bg-tint" style="border-right: 15px solid #fff;">
                    <div class="block-title">Émetteur</div>
                    <div class="company-name">{{ $entrepriseRecord->name ?? '' }}</div>
                    <div>{!! nl2br(e($entrepriseRecord->address ?? '')) !!}</div>
                    @if($entrepriseRecord->phone ?? null)<div style="margin-top: 5px;"><strong>Tél:</strong> {{ $entrepriseRecord->phone }}</div>@endif
                    @if($entrepriseRecord->email ?? null)<div><strong>Email:</strong> {{ $entrepriseRecord->email }}</div>@endif
                </td>
                <td class="bg-tint">
                    <div class="block-title">Destinataire (Client)</div>
                    <div class="client-name">{{ $deliveryNote->client->name ?? '' }}</div>
                    <div>{!! nl2br(e($deliveryNote->client->address ?? '')) !!}</div>
                    @if($deliveryNote->client->phone ?? null)<div style="margin-top: 5px;"><strong>Tél:</strong> {{ $deliveryNote->client->phone }}</div>@endif
                    @if($deliveryNote->client->email ?? null)<div><strong>Email:</strong> {{ $deliveryNote->client->email }}</div>@endif
                </td>
            </tr>
        </table>
        
        <table class="items-table">
            <thead>
                <tr>
                    <th class="center" style="width: 15%;">Quantité</th>
                    <th style="width: 85%;">Désignation</th>
                </tr>
            </thead>
            <tbody>
                @foreach($deliveryNote->items as $item)
                <tr>
                    <td class="center">{{ $item->quantity }}</td>
                    <td>{{ $item->product ? $item->product->name : $item->description }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
        
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
                        <div class="sig-title">SIGNATURE CLIENT</div>
                        <div class="sig-date">Reçu le : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div class="sig-line" style="width: 100%;"></div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
