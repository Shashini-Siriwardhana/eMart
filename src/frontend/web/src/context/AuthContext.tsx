import { createContext, useContext, useState, type PropsWithChildren } from "react";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType|undefined>(undefined)

export function AuthProvider({children} :PropsWithChildren) {

    const [accessToken, setAccessToken] = useState<string|null> (localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState<string|null> (localStorage.getItem("refreshToken"));

    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setAccessToken(null);
        setRefreshToken(null);
    }

    return (
        <AuthContext.Provider value={{
            accessToken,
            refreshToken,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider.")
    }

    return context;
}