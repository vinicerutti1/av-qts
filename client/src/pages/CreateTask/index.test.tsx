import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { CreateTask } from './index';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../context/AuthContext', () => ({
    useAuth: () => ({ token: 'fake-token' }),
}));

const mockApiCreate = vi.fn().mockResolvedValue({ data: { id: 1 } });
vi.mock('../../api/index', () => ({
    create: (...args: any[]) => mockApiCreate(...args),
}));

describe('CreateTask (Componente)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve enviar os dados do formulário corretamente para a API', async () => {
        // Arrange (preparar)
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <CreateTask />
            </MemoryRouter>,
        );

        // Act (agir)
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/título/i), {
                target: { value: 'Tarefa Teste' },
            });

            fireEvent.submit(screen.getByTestId('task-form'));
        });

        // Assert (verificar)
        expect(mockApiCreate).toHaveBeenCalledTimes(1);
        expect(mockApiCreate).toHaveBeenCalledWith(
            {
                title: 'Tarefa Teste',
                description: '',
                dueDate: undefined,
                priority: 'medium',
            },
            'fake-token',
        );
    });

    it('deve mostrar erro quando o título não é preenchido', async () => {
        // implementar
    });

    it('deve navegar para /tasks após criação bem-sucedida', async () => {
        // implementar
    });

    it('deve mostrar mensagem de erro quando a API falha', async () => {
        // implementar
    });

    it('deve enviar "medium" como prioridade padrão', async () => {
        // implementar
    });

    it('deve permitir criação sem data de vencimento', async () => {
        // implementar
    });

    it('deve mostrar erro quando não há token de autenticação', async () => {
        // implementar
    });

    it('deve mostrar ícone correspondente à prioridade selecionada', async () => {
        // implementar
    });
});
