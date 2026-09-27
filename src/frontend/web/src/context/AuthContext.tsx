import { createContext, useContext, useState, type PropsWithChildren } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType|undefined>(undefined)

export function AuthProvider({children} :PropsWithChildren) {

    const [, setLoggedInUserId] = useState<string|null> (localStorage.getItem("userId"));
    const [accessToken, setAccessToken] = useState<string|null> (localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState<string|null> (localStorage.getItem("refreshToken"));

    const login = (accessToken: string, refreshToken: string) => {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        var userId = decoded.sub;
        localStorage.setItem("userId", userId!);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setLoggedInUserId(userId!);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    };

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setLoggedInUserId(null);
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