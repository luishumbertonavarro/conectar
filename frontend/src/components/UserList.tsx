import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

interface Usuario {
    id: number;
    name: string;
    email: string;
    role: string;
}

export function UserList() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await axios.get('/users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUsuarios(res.data.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                alert('Erro ao buscar usuários');
            } finally {
                setCarregando(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleEditar = (usuario: Usuario) => {
        navigate(`/admin/usuarios/${usuario.id}/editar`);
    };
    const handleExcluir = async (usuario: Usuario) => {
        const confirmar = window.confirm(`Tem certeza que deseja excluir o usuário "${usuario.name}"?`);
        if (!confirmar) return;

        try {
            await axios.delete(`/users/${usuario.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            // Remover da lista sem recarregar toda a tabela
            setUsuarios(prev => prev.filter(u => u.id !== usuario.id));
            alert('Usuário excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            alert('Erro ao excluir usuário');
        }
    };
    if (carregando) return <p>Carregando usuários...</p>;

    return (
        <div className="container mt-4">
            <h2>Lista de Usuários</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.role === 'admin' ? 'Administrador' : 'Usuário'}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEditar(usuario)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleExcluir(usuario)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
