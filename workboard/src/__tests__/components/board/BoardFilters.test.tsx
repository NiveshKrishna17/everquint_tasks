import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { BoardFilters } from '../../../components/board/BoardFilters';

const FilterTester = () => {
  const [params] = useSearchParams();
  return (
    <>
      <BoardFilters />
      <div data-testid="search-param">{params.get('search')}</div>
    </>
  );
};

describe('BoardFilters Component', () => {
  it('renders filter inputs correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <FilterTester />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Search tasks...')).toBeInTheDocument();
  });

  it('updates search params when typing in search input (debounced)', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <FilterTester />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search tasks...');
    await user.type(searchInput, 'test query');

    // Debounce wait
    await waitFor(() => {
      expect(screen.getByTestId('search-param').textContent).toBe('test query');
    }, { timeout: 1000 });
  });
});
