
export interface InvoiceItem {
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

export interface Invoice {
    id: number;
    number: string;
    type: 'invoice' | 'proforma';
    status: string;
    client_id: number;
    client?: Client;
    tva: number;
    date: string;
    notes?: string;
    subtotal: number;
    total: number;
    items: InvoiceItem[];
    created_by: number;
    created_at: string;
    updated_at: string;
    modification_requested_at?: string;
    discount_type?: 'percentage' | 'fixed' | null;
    discount_value?: number | null;
    discount_amount?: number | null;
}

export interface InvoiceForm {
    type: 'invoice' | 'proforma';
    client_id: number;
    tva: number;
    date: string;
    notes?: string;
    items: InvoiceItem[];
    discount_type?: 'percentage' | 'fixed' | null;
    discount_value?: number | null;
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
