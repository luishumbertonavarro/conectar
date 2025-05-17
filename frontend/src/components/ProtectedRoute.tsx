import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactElement;
    requiredRole?: string; // ej: 'admin'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user'); // guardaremos user en localStorage también
    const user = userJson ? JSON.parse(userJson) : null;

    if (!token || !user) {
        // No autenticado, redirigir al login
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // Usuario no tiene el rol requerido, puedes redirigir a dashboard o 403
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
