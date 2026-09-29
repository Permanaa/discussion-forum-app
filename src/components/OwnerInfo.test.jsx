import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import OwnerInfo from './OwnerInfo';
import { postedAt } from '../utils/date';

vi.mock('../utils/date', () => ({
  postedAt: vi.fn(),
}));

describe('OwnerInfo', () => {
  it('renders owner information correctly', () => {
    postedAt.mockReturnValue('2 hours ago');

    const createdAt = '2026-09-29T10:00:00.000Z';

    render(
      <OwnerInfo
        avatar="https://example.com/avatar.jpg"
        name="John Doe"
        createdAt={createdAt}
      />,
    );

    expect(screen.getByRole('img')).toHaveProperty(
      'src',
      'https://example.com/avatar.jpg',
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();

    expect(postedAt).toHaveBeenCalledWith(createdAt);
  });
});
