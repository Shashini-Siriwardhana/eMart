import { apiClient } from "../../../api/client"

export const registerUser = async(userName: string, password: string) => {
    const response = await apiClient.post(`/api/auth/reister`, {
        UserName: userName,
        Password: password
    });
    return response.data;
}

export const loginUser = async(userName: string, password: string) => {
    const response = await apiClient.post(`/api/auth/login`, {
        UserName: userName,
        Password: password
    });
    return response.data;
}
