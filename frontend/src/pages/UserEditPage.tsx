import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

interface Usuario {
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export function UserEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario>({ name: '', email: '', role: 'user' });
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const res = await axios.get(`/users/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUsuario(res.data.data);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                alert('Erro ao buscar usuário');
                navigate('/admin');
            } finally {
                setCarregando(false);
            }
        };

        fetchUsuario();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`/users/${id}`, usuario, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            alert('Usuário atualizado com sucesso!');
            navigate('/admin');
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar usuário');
        }
    };

    if (carregando) return <p>Carregando...</p>;

    return (
        <div className="container mt-4">
            <h2>Editar Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" name="name" value={usuario.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={usuario.email} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Tipo de Usuário</label>
                    <select className="form-select" name="role" value={usuario.role} onChange={handleChange}>
                        <option value="user">Usuário</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
}
