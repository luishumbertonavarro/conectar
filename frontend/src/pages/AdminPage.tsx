// src/pages/AdminPage.tsx
import { UserList } from '../components/UserList';

export function AdminPage() {
    return (
        <div className="container">
            <h1 className="my-4">Panel de Administración</h1>
            <UserList />
        </div>
    );
}
