import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const setupTestDB = async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
            id: 1,
            email: 'usuario@exemplo.teste',
            name: 'Usuário Exemplo',
            password: 'senha',
        },
    });
};

export const disconnectTestDB = async () => {
    await prisma.$disconnect();
};
