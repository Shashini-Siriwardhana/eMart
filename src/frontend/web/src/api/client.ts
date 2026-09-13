import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
})

apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            return Promise.reject(error);
        }

        try {
            const userId = "01a09577-699e-71e4-90a3-3f50c0bdcb8e";

            const response = await axios.post(
                '/api/auth/refresh-token', {
                    userId: userId,
                    refreshToken: refreshToken
                }
            )
            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;

            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return apiClient(originalRequest);
        } catch (refreshError) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            return Promise.reject(refreshError);
        }
    }
);