import { LuArrowBigDown, LuArrowBigUp } from 'react-icons/lu';

function Vote({ total, isUpVote, isDownVote, onUpVote, onDownVote }) {
  return (
    <div className="vote">
      <button onClick={onUpVote}>
        {isUpVote ? (
          <LuArrowBigUp size={24} fill="#98D69D" stroke="#98D69D" />
        ) : (
          <LuArrowBigUp size={24} />
        )}
      </button>
      <p>{total}</p>
      <button onClick={onDownVote}>
        {isDownVote ? (
          <LuArrowBigDown size={24} fill="#ff9999" stroke="#ff9999" />
        ) : (
          <LuArrowBigDown size={24} />
        )}
      </button>
    </div>
  );
}

export default Vote;
