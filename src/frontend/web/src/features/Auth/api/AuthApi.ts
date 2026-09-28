import { apiClient } from "../../../api/client"

export const registerUser = async(userName: string, password: string) => {
    const response = await apiClient.post(`/auth/register`, {
        UserName: userName,
        Password: password
    });
    return response.data;
}

export const loginUser = async(userName: string, password: string) => {
    const response = await apiClient.post(`/auth/login`, {
        UserName: userName,
        Password: password
    });
    return response.data;
}

export const logoutUser = async() => {
    const response = await apiClient.post(`/auth/logout`, {});
    return response.data;
}
