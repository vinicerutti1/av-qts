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
});
