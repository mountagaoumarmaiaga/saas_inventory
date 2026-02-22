
import type { Invoice, InvoiceForm, PaginationMeta } from "./types";

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

export async function fetchInvoices(queryString: string) {
    const res = await fetch(`/user/api/invoices?${queryString}`, {
        method: "GET",
        credentials: "same-origin",
        headers: getHeaders(),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erreur HTTP ${res.status}: ${errorText}`);
    }

    const json = await res.json();

    // Normalize response
    let items: Invoice[] = [];
    let meta: PaginationMeta = {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        links: []
    };

    if (json.data && Array.isArray(json.data)) {
        items = json.data;
        meta = json.meta ?? json.links ?? {};
        if (json.current_page) {
            meta = {
                current_page: json.current_page,
                last_page: json.last_page,
                per_page: json.per_page,
                total: json.total,
                links: json.links
            };
        }
    } else if (json.data && json.data.data) {
        items = json.data.data;
        meta = json.data.meta ?? json.data;
    } else {
        items = Array.isArray(json) ? json : (json.data || []);
        if (json.current_page) {
            meta = {
                current_page: json.current_page,
                last_page: json.last_page,
                per_page: json.per_page,
                total: json.total,
                links: json.links
            };
        }
    }

    return { items, meta };
}

function formToFD(form: InvoiceForm, method?: string) {
    const fd = new FormData();
    fd.append("type", form.type);
    fd.append("client_id", String(form.client_id));
    fd.append("tva", String(form.tva));
    fd.append("date", form.date);
    if (form.notes) fd.append("notes", form.notes);

    form.items.forEach((item, index) => {
        if (item.product_id) fd.append(`items[${index}][product_id]`, String(item.product_id));
        fd.append(`items[${index}][description]`, item.description);
        fd.append(`items[${index}][unit_price]`, String(item.unit_price));
        fd.append(`items[${index}][quantity]`, String(item.quantity));
    });

    if (method) {
        fd.append("_method", method);
    }

    return fd;
}

export async function createInvoiceApi(form: InvoiceForm) {
    const res = await fetch("/user/api/invoices", {
        method: "POST",
        credentials: "same-origin",
        headers: getHeaders(),
        body: formToFD(form),
    });

    if (res.status === 422) {
        return { ok: false as const, errors: (await res.json())?.errors ?? {} };
    }

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return { ok: true as const, data: await res.json() };
}

export async function updateInvoiceApi(id: number, form: InvoiceForm) {
    const res = await fetch(`/user/api/invoices/${id}`, {
        method: "POST",
        credentials: "same-origin",
        headers: getHeaders(),
        body: formToFD(form, "PUT"),
    });

    if (res.status === 422) {
        return { ok: false as const, errors: (await res.json())?.errors ?? {} };
    }

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return { ok: true as const, data: await res.json() };
}

export async function deleteInvoiceApi(id: number) {
    const res = await fetch(`/user/api/invoices/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: getHeaders(),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erreur HTTP ${res.status}: ${errorText}`);
    }

    return { ok: true as const };
}

export async function submitInvoiceApi(id: number) {
    const res = await fetch(`/user/api/invoices/${id}/submit`, {
        method: "POST",
        credentials: "same-origin",
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    return { ok: true as const, data: await res.json() };
}

export async function validateProformaApi(id: number) {
    const res = await fetch(`/user/api/invoices/${id}/validate-proforma`, {
        method: "POST",
        credentials: "same-origin",
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    return { ok: true as const, data: await res.json() };
}

export async function requestModificationApi(id: number) {
    const res = await fetch(`/user/api/invoices/${id}/request-modification`, {
        method: "POST",
        credentials: "same-origin",
        headers: getHeaders(),
    });
    if (!res.ok) {
        const text = await res.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch { }

        const error = new Error(data?.message || text);
        (error as any).response = {
            status: res.status,
            data: data
        };
        throw error;
    }
    return { ok: true as const, data: await res.json() };
}

