import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Loading from './Loading';

vi.mock('@dimasmds/react-redux-loading-bar', () => ({
  LoadingBar: () => <div data-testid="loading-bar" />,
}));

describe('Loading', () => {
  it('renders the loading bar', () => {
    render(<Loading />);

    expect(screen.getByTestId('loading-bar')).toBeInTheDocument();
  });
});
