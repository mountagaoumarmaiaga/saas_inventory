@php
$entrepriseRecord = $purchase->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#2d5a27';

$formatCurrency = function($amount) use ($currencySymbol, $currencyPosition) {
    if (!is_numeric($amount)) return '-';
    $formatted = number_format((float)$amount, 2, ',', ' ');
    return $currencyPosition === 'left' ? "{$currencySymbol} {$formatted}" : "{$formatted}{$currencySymbol}";
};

$tvaAmount = ($purchase->subtotal ?? 0) * ($purchase->tva ?? 0) / 100;
$discount = $purchase->discount ?? 0;
@endphp
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bon de Commande {{ $purchase->number }}</title>
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
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .items-table th { background-color: {{ $primaryColor }}; color: #fff; text-transform: uppercase; font-size: 10px; padding: 10px; text-align: left; letter-spacing: 1px; border: 1px solid {{ $primaryColor }}; }
        .items-table th.center { text-align: center; }
        .items-table th.right { text-align: right; }
        .items-table td { padding: 10px; border: 1px solid #ddd; font-size: 11px; color: #333; }
        .items-table td.center { text-align: center; }
        .items-table td.right { text-align: right; }
        .items-table tr:nth-child(even) { background-color: #fafafa; }
        
        /* Totals & Notes */
        .bottom-wrapper { width: 100%; border-collapse: collapse; }
        .bottom-wrapper td { vertical-align: top; }
        
        .notes-box { padding: 15px; background-color: #fcfcfc; border: 1px solid #ddd; border-top: 3px solid {{ $primaryColor }}; font-size: 10px; color: #555; }
        .notes-title { font-weight: bold; color: #111; margin-bottom: 5px; text-transform: uppercase; font-size: 11px; }
        
        .totals-table { width: 100%; border-collapse: collapse; }
        .totals-table td { padding: 8px 10px; text-align: right; border: 1px solid #ddd; }
        .totals-table td.label { font-weight: bold; color: #555; font-size: 10px; text-transform: uppercase; background-color: #fafafa; }
        .totals-table td.value { font-weight: bold; color: #111; font-size: 12px; }
        .totals-table tr.grand-total td { background-color: {{ $primaryColor }}; color: #fff; font-size: 14px; border: 1px solid {{ $primaryColor }}; }
        .totals-table tr.grand-total td.label { color: #fff; background-color: {{ $primaryColor }}; }
        
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
                    <div class="doc-title">BON DE COMMANDE</div>
                    <div class="doc-meta">
                        <span class="meta-label">N° :</span> {{ $purchase->number }}<br>
                        <span class="meta-label">DATE :</span> {{ \Carbon\Carbon::parse($purchase->date)->format('d/m/Y') }}<br>
                        <span class="meta-label">ÉCHÉANCE :</span> {{ $purchase->due_date ? \Carbon\Carbon::parse($purchase->due_date)->format('d/m/Y') : 'À réception' }}
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
                    <div class="block-title">Destinataire (Fournisseur)</div>
                    <div class="client-name">{{ $purchase->supplier->name ?? ($purchase->client->name ?? '') }}</div>
                    <div>{!! nl2br(e($purchase->supplier->address ?? ($purchase->client->address ?? ''))) !!}</div>
                    @if($purchase->supplier->phone ?? ($purchase->client->phone ?? null))<div style="margin-top: 5px;"><strong>Tél:</strong> {{ $purchase->supplier->phone ?? $purchase->client->phone }}</div>@endif
                    @if($purchase->supplier->email ?? ($purchase->client->email ?? null))<div><strong>Email:</strong> {{ $purchase->supplier->email ?? $purchase->client->email }}</div>@endif
                </td>
            </tr>
        </table>
        
        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 48%;">Désignation</th>
                    <th class="right" style="width: 17%;">Prix Unitaire</th>
                    <th class="center" style="width: 15%;">Quantité</th>
                    <th class="right" style="width: 20%;">Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach($purchase->items as $item)
                <tr>
                    <td>{{ $item->product ? $item->product->name : $item->description }}</td>
                    <td class="right">@if($item->unit_price > 0) {{ $formatCurrency($item->unit_price) }} @else - @endif</td>
                    <td class="center">{{ $item->quantity }}</td>
                    <td class="right">
                        @php $lineTotal = $item->total_price ?? ($item->unit_price * $item->quantity); @endphp
                        @if($lineTotal > 0) {{ $formatCurrency($lineTotal) }} @else OFFERT @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
        
        <table class="bottom-wrapper">
            <tr>
                <td style="width: 50%; padding-right: 30px;">
                    <div class="notes-box">
                        <div class="notes-title">Notes & Conditions</div>
                        <div style="margin-bottom: 10px;">
                            @if($entrepriseRecord->invoice_header)
                                {!! nl2br(e($entrepriseRecord->invoice_header)) !!}
                            @else
                                <strong>Conditions d'achat :</strong><br>
                                Veuillez indiquer le numéro de commande ({{ $purchase->number }}) sur toutes les correspondances.
                            @endif
                        </div>
                        <div>
                            @if($entrepriseRecord->invoice_footer)
                                {!! nl2br(e($entrepriseRecord->invoice_footer)) !!}
                            @else
                                La présente commande est soumise aux conditions générales d'achat.
                            @endif
                        </div>
                    </div>
                </td>
                <td style="width: 50%;">
                    <table class="totals-table">
                        <tr>
                            <td class="label">Total HT</td>
                            <td class="value">{{ $formatCurrency($purchase->subtotal ?? 0) }}</td>
                        </tr>
                        @if(($purchase->tva ?? 0) > 0)
                        <tr>
                            <td class="label">TVA ({{ $purchase->tva }}%)</td>
                            <td class="value">{{ $formatCurrency($tvaAmount) }}</td>
                        </tr>
                        @endif
                        @if($discount > 0)
                        <tr>
                            <td class="label">Remise</td>
                            <td class="value">-{{ $formatCurrency($discount) }}</td>
                        </tr>
                        @endif
                        <tr class="grand-total">
                            <td class="label">Total TTC</td>
                            <td class="value">{{ $formatCurrency($purchase->total ?? 0) }}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
