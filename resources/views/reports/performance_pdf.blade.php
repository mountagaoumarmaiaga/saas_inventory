<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Rapport de Performance - {{ $entreprise->name }}</title>
    <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; font-size: 14px; color: #333; margin: 0; padding: 0; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #ddd; padding-bottom: 20px; }
        .header h1 { margin: 0; color: #111; font-size: 24px; }
        .header p { margin: 5px 0 0 0; color: #555; }
        .table-container { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table-container th, .table-container td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        .table-container th { background-color: #f8f9fa; color: #333; font-weight: bold; }
        .profit { color: #16a34a; font-weight: bold; }
        .loss { color: #dc2626; font-weight: bold; }
        .footer { text-align: center; margin-top: 50px; font-size: 11px; color: #888; border-top: 1px solid #ddd; padding-top: 15px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Rapport de Performance ({{ ucfirst($period) }})</h1>
        <p><strong>{{ $entreprise->name }}</strong></p>
        <p>Période du {{ $metrics['start_date'] }} au {{ $metrics['end_date'] }}</p>
        <p style="font-size: 12px; color: #999;">Généré le: {{ $date }}</p>
    </div>

    <table class="table-container">
        <thead>
            <tr>
                <th>Métrique</th>
                <th>Valeur</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Revenu Brut (Encaissé)</td>
                <td><strong>{{ number_format($metrics['revenue'], 0, ',', ' ') }} XOF</strong></td>
                <td>Revenu total effectivement perçu sur la période</td>
            </tr>
            <tr>
                <td>Revenu en attente</td>
                <td>{{ number_format($metrics['pending_revenue'], 0, ',', ' ') }} XOF</td>
                <td>Montant facturé, non encore réglé</td>
            </tr>
            <tr>
                <td>Dépenses & Achats</td>
                <td>{{ number_format($metrics['expenses'], 0, ',', ' ') }} XOF</td>
                <td>Total des décaissements</td>
            </tr>
            <tr>
                <td>Bénéfice Net</td>
                <td class="{{ $metrics['net_profit'] >= 0 ? 'profit' : 'loss' }}">{{ number_format($metrics['net_profit'], 0, ',', ' ') }} XOF</td>
                <td>Différence entre Revenu Brut et Dépenses</td>
            </tr>
            <tr>
                <td>Nouveaux Clients</td>
                <td>{{ $metrics['new_clients'] }}</td>
                <td>Périmètre client élargi</td>
            </tr>
            <tr>
                <td>Factures Émises</td>
                <td>{{ $metrics['new_invoices_count'] }}</td>
                <td>Volume total d'activité de facturation</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p>Document généré automatiquement via {{ config('app.name') }} - Ne nécessite pas de signature.</p>
    </div>
</body>
</html>
