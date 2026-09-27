import { apiClient } from "../../../api/client"

export const addOrder = async() => {
    const response = await apiClient.post(`/order/user/01a0208b-92c8-7ec0-8424-b0a74f420270`);
    return response.data;
}