# 🧩 Conéctar - Gestão de Usuários

Projeto full-stack utilizando **NestJS** (Backend) e **React + TypeScript** (Frontend), que permite autenticação com JWT, controle de acesso por papéis (admin/usuário), CRUD de usuários e uma interface moderna e funcional.

## 🛠 Tecnologias utilizadas

### Backend
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- Autenticação com JWT
- Controle de papéis com Guards e Decorators

### Frontend
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- Bootstrap 5

## 🚀 Funcionalidades

- Registro e login de usuários
- Autenticação com tokens JWT
- Visualização do perfil do usuário autenticado
- Controle de navegação baseado no papel do usuário (admin x usuário)
- CRUD completo de usuários para administradores
- Alertas visuais com SweetAlert2
- Interface responsiva com Bootstrap

## 🔐 Papéis de Usuário

- **admin**: pode visualizar, criar, editar e excluir usuários.
- **user**: acesso limitado ao próprio perfil e funcionalidades básicas.

## 📦 Instalação

### Clone o repositório

```bash
git clone https://github.com/luishumbertonavarro/conectar.git
cd conectar
cd backend 
```
backend
```
cd backend
cp .env.example .env   # Configure as variáveis de ambiente
npm install
npm run start:dev
```
frontend
```
cd frontend
npm install
npm run dev
```
🧪 Rotas principais
API (NestJS)
POST /auth/login - Login

GET /users/profile - Perfil do usuário logado

GET /users - Lista de usuários (admin)

POST /users - Criar novo usuário (admin)

PATCH /users/:id - Atualizar usuário (admin)

DELETE /users/:id - Excluir usuário (admin)

Frontend
/login - Tela de login

/admin/usuarios - Lista de usuários (somente admin)

/admin/usuarios/:id/editar - Editar usuário

/admin/registro - Cadastrar novo usuário (somente admin)

/dashboard - Página inicial do usuário logado

Desenvolvido por Luis Humberto Navarro Ribeiro
