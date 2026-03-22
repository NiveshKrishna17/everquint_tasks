import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App Core Workflows', () => {
  it('creates a new task and displays it on the board', async () => {
    const user = userEvent.setup();
    
    // Use an isolated route to start fresh
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // 1. Click "Create" button in Header
    const createButton = screen.getByRole('button', { name: "Create" });
    await user.click(createButton);

    // 2. Wait for Modal to open
    const modalTitle = await screen.findByText('Create New Task');
    expect(modalTitle).toBeInTheDocument();

    // 3. Fill in the task form
    // The Modal uses a Form, we can find elements by label text
    const titleInput = screen.getByLabelText(/Task Title/i);
    await user.type(titleInput, 'E2E Test Task');

    // Change status if necessary, but it defaults to 'backlog'. We'll leave it.
    const descriptionInput = screen.getByLabelText(/Description/i);
    await user.type(descriptionInput, 'This is a test description for E2E.');

    // 4. Click 'Create Task' button inside the modal
    // Form buttons inside Modal
    const createSubmitButton = screen.getByRole('button', { name: 'Create Task' });
    await user.click(createSubmitButton);

    // 5. Wait for the modal to close and the task to appear on the board
    await waitFor(() => {
      expect(screen.queryByText('Create New Task')).not.toBeInTheDocument();
    });

    // 6. Verify the task is on the board
    // It should be under the "Backlog" column which we can find by seeing the task card
    const taskCardTitle = await screen.findByText('E2E Test Task');
    expect(taskCardTitle).toBeInTheDocument();

    // Optionally check if the description is rendered or if it's correct
    // In many task cards description isn't shown directly unless opened,
    // but the task card test can handle that. The title is enough for workflow.
  });
});
