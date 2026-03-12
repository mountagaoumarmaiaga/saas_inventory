import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Plus,
    Trash2,
    ArrowLeft,
    FileText,
    User,
    Calendar,
    Percent,
    Package,
    FileSignature,
    Download,
    Eye,
    Save,
    Building2,
    Phone,
    Mail,
    MapPin,
    CreditCard
} from "lucide-react";
import { toast } from "react-toastify";
import { InvoiceForm, InvoiceItem } from "./types";
import { createInvoiceApi } from "./api";
import { fetchProducts } from "@/pages/user/products/api";

// Styles d'animation CSS
const animations = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideIn {
    from { transform: translateX(-10px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }
  
  .animate-pulse-slow {
    animation: pulse 2s infinite;
  }
  
  .hover-lift {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .gradient-border {
    position: relative;
    border: double 1px transparent;
    background-image: linear-gradient(var(--background), var(--background)), 
                      linear-gradient(to right, #f97316, #f59e0b);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
`;

export default function CreateInvoice() {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [settings, setSettings] = useState<any>(null);
    const [previewMode, setPreviewMode] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const [form, setForm] = useState<InvoiceForm>({
        type: "invoice",
        client_id: 0,
        tva: 0,
        date: new Date().toISOString().split('T')[0],
        notes: "",
        items: [
            { _tempId: 'init-1', description: "", unit_price: 0, quantity: 1, line_total: 0 }
        ]
    });

    useEffect(() => {
        // Injecter les styles d'animation
        const style = document.createElement('style');
        style.textContent = animations;
        document.head.appendChild(style);

        async function init() {
            try {
                // Fetch products
                const { items } = await fetchProducts("perPage=1000");
                setProducts(items);

                // Fetch settings
                const resSettings = await fetch('/user/api/settings/invoice');
                if (resSettings.ok) {
                    const json = await resSettings.json();
                    setSettings(json.data);
                }

                // Fetch clients
                const res = await fetch('/user/api/clients-list');
                if (res.ok) {
                    const data = await res.json();
                    setClients(data);
                }
            } catch (e) {
                console.error("Failed to load initial data", e);
                toast.error("Erreur lors du chargement des données");
            }
        }
        init();

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    function handleAddItem() {
        setForm(f => ({
            ...f,
            items: [...f.items, {
                _tempId: Math.random().toString(36).substr(2, 9),
                description: "",
                unit_price: 0,
                quantity: 1,
                line_total: 0
            }]
        }));

        // Animation feedback
        toast.info("Nouvelle ligne ajoutée", { autoClose: 1000 });
    }

    function handleRemoveItem(index: number) {
        setForm(f => {
            const newItems = [...f.items];
            newItems.splice(index, 1);
            return { ...f, items: newItems };
        });
    }

    function updateItem(index: number, field: keyof InvoiceItem, value: any) {
        setForm(f => {
            const newItems = [...f.items];
            const item = { ...newItems[index], [field]: value };

            if (field === 'product_id' && value) {
                const p = products.find(prod => prod.id == value);
                if (p) {
                    item.description = p.name;
                    item.unit_price = p.sale_price;
                    item._product = p;
                }
            }

            item.line_total = item.quantity * item.unit_price;
            newItems[index] = item;
            return { ...f, items: newItems };
        });
    }

    const subtotal = form.items.reduce((acc, item) => acc + item.line_total, 0);
    const tvaAmount = subtotal * (form.tva / 100);
    const total = subtotal + tvaAmount;

    function validateStock(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];
        const productTotals = new Map<number, { name: string; total: number; available: number }>();

        form.items.forEach(item => {
            if (item.product_id) {
                const product = products.find(p => p.id == item.product_id);
                if (product) {
                    const existing = productTotals.get(product.id) || {
                        name: product.name,
                        total: 0,
                        available: product.quantity || 0
                    };
                    existing.total += item.quantity;
                    productTotals.set(product.id, existing);
                }
            }
        });

        productTotals.forEach((data) => {
            if (data.total > data.available) {
                errors.push(`Stock insuffisant pour "${data.name}" (${data.total} demandé / ${data.available} disponible)`);
            }
        });

        return { valid: errors.length === 0, errors };
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.client_id) {
            toast.error("Veuillez sélectionner un client");
            return;
        }

        if (form.items.length === 0) {
            toast.error("Ajoutez au moins un article");
            return;
        }

        const stockValidation = validateStock();
        if (!stockValidation.valid) {
            stockValidation.errors.forEach(error => toast.error(error));
            return;
        }

        setLoading(true);
        try {
            const res = await createInvoiceApi(form);
            if (!res.ok) {
                const error = await res.json();
                toast.error(error.message || "Erreur lors de la création");
            } else {
                toast.success("Facture créée avec succès !");
                router.visit("/user/invoices");
            }
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "/user/dashboard" },
                { title: "Factures", href: "/user/invoices" },
                { title: "Nouvelle facture", href: "#" },
            ]}
        >
            <Head title="Nouvelle Facture" />

            {/* Modal de prévisualisation */}
            {previewMode && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
                    onClick={() => setPreviewMode(false)}
                >
                    <div
                        className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-background border-b border-white/10 p-4 flex justify-between items-center">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                Aperçu de la facture
                            </h3>
                            <Button variant="ghost" size="sm" onClick={() => setPreviewMode(false)}>
                                Fermer
                            </Button>
                        </div>
                        <div className="p-8">
                            {settings && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            {settings.logo_url && (
                                                <img src={settings.logo_url} alt="Logo" className="h-16 w-auto mb-4" />
                                            )}
                                            <h2 className="text-2xl font-bold">{settings.name}</h2>
                                            <p className="text-muted-foreground">{settings.address}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-3xl font-bold text-orange-600">
                                                #{'INV-' + new Date().getTime().toString().slice(-6)}
                                            </span>
                                            <p className="text-muted-foreground mt-2">Date: {form.date}</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 pt-4">
                                        <p><strong>Client:</strong> {clients.find(c => c.id === form.client_id)?.name || 'Non sélectionné'}</p>
                                    </div>

                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-2">Description</th>
                                                <th className="text-right py-2">Prix unitaire</th>
                                                <th className="text-right py-2">Quantité</th>
                                                <th className="text-right py-2">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {form.items.map((item, idx) => (
                                                <tr key={idx} className="border-b border-white/5">
                                                    <td className="py-2">{item.description}</td>
                                                    <td className="text-right py-2">{item.unit_price} FCFA</td>
                                                    <td className="text-right py-2">{item.quantity}</td>
                                                    <td className="text-right py-2">{item.line_total} FCFA</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="flex justify-end">
                                        <div className="w-64 space-y-2">
                                            <div className="flex justify-between">
                                                <span>Sous-total:</span>
                                                <span>{subtotal} FCFA</span>
                                            </div>
                                            {form.tva > 0 && (
                                                <div className="flex justify-between">
                                                    <span>TVA ({form.tva}%):</span>
                                                    <span>{tvaAmount} FCFA</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between font-bold text-lg border-t border-white/10 pt-2">
                                                <span>Total:</span>
                                                <span className="text-orange-600">{total} FCFA</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
                {/* Header avec actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.visit('/user/invoices')}
                            className="h-10 w-10 rounded-full hover:bg-orange-500/10 hover:text-orange-600 transition-all"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                                Nouvelle Facture
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Créez une nouvelle facture pour vos clients
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setPreviewMode(true)}
                            className="h-11 rounded-xl gap-2 hover:border-orange-500/50 hover:text-orange-600 transition-all"
                        >
                            <Eye className="h-4 w-4" />
                            Aperçu
                        </Button>
                        <Button
                            variant="outline"
                            className="h-11 rounded-xl gap-2 hover:border-amber-500/50 hover:text-amber-600 transition-all"
                        >
                            <Download className="h-4 w-4" />
                            Brouillon
                        </Button>
                    </div>
                </div>

                {/* En-tête entreprise avec design amélioré */}
                {settings && (
                    <div
                        className="relative rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 p-6 overflow-hidden hover-lift animate-slide-in"
                        style={{ animationDelay: '0.1s' }}
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32 animate-pulse-slow" />

                        <div className="relative flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex items-start gap-4">
                                {settings.logo_url ? (
                                    <div className="h-20 w-20 rounded-xl border-2 border-white/10 bg-white/5 p-2 overflow-hidden group-hover:scale-105 transition-transform">
                                        <img
                                            src={settings.logo_url}
                                            alt="Logo"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-20 w-20 rounded-xl border-2 border-white/10 bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
                                        <Building2 className="h-8 w-8 text-orange-500/50" />
                                    </div>
                                )}

                                <div>
                                    <h2 className="text-2xl font-bold">{settings.name || 'Mon Entreprise'}</h2>
                                    <div className="space-y-1 mt-2">
                                        {settings.address && (
                                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                <MapPin className="h-3 w-3" />
                                                {settings.address}
                                            </p>
                                        )}
                                        {settings.email && (
                                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                <Mail className="h-3 w-3" />
                                                {settings.email}
                                            </p>
                                        )}
                                        {settings.phone && (
                                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                <Phone className="h-3 w-3" />
                                                {settings.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span className="px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 text-sm font-bold border border-orange-200/20">
                                    {form.type === 'proforma' ? 'PROFORMA' : 'FACTURE'}
                                </span>
                                <span className="text-2xl font-mono font-bold">
                                    #{'INV-' + new Date().getTime().toString().slice(-6)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section Informations */}
                    <div
                        className="relative rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 overflow-hidden hover-lift animate-slide-in"
                        style={{ animationDelay: '0.2s' }}
                        onMouseEnter={() => setActiveSection('info')}
                        onMouseLeave={() => setActiveSection(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5" />

                        <div className={`relative p-6 border-b border-white/10 transition-colors ${activeSection === 'info' ? 'bg-orange-500/5' : ''}`}>
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <FileSignature className={`h-5 w-5 transition-colors ${activeSection === 'info' ? 'text-orange-500' : 'text-orange-500/70'}`} />
                                Informations générales
                            </h2>
                        </div>

                        <div className="relative p-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        Type
                                    </Label>
                                    <select
                                        className="flex h-11 w-full rounded-xl border-2 border-white/10 bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 transition-all hover:border-orange-500/30"
                                        value={form.type}
                                        onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                                    >
                                        <option value="invoice">Facture</option>
                                        <option value="proforma">Proforma</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        Client
                                    </Label>
                                    <select
                                        className="flex h-11 w-full rounded-xl border-2 border-white/10 bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 transition-all hover:border-orange-500/30"
                                        value={form.client_id || ""}
                                        onChange={(e) => setForm({ ...form, client_id: Number(e.target.value) })}
                                    >
                                        <option value="">Sélectionner un client</option>
                                        {clients.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        Date
                                    </Label>
                                    <Input
                                        type="date"
                                        value={form.date}
                                        onChange={e => setForm({ ...form, date: e.target.value })}
                                        className="h-11 rounded-xl border-2 border-white/10 bg-background/50 hover:border-orange-500/30 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        <Percent className="h-4 w-4 text-muted-foreground" />
                                        TVA
                                    </Label>
                                    <div className="flex items-center h-11 px-4 rounded-xl border-2 border-white/10 bg-background/50 hover:border-orange-500/30 transition-all">
                                        <Checkbox
                                            id="tva"
                                            checked={form.tva > 0}
                                            onCheckedChange={(checked) => {
                                                setForm({ ...form, tva: checked ? 18 : 0 });
                                            }}
                                            className="mr-3 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                        />
                                        <Label htmlFor="tva" className="text-sm cursor-pointer">
                                            Appliquer TVA 18%
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Articles */}
                    <div
                        className="relative rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 overflow-hidden hover-lift animate-slide-in"
                        style={{ animationDelay: '0.3s' }}
                        onMouseEnter={() => setActiveSection('items')}
                        onMouseLeave={() => setActiveSection(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />

                        <div className={`relative p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${activeSection === 'items' ? 'bg-blue-500/5' : ''}`}>
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Package className={`h-5 w-5 transition-colors ${activeSection === 'items' ? 'text-blue-500' : 'text-blue-500/70'}`} />
                                Articles
                            </h2>
                            <Button
                                type="button"
                                onClick={handleAddItem}
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-10 rounded-xl gap-2 transition-all hover:scale-105"
                            >
                                <Plus className="h-4 w-4" />
                                Ajouter un article
                            </Button>
                        </div>

                        <div className="relative p-6">
                            {form.items.map((item, index) => (
                                <div
                                    key={item._tempId}
                                    className="grid md:grid-cols-12 gap-4 items-start mb-4 pb-4 border-b border-white/5 last:border-0 last:mb-0 last:pb-0 animate-fade-in"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="md:col-span-3 space-y-2">
                                        <Label className="text-xs font-medium">Produit</Label>
                                        <select
                                            className="flex h-10 w-full rounded-lg border-2 border-white/10 bg-background/50 px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-blue-500 transition-all hover:border-blue-500/30"
                                            value={item.product_id || ""}
                                            onChange={(e) => updateItem(index, 'product_id', Number(e.target.value))}
                                        >
                                            <option value="">Sélectionner...</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name} ({p.quantity || 0} en stock)
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="md:col-span-3 space-y-2">
                                        <Label className="text-xs font-medium">Description</Label>
                                        <Input
                                            value={item.description}
                                            onChange={e => updateItem(index, 'description', e.target.value)}
                                            placeholder="Description..."
                                            className="h-10 rounded-lg border-2 border-white/10 bg-background/50 hover:border-blue-500/30 transition-all"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label className="text-xs font-medium">Prix unitaire</Label>
                                        <Input
                                            type="number"
                                            value={item.unit_price}
                                            onChange={e => updateItem(index, 'unit_price', Number(e.target.value))}
                                            min="0"
                                            step="0.01"
                                            className="h-10 rounded-lg border-2 border-white/10 bg-background/50 hover:border-blue-500/30 transition-all"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label className="text-xs font-medium">Quantité</Label>
                                        <Input
                                            type="number"
                                            value={item.quantity}
                                            onChange={e => updateItem(index, 'quantity', Number(e.target.value))}
                                            min="1"
                                            className="h-10 rounded-lg border-2 border-white/10 bg-background/50 hover:border-blue-500/30 transition-all"
                                        />
                                    </div>

                                    <div className="md:col-span-1 space-y-2">
                                        <Label className="text-xs font-medium">Total</Label>
                                        <div className="h-10 flex items-center font-semibold text-blue-600">
                                            {item.line_total.toFixed(2)} FCFA
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 flex justify-end">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 h-10 w-10 transition-all"
                                            onClick={() => handleRemoveItem(index)}
                                            disabled={form.items.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            {/* Totaux */}
                            <div className="flex justify-end mt-6 pt-6 border-t border-white/10">
                                <div className="w-80 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Sous-total</span>
                                        <span className="font-medium">{subtotal.toFixed(2)} FCFA</span>
                                    </div>
                                    {form.tva > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">TVA ({form.tva}%)</span>
                                            <span className="font-medium">{tvaAmount.toFixed(2)} FCFA</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
                                        <span>Total</span>
                                        <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                            {total.toFixed(2)} FCFA
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Notes */}
                    <div
                        className="relative rounded-2xl border-2 border-white/10 backdrop-blur-xl bg-background/60 overflow-hidden hover-lift animate-slide-in"
                        style={{ animationDelay: '0.4s' }}
                        onMouseEnter={() => setActiveSection('notes')}
                        onMouseLeave={() => setActiveSection(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />

                        <div className={`relative p-6 border-b border-white/10 transition-colors ${activeSection === 'notes' ? 'bg-purple-500/5' : ''}`}>
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <FileText className={`h-5 w-5 transition-colors ${activeSection === 'notes' ? 'text-purple-500' : 'text-purple-500/70'}`} />
                                Notes additionnelles
                            </h2>
                        </div>

                        <div className="relative p-6">
                            <Textarea
                                value={form.notes || ""}
                                onChange={e => setForm({ ...form, notes: e.target.value })}
                                placeholder="Conditions de paiement, délais de livraison, notes particulières..."
                                className="min-h-32 rounded-xl border-2 border-white/10 bg-background/50 focus-visible:ring-purple-500 hover:border-purple-500/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 animate-fade-in">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit('/user/invoices')}
                            className="h-11 rounded-xl px-6 hover:border-red-500/50 hover:text-red-600 transition-all"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-11 rounded-xl px-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 gap-2 transition-all hover:scale-105 disabled:hover:scale-100"
                        >
                            {loading ? (
                                <>
                                    <span className="animate-spin">⚪</span>
                                    Création...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="h-4 w-4" />
                                    Créer la facture
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}