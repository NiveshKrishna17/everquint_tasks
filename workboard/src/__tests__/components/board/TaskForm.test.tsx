import { render, screen } from '@testing-library/react';
import { TaskForm } from '../../../components/board/TaskForm';

describe('TaskForm Component', () => {
  it('renders form elements', () => {
    render(
      <TaskForm onSubmit={() => {}} />
    );

    // Using placeholder or label texts since Ant Design wraps inputs
    expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
    // Buttons
    expect(screen.getByRole('button', { name: 'Create Task' })).toBeInTheDocument();
  });
});
