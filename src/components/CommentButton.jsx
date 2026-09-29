import PropTypes from 'prop-types';
import { LuMessageCircle } from 'react-icons/lu';

function CommentButton({ total }) {
  return (
    <div className="comment-button">
      <LuMessageCircle size={20} />
      <p>{total}</p>
    </div>
  );
}

CommentButton.propTypes = {
  total: PropTypes.number.isRequired,
};

export default CommentButton;
