
import { PaginationMeta } from "../../admin/products/types";
import { DeliveryNote } from "../../user/delivery-notes/api";

function getCsrfToken() {
    const el = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
    return el?.content ?? "";
}

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
}

function getHeaders(extraHeaders: Record<string, string> = {}) {
    const headers: Record<string, string> = {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...extraHeaders,
    };

    const useCookie = getCookie("XSRF-TOKEN");
    if (useCookie) {
        headers["X-XSRF-TOKEN"] = decodeURIComponent(useCookie);
    } else {
        headers["X-CSRF-TOKEN"] = getCsrfToken();
    }

    return headers;
}

export async function fetchDeliveryNotes(queryString: string) {
    const res = await fetch(`/admin/api/delivery-notes?${queryString}`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            ...getHeaders(),
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
        },
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return await res.json();
}

export async function fetchDeliveryNote(id: number) {
    const res = await fetch(`/admin/api/delivery-notes/${id}`, {
        method: "GET",
        credentials: "same-origin",
        headers: getHeaders(),
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return await res.json();
}

export async function updateDeliveryNote(id: number, data: any) {
    const res = await fetch(`/admin/api/delivery-notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getHeaders()
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}

export async function createDeliveryNoteFromInvoice(invoiceId: number) {
    const res = await fetch(`/admin/api/delivery-notes/from-invoice/${invoiceId}`, {
        method: "POST",
        headers: getHeaders()
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
