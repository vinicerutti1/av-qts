# Gerenciador de Tarefas - Projeto de Qualidade e Teste de Software

Este projeto é um gerenciador de tarefas simples, desenvolvido para ilustrar conceitos de qualidade e teste de software.

O backend é implementado em **TypeScript** com **Prisma** e **SQLite** para banco de dados. O frontend usa **React** com **Vite**. A arquitetura é monolítica, organizada em duas pastas principais: `server` e `client`.

---

## Estrutura do projeto

`/server` - Backend (TypeScript, Prisma, SQLite)

`/client` - Frontend (React, Vite)

---

## Tecnologias usadas

- Backend:
    - TypeScript
    - Prisma ORM
    - SQLite (banco de dados)
- Frontend:
    - TypeScript
    - React
    - Vite (bundler e dev server)

---

## Pré-requisitos

- [Node.js](https://nodejs.org/pt) (versão 20 ou superior)
- `npm` ou `yarn`

---

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/ketlymachado/qtsw-task-manager
cd qtsw-task-manager
```

### 2. Crie as variáveis de ambiente

```bash
cp .env.example .env
```

### 3. Inicialize o banco e gere o cliente Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Configure o backend

```bash
cd server
npm install
```

### 4. Configure o frontend

```bash
cd ../client
npm install
```

### 5. Rode a aplicação

```bash
cd ..
npm run dev
```

![image](https://github.com/user-attachments/assets/89d266cc-7aa0-442d-8649-a906339075d4)

