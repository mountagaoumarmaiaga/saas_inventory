@php
$entrepriseRecord = $invoice->entreprise ?? $entreprise;
$primaryColor = $entrepriseRecord->primary_color ?? '#2d5a27';

$formatCurrency = function($amount) use ($currencySymbol, $currencyPosition) {
    if (!is_numeric($amount)) return '-';
    $formatted = number_format((float)$amount, 2, ',', ' ');
    return $currencyPosition === 'left' ? "{$currencySymbol} {$formatted}" : "{$formatted}{$currencySymbol}";
};

$tvaAmount = ($invoice->subtotal ?? 0) * ($invoice->tva ?? 0) / 100;
$discount = $invoice->discount ?? 0;
@endphp
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Facture {{ $invoice->number }}</title>
    <style>
        @page { margin: 0px; }
        * { box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: {{ $primaryColor }}; margin: 0; padding: 0; }
        .page-container { padding: 40px; }
        
        /* Header table */
        .header-table { width: 100%; margin-bottom: 30px; border-collapse: collapse; }
        .header-table td { vertical-align: top; }
        .logo-img { max-height: 80px; max-width: 200px; }
        .logo-fallback { font-size: 24px; font-weight: 900; color: {{ $primaryColor }}; font-style: italic; }
        .doc-title { font-size: 32px; font-weight: bold; color: {{ $primaryColor }}; text-transform: uppercase; text-align: right; letter-spacing: 2px;}
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
        
        /* Footer */
        .footer { width: 100%; text-align: center; position: fixed; bottom: 20px; font-size: 9px; color: #888; left: 0; right: 0; }
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
                    <div class="doc-title">FACTURE</div>
                    <div class="doc-meta">
                        <span class="meta-label">N° :</span> {{ $invoice->number }}<br>
                        <span class="meta-label">DATE :</span> {{ \Carbon\Carbon::parse($invoice->date)->format('d/m/Y') }}<br>
                        <span class="meta-label">ÉCHÉANCE :</span> {{ $invoice->due_date ? \Carbon\Carbon::parse($invoice->due_date)->format('d/m/Y') : 'À réception' }}
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
                    <div class="block-title">Destinataire</div>
                    <div class="client-name">{{ $invoice->client->name ?? '' }}</div>
                    <div>{!! nl2br(e($invoice->client->address ?? '')) !!}</div>
                    @if($invoice->client->phone ?? null)<div style="margin-top: 5px;"><strong>Tél:</strong> {{ $invoice->client->phone }}</div>@endif
                    @if($invoice->client->email ?? null)<div><strong>Email:</strong> {{ $invoice->client->email }}</div>@endif
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
                @foreach($invoice->items as $item)
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
        

        <!-- NOTES + ARRÊTÉ -->
        @if(!empty($invoice->notes) || !empty($qrCodeBase64))
        <div style="margin-top: 20px;">
            @if(!empty($invoice->notes))
            <div class="notes-box" style="margin-bottom: 10px;">
                <div class="notes-title">Notes &amp; Règlement</div>
                <div>{!! nl2br(e($invoice->notes)) !!}</div>
            </div>
            @endif
            @if(!empty($qrCodeBase64))
                <img src="{{ $qrCodeBase64 }}" style="width: 70px; height: 70px;">
            @endif
        </div>
        @endif

        <div style="margin-top: 15px; font-style: italic; font-size: 11px; padding: 10px; border: 1px dashed #ccc; width: 48%;">
            Arrêté la présente facture à la somme de :<br>
            <strong>{{ ucfirst(\App\Helpers\NumberToWords::convert($invoice->total ?? 0)) }} {{ $currencySymbol }}</strong>
        </div>

        <!-- TOTALS TABLE (standalone, right-aligned) -->
        <table style="width: 48%; margin-left: 52%; border-collapse: collapse; margin-top: -5px;">
            <tr>
                <td style="padding: 8px 14px; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #555; background-color: #fafafa; border: 1px solid #e8e8e8;">TOTAL HT</td>
                <td style="padding: 8px 14px; font-size: 13px; font-weight: bold; text-align: right; color: #111; background-color: #fafafa; border: 1px solid #e8e8e8;">{{ $formatCurrency($invoice->subtotal ?? 0) }}</td>
            </tr>
            @if(($invoice->tva ?? 0) > 0)
            <tr>
                <td style="padding: 8px 14px; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #555; background-color: #fafafa; border: 1px solid #e8e8e8; border-top: none;">TVA ({{ $invoice->tva }}%)</td>
                <td style="padding: 8px 14px; font-size: 13px; font-weight: bold; text-align: right; color: #111; background-color: #fafafa; border: 1px solid #e8e8e8; border-top: none;">{{ $formatCurrency($tvaAmount) }}</td>
            </tr>
            @endif
            @if($discount > 0)
            <tr>
                <td style="padding: 8px 14px; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #555; background-color: #fafafa; border: 1px solid #e8e8e8; border-top: none;">REMISE</td>
                <td style="padding: 8px 14px; font-size: 13px; font-weight: bold; text-align: right; color: #111; background-color: #fafafa; border: 1px solid #e8e8e8; border-top: none;">-{{ $formatCurrency($discount) }}</td>
            </tr>
            @endif
            <tr>
                <td style="padding: 10px 14px; font-size: 13px; font-weight: bold; text-transform: uppercase; color: #fff; background-color: {{ $primaryColor }}; border: 1px solid {{ $primaryColor }};">TOTAL TTC</td>
                <td style="padding: 10px 14px; font-size: 15px; font-weight: bold; text-align: right; color: #fff; background-color: {{ $primaryColor }}; border: 1px solid {{ $primaryColor }};">{{ $formatCurrency($invoice->total ?? 0) }}</td>
            </tr>
        </table>

        <!-- SIGNATURE (standalone table) -->
        <table style="width: 40%; margin-left: 60%; border-collapse: collapse; margin-top: 25px;">
            <tr>
                <td style="text-align: center; font-weight: bold; font-size: 10px; text-transform: uppercase; padding: 8px; border: 1px solid {{ $primaryColor }}; color: {{ $primaryColor }}; background-color: #f8f8f8;">CACHET ET SIGNATURE</td>
            </tr>
            <tr>
                <td style="height: 80px; border: 1px solid #ccc; border-top: none;"></td>
            </tr>
        </table>


        <div class="footer">
            @if($entrepriseRecord->invoice_footer)
                {!! nl2br(e($entrepriseRecord->invoice_footer)) !!}
            @else
                En cas de retard de paiement, une indemnité de 10% par jour de retard ainsi que des frais de recouvrement seront exigibles.
            @endif
        </div>
    </div>
</body>
</html>
