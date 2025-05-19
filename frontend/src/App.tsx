import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage, LoginPage } from './pages';
import { AdminPage } from './pages/AdminPage';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import { RoleProtectedRoute } from './components/RoleProtectedRoute';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { UserEditPage } from './pages/UserEditPage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  return (

    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <RoleProtectedRoute role="admin">
              <AdminPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/usuarios/:id/editar"
          element={
            <RoleProtectedRoute role="admin">
              <UserEditPage />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/usuarios/:id"
          element={
            <RoleProtectedRoute role="admin">
              <UserEditPage />
            </RoleProtectedRoute>
          }
        />
        <Route path="/admin/registro" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
