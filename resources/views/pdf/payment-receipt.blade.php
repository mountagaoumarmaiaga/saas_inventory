<!DOCTYPE html>
<html>
@php
$formatCurrency = function($amount) use ($currencySymbol, $currencyPosition) {
    $formatted = number_format($amount, 0, ',', ' ');
    return $currencyPosition === 'left' ? "{$currencySymbol} {$formatted}" : "{$formatted} {$currencySymbol}";
};
@endphp
<head>
    <meta charset="utf-8">
    <title>Reçu de Paiement N°{{ str_pad($payment->id, 5, '0', STR_PAD_LEFT) }}</title>
    <style>
        @page { margin: 50px; }
        body { 
            font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; 
            font-size: 11px; 
            color: #333333; 
            line-height: 1.8;
            font-weight: 300;
        }
        .header { width: 100%; margin-bottom: 60px; }
        .header td { vertical-align: top; }
        .company-name {
            font-size: 16px;
            font-weight: bold;
            color: #111111;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        .receipt-title {
            font-size: 12px;
            color: #888888;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 5px;
        }
        .receipt-number {
            font-size: 24px;
            color: #111111;
            font-weight: 300;
            letter-spacing: 1px;
        }
        .info-grid { width: 100%; margin-bottom: 30px; }
        .info-grid td { width: 50%; vertical-align: top; padding-bottom: 10px; }
        .label {
            font-size: 9px;
            color: #999999;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 5px;
            display: block;
        }
        .val { font-size: 12px; font-weight: bold; color: #111111; }
        
        table.items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 50px;
        }
        table.items-table th {
            border-bottom: 1px solid #eeeeee;
            padding: 10px 0;
            text-align: left;
            font-size: 9px;
            color: #999999;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: normal;
        }
        table.items-table td {
            padding: 15px 0;
            border-bottom: 1px solid #f9f9f9;
            vertical-align: top;
            font-size: 12px;
        }
        .text-right { text-align: right; }
        
        .footer {
            margin-top: 80px;
            font-size: 9px;
            color: #aaaaaa;
            text-align: center;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <table class="header">
        <tr>
            <td style="width: 50%;">
                @if($logoBase64)
                    <img src="{{ $logoBase64 }}" style="max-height: 40px; margin-bottom: 20px;">
                @endif
                <div class="company-name">{{ $invoice->entreprise->name ?? 'Entreprise' }}</div>
                <div style="color: #666666;">
                    {{ $invoice->entreprise->address ?? '' }}<br>
                    {{ $invoice->entreprise->phone ?? '' }}<br>
                    {{ $invoice->entreprise->email ?? '' }}
                </div>
            </td>
            <td style="width: 50%; text-align: right;">
                <div class="receipt-title">Reçu de Paiement</div>
                <div class="receipt-number">N°{{ str_pad($payment->id, 5, '0', STR_PAD_LEFT) }}</div>
                <div style="color: #888888; margin-top: 15px;">Date de paiement : {{ \Carbon\Carbon::parse($payment->date)->format('d.m.Y') }}</div>
            </td>
        </tr>
    </table>

    <table class="info-grid">
        <tr>
            <td style="padding-right: 40px;">
                <div class="label">Reçu de</div>
                <div class="val">{{ $invoice->client->name ?? 'Client' }}</div>
            </td>
            <td style="padding-left: 40px;">
                <div class="label">Référence Facture</div>
                <div class="val">{{ $invoice->number }}</div>
            </td>
        </tr>
        <tr>
            <td style="padding-right: 40px;">
                <div class="label">Mode de Paiement</div>
                <div class="val">{{ $payment->payment_method }} {{ $payment->reference ? '('.$payment->reference.')' : '' }}</div>
            </td>
            <td style="padding-left: 40px;">
                <div class="label">Reste à payer sur la facture</div>
                <div class="val">{{ $formatCurrency($invoice->amount_due) }}</div>
            </td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 70%;">Description</th>
                <th class="text-right" style="width: 30%;">Montant Payé</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div style="font-weight: bold; color: #111111;">Règlement partiel ou total de la facture</div>
                    @if($payment->notes)
                        <div style="font-size: 10px; color: #666666; margin-top: 4px;">{{ $payment->notes }}</div>
                    @endif
                </td>
                <td class="text-right" style="font-weight: bold; color: #111111;">{{ $formatCurrency($payment->amount) }}</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <div>Merci pour votre paiement.</div>
    </div>
</body>
</html>
