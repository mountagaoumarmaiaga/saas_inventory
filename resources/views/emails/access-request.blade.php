<x-mail::message>
# Nouvelle demande d'accès

L'utilisateur **{{ $user->name }}** vient de demander l'accès à l'application.

## Informations de la demande :

- **Email du compte :** {{ $user->email }}
- **Nom de l'entreprise :** {{ $formData['company_name'] }}
- **Numéro de téléphone :** {{ $formData['phone'] }}

@if(!empty($formData['message']))
**Message de l'utilisateur :**
> {{ $formData['message'] }}
@endif

---
<br>
Veuillez vous connecter à l'interface Super Admin pour valider ou rejeter cette demande et assigner le client à une entreprise.

<x-mail::button :url="route('super-admin.dashboard')">
Aller au Dashboard Super Admin
</x-mail::button>

Cordialement,<br>
L'équipe {{ config('app.name') }}
</x-mail::message>
