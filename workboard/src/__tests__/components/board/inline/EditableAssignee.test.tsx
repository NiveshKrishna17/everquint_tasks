import { render, screen } from '@testing-library/react';
import { EditableAssignee } from '../../../../components/board/inline/EditableAssignee';

describe('EditableAssignee Component', () => {
  it('renders assignee display correctly', () => {
    const assignee = { name: 'John Doe' };
    render(
      <EditableAssignee 
        assignee={assignee} 
        onSave={() => {}} 
      />
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
