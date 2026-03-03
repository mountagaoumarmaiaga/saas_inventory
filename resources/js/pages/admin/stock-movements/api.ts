import { StockMovementForm } from "./types";

const BASE_URL = "/admin/api/stock-movements";

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

export async function fetchStockMovements(queryString: string) {
    const res = await fetch(`${BASE_URL}?${queryString}`, {
        method: "GET",
        headers: getHeaders(),
    });

    if (!res.ok) {
        throw new Error(`Erreur ${res.status}: ${res.statusText}`);
    }

    return await res.json();
}

export async function fetchProducts(queryString: string = "") {
    const res = await fetch(`/admin/api/products?${queryString}`, {
        method: "GET",
        headers: getHeaders(),
    });

    if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
    }

    const json = await res.json();
    return paramsToPagination(json);
}

function paramsToPagination(json: any) {
    if (json.data && Array.isArray(json.data)) return { items: json.data, meta: json.meta || {} };
    if (Array.isArray(json)) return { items: json, meta: {} };
    return { items: [], meta: {} };
}

export async function createStockMovementApi(form: StockMovementForm) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        credentials: "same-origin",
        headers: getHeaders({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(form),
    });

    if (res.ok) {
        return { ok: true, data: await res.json() };
    }

    if (res.status === 422) {
        const json = await res.json();
        return { ok: false, errors: json.errors };
    }

    throw new Error(`Erreur ${res.status}`);
}

export async function updateStockMovementApi(id: number, form: StockMovementForm) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: getHeaders({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(form),
    });

    if (res.ok) {
        return { ok: true, data: await res.json() };
    }

    if (res.status === 422) {
        const json = await res.json();
        return { ok: false, errors: json.errors };
    }

    throw new Error(`Erreur ${res.status}`);
}

export async function deleteStockMovementApi(id: number) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: getHeaders(),
    });

    if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
    }

    return true;
}
