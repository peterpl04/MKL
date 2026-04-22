import type { Product } from "../types";
import { api } from "./api";

export type ProductPayload = {
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
};

export async function fetchProducts() {
  const { data } = await api.get<Product[]>("/products");
  return data;
}

export async function createProduct(payload: ProductPayload) {
  const { data } = await api.post<Product>("/products", payload);
  return data;
}

export async function updateProduct(id: string, payload: ProductPayload) {
  const { data } = await api.patch<Product>(`/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id: string) {
  await api.delete(`/products/${id}`);
}
