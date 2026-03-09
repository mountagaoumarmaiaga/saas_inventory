@php
$entrepriseRecord = $deliveryNote->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#3c7a3c';
@endphp
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bon de Livraison {{ $deliveryNote->number }}</title>
    <style>
        @page { margin: 0px; }
        * { box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: #333; margin: 0; padding: 0; line-height: 1.5; }
        .page-container { padding: 40px; }
        
        /* Header table */
        .header-table { width: 100%; border-bottom: 3px solid {{ $primaryColor }}; padding-bottom: 20px; margin-bottom: 30px; border-collapse: collapse; }
        .header-table td { vertical-align: top; }
        .logo-img { max-height: 80px; max-width: 200px; }
        .logo-fallback { font-size: 24px; font-weight: 900; color: {{ $primaryColor }}; font-style: italic; }
        .doc-title { font-size: 28px; font-weight: bold; color: {{ $primaryColor }}; text-transform: uppercase; text-align: right; letter-spacing: 1px; margin-bottom: 5px;}
        .doc-meta { text-align: right; font-size: 12px; color: #555; }
        .doc-meta .meta-label { font-weight: bold; color: #333; }
        
        /* Company & Supplier blocks */
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        .info-table td { width: 50%; vertical-align: top; }
        .info-block { padding: 15px; border: 1px solid #eee; border-left: 4px solid {{ $primaryColor }}; background-color: #fafafa; min-height: 120px; }
        .block-title { font-size: 10px; font-weight: bold; text-transform: uppercase; color: #777; margin-bottom: 10px; letter-spacing: 1px; }
        .entity-name { font-weight: bold; font-size: 14px; margin-bottom: 5px; color: {{ $primaryColor }}; text-transform: uppercase; }
        .entity-details { color: #444; line-height: 1.6; }
        
        /* Items table */
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        .items-table th { border-top: 2px solid {{ $primaryColor }}; border-bottom: 2px solid {{ $primaryColor }}; color: {{ $primaryColor }}; text-transform: uppercase; font-size: 10px; padding: 12px; text-align: left; letter-spacing: 1px; }
        .items-table th.center { text-align: center; }
        .items-table td { padding: 12px; border-bottom: 1px solid #eee; font-size: 11px; color: #333; }
        .items-table td.center { text-align: center; font-weight: bold; }
        
        /* Bottom Signatures */
        .signatures-table { width: 100%; border-collapse: collapse; margin-top: 20px; page-break-inside: avoid; }
        .signatures-table td { width: 50%; vertical-align: top; }
        .sig-box { padding: 20px 0; }
        .sig-title { font-weight: bold; font-size: 13px; text-transform: uppercase; color: #111; margin-bottom: 10px; }
        .sig-date { font-size: 11px; color: #555; margin-bottom: 60px; }
        .sig-line { width: 80%; border-bottom: 1px solid #333; }
        
        /* Footer */
        .footer { width: 100%; text-align: center; position: fixed; bottom: 20px; font-size: 9px; color: #888; border-top: 1px solid #eee; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="footer">
        @if($entrepriseRecord->invoice_footer)
            {!! nl2br(e($entrepriseRecord->invoice_footer)) !!}
        @else
            {{ $entrepriseRecord->name ?? '' }} | {{ $entrepriseRecord->address ?? '' }}
            @if($entrepriseRecord->phone) | Tél : {{ $entrepriseRecord->phone }} @endif
            @if($entrepriseRecord->email) | Email : {{ $entrepriseRecord->email }} @endif
        @endif
    </div>

    <div class="page-container">
        <!-- HEADER -->
        <table class="header-table">
            <tr>
                <td style="width: 50%;">
                    @if(!empty($logoBase64))
                        <img src="{{ $logoBase64 }}" class="logo-img" alt="Logo">
                    @else
                        <div class="logo-fallback">{{ $entrepriseRecord->name ?? '' }}</div>
                    @endif
                </td>
                <td style="width: 50%; text-align: right;">
                    <div class="doc-title">BON DE LIVRAISON</div>
                    <div class="doc-meta">
                        <span class="meta-label">N° :</span> {{ $deliveryNote->number }}<br>
                        <span class="meta-label">DATE :</span> {{ \Carbon\Carbon::parse($deliveryNote->date)->format('d/m/Y') }}<br>
                        <span class="meta-label">RÉF. FACTURE :</span> {{ $deliveryNote->invoice ? $deliveryNote->invoice->number : '-' }}
                    </div>
                </td>
            </tr>
        </table>
        
        <!-- ADDRESSES -->
        <table class="info-table">
            <tr>
                <td style="padding-right: 15px;">
                    <div class="info-block">
                        <div class="block-title">Émetteur</div>
                        <div class="entity-name">{{ $entrepriseRecord->name ?? '' }}</div>
                        <div class="entity-details">
                            {!! nl2br(e($entrepriseRecord->address ?? '')) !!}<br>
                            @if($entrepriseRecord->phone ?? null)<strong>Tél:</strong> {{ $entrepriseRecord->phone }}<br>@endif
                            @if($entrepriseRecord->email ?? null)<strong>Email:</strong> {{ $entrepriseRecord->email }}@endif
                        </div>
                    </div>
                </td>
                <td style="padding-left: 15px;">
                    <div class="info-block">
                        <div class="block-title">Destinataire (Client)</div>
                        <div class="entity-name">{{ $deliveryNote->client->name ?? '' }}</div>
                        <div class="entity-details">
                            {!! nl2br(e($deliveryNote->client->address ?? '')) !!}<br>
                            @if($deliveryNote->client->phone ?? null)<strong>Tél:</strong> {{ $deliveryNote->client->phone }}<br>@endif
                            @if($deliveryNote->client->email ?? null)<strong>Email:</strong> {{ $deliveryNote->client->email }}@endif
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        
        <!-- ITEMS -->
        <table class="items-table">
            <thead>
                <tr>
                    <th class="center" style="width: 15%;">Qté</th>
                    <th style="width: 85%;">Désignation</th>
                </tr>
            </thead>
            <tbody>
                @foreach($deliveryNote->items as $item)
                <tr>
                    <td class="center">{{ $item->quantity }}</td>
                    <td>
                        {{ $item->product ? $item->product->name : $item->description }}
                        @if($item->product && $item->product->reference)
                            <br><span style="font-size: 9px; color: #777;">(Réf: {{ $item->product->reference }})</span>
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
                        <div class="sig-date" style="text-align: right;">Reçu le : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div class="sig-line" style="width: 100%;"></div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
