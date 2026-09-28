import { apiClient } from "../../../api/client"

export const addOrder = async() => {
    const response = await apiClient.post(`/order`);
    return response.data;
}