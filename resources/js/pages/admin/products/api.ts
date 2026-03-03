import axios from "axios";
import { Product, ProductPaginatedResponse } from "./types";

function getCsrfToken() {
    const el = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
    return el?.content ?? "";
}

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
}

function getHeaders(extraHeaders: Record<string, string> = {}) {
    const headers: Record<string, string> = {
        ...extraHeaders,
    };

    const useCookie = getCookie("XSRF-TOKEN");
    if (useCookie) {
        headers["X-XSRF-TOKEN"] = decodeURIComponent(useCookie);
    } else {
        headers["X-CSRF-TOKEN"] = getCsrfToken();
    }

    return headers;
}

export async function fetchProducts(query: string) {
    const response = await axios.get<ProductPaginatedResponse>(`/admin/api/products?${query}`);
    return response.data;
}

export async function createProductApi(data: FormData) {
    const response = await axios.post<{ data: Product }>(`/admin/api/products`, data, {
        headers: getHeaders({ "Content-Type": "multipart/form-data" }),
    });
    return response.data;
}

export async function updateProductApi(id: number, data: FormData) {
    // Laravels method spoofing for PUT with FormData
    data.append("_method", "PUT");
    const response = await axios.post<{ data: Product }>(`/admin/api/products/${id}`, data, {
        headers: getHeaders({ "Content-Type": "multipart/form-data" }),
    });
    return response.data;
}

export async function deleteProductApi(id: number) {
    await axios.delete(`/admin/api/products/${id}`, {
        headers: getHeaders(),
    });
}

export async function fetchProductApi(id: number) {
    const response = await axios.get<{ data: Product }>(`/admin/api/products/${id}`);
    return response.data;
}
