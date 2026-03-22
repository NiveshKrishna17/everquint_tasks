import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../../components/ui/Button';

describe('Button Component', () => {
  it('renders children and handles click', async () => {
    let clicked = false;
    const user = userEvent.setup();
    render(<Button onClick={() => clicked = true}>Click Me</Button>);
    
    const btn = screen.getByRole('button', { name: 'Click Me' });
    expect(btn).toBeInTheDocument();
    
    await user.click(btn);
    expect(clicked).toBe(true);
  });
});
