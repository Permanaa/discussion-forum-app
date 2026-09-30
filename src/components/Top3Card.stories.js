import Top3Card from './Top3Card';

export default {
  title: 'Top3 Card',
  component: Top3Card,
  tags: ['autodocs'],
};

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
};

export const First = {
  args: {
    score: 50,
    pos: 'first',
    user,
  },
};

export const Second = {
  args: {
    score: 25,
    pos: 'second',
    user,
  },
};

export const Third = {
  args: {
    score: 15,
    pos: 'third',
    user,
  },
};
