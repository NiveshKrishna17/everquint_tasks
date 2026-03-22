import { render, screen } from '@testing-library/react';
import { EditableText } from '../../../../components/board/inline/EditableText';

describe('EditableText Component', () => {
  it('renders text correctly', () => {
    render(
      <EditableText 
        value="My editable text" 
        onSave={() => {}} 
      />
    );
    expect(screen.getByText('My editable text')).toBeInTheDocument();
  });
});
