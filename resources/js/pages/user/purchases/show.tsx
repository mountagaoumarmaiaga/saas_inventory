import { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { ArrowLeft, Edit, Save, Trash2, CheckCircle2, PackageX, Printer, Download } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "react-toastify";

import AppLayout from "@/layouts/app-layout";
import { fetchPurchase, markAsOrdered, cancelPurchase, receiveItems } from "./api";
import { Purchase, ReceiveItemData, PurchaseStatus } from "./types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const STATUS_CONFIG: Record<PurchaseStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" }> = {
    DRAFT: { label: "Brouillon", variant: "secondary" },
    ORDERED: { label: "Commandé", variant: "outline" },
    PARTIALLY_RECEIVED: { label: "Partiellement Reçu", variant: "default" },
    RECEIVED: { label: "Reçu", variant: "success" },
    CANCELLED: { label: "Annulé", variant: "destructive" }
};

interface Props {
    id: number;
}

export default function ShowPurchase({ id }: Props) {
    const [purchase, setPurchase] = useState<Purchase | null>(null);
    const [loading, setLoading] = useState(true);
    const page = usePage<any>();

    // Receive Modal State
    const [receiveModalOpen, setReceiveModalOpen] = useState(false);
    const [receiveData, setReceiveData] = useState<ReceiveItemData[]>([]);
    const [receiving, setReceiving] = useState(false);

    // Cancel Confirm state
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

    const loadPurchase = async () => {
        try {
            setLoading(true);
            const data = await fetchPurchase(id);
            setPurchase(data);
        } catch (e) {
            toast.error("Erreur de chargement du bon de commande");
            router.visit("/user/purchases");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPurchase();
    }, [id]);

    const handleMarkAsOrdered = async () => {
        try {
            setLoading(true);
            await markAsOrdered(id);
            toast.success("Statut mis à jour : Commandé");
            loadPurchase();
        } catch (e: any) {
            toast.error(e?.response?.data?.message || "Erreur lors de la mise à jour");
            setLoading(false);
        }
    };

    const handleCancelClick = () => {
        setCancelDialogOpen(true);
    };

    const confirmCancel = async () => {
        try {
            setLoading(true);
            await cancelPurchase(id);
            toast.success("Bon de commande annulé");
            setCancelDialogOpen(false);
            loadPurchase();
        } catch (e: any) {
            toast.error(e?.response?.data?.message || "Erreur lors de l'annulation");
            setLoading(false);
        }
    };

    const openReceiveModal = () => {
        if (!purchase) return;

        // Initialize receive data
        const initialReceiveData: ReceiveItemData[] = purchase.items
            ?.filter(item => item.received_quantity < item.quantity)
            .map(item => ({
                id: item.id,
                receive_quantity: item.quantity - item.received_quantity // Suggest full remaining amount
            })) || [];

        if (initialReceiveData.length === 0) {
            toast.info("Tous les articles ont déjà été reçus.");
            return;
        }

        setReceiveData(initialReceiveData);
        setReceiveModalOpen(true);
    };

    const handleReceiveQuantityChange = (itemId: number, value: string) => {
        const qty = parseInt(value) || 0;
        setReceiveData(prev =>
            prev.map(item =>
                item.id === itemId ? { ...item, receive_quantity: Math.max(0, qty) } : item
            )
        );
    };

    const submitReceive = async () => {
        try {
            setReceiving(true);
            // Filter out > 0 to avoid sending empty receivings
            const itemsToReceive = receiveData.filter(i => i.receive_quantity > 0);

            if (itemsToReceive.length === 0) {
                toast.warning("Veuillez indiquer au moins une quantité à réceptionner.");
                setReceiving(false);
                return;
            }

            await receiveItems(id, itemsToReceive);
            toast.success("Marchandises réceptionnées avec succès ! Les stocks ont été mis à jour.");
            setReceiveModalOpen(false);
            loadPurchase();
        } catch (e: any) {
            toast.error(e?.response?.data?.message || "Erreur lors de la réception.");
        } finally {
            setReceiving(false);
        }
    };

    if (loading && !purchase) {
        return (
            <AppLayout breadcrumbs={[
                { title: "Admin", href: "/dashboard" },
                { title: "Achats", href: "/user/purchases" },
                { title: "Chargement...", href: "#" },
            ]}>
                <Head title="Bon de Commande" />
                <div className="flex items-center justify-center h-64">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
            </AppLayout>
        );
    }

    if (!purchase) return null;

    const statusConf = STATUS_CONFIG[purchase.status];
    const canReceive = purchase.status === 'ORDERED' || purchase.status === 'PARTIALLY_RECEIVED';
    const canCancel = purchase.status === 'DRAFT' || purchase.status === 'ORDERED';
    const canEdit = purchase.status === 'DRAFT';

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "XOF",
        }).format(amount);
    };

    const handlePrint = () => {
        window.open(`/purchases/${purchase.id}/pdf/view`, '_blank');
    };

    const handleDownloadPdf = () => {
        window.open(`/purchases/${purchase.id}/pdf/download`, '_blank');
    };

    return (
        <AppLayout breadcrumbs={[
            { title: "Admin", href: "/dashboard" },
            { title: "Achats", href: "/user/purchases" },
            { title: purchase.number, href: "#" },
        ]}>
            <Head title={`Bon de Commande ${purchase.number}`} />

            <div className="p-6 space-y-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <Button variant="ghost" onClick={() => router.visit('/user/purchases')} className="pl-0 hover:bg-transparent hover:text-emerald-600 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour à la liste
                        </Button>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mt-2">
                            Bon de Commande {purchase.number}
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        {canEdit && (
                            <Button variant="outline" onClick={() => router.visit(`/user/purchases/${purchase.id}/edit`)} className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </Button>
                        )}

                        {purchase.status === 'DRAFT' && (
                            <Button onClick={handleMarkAsOrdered} disabled={loading} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20">
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Commander
                            </Button>
                        )}

                        {canReceive && (
                            <Button onClick={openReceiveModal} disabled={loading} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20">
                                <PackageX className="mr-2 h-4 w-4" /> Réceptionner
                            </Button>
                        )}

                        {canCancel && (
                            <Button variant="outline" onClick={handleCancelClick} disabled={loading} className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                                <Trash2 className="mr-2 h-4 w-4" /> Annuler
                            </Button>
                        )}

                        <Button variant="outline" onClick={handlePrint} className="border-slate-200 hover:bg-slate-50 hover:text-slate-700">
                            <Printer className="mr-2 h-4 w-4" /> Imprimer
                        </Button>

                        <Button variant="outline" onClick={handleDownloadPdf} className="border-slate-200 hover:bg-slate-50 hover:text-slate-700">
                            <Download className="mr-2 h-4 w-4" /> Télécharger PDF
                        </Button>
                    </div>
                </div>

                <Card className="relative border-white/10 backdrop-blur-xl bg-background/60 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none" />

                    <CardHeader className="relative border-b border-white/10 pb-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-bold text-foreground">Détails de la Commande</CardTitle>
                                <p className="text-sm text-muted-foreground flex flex-col gap-1 mt-2">
                                    {purchase.order_date && (
                                        <span className="flex items-center">
                                            <span className="font-medium mr-2">Date Commande:</span>
                                            {format(new Date(purchase.order_date), "dd MMMM yyyy", { locale: fr })}
                                        </span>
                                    )}
                                    {purchase.expected_delivery_date && (
                                        <span className="flex items-center">
                                            <span className="font-medium mr-2">Livraison Prévue:</span>
                                            {format(new Date(purchase.expected_delivery_date), "dd MMMM yyyy", { locale: fr })}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="transform scale-110">
                                <Badge variant={statusConf.variant === 'success' ? 'default' : statusConf.variant} className={statusConf.variant === 'success' ? 'bg-emerald-500' : ''}>
                                    {statusConf.label}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="relative space-y-8 pt-8">
                        {/* Company & Supplier Info Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center">
                                    <div className="h-px bg-border flex-grow mr-4"></div>
                                    Entreprise
                                </h3>
                                <div className="space-y-1 pt-2">
                                    <p className="font-bold text-lg text-foreground bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{page.props.auth?.user?.entreprise?.name || "Entreprise"}</p>
                                    <p className="text-sm text-foreground/80">{page.props.auth?.user?.entreprise?.address || "Adresse non définie"}</p>
                                    <p className="text-sm text-foreground/80">{page.props.auth?.user?.entreprise?.phone ? `Tél: ${page.props.auth.user.entreprise.phone}` : ""}</p>
                                    <p className="text-sm text-muted-foreground">{page.props.auth?.user?.entreprise?.email || "Email non défini"}</p>
                                    {page.props.auth?.user?.entreprise?.rccm && <p className="text-xs text-muted-foreground mt-2">RCCM: {page.props.auth.user.entreprise.rccm}</p>}
                                    {page.props.auth?.user?.entreprise?.niu && <p className="text-xs text-muted-foreground">NIU: {page.props.auth.user.entreprise.niu}</p>}
                                </div>
                            </div>

                            <div className="space-y-4 text-right">
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-end">
                                    Fournisseur
                                    <div className="h-px bg-border flex-grow ml-4"></div>
                                </h3>
                                <div className="bg-gradient-to-br from-muted/50 to-muted/20 p-5 rounded-xl border border-white/10 shadow-sm inline-block min-w-[250px] text-left">
                                    <p className="font-bold text-lg text-foreground">{purchase.supplier?.name}</p>
                                    <div className="space-y-1 mt-2 text-sm text-muted-foreground">
                                        {purchase.supplier?.address && <p>{purchase.supplier.address}</p>}
                                        {purchase.supplier?.phone && <p>Tel: {purchase.supplier.phone}</p>}
                                        {purchase.supplier?.email && <p>Email: {purchase.supplier.email}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Articles Commandés</h3>
                            <div className="rounded-xl border border-white/10 overflow-hidden shadow-sm bg-background/40">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/40 border-b border-white/10">
                                        <tr>
                                            <th className="p-4 text-left font-semibold text-muted-foreground">Produit</th>
                                            <th className="p-4 text-right font-semibold text-muted-foreground w-32">Prix Unit.</th>
                                            <th className="p-4 text-center font-semibold text-muted-foreground w-24">Qté</th>
                                            <th className="p-4 text-center font-semibold text-muted-foreground w-24">Reçu</th>
                                            <th className="p-4 text-right font-semibold text-foreground w-40">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {purchase.items?.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-muted/20 transition-colors">
                                                <td className="p-4 font-medium text-foreground/90">{item.product?.name || `Produit #${item.product_id}`}</td>
                                                <td className="p-4 text-right text-muted-foreground">{formatCurrency(item.unit_price)}</td>
                                                <td className="p-4 text-center text-muted-foreground font-semibold">{item.quantity}</td>
                                                <td className="p-4 text-center">
                                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${item.received_quantity === item.quantity
                                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                        : item.received_quantity > 0
                                                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                                            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                                                        }`}>
                                                        {item.received_quantity}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right font-bold text-foreground">{formatCurrency(item.total_price)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Totals Section */}
                        <div className="flex justify-end pt-4">
                            <div className="w-80 space-y-4 p-6 rounded-xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Sous-total HT</span>
                                        <span className="font-medium text-foreground">{formatCurrency(purchase.total_amount - purchase.tax_amount)}</span>
                                    </div>
                                    {purchase.tax_amount > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Taxes additionnelles</span>
                                            <span className="font-medium text-foreground">{formatCurrency(purchase.tax_amount)}</span>
                                        </div>
                                    )}
                                </div>
                                <Separator className="bg-emerald-500/10" />
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-emerald-900 dark:text-emerald-100 uppercase tracking-wide">Total TTC</span>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                        {formatCurrency(purchase.total_amount)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {purchase.notes && (
                            <div className="pt-2">
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Notes / Conditions</h3>
                                <div className="bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/50 dark:border-teal-800/30 p-5 rounded-xl text-sm text-foreground/80 leading-relaxed shadow-sm">
                                    {purchase.notes}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Receive Modal */}
            <Dialog open={receiveModalOpen} onOpenChange={setReceiveModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Réceptionner la marchandise</DialogTitle>
                        <DialogDescription>
                            Indiquez les quantités reçues pour chaque article du bon de commande. Les stocks produits seront mis à jour automatiquement.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Produit</TableHead>
                                    <TableHead className="text-center">En attente</TableHead>
                                    <TableHead className="text-right w-32">À réceptionner</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {purchase.items?.filter(i => i.received_quantity < i.quantity).map((item) => {
                                    const pending = item.quantity - item.received_quantity;
                                    const receiveItemData = receiveData.find(r => r.id === item.id);
                                    const currentVal = receiveItemData?.receive_quantity.toString() || "0";

                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.product?.name}</TableCell>
                                            <TableCell className="text-center"><Badge variant="outline">{pending}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max={pending}
                                                    value={currentVal}
                                                    onChange={(e) => handleReceiveQuantityChange(item.id, e.target.value)}
                                                    className="h-8 w-24 ml-auto text-right"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setReceiveModalOpen(false)}>Annuler</Button>
                        <Button onClick={submitReceive} disabled={receiving} className="bg-emerald-600 hover:bg-emerald-700">
                            {receiving ? "Enregistrement..." : "Confirmer la réception"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Cancel Confirmation Dialog */}
            <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action va annuler ce bon de commande. Il ne pourra plus être modifié ni réceptionné.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Retour</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmCancel} className="bg-red-600 hover:bg-red-700 text-white">
                            Oui, annuler la commande
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </AppLayout>
    );
}
