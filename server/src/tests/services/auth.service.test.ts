import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthService } from '../../services/auth.service';
import { prisma } from '../../utils/prisma';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../utils/prisma', () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    },
}));

describe('AuthService', () => {
    const mockUser = {
        id: 1,
        email: 'usuario@exemplo.teste',
        name: 'Usuário Exemplo',
        password: 'senha',
        createdAt: new Date(),
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('deve cadastrar um novo usuário e retornar o seu token', async () => {
            // Arrange (preparar)
            const hashedPassword = 'senha-criptografada';
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
            (prisma.user.create as jest.Mock).mockResolvedValue({
                ...mockUser,
                password: hashedPassword,
            });
            (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

            // Act (agir)
            const result = await AuthService.registerUser(
                mockUser.email,
                mockUser.password,
                mockUser.name,
            );

            // Assert (verificar)
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { email: mockUser.email },
            });
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: {
                    email: mockUser.email,
                    password: hashedPassword,
                    name: mockUser.name,
                },
            });
            expect(result.token).toBe('mockedToken');
            expect(result.user).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                name: mockUser.name,
            });
        });

        it('deve lançar erro ao cadastar um usuário já cadastrado', async () => {
            // implementar
        });
    });

    describe('loginUser', () => {
        it('deve realizar o login do usuário e retornar o seu token', async () => {
            // Arrange (preparar)
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

            // Act (agir)
            const result = await AuthService.loginUser(mockUser.email, mockUser.password);

            // Assert (verificar)
            expect(result.token).toBe('mockedToken');
            expect(result.user).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                name: mockUser.name,
            });
        });

        it('deve lançar erro ao realizar login de um usuário não encontrado', async () => {
            // implementar
        });

        it('deve lançar erro ao realizar login com a senha incorreta', async () => {
            // implementar
        });
    });

    describe('getUserById', () => {
        it('deve retornar o usuário com base no seu identificador', async () => {
            // Arrange (preparar)
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

            // Act (agir)
            const user = await AuthService.getUserById(1);

            // Assert (verificar)
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: mockUser.id },
            });
            expect(user).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                name: mockUser.name,
                createdAt: mockUser.createdAt,
            });
        });

        it('deve lançar erro ao buscar usuário pelo identificador se o usuário não existir', async () => {
            // implementar
        });
    });

    describe('getUserFromTokenPayload', () => {
        it('deve retornar dados do usuário com base no identificador retornado pelo token', async () => {
            // Arrange (preparar)
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

            // Act (agir)
            const user = await AuthService.getUserFromTokenPayload(1);

            // Assert (verificar)
            expect(user).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                name: mockUser.name,
            });
        });

        it('deve lançar erro ao buscar usuário pelo token se o usuário não existir', async () => {
            // implementar
        });
    });

    describe('refreshToken', () => {
        it('deve retornar um token novo ao atualizar token se o token antigo for válido', () => {
            // Arrange (preparar)
            (jwt.verify as jest.Mock).mockReturnValue({ userId: 1 });
            (jwt.sign as jest.Mock).mockReturnValue('tokenNovo');

            // Act (agir)
            const newToken = AuthService.refreshToken('tokenAntigo');

            // Assert (verificar)
            expect(newToken).toBe('tokenNovo');
        });

        it('deve lançar erro ao atualizar token se o token antigo for inválido', () => {
            // implementar
        });
    });
});
