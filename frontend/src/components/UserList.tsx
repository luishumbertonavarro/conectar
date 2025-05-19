import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Swal from 'sweetalert2';

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
        buscarUsuarios();
    }, []);

    const buscarUsuarios = async () => {
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

    const handleEditar = (usuario: Usuario) => {
        navigate(`/admin/usuarios/${usuario.id}/editar`);
    };

    const handleExcluir = async (usuario: Usuario) => {
        const resultado = await Swal.fire({
            title: 'Tem certeza?',
            text: `Você está prestes a excluir o usuário ${usuario.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar',
        });

        if (resultado.isConfirmed) {
            try {
                await axios.delete(`/users/${usuario.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                setUsuarios(prev => prev.filter(u => u.id !== usuario.id));

                Swal.fire({
                    icon: 'success',
                    title: 'Excluído!',
                    text: 'O usuário foi excluído com sucesso.',
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Não foi possível excluir o usuário.',
                });
            }
        }
    };

    const handleNovo = () => {
        navigate('/admin/registro');
    };

    if (carregando) return <p>Carregando usuários...</p>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Lista de Usuários</h2>
                <button className="btn btn-success" onClick={handleNovo}>
                    + Novo Usuário
                </button>
            </div>

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
