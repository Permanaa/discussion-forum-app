import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncPopulateThreads,
  asyncToggleDownVoteThread,
  asyncToggleUpVoteThread,
} from '../states/threads/action';
import ThreadItem from '../components/ThreadItem';
import { asyncPopulateUsers } from '../states/users/action';
import { useState } from 'react';

function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateThreads());
    dispatch(asyncPopulateUsers());
  }, [dispatch]);

  function onUpVoteThread(threadId, isVote) {
    dispatch(
      asyncToggleUpVoteThread(
        {
          isVote,
          threadId,
        },
        () => {
          dispatch(asyncPopulateThreads());
        },
      ),
    );
  }

  function onDownVoteThread(threadId, isVote) {
    dispatch(
      asyncToggleDownVoteThread(
        {
          isVote,
          threadId,
        },
        () => {
          dispatch(asyncPopulateThreads());
        },
      ),
    );
  }

  const categories = threads.reduce((acc, thread) => {
    if (!acc.includes(thread.category)) {
      acc.push(thread.category);
    }

    return acc;
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('');

  function onSelectCategory(category) {
    setSelectedCategory((prev) => (prev === category ? '' : category));
  }

  const filteredThreads = threads.filter((thread) =>
    selectedCategory ? thread.category === selectedCategory : true,
  );

  if (threads.length <= 0) {
    return (
      <>
        <h2 className="page-title">Forum Diskusi</h2>
        <p>Memuat...</p>
      </>
    );
  }

  return (
    <>
      <h2 className="page-title">Forum Diskusi</h2>
      <section>
        <div className="thread-categories">
          <p>Kategori:</p>
          {categories.map((category) => {
            return (
              <button
                key={category}
                className={
                  selectedCategory === category ? 'thread-categories__selected' : ''
                }
                onClick={() => onSelectCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>
      <section className="thread-wrapper">
        {filteredThreads.map((thread) => {
          return (
            <ThreadItem
              key={thread.id}
              {...thread}
              authUser={authUser}
              owner={users[thread.ownerId]}
              onUpVoteThread={onUpVoteThread}
              onDownVoteThread={onDownVoteThread}
            />
          );
        })}
      </section>
    </>
  );
}

export default HomePage;
