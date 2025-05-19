// src/pages/AdminPage.tsx
import { UserList } from '../components/UserList';

export function AdminPage() {
    return (
        <div className="container">
            <h1 className="my-4">Painel de Administração</h1>
            <UserList />
        </div>
    );
}
