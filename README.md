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
```

### 2. Acesse o repositório

```bash
cd qtsw-task-manager
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Crie as variáveis de ambiente

```bash
cp .env.example .env
```

### 5. Inicialize o banco e gere o cliente Prisma:

```bash
npm run prisma:generate
```

### 6. Rode as migrações:

```bash
npm run prisma:migrate
```

### 7. Acesse o diretório do backend

```bash
cd server
```

### 8. Crie as variáveis de ambiente

```bash
cp .env.example .env
```

### 9. Instale as dependências

```bash
npm install
```

### 10. Acesse o diretório do frontend

```bash
cd ../client
```

### 11. Instale as dependências

```bash
npm install
```

### 12. Acesse o diretório principal

```bash
cd ..
```

### 13. Rode a aplicação

```bash
npm run dev
```

![image](https://github.com/user-attachments/assets/89d266cc-7aa0-442d-8649-a906339075d4)

### 14. Rode os testes [OPCIONAL]

#### Testes de unidade (back-end)

```bash
# Devemos estar na pasta `server`
npm run test:unit
```

#### Testes de integração (back-end)

```bash
# Devemos estar na pasta `server`
npm run test:integration
```

#### Testes de unidade (front-end)

```bash
# Devemos estar na pasta `client`
npm run test
```

#### Testes de sistema/e2e

```bash
# Devemos estar na pasta raiz
npm run test:e2e
```
