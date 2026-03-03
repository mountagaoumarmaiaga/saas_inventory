<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Rapport de Performance - {{ $entreprise->name }}</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f5; color: #18181b; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { border-bottom: 2px solid #f4f4f5; padding-bottom: 20px; margin-bottom: 20px; text-align: center; }
        .header h1 { font-size: 24px; color: #ea580c; margin: 0; }
        .header p { color: #71717a; margin-top: 5px; font-size: 14px; }
        
        .metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; }
        .metric-card { background: #fafafa; padding: 15px; border-radius: 6px; border: 1px solid #e4e4e7; }
        .metric-card h3 { font-size: 12px; text-transform: uppercase; color: #71717a; margin: 0 0 5px 0; }
        .metric-card p { font-size: 20px; font-weight: bold; margin: 0; color: #18181b; }
        
        .profit { color: #16a34a; }
        .loss { color: #dc2626; }
        
        .footer { text-align: center; padding-top: 20px; border-top: 1px solid #f4f4f5; color: #a1a1aa; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Rapport {{ ucfirst($period) }}</h1>
            <p>{{ $entreprise->name }} | {{ $metrics['start_date'] }} au {{ $metrics['end_date'] }}</p>
        </div>

        <div style="margin-bottom: 20px;">
            <p>Bonjour,</p>
            <p>Voici le résumé de vos performances financières pour la période sélectionnée.</p>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 15px;">
            <div class="metric-card" style="flex: 1;">
                <h3>Revenu Confirmé</h3>
                <p>{{ number_format($metrics['revenue'], 0, ',', ' ') }} XOF</p>
            </div>
            <div class="metric-card" style="flex: 1;">
                <h3>En Attente</h3>
                <p style="color: #ea580c;">{{ number_format($metrics['pending_revenue'], 0, ',', ' ') }} XOF</p>
            </div>
        </div>
        
        <div style="display: flex; gap: 15px; margin-bottom: 15px;">
            <div class="metric-card" style="flex: 1;">
                <h3>Dépenses & Achats</h3>
                <p>{{ number_format($metrics['expenses'], 0, ',', ' ') }} XOF</p>
            </div>
            <div class="metric-card" style="flex: 1; border-color: {{ $metrics['net_profit'] >= 0 ? '#16a34a' : '#dc2626' }};">
                <h3>Bénéfice Net</h3>
                <p class="{{ $metrics['net_profit'] >= 0 ? 'profit' : 'loss' }}">{{ number_format($metrics['net_profit'], 0, ',', ' ') }} XOF</p>
            </div>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 30px;">
            <div class="metric-card" style="flex: 1;">
                <h3>Nouveaux Clients</h3>
                <p>{{ $metrics['new_clients'] }}</p>
            </div>
            <div class="metric-card" style="flex: 1;">
                <h3>Factures Émises</h3>
                <p>{{ $metrics['new_invoices_count'] }}</p>
            </div>
        </div>

        <div class="footer">
            <p>Généré automatiquement par {{ config('app.name') }}</p>
        </div>
    </div>
</body>
</html>
