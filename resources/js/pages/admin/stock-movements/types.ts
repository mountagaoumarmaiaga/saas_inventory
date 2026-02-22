export interface PaginationMeta {
    current_page?: number;
    from?: number;
    last_page?: number;
    path?: string;
    per_page?: number;
    to?: number;
    total?: number;
}

export interface Product {
    id: number;
    name: string;
    // Add other product fields if needed
}

export interface StockMovement {
    id: number;
    entreprise_id: number;
    product_id: number;
    product?: Product; // Relation loaded
    type: 'IN' | 'OUT' | 'ADJUSTMENT';
    quantity: number;
    reason?: string;
    invoice_id?: number;
    created_by: number;
    created_at: string;
    updated_at: string;
}

export interface StockMovementForm {
    product_id: number;
    type: 'IN' | 'OUT' | 'ADJUSTMENT';
    quantity: number;
    reason?: string;
    invoice_id?: number | null;
}
