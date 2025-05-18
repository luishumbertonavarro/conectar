import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import axios from '../api/axios';

type User = {
    name: string;
    email: string;
    role: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        axios
            .get('/users/profile', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                localStorage.removeItem('token');
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
