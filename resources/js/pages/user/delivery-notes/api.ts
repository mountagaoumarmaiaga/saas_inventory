
export interface DeliveryNoteItem {
    id: number;
    product_id: number;
    product_name: string;
    quantity: number;
}

export interface DeliveryNote {
    id: number;
    reference: string;
    delivery_date: string;
    status: string; // 'DRAFT', 'VALIDATED'
    notes?: string;
    delivery_person?: string;
    invoice_id: number;
    client_id: number;
    created_at?: string;

    // Relations
    client?: { id: number; name: string };
    invoice?: { id: number; reference: string };
    items?: DeliveryNoteItem[];
    entreprise?: { name: string; address?: string; phone?: string; email?: string; logo?: string };
}

import { PaginationMeta } from "../../admin/products/types";

export async function fetchDeliveryNotes(queryString: string) {
    const res = await fetch(`/user/api/delivery-notes?${queryString}`, {
        headers: { "Accept": "application/json", "X-Requested-With": "XMLHttpRequest" }
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}

export async function fetchDeliveryNote(id: number) {
    const res = await fetch(`/user/api/delivery-notes/${id}`, {
        headers: { "Accept": "application/json", "X-Requested-With": "XMLHttpRequest" }
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}

export async function updateDeliveryNote(id: number, data: any) {
    const res = await fetch(`/user/api/delivery-notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}

export async function createDeliveryNoteFromInvoice(invoiceId: number) {
    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

    // Debug: log if CSRF token is missing
    if (!csrfToken) {
        console.error('CSRF token not found in page. Please refresh the page.');
        throw new Error('Token de sécurité manquant. Veuillez rafraîchir la page (F5).');
    }

    const res = await fetch(`/user/api/delivery-notes/from-invoice/${invoiceId}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": csrfToken
        }
    });

    if (!res.ok) {
        const errorText = await res.text();
        if (res.status === 419) {
            throw new Error('Session expirée. Veuillez rafraîchir la page (F5) et réessayer.');
        }
        throw new Error(errorText || `Erreur ${res.status}`);
    }

    return await res.json();
}
