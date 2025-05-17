// src/components/RoleProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

interface RoleProtectedRouteProps {
    children: ReactNode;
    role: string;
}

export const RoleProtectedRoute = ({ children, role }: RoleProtectedRouteProps) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Carregando...</p>;

    if (!user) return <Navigate to="/login" />;

    if (user.role !== role) return <Navigate to="/dashboard" replace />;

    return <>{children}</>;
};
