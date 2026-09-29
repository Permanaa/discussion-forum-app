import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import Vote from './Vote';
import CommentButton from './CommentButton';
import OwnerInfo from './OwnerInfo';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
  onUpVoteThread,
  onDownVoteThread,
}) {
  const authUser = useSelector((states) => states.authUser);

  const isUpVote = upVotesBy?.includes(authUser?.id);
  const isDownVote = downVotesBy?.includes(authUser?.id);

  return (
    <div className="thread-item">
      <div className="thread-item__header">
        <OwnerInfo
          name={owner?.name}
          avatar={owner?.avatar}
          createdAt={createdAt}
        />
        <p>#{category}</p>
      </div>
      <div>
        <Link to={`/threads/${id}`}>
          <p className="thread-item__title">{title}</p>
        </Link>
        <div className="thread-item__body">{parse(body)}</div>
      </div>
      <div className="thread-item__footer">
        <Vote
          total={upVotesBy?.length - downVotesBy?.length}
          isUpVote={isUpVote}
          isDownVote={isDownVote}
          onUpVote={() => onUpVoteThread(id, isUpVote)}
          onDownVote={() => onDownVoteThread(id, isDownVote)}
        />
        <Link to={`/threads/${id}`}>
          <CommentButton total={totalComments} />
        </Link>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array,
  downVotesBy: PropTypes.array,
  totalComments: PropTypes.number,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onUpVoteThread: PropTypes.func,
  onDownVoteThread: PropTypes.func,
};

export default ThreadItem;
