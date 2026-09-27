import { apiClient } from "../../../api/client"
import type { Cart } from "../../Cart/types/Cart";
import type { CreateCartItem } from "../types/CreateCartItem";
import type { CreateProduct } from "../types/CreateProduct";
import { type Product } from "../types/Product";

export const getProducts = async () : Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
};

export const getProductById = async (id: string) : Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
};

export const addProduct = async (payload: CreateProduct) : Promise<Product> => {
    const response = await apiClient.post<Product>('/products', payload);
    return response.data;
}

export const addProductToCart = async (payload: CreateCartItem) : Promise<Cart> => {
    const response = await apiClient.post('/cart/01a0208b-92c8-7ec0-8424-b0a74f420270', payload);
    return response.data;
}