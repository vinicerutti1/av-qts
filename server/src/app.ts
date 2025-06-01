import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { authenticate } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import testRoutes from './routes/test.routes';

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticate, taskRoutes);

if (process.env.NODE_ENV === 'test') {
    app.use('/api/test', testRoutes);
}

app.use(errorHandler);

export default app;
