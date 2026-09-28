import { createContext, useContext, useState, type PropsWithChildren } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    userId: string | null;
    userName: string | null;
    role: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

export interface JwtPayload {
    sub: string;
    name: string;
    role?: string;
}

const AuthContext = createContext<AuthContextType|undefined>(undefined)

export function AuthProvider({children} :PropsWithChildren) {

    const [userId, setUserId] = useState<string|null> (localStorage.getItem("userId"));
    const [userName, setUserName] = useState<string|null> (localStorage.getItem("userName"));
    const [role, setRole] = useState<string|null> (localStorage.getItem("role"));
    const [accessToken, setAccessToken] = useState<string|null> (localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState<string|null> (localStorage.getItem("refreshToken"));

    const login = (accessToken: string, refreshToken: string) => {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        var userId = decoded.sub;
        var userName = decoded.name;
        var role = decoded.role;
        localStorage.setItem("userId", userId!);
        localStorage.setItem("userName", userName!);
        localStorage.setItem("role", role!);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setUserId(userId!);
        setUserName(userName!);
        setRole(role!);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    };

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setUserId(null);
        setUserName(null);
        setRole(null);
        setAccessToken(null);
        setRefreshToken(null);
    }

    return (
        <AuthContext.Provider value={{
            userId,
            userName,
            role,
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