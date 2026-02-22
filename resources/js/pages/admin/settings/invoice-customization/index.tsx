import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "react-toastify";
import { Upload, Save, FileText } from "lucide-react";

interface EntrepriseSettings {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    logo_url?: string;
    invoice_header?: string;
    invoice_footer?: string;
    invoice_template: 'classic' | 'modern' | 'professional' | 'executive' | 'creative' | 'elegant' | 'industrial' | 'minimalist' | 'retail' | 'bold';
    delivery_note_template: 'classic' | 'modern' | 'minimalist';
    currency?: string;
    currency_symbol?: string;
    currency_position?: 'left' | 'right';
    qr_payment_link?: string;
}

const TEMPLATES = [
    { id: 'classic', name: 'Finance / Consulting', desc: 'Mise en page classique, bleue et très structurée' },
    { id: 'modern', name: 'Tech / IT', desc: 'Design borderless tech avec accents cyan' },
    { id: 'professional', name: 'Santé / Pharmacie', desc: 'Vert médical, informations séparées, ultra lisible' },
    { id: 'executive', name: 'Logistique / Transport', desc: 'Design robuste, gris anthracite et détails oranges' },
    { id: 'creative', name: 'Universel / Standard', desc: 'Minimaliste élégant, monochrome, hyper lisible' },
    { id: 'elegant', name: 'Luxe / Beauté', desc: 'Design prestige avec touches dorées' },
    { id: 'industrial', name: 'BTP / Industrie', desc: 'Contraste fort, jaune sécurité et gris foncé' },
    { id: 'minimalist', name: 'Freelance / Créa', desc: 'Un maximum d\'espace blanc, ultra épuré' },
    { id: 'retail', name: 'Commerce / E-shop', desc: 'Focus sur les totaux et détails articles' },
    { id: 'bold', name: 'Agence / Marketing', desc: 'Typographie vibrante et moderne' },
];

const DELIVERY_NOTE_TEMPLATES = [
    { id: 'classic', name: 'Classique', desc: 'Mise en page épurée, centrée sur l\'essentiel' },
    { id: 'modern', name: 'Moderne', desc: 'Design avec touches de couleur primaire' },
    { id: 'minimalist', name: 'Minimaliste', desc: 'Très simple, axé sur les quantités' },
];

export default function InvoiceCustomization() {
    const [settings, setSettings] = useState<EntrepriseSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        try {
            const res = await fetch('/admin/api/settings/invoice');
            const json = await res.json();
            setSettings(json.data);
            if (json.data.logo_url) {
                setLogoPreview(json.data.logo_url);
            }
        } catch (e: any) {
            toast.error(e?.message ?? "Erreur chargement paramètres");
        } finally {
            setLoading(false);
        }
    }

    function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    async function handleUploadLogo() {
        if (!logoFile) return;

        setUploadingLogo(true);
        try {
            const formData = new FormData();
            formData.append('logo', logoFile);

            const res = await fetch('/admin/api/settings/invoice/logo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: formData,
            });

            if (!res.ok) throw new Error('Erreur upload logo');

            const json = await res.json();
            setSettings(json.data);
            setLogoFile(null);
            toast.success("Logo uploadé avec succès !");
        } catch (e: any) {
            toast.error(e?.message ?? "Erreur upload logo");
        } finally {
            setUploadingLogo(false);
        }
    }

    async function handleSave() {
        if (!settings) return;

        setSaving(true);
        try {
            const res = await fetch('/admin/api/settings/invoice', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    name: settings.name,
                    email: settings.email,
                    phone: settings.phone,
                    address: settings.address,
                    invoice_header: settings.invoice_header,
                    invoice_footer: settings.invoice_footer,
                    invoice_template: settings.invoice_template,
                    delivery_note_template: settings.delivery_note_template,
                    currency: settings.currency,
                    currency_symbol: settings.currency_symbol,
                    currency_position: settings.currency_position,
                    qr_payment_link: settings.qr_payment_link,
                }),
            });

            if (!res.ok) {
                if (res.status === 422) {
                    const errorData = await res.json();
                    if (errorData.errors) {
                        const messages = Object.values(errorData.errors).flat().join('\n');
                        throw new Error(messages || errorData.message || 'Erreur de validation');
                    }
                    throw new Error(errorData.message || 'Erreur de validation');
                }
                throw new Error('Erreur sauvegarde');
            }

            const json = await res.json();
            setSettings(json.data);
            toast.success("Paramètres sauvegardés !");

            // Reload settings to ensure UI is in sync
            await loadSettings();
        } catch (e: any) {
            toast.error(e?.message ?? "Erreur sauvegarde");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <AppLayout breadcrumbs={[
                { title: "Admin", href: "/admin/dashboard" },
                { title: "Paramètres", href: "#" },
                { title: "Personnalisation Factures", href: "#" },
            ]}>
                <Head title="Personnalisation Factures" />
                <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                    <div className="relative">
                        <div className="h-16 w-16 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
                    </div>
                    <p className="text-muted-foreground font-medium">Chargement des paramètres...</p>
                </div>
            </AppLayout>
        );
    }

    if (!settings) return null;

    return (
        <AppLayout breadcrumbs={[
            { title: "Admin", href: "/admin/dashboard" },
            { title: "Paramètres", href: "#" },
            { title: "Personnalisation Factures", href: "#" },
        ]}>
            <Head title="Personnalisation Factures" />

            <div className="p-6 space-y-6 max-w-4xl">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Personnalisation des Factures
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Personnalisez l'apparence de vos factures PDF
                    </p>
                </div>

                {/* Company Info */}
                <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                    <CardHeader className="relative border-b border-white/10">
                        <CardTitle className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            Informations Entreprise
                        </CardTitle>
                        <CardDescription>Ces informations apparaîtront sur vos factures</CardDescription>
                    </CardHeader>
                    <CardContent className="relative space-y-6 pt-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-sm font-semibold text-foreground/90">Nom de l'entreprise</Label>
                                <Input
                                    id="name"
                                    value={settings.name}
                                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-sm font-semibold text-foreground/90">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="phone" className="text-sm font-semibold text-foreground/90">Téléphone</Label>
                                <Input
                                    id="phone"
                                    value={settings.phone || ''}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                                    placeholder="+223 XX XXX XX XX"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="address" className="text-sm font-semibold text-foreground/90">Adresse</Label>
                                <Input
                                    id="address"
                                    value={settings.address || ''}
                                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Logo Upload */}
                <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                    <CardHeader className="relative border-b border-white/10">
                        <CardTitle className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            Logo
                        </CardTitle>
                        <CardDescription>Uploadez le logo de votre entreprise (max 2MB)</CardDescription>
                    </CardHeader>
                    <CardContent className="relative space-y-6 pt-6">
                        {logoPreview && (
                            <div className="flex items-center justify-center p-6 border-2 border-white/10 rounded-xl bg-muted/20 backdrop-blur-sm">
                                <img src={logoPreview} alt="Logo preview" className="max-h-32 max-w-xs object-contain" />
                            </div>
                        )}
                        <div className="flex gap-3">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="flex-1 h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500/10 file:text-orange-600 file:font-medium hover:file:bg-orange-500/20 transition-all"
                            />
                            <Button
                                onClick={handleUploadLogo}
                                disabled={!logoFile || uploadingLogo}
                                className="h-12 px-6 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:via-amber-700 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 rounded-xl disabled:opacity-50"
                            >
                                <Upload className="mr-2 h-5 w-5" />
                                {uploadingLogo ? "Upload..." : "Upload"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment & Currency */}
                <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                    <CardHeader className="relative border-b border-white/10">
                        <CardTitle className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            Paiement et Devise
                        </CardTitle>
                        <CardDescription>Configurez la devise et les liens de paiement par QR Code</CardDescription>
                    </CardHeader>
                    <CardContent className="relative space-y-6 pt-6">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="currency" className="text-sm font-semibold text-foreground/90">Devise (ex: FCFA, USD)</Label>
                                <Input
                                    id="currency"
                                    value={settings.currency || ''}
                                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 transition-all duration-300 shadow-lg"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="currency_symbol" className="text-sm font-semibold text-foreground/90">Symbole (ex: $, €, CFA)</Label>
                                <Input
                                    id="currency_symbol"
                                    value={settings.currency_symbol || ''}
                                    onChange={(e) => setSettings({ ...settings, currency_symbol: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 transition-all duration-300 shadow-lg"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-sm font-semibold text-foreground/90">Position du symbole</Label>
                                <RadioGroup
                                    value={settings.currency_position || 'right'}
                                    onValueChange={(value) => setSettings({ ...settings, currency_position: value as 'left' | 'right' })}
                                    className="flex items-center space-x-4 h-12"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="left" id="left" />
                                        <Label htmlFor="left">Gauche ($10)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="right" id="right" />
                                        <Label htmlFor="right">Droite (10$)</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="qr_payment_link" className="text-sm font-semibold text-foreground/90">Lien de paiement QR Code (Optionnel)</Label>
                            <Input
                                id="qr_payment_link"
                                value={settings.qr_payment_link || ''}
                                onChange={(e) => setSettings({ ...settings, qr_payment_link: e.target.value })}
                                placeholder="ex: https://pay.wave.com/m/mon-entreprise"
                                className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 transition-all duration-300 shadow-lg"
                            />
                            <p className="text-xs text-muted-foreground">Si renseigné, un QR code sera automatiquement généré et affiché sur les factures pour faciliter le paiement de vos clients.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Header & Footer */}
                <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                    <CardHeader className="relative border-b border-white/10">
                        <CardTitle className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            En-tête et Pied de page
                        </CardTitle>
                        <CardDescription>Texte personnalisé pour vos factures</CardDescription>
                    </CardHeader>
                    <CardContent className="relative space-y-6 pt-6">
                        <div className="space-y-3">
                            <Label htmlFor="header" className="text-sm font-semibold text-foreground/90">En-tête personnalisé</Label>
                            <Textarea
                                id="header"
                                placeholder="Ex: Merci de votre confiance..."
                                value={settings.invoice_header || ''}
                                onChange={(e) => setSettings({ ...settings, invoice_header: e.target.value })}
                                rows={3}
                                className="rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="footer" className="text-sm font-semibold text-foreground/90">Pied de page personnalisé</Label>
                            <Textarea
                                id="footer"
                                placeholder="Ex: Conditions de paiement..."
                                value={settings.invoice_footer || ''}
                                onChange={(e) => setSettings({ ...settings, invoice_footer: e.target.value })}
                                rows={3}
                                className="rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all duration-300 shadow-lg"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Template Selection */}
                <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                    <CardHeader className="relative border-b border-white/10">
                        <CardTitle className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            Modèle de Facture
                        </CardTitle>
                        <CardDescription>Choisissez le design de vos factures</CardDescription>
                    </CardHeader>
                    <CardContent className="relative pt-6">
                        <RadioGroup
                            value={settings.invoice_template}
                            onValueChange={(value) => setSettings({ ...settings, invoice_template: value as any })}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {TEMPLATES.map((tpl) => (
                                    <div key={tpl.id} className="flex items-start space-x-3 border-2 border-white/20 rounded-xl p-5 cursor-pointer hover:bg-gradient-to-br hover:from-orange-500/10 hover:to-amber-500/10 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg">
                                        <RadioGroupItem value={tpl.id} id={tpl.id} className="mt-0.5" />
                                        <Label htmlFor={tpl.id} className="cursor-pointer flex-1">
                                            <div className="font-bold text-foreground">{tpl.name}</div>
                                            <p className="text-sm text-muted-foreground mt-1">{tpl.desc}</p>
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>

                {/* Delivery Note Template Selection */}
                <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden mt-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                    <CardHeader className="relative border-b border-white/10">
                        <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Modèle de Bordereau de Livraison
                        </CardTitle>
                        <CardDescription>Choisissez le design de vos bordereaux de livraison</CardDescription>
                    </CardHeader>
                    <CardContent className="relative pt-6">
                        <RadioGroup
                            value={settings.delivery_note_template || 'classic'}
                            onValueChange={(value) => setSettings({ ...settings, delivery_note_template: value as any })}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {DELIVERY_NOTE_TEMPLATES.map((tpl) => (
                                    <div key={tpl.id} className="flex items-start space-x-3 border-2 border-white/20 rounded-xl p-5 cursor-pointer hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg">
                                        <RadioGroupItem value={tpl.id} id={`dn-${tpl.id}`} className="mt-0.5" />
                                        <Label htmlFor={`dn-${tpl.id}`} className="cursor-pointer flex-1">
                                            <div className="font-bold text-foreground">{tpl.name}</div>
                                            <p className="text-sm text-muted-foreground mt-1">{tpl.desc}</p>
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end gap-4">
                    <Button
                        variant="outline"
                        onClick={() => router.visit('/admin/dashboard')}
                        className="h-12 px-6 rounded-xl border-2 hover:bg-muted/50 transition-all duration-300"
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="h-12 px-8 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:via-amber-700 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 rounded-xl disabled:opacity-50"
                    >
                        <Save className="mr-2 h-5 w-5" />
                        {saving ? "Sauvegarde..." : "Sauvegarder"}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
