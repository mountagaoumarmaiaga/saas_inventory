
export interface QuoteItem {
    id?: number;
    _tempId?: string; // For frontend list management
    product_id?: number;
    description: string;
    unit_price: number;
    quantity: number;
    line_total: number;
    _product?: any; // Store product reference for validation
}

export interface Client {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface Quote {
    id: number;
    number: string;
    status: string;
    client_id: number;
    client?: Client;
    tva: number;
    date: string;
    valid_until?: string;
    notes?: string;
    terms?: string;
    subtotal: number;
    total: number;
    items: QuoteItem[];
    created_at: string;
    updated_at: string;
}

export interface QuoteForm {
    client_id: number;
    tva: number;
    date: string;
    valid_until?: string;
    notes?: string;
    terms?: string;
    items: QuoteItem[];
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
