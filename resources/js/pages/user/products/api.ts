
import { PaginationMeta } from "../../admin/products/types"; // Import types from admin if shared or duplicate

// Duplicate basic types if needed to avoid cross-module dependency on Admin pages which might change
export interface Product {
    id: number;
    name: string;
    sku: string;
    unit: string;
    purchase_price: number;
    sale_price: number;
    min_quantity: number;
    quantity: number;
    category_id: number;
    sub_category_id: number;
    image_url: string | null;
    created_at: string;
    updated_at: string;
    category?: { id: number; name: string } | null;
    sub_category?: { id: number; name: string } | null;
}

export function normalizeListResponse(json: any): { items: Product[]; meta: PaginationMeta } {
    if (!json) return { items: [], meta: { current_page: 1, last_page: 1, total: 0, per_page: 10, links: [] } };
    let items: Product[] = [];
    let meta: PaginationMeta = {
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10,
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

export async function fetchProducts(queryString: string) {
    const res = await fetch(`/user/api/products?${queryString}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    const json = await res.json();
    return normalizeListResponse(json);
}
