import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export let testUser: { id: number };

export const setupTestDB = async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$executeRawUnsafe('DELETE FROM sqlite_sequence WHERE name = "User";');
    await prisma.$executeRawUnsafe('DELETE FROM sqlite_sequence WHERE name = "Task";');

    const uniqueEmail = `usuario_${Date.now()}@exemplo.teste`;
    const user = await prisma.user.create({
        data: {
            email: uniqueEmail,
            name: 'Usuário Exemplo',
            password: 'senha',
        },
    });

    testUser = { id: user.id };
};

export const disconnectTestDB = async () => {
    await prisma.$disconnect();
};
