import { fn } from 'storybook/test';
import Vote from './Vote';

export default {
  title: 'Vote',
  component: Vote,
  tags: ['autodocs'],
  args: {
    onUpVote: fn(),
    onDownVote: fn(),
  },
};

export const Default = {
  args: {
    total: 10,
    isUpVote: false,
    isDownVote: false,
  },
};

export const UpVote = {
  args: {
    total: 10,
    isUpVote: true,
    isDownVote: false,
  },
};

export const DownVote = {
  args: {
    total: 10,
    isUpVote: false,
    isDownVote: true,
  },
};
