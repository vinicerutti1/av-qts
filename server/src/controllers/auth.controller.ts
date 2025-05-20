import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { prisma } from '../utils/prisma';

const TOKEN_EXPIRATION = '1h';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Usuário já cadastrado' });

            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

        res.status(StatusCodes.CREATED).json({
            token,
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro no servidor' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Credenciais inválidas' });

            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Credenciais inválidas' });

            return;
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro no servidor' });
    }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    if (!userId) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Usuário não autenticado' });

        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, createdAt: true },
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Usuário não encontrado' });

            return;
        }

        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro no servidor' });
    }
};

export const validateToken = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    if (!userId) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token inválido ou expirado' });

        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true },
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Usuário não encontrado' });

            return;
        }

        res.json({ user });
    } catch (error) {
        console.error('Erro ao validar token:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro no servidor' });
    }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    const authHeader = req.headers['authorization'];
    const oldToken = authHeader && authHeader.split(' ')[1];

    if (!oldToken) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não fornecido' });

        return;
    }

    try {
        const decoded = jwt.verify(oldToken, JWT_SECRET, { ignoreExpiration: true }) as {
            userId: number;
        };
        const newToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, {
            expiresIn: TOKEN_EXPIRATION,
        });

        res.json({ token: newToken });
    } catch (error) {
        console.error('Erro ao renovar token:', error);
        res.status(StatusCodes.FORBIDDEN).json({ message: 'Token inválido' });
    }
};
