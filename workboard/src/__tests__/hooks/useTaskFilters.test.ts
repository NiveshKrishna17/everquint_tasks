import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import type { BoardData } from '../../types/board';

const mockData: BoardData = {
  tasks: {
    '1': { id: '1', title: 'Test Task 1', description: 'desc 1', status: 'backlog', priority: 'high', tags: [], createdAt: '2023-01-01', updatedAt: '2023-01-01' },
    '2': { id: '2', title: 'Another Task', description: 'desc 2', status: 'done', priority: 'low', tags: [], createdAt: '2023-01-02', updatedAt: '2023-01-02' }
  },
  columns: {
    'backlog': { id: 'backlog', title: 'Backlog', taskIds: ['1'] },
    'in_progress': { id: 'in_progress', title: 'In Progress', taskIds: [] },
    'done': { id: 'done', title: 'Done', taskIds: ['2'] }
  },
  columnOrder: ['backlog', 'in_progress', 'done']
};

describe('useTaskFilters Hook', () => {
  it('returns all tasks when no filters are applied', () => {
    const { result } = renderHook(() => useTaskFilters(mockData), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
    });

    expect(result.current.totalTasks).toBe(2);
    expect(result.current.totalMatched).toBe(2);
    expect(result.current.columnsWithTasks[0].tasks.length).toBe(1); // backlog
    expect(result.current.columnsWithTasks[2].tasks.length).toBe(1); // done
  });

  it('filters by search text', () => {
    const { result } = renderHook(() => useTaskFilters(mockData), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/?search=Another']}>{children}</MemoryRouter>
    });

    expect(result.current.totalMatched).toBe(1);
    expect(result.current.columnsWithTasks[0].tasks.length).toBe(0); // backlog should be filtered out
    expect(result.current.columnsWithTasks[2].tasks[0].title).toBe('Another Task');
  });

  it('filters by status and priority', () => {
    const { result } = renderHook(() => useTaskFilters(mockData), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/?status=backlog&priority=high']}>{children}</MemoryRouter>
    });

    expect(result.current.totalMatched).toBe(1);
    expect(result.current.columnsWithTasks[0].tasks[0].title).toBe('Test Task 1');
    expect(result.current.columnsWithTasks[2].tasks.length).toBe(0);
  });
});
