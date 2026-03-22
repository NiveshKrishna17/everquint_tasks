import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Board } from '../../../components/board/Board';
import { BoardProvider } from '../../../context/BoardContext';
import { DragDropContext } from '@hello-pangea/dnd';

// We mock DragDropContext to avoid issues with test environments
vi.mock('@hello-pangea/dnd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@hello-pangea/dnd')>();
  return {
    ...actual,
    DragDropContext: ({ children }: any) => <div>{children}</div>,
    Droppable: ({ children }: any) => children({ innerRef: vi.fn(), droppableProps: {} }, {}),
    Draggable: ({ children }: any) => children({ innerRef: vi.fn(), draggableProps: {}, dragHandleProps: {} }, {}),
  };
});

describe('Board Component', () => {
  it('renders the board columns', () => {
    render(
      <MemoryRouter>
        <BoardProvider>
          <Board />
        </BoardProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Backlog')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});
