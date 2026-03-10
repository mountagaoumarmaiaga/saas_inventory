import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "react-toastify";
import { Upload, Save, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomizationSettings {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    logo_url?: string;
    invoice_header: string;
    invoice_footer: string;
    invoice_template: 'tempo' | 'studio' | 'geometric' | 'medical' | 'classic';
    delivery_note_template: 'tempo' | 'studio' | 'geometric' | 'medical' | 'classic';
    purchase_template: 'tempo' | 'studio' | 'geometric' | 'medical' | 'classic';
    primary_color?: string;
    currency: string;
    currency_symbol: string;
    currency_position: 'left' | 'right';
    qr_payment_link: string;
}

const TEMPLATES = [
    { id: 'tempo', name: 'Tempo / Nomade', desc: 'Design structuré avec fond en-têtes contrasté (idéal en Bleu/Vert)' },
    { id: 'studio', name: 'Studio Graphique', desc: 'Minimaliste, typo bold "FACTURE" en haut à droite' },
    { id: 'geometric', name: 'Géométrique', desc: 'Angles pleins sur les bords, ultra moderne' },
    { id: 'medical', name: 'Institutionnel', desc: 'En-tête détaillée et bordures colorées (type Médical/BTP)' },
];

const DELIVERY_NOTE_TEMPLATES = TEMPLATES;
const PURCHASE_TEMPLATES = TEMPLATES;

export default function InvoiceCustomization() {
    const [settings, setSettings] = useState<CustomizationSettings | null>(null);
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
            const res = await axios.get('/admin/api/settings/invoice');
            const data = res.data.data;
            setSettings(data);
            if (data.logo_url) {
                setLogoPreview(data.logo_url);
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

            const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const res = await axios.post('/admin/api/settings/invoice/logo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': csrfToken || '',
                }
            });

            setSettings(res.data.data);
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
            const res = await axios.put('/admin/api/settings/invoice', {
                name: settings.name,
                email: settings.email,
                phone: settings.phone,
                address: settings.address,
                invoice_header: settings.invoice_header,
                invoice_footer: settings.invoice_footer,
                invoice_template: settings.invoice_template,
                delivery_note_template: settings.delivery_note_template,
                purchase_template: settings.purchase_template,
                currency: settings.currency,
                currency_symbol: settings.currency_symbol,
                currency_position: settings.currency_position,
                qr_payment_link: settings.qr_payment_link,
                primary_color: settings.primary_color,
            });

            setSettings(res.data.data);
            toast.success("Paramètres sauvegardés !");

            // Reload settings to ensure UI is in sync
            await loadSettings();
        } catch (e: any) {
            if (e.response && e.response.status === 422) {
                const errorData = e.response.data;
                const messages = errorData.errors ? Object.values(errorData.errors).flat().join('\n') : errorData.message;
                toast.error(messages || 'Erreur de validation');
            } else {
                toast.error(e?.response?.data?.message || e?.message || "Erreur sauvegarde");
            }
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
                        <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-orange-500 animate-spin" />
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
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-primary/50 transition-all duration-300 shadow-lg"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-sm font-semibold text-foreground/90">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-primary/50 transition-all duration-300 shadow-lg"
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
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-primary/50 transition-all duration-300 shadow-lg"
                                    placeholder="+223 XX XXX XX XX"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="address" className="text-sm font-semibold text-foreground/90">Adresse</Label>
                                <Input
                                    id="address"
                                    value={settings.address || ''}
                                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                    className="h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-primary/50 transition-all duration-300 shadow-lg"
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
                                className="flex-1 h-12 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20 transition-all"
                            />
                            <Button
                                onClick={handleUploadLogo}
                                disabled={!logoFile || uploadingLogo}
                                className="h-12 px-6 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:via-amber-700 hover:to-orange-700 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 rounded-xl disabled:opacity-50"
                            >
                                <Upload className="mr-2 h-5 w-5" />
                                {uploadingLogo ? "Upload..." : "Upload"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Primary Color */}
                <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden mt-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
                    <CardHeader className="relative border-b border-white/10">
                        <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                            Couleur Principale
                        </CardTitle>
                        <CardDescription>Couleur thématique de vos documents PDF (en-têtes, tableaux, titres)</CardDescription>
                    </CardHeader>
                    <CardContent className="relative space-y-6 pt-6">
                        {/* Color preview banner */}
                        <div
                            className="w-full h-12 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center"
                            style={{ backgroundColor: settings.primary_color || '#1e3a8a' }}
                        >
                            <span className="text-white font-bold text-sm tracking-widest uppercase drop-shadow" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                                Aperçu — {settings.primary_color || '#1e3a8a'}
                            </span>
                        </div>

                        {/* Palette grid */}
                        {(() => {
                            const palette = [
                                // Blues
                                '#1e3a8a', '#1d4ed8', '#0ea5e9', '#0891b2',
                                // Greens
                                '#166534', '#15803d', '#16a34a', '#4ade80',
                                // Reds / Oranges
                                '#991b1b', '#dc2626', '#ea580c', '#d97706',
                                // Purples / Pinks
                                '#6b21a8', '#7c3aed', '#db2777', '#e11d48',
                                // Neutrals
                                '#111827', '#374151', '#6b7280', '#334155',
                            ];
                            return (
                                <div>
                                    <Label className="text-sm font-semibold text-foreground/90 mb-3 block">Palette de couleurs</Label>
                                    <div className="grid grid-cols-10 gap-2">
                                        {palette.map((color) => {
                                            const isSelected = (settings.primary_color || '#1e3a8a').toLowerCase() === color.toLowerCase();
                                            return (
                                                <button
                                                    key={color}
                                                    type="button"
                                                    title={color}
                                                    onClick={() => setSettings({ ...settings, primary_color: color })}
                                                    className={`h-9 w-full rounded-lg shadow-md transition-all duration-200 hover:scale-110 hover:shadow-xl relative ${isSelected ? 'ring-4 ring-offset-2 ring-white scale-110 shadow-xl' : 'ring-1 ring-black/10'}`}
                                                    style={{ backgroundColor: color }}
                                                >
                                                    {isSelected && (
                                                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✓</span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Custom hex input */}
                        <div className="flex items-center gap-4">
                            <Label className="text-sm font-semibold text-foreground/90 whitespace-nowrap">Couleur personnalisée :</Label>
                            <input
                                type="color"
                                value={settings.primary_color || '#1e3a8a'}
                                onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                                className="h-10 w-14 rounded-lg cursor-pointer border-2 border-white/20 shadow-lg"
                                title="Choisir une couleur personnalisée"
                            />
                            <Input
                                value={settings.primary_color || '#1e3a8a'}
                                onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                                placeholder="#1e3a8a"
                                maxLength={7}
                                className="h-10 w-36 rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-primary transition-all font-mono text-sm"
                            />
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
                                className="rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-primary/50 transition-all duration-300 shadow-lg"
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
                                className="rounded-xl border-2 border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-primary/50 transition-all duration-300 shadow-lg"
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
                                    <div key={tpl.id} className="flex items-start space-x-3 border-2 border-white/20 rounded-xl p-5 cursor-pointer hover:bg-gradient-to-br hover:from-orange-500/10 hover:to-amber-500/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
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

                {/* Purchase Template Selection */}
                <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden mt-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none" />
                    <CardHeader className="relative border-b border-white/10">
                        <CardTitle className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Modèle de Bon de Commande
                        </CardTitle>
                        <CardDescription>Choisissez le design de vos bons de commande PDF</CardDescription>
                    </CardHeader>
                    <CardContent className="relative pt-6">
                        <RadioGroup
                            value={settings.purchase_template || 'classic'}
                            onValueChange={(value) => setSettings({ ...settings, purchase_template: value as any })}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {PURCHASE_TEMPLATES.map((tpl) => (
                                    <div key={tpl.id} className="flex items-start space-x-3 border-2 border-white/20 rounded-xl p-5 cursor-pointer hover:bg-gradient-to-br hover:from-emerald-500/10 hover:to-teal-500/10 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg">
                                        <RadioGroupItem value={tpl.id} id={`po-${tpl.id}`} className="mt-0.5" />
                                        <Label htmlFor={`po-${tpl.id}`} className="cursor-pointer flex-1">
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
                        className="h-12 px-8 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:via-amber-700 hover:to-orange-700 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 rounded-xl disabled:opacity-50"
                    >
                        <Save className="mr-2 h-5 w-5" />
                        {saving ? "Sauvegarde..." : "Sauvegarder"}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
