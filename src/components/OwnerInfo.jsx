import PropTypes from 'prop-types';
import { postedAt } from '../utils/date';

function OwnerInfo({ avatar, name, createdAt }) {
  return (
    <div className="owner-info">
      <img src={avatar} />
      <p className="owner-info__name">{name}</p>
      <span>•</span>
      <p>{postedAt(createdAt)}</p>
    </div>
  );
}

OwnerInfo.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
};

export default OwnerInfo;
