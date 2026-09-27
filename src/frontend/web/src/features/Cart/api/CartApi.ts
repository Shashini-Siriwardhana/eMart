import { apiClient } from "../../../api/client"

export const getCart = async() => {
    const response = await apiClient.get('/cart/01a0208b-92c8-7ec0-8424-b0a74f420270')
    return response.data;
}

export const updateCart = async(productId: string, quantity: number) => {
    const response = await apiClient.patch(`/cart/01a0208b-92c8-7ec0-8424-b0a74f420270/items/${productId}`, {quantity})
    return response.data;
}

export const removeItem = async(productId: string) => {
    const response = await apiClient.delete(`/cart/01a0208b-92c8-7ec0-8424-b0a74f420270/items/${productId}`)
    return response.data;
}