import { PaginatedResponse } from '@/types';
import { Supplier } from '../suppliers/types';
import { Product } from '../products/types';

export type PurchaseStatus = 'DRAFT' | 'ORDERED' | 'PARTIALLY_RECEIVED' | 'RECEIVED' | 'CANCELLED';

export interface PurchaseItem {
    id: number;
    purchase_id: number;
    product_id: number;
    quantity: number;
    received_quantity: number;
    unit_price: number;
    total_price: number;
    product?: Product;
}

export interface Purchase {
    id: number;
    entreprise_id: number;
    supplier_id: number;
    number: string;
    status: PurchaseStatus;
    order_date: string | null;
    expected_delivery_date: string | null;
    total_amount: number;
    tax_amount: number;
    notes: string | null;
    created_by: number;
    receipt_path: string | null;
    payment_status: 'UNPAID' | 'PARTIAL' | 'PAID';
    amount_paid: number;
    amount_due: number;
    created_at: string;
    updated_at: string;
    supplier?: Supplier;
    items?: PurchaseItem[];
}

export interface PurchaseFormData {
    supplier_id: number | '';
    order_date: string;
    expected_delivery_date: string;
    notes: string;
    tax_amount: number;
    items: {
        id?: number;
        product_id: number | '';
        quantity: number;
        unit_price: number;
    }[];
}

export interface ReceiveItemData {
    id: number;
    receive_quantity: number;
}
