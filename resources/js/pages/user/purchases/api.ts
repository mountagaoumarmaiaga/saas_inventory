import axios from "axios";
import { Purchase, PurchaseFormData, ReceiveItemData } from "./types";
import { PaginatedResponse } from "@/types";

export const fetchPurchases = async (page = 1, search = ""): Promise<PaginatedResponse<Purchase>> => {
    const { data } = await axios.get(`/user/api/purchases`, {
        params: { page, search },
    });
    return data;
};

export const fetchPurchase = async (id: number): Promise<Purchase> => {
    const { data } = await axios.get(`/user/api/purchases/${id}`);
    return data;
};

export const createPurchase = async (payload: PurchaseFormData): Promise<Purchase> => {
    const { data } = await axios.post(`/user/api/purchases`, payload);
    return data.purchase;
};

export const updatePurchase = async (id: number, payload: PurchaseFormData): Promise<Purchase> => {
    const { data } = await axios.put(`/user/api/purchases/${id}`, payload);
    return data.purchase;
};

export const deletePurchase = async (id: number): Promise<void> => {
    await axios.delete(`/user/api/purchases/${id}`);
};

export const markAsOrdered = async (id: number): Promise<Purchase> => {
    const { data } = await axios.post(`/user/api/purchases/${id}/mark-ordered`);
    return data.purchase;
};

export const receiveItems = async (id: number, items: ReceiveItemData[]): Promise<Purchase> => {
    const { data } = await axios.post(`/user/api/purchases/${id}/receive`, { items });
    return data.purchase;
};

export const cancelPurchase = async (id: number): Promise<Purchase> => {
    const { data } = await axios.post(`/user/api/purchases/${id}/cancel`);
    return data.purchase;
};
