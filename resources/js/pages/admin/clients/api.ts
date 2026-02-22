
export interface Client {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    created_at: string;
}

export interface ClientForm {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

function getCsrfToken() {
    const el = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
    return el?.content ?? "";
}

export async function fetchClients(queryString: string) {
    const res = await fetch(`/admin/api/clients?${queryString}`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
    });

    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();

    // Normalize response (Laravel Resource vs simple paginate)
    let items: Client[] = [];
    let meta: PaginationMeta = { current_page: 1, last_page: 1, per_page: 10, total: 0, links: [] };

    if (json.data && Array.isArray(json.data)) {
        items = json.data;
        if (json.current_page) {
            meta = {
                current_page: json.current_page,
                last_page: json.last_page,
                per_page: json.per_page,
                total: json.total,
                links: json.links
            };
        } else if (json.meta) {
            meta = json.meta;
        }
    } else {
        items = json.data || [];
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

export async function fetchClient(id: number) {
    const res = await fetch(`/admin/api/clients/${id}`, {
        headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }
    });
    if (!res.ok) throw new Error("Client introuvable");
    return (await res.json()).data as Client;
}

// Simple JSON body for now as Clients usually don't have files
// If 419 happens, we switch to FormData.
export async function createClientApi(form: ClientForm) {
    const res = await fetch("/admin/api/clients", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": getCsrfToken(),
            "Accept": "application/json"
        },
        body: JSON.stringify(form)
    });

    if (res.status === 422) {
        return { ok: false as const, errors: (await res.json())?.errors ?? {} };
    }
    if (res.status === 419) {
        // Fallback or just re-throw to suggest FormData? 
        // We stick to JSON unless proven otherwise for simple Models.
        throw new Error("Erreur CSRF (419). Rechargez la page.");
    }
    if (!res.ok) throw new Error(await res.text());
    return { ok: true as const, data: await res.json() };
}

export async function updateClientApi(id: number, form: ClientForm) {
    const res = await fetch(`/admin/api/clients/${id}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": getCsrfToken(),
            "Accept": "application/json"
        },
        body: JSON.stringify(form)
    });

    if (res.status === 422) {
        return { ok: false as const, errors: (await res.json())?.errors ?? {} };
    }
    if (!res.ok) throw new Error(await res.text());
    return { ok: true as const, data: await res.json() };
}

export async function deleteClientApi(id: number) {
    const res = await fetch(`/admin/api/clients/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": getCsrfToken(),
            "Accept": "application/json"
        }
    });
    if (!res.ok) throw new Error(await res.text());
    return { ok: true as const };
}
