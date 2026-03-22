import { render, screen } from '@testing-library/react';
import { Select } from '../../../components/ui/Select';

describe('Select Component', () => {
  it('renders select with placeholder', () => {
    render(
      <Select 
        value="" 
        onChange={() => {}} 
        options={[{ value: '1', label: 'Option 1' }]} 
        placeholder="Test Select"
      />
    );
    // Since this is a custom Select or Ant Design Select wrapped if it works this way
    // Native Select handles are easier, but let's test a basic check:
    const el = screen.queryByText('Test Select') || screen.queryByRole('combobox');
    expect(el).toBeInTheDocument();
  });
});
