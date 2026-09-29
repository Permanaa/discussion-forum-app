import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import CommentButton from './CommentButton';

afterEach(() => {
  cleanup();
});

describe('CommentButton', () => {
  it('renders the comment count', () => {
    render(<CommentButton total={10} />);

    expect(screen.getByText('11')).toBeInTheDocument();
  });

  it('renders the comment icon', () => {
    const { container } = render(<CommentButton total={10} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
