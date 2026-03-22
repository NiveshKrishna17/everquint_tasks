import { render, screen } from '@testing-library/react';
import Header from '../../../components/layout/Header';
import { BoardProvider } from '../../../context/BoardContext';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  it('renders correctly and shows Create button', () => {
    // Header relies on matchMedia (Ant Design) in JS DOM often.
    // If it fails, we need matchMedia mock in setupTests.ts but lets try basic first
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <MemoryRouter>
        <BoardProvider>
          <Header />
        </BoardProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: "Create" })).toBeInTheDocument();
    expect(screen.getByText('Everquint')).toBeInTheDocument();
  });
});
