// resources/js/pages/admin/categories/api.ts
import type { Category, PaginationMeta } from "./types";

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

export function normalizeListResponse(json: any): { items: Category[]; meta: PaginationMeta } {
  if (!json) return { items: [], meta: {} };

  if (json.data && Array.isArray(json.data.data)) {
    return { items: json.data.data, meta: json.data.meta ?? json.meta ?? {} };
  }

  if (Array.isArray(json.data)) {
    return { items: json.data, meta: json.meta ?? {} };
  }

  if (json.data && Array.isArray(json.data.items)) {
    return { items: json.data.items, meta: json.data.meta ?? json.meta ?? {} };
  }

  return { items: [], meta: json.meta ?? {} };
}

export async function fetchCategories(queryString: string): Promise<{ items: Category[]; meta: PaginationMeta }> {
  const res = await fetch(`/admin/api/categories?${queryString}`, {
    method: "GET",
    credentials: "same-origin",
    headers: getHeaders(),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erreur HTTP ${res.status}: ${errorText}`);
  }

  const json = await res.json();
  return normalizeListResponse(json);
}

// Retourne directement Response pour compatibilité avec les composants
export async function createCategoryApi(fd: FormData): Promise<Response> {
  return fetch("/admin/api/categories", {
    method: "POST",
    credentials: "same-origin",
    headers: getHeaders(),
    body: fd,
  });
}

// Retourne directement Response pour compatibilité avec les composants
export async function updateCategoryApi(id: number, fd: FormData): Promise<Response> {
  fd.append("_method", "PUT");

  return fetch(`/admin/api/categories/${id}`, {
    method: "POST",
    credentials: "same-origin",
    headers: getHeaders(),
    body: fd,
  });
}

// Retourne directement Response pour compatibilité avec les composants
export async function deleteCategoryApi(id: number): Promise<Response> {
  return fetch(`/admin/api/categories/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
    headers: getHeaders(),
  });
}

// Fonction utilitaire pour créer un FormData à partir d'un objet
export function createFormData(data: Record<string, any>): FormData {
  const fd = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      fd.append(key, value);
    }
  });

  return fd;
}
