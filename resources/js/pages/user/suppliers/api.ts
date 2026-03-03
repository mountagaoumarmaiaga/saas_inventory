import type { Supplier, SupplierForm, PaginationMeta } from "./types";

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
        "Content-Type": "application/json",
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

export async function fetchSuppliers(queryString: string) {
    const res = await fetch(`/user/api/suppliers?${queryString}`, {
        method: "GET",
        credentials: "same-origin",
        headers: getHeaders(),
    });

    if (!res.ok) {
        throw new Error(`Erreur HTTP ${res.status}: ${await res.text()}`);
    }

    const json = await res.json();

    let items: Supplier[] = [];
    let meta: PaginationMeta = {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        links: []
    };

    if (json.data && Array.isArray(json.data)) {
        items = json.data;
        meta = {
            current_page: json.current_page || 1,
            last_page: json.last_page || 1,
            per_page: json.per_page || 10,
            total: json.total || items.length,
            links: json.links || []
        };
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

export async function getSupplierApi(id: number) {
    const res = await fetch(`/user/api/suppliers/${id}`, {
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()).data as Supplier;
}

export async function createSupplierApi(form: SupplierForm) {
    const res = await fetch("/user/api/suppliers", {
        method: "POST",
        credentials: "same-origin",
        headers: getHeaders(),
        body: JSON.stringify(form),
    });

    if (res.status === 422) {
        return { ok: false as const, errors: (await res.json())?.errors ?? {} };
    }

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return { ok: true as const, data: await res.json() };
}

export async function updateSupplierApi(id: number, form: SupplierForm) {
    const res = await fetch(`/user/api/suppliers/${id}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: getHeaders(),
        body: JSON.stringify(form),
    });

    if (res.status === 422) {
        return { ok: false as const, errors: (await res.json())?.errors ?? {} };
    }

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return { ok: true as const, data: await res.json() };
}

export async function deleteSupplierApi(id: number) {
    const res = await fetch(`/user/api/suppliers/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: getHeaders(),
    });

    if (!res.ok) {
        throw new Error(`Erreur HTTP ${res.status}: ${await res.text()}`);
    }

    return { ok: true as const };
}
