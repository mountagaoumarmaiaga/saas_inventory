import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import type { Product } from "./types";
import { Link } from "@inertiajs/react";

interface ProductActionsMenuProps {
    product: Product;
    onDelete: (p: Product) => void;
}

export default function ProductActionsMenu({
    product,
    onDelete,
}: ProductActionsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Ouvrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <Link href={`/admin/products/${product.id}/edit`} className="flex w-full items-center cursor-pointer">
                        <Pencil className="mr-2 h-4 w-4" />
                        Modifier
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={() => onDelete(product)}
                >
                    <Trash className="mr-2 h-4 w-4" />
                    Supprimer
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
