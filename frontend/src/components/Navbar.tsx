// src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const { user, setUser } = useAuth();

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        navigate('/login');
    };

    const toggleNavbar = () => setIsCollapsed(!isCollapsed);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Conectar
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                    aria-controls="navbarNav"
                    aria-expanded={!isCollapsed}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>

                                {user.role === 'admin' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">
                                            Admin
                                        </Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>

                    <ul className="navbar-nav ms-auto align-items-center">
                        {user ? (
                            <>
                                <li className="nav-item me-3">
                                    <span className="navbar-text">Olá, {user.name}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                                        Sair
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/login')}>
                                    Login
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
