import { render, screen } from '@testing-library/react';
import { Input } from '../../../components/ui/Input';

describe('Input Component', () => {
  it('renders input correctly', () => {
    render(<Input placeholder="Test Input" />);
    expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument();
  });
});
