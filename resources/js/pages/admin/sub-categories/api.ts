// resources/js/pages/admin/sub-categories/api.ts

import type { Category, SubCategory, PaginationMeta } from "./types";

function getCsrfToken() {
  const el = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
  return el?.content ?? "";
}

/**
 * Normalize pagination response:
 * - { data: [...], meta: {...} }
 * - { data: { data: [...], meta: {...} } }
 * - { data: { items: [...] } }
 */
export function normalizeListResponse<T>(json: any): { items: T[]; meta: PaginationMeta } {
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

async function requestJson(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  // 422
  if (res.status === 422) {
    const json = await res.json();
    return { ok: false, status: 422 as const, json };
  }

  // error
  if (!res.ok) {
    const text = await res.text();
    return { ok: false, status: res.status, text };
  }

  const json = await res.json();
  return { ok: true, status: res.status, json };
}

/** SUB-CATEGORIES */
export async function fetchSubCategories(params: { q?: string; page?: number; perPage?: number }) {
  const sp = new URLSearchParams();
  if (params.q?.trim()) sp.set("q", params.q.trim());
  sp.set("page", String(params.page ?? 1));
  sp.set("perPage", String(params.perPage ?? 10));

  return requestJson(`/admin/api/sub-categories?${sp.toString()}`, { method: "GET" });
}

export async function createSubCategoryApi(payload: {
  category_id: string | number;
  name: string;
  slug?: string;
}) {
  return requestJson(`/admin/api/sub-categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCsrfToken(),
    },
    body: JSON.stringify(payload),
  });
}

export async function updateSubCategoryApi(
  id: number,
  payload: { category_id: string | number; name: string; slug?: string }
) {
  return requestJson(`/admin/api/sub-categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCsrfToken(),
    },
    body: JSON.stringify(payload),
  });
}

export async function deleteSubCategoryApi(id: number) {
  return requestJson(`/admin/api/sub-categories/${id}`, {
    method: "DELETE",
    headers: {
      "X-CSRF-TOKEN": getCsrfToken(),
    },
  });
}

/** CATEGORIES (pour select) */
export async function fetchCategories(params: { perPage?: number } = {}) {
  const sp = new URLSearchParams();
  sp.set("page", "1");
  sp.set("perPage", String(params.perPage ?? 200));

  return requestJson(`/admin/api/categories?${sp.toString()}`, { method: "GET" });
}
