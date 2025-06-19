import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });


import request from 'supertest';
import app from '../../app';
import { prisma } from '../../utils/prisma';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

describe('API de Tarefas - Testes de Integração (Com Autenticação)', () => {
  let testUser: User;
  let authToken: string;

  beforeAll(async () => {
    await prisma.$connect();
    // Limpamos usuários e tarefas para garantir um estado limpo
    await prisma.task.deleteMany({});
    await prisma.user.deleteMany({});

    // Criamos um usuário de teste diretamente no banco
    testUser = await prisma.user.create({
      data: {
        email: 'test.user@example.com',
        name: 'Test User',
        password: 'password123', // A senha aqui não importa pois não faremos login real
      },
    });

    // Geramos um token JWT para este usuário
    authToken = jwt.sign({ id: testUser.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
  });

  afterAll(async () => {
    // Limpamos tudo ao final
    await prisma.task.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  it('deve criar uma nova tarefa com sucesso quando autenticado', async () => {
    const novaTarefa = { title: 'Tarefa Autenticada', description: 'Descrição' };

    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`) // <-- ENVIAMOS O TOKEN AQUI
      .send(novaTarefa);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(novaTarefa.title);
  });

  it('deve retornar erro 404 ao buscar uma tarefa inexistente quando autenticado', async () => {
    const idInexistente = 'clxjs123456789abcdefgh';

    const response = await request(app)
      .get(`/api/tasks/${idInexistente}`)
      .set('Authorization', `Bearer ${authToken}`); // <-- ENVIAMOS O TOKEN AQUI

    expect(response.status).toBe(404);
  });

  it('deve retornar erro 401 ao tentar criar uma tarefa SEM autenticação', async () => {
    const novaTarefa = { title: 'Tarefa Não Autenticada', description: '...' };

    const response = await request(app)
      .post('/api/tasks')
      .send(novaTarefa); // <-- SEM TOKEN

    expect(response.status).toBe(401);
  });
});