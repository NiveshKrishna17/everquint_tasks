import { render, screen } from '@testing-library/react';
import { EditableSelect } from '../../../../components/board/inline/EditableSelect';

describe('EditableSelect Component', () => {
  it('renders select option correctly', () => {
    const options = [{ label: 'High Priority', value: 'high' }];
    render(
      <EditableSelect 
        value="high" 
        options={options} 
        onSave={() => {}} 
      />
    );
    expect(screen.getByText('High Priority')).toBeInTheDocument();
  });
});
