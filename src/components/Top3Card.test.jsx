import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Top3Card from './Top3Card';

describe('Top3Card', () => {
  it('renders user information, score, avatar, and position correctly', () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };

    const { container } = render(<Top3Card score={125} user={user} pos={1} />);

    expect(screen.getByText('125')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/avatar.jpg',
    );

    expect(container.firstChild).toHaveClass('top3-card', 'top3-card__1');
  });
});
