
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Client } from "./api";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    client: Client | null;
    onConfirm: () => void;
    deleting: boolean;
}

export default function DeleteClientModal({
    open,
    setOpen,
    client,
    onConfirm,
    deleting,
}: Props) {
    if (!client) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Supprimer le client</DialogTitle>
                    <DialogDescription>
                        Êtes-vous sûr de vouloir supprimer <b>{client.name}</b> ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={deleting}>Annuler</Button>
                    <Button variant="destructive" onClick={onConfirm} disabled={deleting}>
                        {deleting ? "Suppression..." : "Supprimer"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
