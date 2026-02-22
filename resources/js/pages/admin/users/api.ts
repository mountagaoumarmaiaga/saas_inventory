
import type { User, UserForm } from "./types";

function getCsrfToken() {
    const el = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
    return el?.content ?? "";
}

export async function fetchUsers() {
    const res = await fetch("/admin/api/users", {
        method: "GET",
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erreur HTTP ${res.status}: ${errorText}`);
    }

    const json = await res.json();
    return json;
}

function formToFD(form: UserForm, method?: string) {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("role", form.role);

    if (form.password) fd.append("password", form.password);
    if (form.password_confirmation) fd.append("password_confirmation", form.password_confirmation);
    if (form.entreprise_id) fd.append("entreprise_id", String(form.entreprise_id));

    if (method) {
        fd.append("_method", method);
    }

    return fd;
}

export async function createUserApi(form: UserForm) {
    const res = await fetch("/admin/api/users", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": getCsrfToken(),
        },
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

export async function updateUserApi(id: number, form: UserForm) {
    const res = await fetch(`/admin/api/users/${id}`, {
        method: "POST", // POST + _method: PUT because FormData doesn't support PUT directly in some setups
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": getCsrfToken(),
        },
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

export async function deleteUserApi(id: number) {
    const res = await fetch(`/admin/api/users/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": getCsrfToken(),
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erreur HTTP ${res.status}: ${errorText}`);
    }

    return { ok: true as const };
}
