import { render, screen } from '@testing-library/react';
import { BoardColumn } from '../../../components/board/BoardColumn';
import type { ColumnType } from '../../../types/board';

vi.mock('@hello-pangea/dnd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@hello-pangea/dnd')>();
  return {
    ...actual,
    Droppable: ({ children }: any) => children({ innerRef: vi.fn(), droppableProps: {} }, {}),
    Draggable: ({ children }: any) => children({ innerRef: vi.fn(), draggableProps: {}, dragHandleProps: {} }, {}),
  };
});

describe('BoardColumn Component', () => {
  it('renders the column title', () => {
    const mockCol: ColumnType = { id: 'test_col', title: 'Test Column' };
    render(<BoardColumn column={mockCol} tasks={[]} />);
    expect(screen.getByText('Test Column')).toBeInTheDocument();
  });
});
