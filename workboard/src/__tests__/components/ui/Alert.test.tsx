import { render, screen } from '@testing-library/react';
import { Alert } from '../../../components/ui/Alert';

describe('Alert Component', () => {
  it('renders title and children correctly', () => {
    render(<Alert title="Test Alert">Alert Content</Alert>);
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(screen.getByText('Alert Content')).toBeInTheDocument();
  });
});
