import { useEffect, useState } from 'react';
import axios from '../api/axios';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [editName, setEditName] = useState('');
    const [editRole, setEditRole] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setUsers(res.data.data); // importante: .data.data
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setEditName(user.name);
        setEditRole(user.role);
        setIsEditing(true);
    };

    const handleEditSubmit = async () => {
        if (!selectedUser) return;

        try {
            await axios.patch(`/users/${selectedUser.id}`, {
                name: editName,
                role: editRole,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            // Atualizar lista
            fetchUsers();
            setIsEditing(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    if (loading) return <p>Carregando usuários...</p>;

    return (
        <div className="container mt-4">
            <h2>Usuários</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Função</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(user)}>
                                    Editar
                                </button>
                                <button className="btn btn-sm btn-danger">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Usuário</h5>
                                <button type="button" className="btn-close" onClick={() => setIsEditing(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        className="form-control"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Função</label>
                                    <select
                                        className="form-select"
                                        value={editRole}
                                        onChange={(e) => setEditRole(e.target.value)}
                                    >
                                        <option value="user">Usuário</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                                    Cancelar
                                </button>
                                <button className="btn btn-primary" onClick={handleEditSubmit}>
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
