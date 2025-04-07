import React, { createContext, useContext, useState, useEffect } from "react";
import api from '../service/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decodedToken = await api.decode();
                    setUser(decodedToken);
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.login({ email, password });
            localStorage.setItem("token", response.token);
            const decodedToken = await api.decode();
            setUser(decodedToken);
            return decodedToken;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
