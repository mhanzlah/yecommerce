import { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const res = await api.post("/auth/refresh");

            const { accessToken } = res.data;

            api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

            const meRes = await api.get("/auth/me");

            console.log(meRes);


            setUser(meRes.data);
            setAccessToken(accessToken);

        } catch (err) {
            setUser(null);
            setAccessToken(null);

            delete api.defaults.headers.common["Authorization"];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const register = async (name, email, password) => {
        const res = await api.post("/auth/register", { name, email, password });

        const { accessToken, user } = res.data;

        setAccessToken(accessToken);
        setUser(user);

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    };

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });

        const { accessToken, user } = res.data;

        setAccessToken(accessToken);
        setUser(user);

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    };

    const logout = async () => {
        await api.post("/auth/logout");

        setAccessToken(null);
        setUser(null);

        delete api.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};