import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});


import express from 'express';
import { authenticate } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import testRoutes from './routes/test.routes';

/*
SAFEGUARD
if (process.env.NODE_ENV === 'test' && process.env.DATABASE_URL !== 'file:./dev-test.db') {
    throw new Error('Using non test database in a test environment!');
}
*/

// Garante que, no ambiente de teste, o nome do banco de dados contenha a palavra "test".
if (process.env.NODE_ENV === 'test' && !process.env.DATABASE_URL?.includes('test')) {
  throw new Error('Usando um banco de dados que não é de teste em um ambiente de teste!');
}


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticate, taskRoutes);

/*
//-----------------------------------
// Lógica para aplicar o middleware de autenticação condicionalmente

if (process.env.NODE_ENV === 'test') {
  // Em ambiente de teste, usamos as rotas SEM o middleware de autenticação
  app.use('/api/tasks', taskRoutes);
} else {
  // Em todos os outros ambientes, exigimos autenticação
  app.use('/api/tasks', authenticate, taskRoutes);
}*/

if (process.env.NODE_ENV === 'test') {
    app.use('/api/test', testRoutes);
}

app.use(errorHandler);

export default app;

