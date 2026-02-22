import axios from "axios";
import { Product, ProductPaginatedResponse } from "./types";

export async function fetchProducts(query: string) {
    const response = await axios.get<ProductPaginatedResponse>(`/admin/api/products?${query}`);
    return response.data;
}

export async function createProductApi(data: FormData) {
    const response = await axios.post<{ data: Product }>(`/admin/api/products`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export async function updateProductApi(id: number, data: FormData) {
    // Laravels method spoofing for PUT with FormData
    data.append("_method", "PUT");
    const response = await axios.post<{ data: Product }>(`/admin/api/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export async function deleteProductApi(id: number) {
    await axios.delete(`/admin/api/products/${id}`);
}

export async function fetchProductApi(id: number) {
    const response = await axios.get<{ data: Product }>(`/admin/api/products/${id}`);
    return response.data;
}
