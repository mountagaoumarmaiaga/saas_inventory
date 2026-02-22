export interface Product {
    id: number;
    name: string;
    sku: string | null;
    image_path: string | null;
    image_url: string | null;
    description: string | null;
    price?: number; // Might be used in some contexts
    sale_price: number | null;
    purchase_price: number | null;
    quantity: number;
    min_quantity: number | null;
    unit: string | null;
    category_id: number | null;
    sub_category_id: number | null;
    category?: { id: number; name: string };
    sub_category?: { id: number; name: string };
    created_at: string;
    updated_at: string;
}

export interface ProductPaginatedResponse {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
    links: { url: string | null; label: string; active: boolean }[];
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number;
    to?: number;
}
