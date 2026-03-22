import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TaskCard } from '../../../components/board/TaskCard';
import type { Task } from '../../../types/board';

vi.mock('@hello-pangea/dnd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@hello-pangea/dnd')>();
  return {
    ...actual,
    Draggable: ({ children }: any) => children({ innerRef: vi.fn(), draggableProps: {}, dragHandleProps: {} }, {}),
  };
});

describe('TaskCard Component', () => {
  it('renders task details correctly', () => {
    const mockTask: Task = {
      id: 'task-1',
      title: 'Render Test Task',
      description: 'Test description',
      status: 'backlog',
      priority: 'high',
      tags: ['bug'],
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    render(
      <MemoryRouter>
        <TaskCard task={mockTask} index={0} />
      </MemoryRouter>
    );

    expect(screen.getByText('Render Test Task')).toBeInTheDocument();
    expect(screen.getByText('bug')).toBeInTheDocument();
  });
});
