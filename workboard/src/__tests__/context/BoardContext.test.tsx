import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BoardProvider, useBoardContext } from '../../context/BoardContext';

// Dummy component to test context hook
const TestComponent = () => {
  const { data, addTask, updateTask } = useBoardContext();

  return (
    <div>
      <div data-testid="task-count">{Object.keys(data.tasks).length}</div>
      <button 
        onClick={() => addTask({ title: 'New Context Task', status: 'backlog', priority: 'medium', tags: [] })}
      >
        Add Task
      </button>
      <button
        onClick={() => {
          const firstTaskId = Object.keys(data.tasks)[0];
          if (firstTaskId) {
            updateTask({ ...data.tasks[firstTaskId], status: 'done' });
          }
        }}
      >
        Move Task
      </button>
      <div data-testid="done-count">{data.columns['done']?.taskIds.length || 0}</div>
    </div>
  );
};

describe('BoardContext', () => {
  it('adds a task successfully', async () => {
    const user = userEvent.setup();
    render(
      <BoardProvider>
        <TestComponent />
      </BoardProvider>
    );

    const countElement = screen.getByTestId('task-count');
    const initialCount = parseInt(countElement.textContent || '0');

    await user.click(screen.getByText('Add Task'));

    expect(parseInt(screen.getByTestId('task-count').textContent || '0')).toBe(initialCount + 1);
  });

  it('updates task status correctly', async () => {
    const user = userEvent.setup();
    render(
      <BoardProvider>
        <TestComponent />
      </BoardProvider>
    );

    const initialDoneCount = parseInt(screen.getByTestId('done-count').textContent || '0');
    
    // add task first
    await user.click(screen.getByText('Add Task'));
    // move task
    await user.click(screen.getByText('Move Task'));

    expect(parseInt(screen.getByTestId('done-count').textContent || '0')).toBeGreaterThan(initialDoneCount);
  });
});
