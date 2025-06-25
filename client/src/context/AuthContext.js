import React, { createContext, useState, useEffect } from 'react';
import { API, getProfile } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            getProfile().then(response => {
                setUser(response.data);
                setIsLoggedIn(true);
            }).catch(() => {
                localStorage.removeItem('access_token');
                setUser(null);
                setIsLoggedIn(false);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('access_token', token);
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        delete API.defaults.headers.common['Authorization'];
        setUser(null);
        setIsLoggedIn(false);
    };

    const authContextValue = { user, isLoggedIn, login, logout, loading };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;