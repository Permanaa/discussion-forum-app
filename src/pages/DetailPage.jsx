import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import {
  asyncCreateComment,
  asyncToggleDownVoteComment,
  asyncToggleUpVoteComment,
} from '../states/threadComment/action';
import {
  asyncToggleDownVoteThread,
  asyncToggleUpVoteThread,
} from '../states/threads/action';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Vote from '../components/Vote';
import CommentButton from '../components/CommentButton';
import OwnerInfo from '../components/OwnerInfo';
import useInput from '../hooks/useInput';

function DetailPage() {
  const [commentInput, setCommentInput] = useInput('');

  const {
    title,
    body,
    owner,
    createdAt,
    category,
    upVotesBy,
    downVotesBy,
    comments,
  } = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();

  const { threadId } = useParams();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [dispatch, threadId]);

  function onCreateComment() {
    if (commentInput) {
      dispatch(
        asyncCreateComment({ threadId, content: commentInput }, () => {
          setCommentInput({ target: { value: '' } });
        }),
      );
    }
  }

  const isUpVote = upVotesBy?.includes(authUser?.id);
  const isDownVote = downVotesBy?.includes(authUser?.id);

  function onUpVoteThread() {
    dispatch(
      asyncToggleUpVoteThread(
        {
          isVote: isUpVote,
          threadId,
        },
        () => {
          dispatch(asyncReceiveThreadDetail(threadId));
        },
      ),
    );
  }

  function onDownVoteThread() {
    dispatch(
      asyncToggleDownVoteThread(
        {
          isVote: isDownVote,
          threadId,
        },
        () => {
          dispatch(asyncReceiveThreadDetail(threadId));
        },
      ),
    );
  }

  function onUpVoteComment(threadId, commentId, isVote) {
    dispatch(
      asyncToggleUpVoteComment(
        {
          isVote,
          threadId,
          commentId,
        },
        () => {
          dispatch(asyncReceiveThreadDetail(threadId));
        },
      ),
    );
  }

  function onDownVoteComment(threadId, commentId, isVote) {
    dispatch(
      asyncToggleDownVoteComment(
        {
          isVote,
          threadId,
          commentId,
        },
        () => {
          dispatch(asyncReceiveThreadDetail(threadId));
        },
      ),
    );
  }

  if (!title) {
    return (
      <div className="thread-detail__wrapper">
        <p>Memuat...</p>
      </div>
    );
  }

  return (
    <div className="thread-detail__wrapper">
      <section>
        <div className="thread-item__header">
          <OwnerInfo
            name={owner?.name}
            avatar={owner?.avatar}
            createdAt={createdAt}
          />
          <p>#{category}</p>
        </div>
      </section>
      <section>
        <h2 className="thread-detail__title">{title}</h2>
        <div className="thread-detail__body">{parse(body ?? '')}</div>
        <div className="thread-item__footer">
          <Vote
            total={upVotesBy?.length - downVotesBy?.length}
            isUpVote={isUpVote}
            isDownVote={isDownVote}
            onUpVote={onUpVoteThread}
            onDownVote={onDownVoteThread}
          />
          <CommentButton total={comments?.length} />
        </div>
      </section>
      <section className="comment-form">
        {authUser ? (
          <>
            <textarea
              rows={5}
              placeholder="Bergabung dalam diskusi"
              required
              value={commentInput}
              onChange={setCommentInput}
            />
            <button onClick={onCreateComment}>Komentar</button>
          </>
        ) : (
          <p>
            <Link to="/login">Masuk</Link> untuk memberi komentar
          </p>
        )}
      </section>
      <section className="comment-list">
        {comments?.map(
          ({
            id,
            owner,
            createdAt,
            content,
            upVotesBy: commentUpVotesBy,
            downVotesBy: commentDownVotesBy,
          }) => {
            const isUpVoteComment = commentUpVotesBy?.includes(authUser?.id);
            const isDownVoteComment = commentDownVotesBy?.includes(
              authUser?.id,
            );

            return (
              <div key={id} className="comment__item">
                <OwnerInfo
                  name={owner?.name}
                  avatar={owner?.avatar}
                  createdAt={createdAt}
                />
                <div className="comment__body">
                  <div className="comment__content">{parse(content)}</div>
                  <Vote
                    total={
                      commentUpVotesBy?.length - commentDownVotesBy?.length
                    }
                    isUpVote={isUpVoteComment}
                    isDownVote={isDownVoteComment}
                    onUpVote={() =>
                      onUpVoteComment(threadId, id, isUpVoteComment)
                    }
                    onDownVote={() =>
                      onDownVoteComment(threadId, id, isDownVoteComment)
                    }
                  />
                </div>
              </div>
            );
          },
        )}
      </section>
    </div>
  );
}

export default DetailPage;
