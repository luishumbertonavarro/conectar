import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();

    if (authLoading) return <p>Carregando...</p>;

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.register(name, email, password);
            await Swal.fire({
                icon: 'success',
                title: 'Usuário cadastrado com sucesso!',
                confirmButtonText: 'OK',
            });
            navigate('/admin');
        } catch (err: any) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao cadastrar usuário',
                text: err.response?.data?.message || 'Ocurrió un error inesperado',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 500 }}>
            <h2>Cadastro de usuário </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar usuário'}
                </button>
            </form>
        </div>
    );
}
