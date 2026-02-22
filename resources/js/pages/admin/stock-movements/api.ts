import { StockMovementForm } from "./types";

const BASE_URL = "/admin/api/stock-movements";

function getCsrfToken() {
    const el = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
    return el?.content ?? "";
}

export async function fetchStockMovements(queryString: string) {
    const res = await fetch(`${BASE_URL}?${queryString}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
    });

    if (!res.ok) {
        throw new Error(`Erreur ${res.status}: ${res.statusText}`);
    }

    return await res.json();
}

export async function fetchProducts(queryString: string = "") {
    const res = await fetch(`/admin/api/products?${queryString}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
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
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": getCsrfToken(),
        },
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
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": getCsrfToken(),
        },
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
        headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": getCsrfToken(),
        },
    });

    if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
    }

    return true;
}
