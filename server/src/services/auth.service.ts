import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { prisma } from '../utils/prisma';

const TOKEN_EXPIRATION = '1h';

export class AuthService {
    static async registerUser(email: string, password: string, name: string) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Usuário já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

        return {
            token,
            user: { id: user.id, email: user.email, name: user.name },
        };
    }

    static async loginUser(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('Credenciais inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas');
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

        return {
            token,
            user: { id: user.id, email: user.email, name: user.name },
        };
    }

    static async getUserById(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, createdAt: true },
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    static async validateUserToken(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true },
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    static refreshToken(oldToken: string) {
        try {
            const decoded = jwt.verify(oldToken, JWT_SECRET, { ignoreExpiration: true }) as {
                userId: number;
            };
            const newToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, {
                expiresIn: TOKEN_EXPIRATION,
            });

            return newToken;
        } catch {
            throw new Error('Token inválido');
        }
    }
}
