import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../utils/prisma';

export const createTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.userId;

    if (!userId) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não autorizado' });

        return;
    }

    const task = await prisma.task.create({
        data: {
            title,
            description,
            dueDate: dueDate ? new Date(dueDate) : null,
            priority,
            userId,
        },
    });

    res.status(StatusCodes.CREATED).json(task);
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const { completed, priority } = req.query;

    if (!userId) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não autorizado' });

        return;
    }

    const tasks = await prisma.task.findMany({
        where: {
            userId,
            ...(completed !== undefined && { completed: completed === 'true' }),
            ...(priority && { priority: priority as string }),
        },
        orderBy: { createdAt: 'desc' },
    });

    res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não autorizado' });

        return;
    }

    const task = await prisma.task.findUnique({
        where: { id: parseInt(id), userId },
    });

    if (!task) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Tarefa não encontrada' });

        return;
    }

    res.json(task);
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.userId;
    const { title, description, completed, dueDate, priority } = req.body;

    if (!userId) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não autorizado' });

        return;
    }

    const task = await prisma.task.update({
        where: { id: parseInt(id), userId },
        data: {
            title,
            description,
            completed,
            dueDate: dueDate ? new Date(dueDate) : null,
            priority,
        },
    });

    res.json(task);
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não autorizado' });

        return;
    }

    await prisma.task.delete({
        where: { id: parseInt(id), userId },
    });

    res.status(StatusCodes.NO_CONTENT).send();
};
