import { StockMovement } from "./types";
import { Badge } from "@/components/ui/badge";
import ClientOnly from "@/components/client-only";

export interface Column {
    key: string;
    label: string;
}

export const columns: Column[] = [
    { key: "product", label: "Produit" },
    { key: "type", label: "Type" },
    { key: "quantity", label: "Quantité" },
    { key: "reason", label: "Raison" },
    { key: "created_at", label: "Date" },
];

export function cellValue(item: StockMovement, key: string) {
    switch (key) {
        case "product":
            return <span className="font-medium">{item.product ? item.product.name : `Produit #${item.product_id}`}</span>;
        case "type":
            return (
                <Badge variant={item.type === 'IN' ? 'default' : (item.type === 'OUT' ? 'destructive' : 'secondary')}>
                    {item.type}
                </Badge>
            );
        case "quantity":
            return <span className="font-mono">{item.quantity}</span>;
        case "reason":
            return item.reason ? <span>{item.reason}</span> : <span className="text-muted-foreground italic">-</span>;
        case "created_at":
            // Use ClientOnly to avoid hydration mismatch with server timezone/locale
            return (
                <ClientOnly fallback={<span>--/--/----</span>}>
                    <span>{new Intl.DateTimeFormat('fr-FR').format(new Date(item.created_at))}</span>
                </ClientOnly>
            );
        default:
            return <span>{(item as any)[key]}</span>;
    }
}
