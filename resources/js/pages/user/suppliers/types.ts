export interface Supplier {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    tax_number?: string;
    notes?: string;
    created_at?: string;
    updated_at?: string;
}

export interface SupplierForm {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    tax_number?: string;
    notes?: string;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}
