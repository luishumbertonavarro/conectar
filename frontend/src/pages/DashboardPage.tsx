import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
    const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchUser();
    }, [navigate]);

    const fetchUser = async () => {
        try {
            const res = await axios.get('/users/profile');
            setUser(res.data);
        } catch (err) {
            console.error('Error al obtener el usuario', err);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    if (!user) return <div className="text-center mt-5">Carregando...</div>;

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="mb-3">Bem-vindo, {user.name}!</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Função:</strong> {user.role}</p>

                <hr />

                {user.role === 'admin' ? (
                    <div>
                        <h5>Conteúdo exclusivo do Admin:</h5>
                        <p>Você pode gerenciar usuários, acessar relatórios e mais.</p>
                    </div>
                ) : (
                    <div>
                        <h5>Conteúdo para Usuário Comum:</h5>
                        <p>Você pode visualizar seus dados e atualizar seu perfil.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
