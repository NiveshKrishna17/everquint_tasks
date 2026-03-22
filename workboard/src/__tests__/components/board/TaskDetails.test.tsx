import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TaskDetails } from '../../../components/board/TaskDetails';
import { BoardProvider } from '../../../context/BoardContext';

describe('TaskDetails Component', () => {
  it('renders without crashing even if task is not found', () => {
    // A specific path should be provided if we want to match a task,
    // but the component usually handles not finding a task or waits.
    render(
      <MemoryRouter initialEntries={['/']}>
        <BoardProvider>
          <TaskDetails />
        </BoardProvider>
      </MemoryRouter>
    );
    // Usually it renders some structural part or null if match isn't right
    // We just ensure it doesn't throw.
  });
});
