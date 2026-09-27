import { apiClient } from "../../../api/client"

export const getCart = async() => {
    const response = await apiClient.get('/cart')
    return response.data;
}

export const updateCart = async(productId: string, quantity: number) => {
    const response = await apiClient.patch(`/cart/items/${productId}`, {quantity})
    return response.data;
}

export const removeItem = async(productId: string) => {
    const response = await apiClient.delete(`/cart/items/${productId}`)
    return response.data;
}