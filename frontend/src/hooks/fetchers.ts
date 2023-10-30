import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import ky from "ky";

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
});

export const getProducts = async () => {
  const response: Product[] = await api.get("products").json();

  return response;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`products/${id}`);
};

export const getCategories = async () => {
  const response: Category[] = await api.get("categories").json();

  return response;
};
