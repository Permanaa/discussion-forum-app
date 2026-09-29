import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Vote from './Vote';

describe('Vote', () => {
  it('renders the total vote count', () => {
    render(
      <Vote
        total={10}
        isUpVote={false}
        isDownVote={false}
        onUpVote={vi.fn()}
        onDownVote={vi.fn()}
      />,
    );

    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('calls onUpVote when upvote button is clicked', async () => {
    const user = userEvent.setup();
    const onUpVote = vi.fn();

    render(
      <Vote
        total={10}
        isUpVote={false}
        isDownVote={false}
        onUpVote={onUpVote}
        onDownVote={vi.fn()}
      />,
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);

    expect(onUpVote).toHaveBeenCalledTimes(1);
  });

  it('calls onDownVote when downvote button is clicked', async () => {
    const user = userEvent.setup();
    const onDownVote = vi.fn();

    render(
      <Vote
        total={10}
        isUpVote={false}
        isDownVote={false}
        onUpVote={vi.fn()}
        onDownVote={onDownVote}
      />,
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);

    expect(onDownVote).toHaveBeenCalledTimes(1);
  });

  it('renders the upvote icon as active', () => {
    const { container } = render(
      <Vote
        total={10}
        isUpVote
        isDownVote={false}
        onUpVote={vi.fn()}
        onDownVote={vi.fn()}
      />,
    );

    const icons = container.querySelectorAll('svg');

    expect(icons[0]).toHaveAttribute('fill', '#98D69D');
    expect(icons[0]).toHaveAttribute('stroke', '#98D69D');
  });

  it('renders the downvote icon as active', () => {
    const { container } = render(
      <Vote
        total={10}
        isUpVote={false}
        isDownVote
        onUpVote={vi.fn()}
        onDownVote={vi.fn()}
      />,
    );

    const icons = container.querySelectorAll('svg');

    expect(icons[1]).toHaveAttribute('fill', '#ff9999');
    expect(icons[1]).toHaveAttribute('stroke', '#ff9999');
  });
});
