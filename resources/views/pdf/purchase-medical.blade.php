@php
$entrepriseRecord = $purchase->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#3c7a3c';

$formatCurrency = function($amount) use ($currencySymbol, $currencyPosition) {
    if (!is_numeric($amount)) return '-';
    $formatted = number_format((float)$amount, 2, ',', ' ');
    return $currencyPosition === 'left' ? "{$currencySymbol} {$formatted}" : "{$formatted} {$currencySymbol}";
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
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .items-table th { border-top: 2px solid {{ $primaryColor }}; border-bottom: 2px solid {{ $primaryColor }}; color: {{ $primaryColor }}; text-transform: uppercase; font-size: 10px; padding: 12px; text-align: left; letter-spacing: 1px; }
        .items-table th.center { text-align: center; }
        .items-table th.right { text-align: right; }
        .items-table td { padding: 12px; border-bottom: 1px solid #eee; font-size: 11px; color: #333; }
        .items-table td.center { text-align: center; }
        .items-table td.right { text-align: right; font-weight: bold; }
        
        /* Totals & Notes */
        .bottom-wrapper { width: 100%; border-collapse: collapse; page-break-inside: avoid; }
        .bottom-wrapper td { vertical-align: top; }
        
        .notes-box { font-size: 10px; color: #666; padding-right: 40px; }
        .notes-title { font-weight: bold; color: {{ $primaryColor }}; margin-bottom: 5px; text-transform: uppercase; font-size: 11px; }
        
        .totals-table { width: 100%; border-collapse: collapse; }
        .totals-table td { padding: 8px 12px; text-align: right; border-bottom: 1px solid #eee; }
        .totals-table td.label { color: #555; font-size: 11px; }
        .totals-table td.value { font-weight: bold; color: #111; font-size: 12px; }
        .totals-table tr.grand-total td { background-color: #fcfcfc; color: {{ $primaryColor }}; font-size: 15px; border-bottom: 2px solid {{ $primaryColor }}; border-top: 2px solid {{ $primaryColor }}; }
        .totals-table tr.grand-total td.label { font-weight: bold; }
        
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
                    <div class="doc-title">BON DE COMMANDE</div>
                    <div class="doc-meta">
                        <span class="meta-label">N° :</span> {{ $purchase->number }}<br>
                        <span class="meta-label">DATE :</span> {{ \Carbon\Carbon::parse($purchase->date)->format('d/m/Y') }}<br>
                        <span class="meta-label">ÉCHÉANCE :</span> {{ $purchase->due_date ? \Carbon\Carbon::parse($purchase->due_date)->format('d/m/Y') : 'À réception' }}
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
                        <div class="block-title">Destinataire (Fournisseur)</div>
                        <div class="entity-name">{{ $purchase->supplier->name ?? ($purchase->client->name ?? '') }}</div>
                        <div class="entity-details">
                            {!! nl2br(e($purchase->supplier->address ?? ($purchase->client->address ?? ''))) !!}<br>
                            @if($purchase->supplier->phone ?? ($purchase->client->phone ?? null))<strong>Tél:</strong> {{ $purchase->supplier->phone ?? $purchase->client->phone }}<br>@endif
                            @if($purchase->supplier->email ?? ($purchase->client->email ?? null))<strong>Email:</strong> {{ $purchase->supplier->email ?? $purchase->client->email }}@endif
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        
        <!-- ITEMS -->
        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 50%;">Description</th>
                    <th class="center" style="width: 15%;">Qté</th>
                    <th class="right" style="width: 15%;">Prix U.</th>
                    <th class="right" style="width: 20%;">Montant</th>
                </tr>
            </thead>
            <tbody>
                @foreach($purchase->items as $item)
                <tr>
                    <td>
                        {{ $item->product ? $item->product->name : $item->description }}
                        @if($item->product && $item->product->reference)
                            <br><span style="font-size: 9px; color: #777;">(Réf: {{ $item->product->reference }})</span>
                        @endif
                    </td>
                    <td class="center">{{ $item->quantity }}</td>
                    <td class="right">@if($item->unit_price > 0) {{ $formatCurrency($item->unit_price) }} @else - @endif</td>
                    <td class="right">
                        @php $lineTotal = $item->total_price ?? ($item->unit_price * $item->quantity); @endphp
                        @if($lineTotal > 0) {{ $formatCurrency($lineTotal) }} @else OFFERT @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
        
        <!-- BOTTOM SECTION -->
        <table class="bottom-wrapper">
            <tr>
                <td style="width: 55%;">
                    <div class="notes-box">
                        <div class="notes-title">Notes et Conditions</div>
                        <div style="margin-bottom: 15px;">
                            @if($entrepriseRecord->invoice_header)
                                {!! nl2br(e($entrepriseRecord->invoice_header)) !!}
                            @else
                                La présente commande est ferme et définitive.<br>
                                Merci d'indiquer notre numéro de commande ({{ $purchase->number }}) sur votre facturation.
                            @endif
                        </div>
                        <div style="border: 1px dashed #ccc; padding: 10px; margin-top: 20px; font-style: italic;">
                            Arrêté la présente commande à la somme de :<br>
                            <strong>{{ $formatCurrency($purchase->total ?? 0) }}</strong>
                        </div>
                    </div>
                </td>
                <td style="width: 45%;">
                    <table class="totals-table">
                        <tr>
                            <td class="label">Sous-total HT</td>
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
