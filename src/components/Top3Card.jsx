function Top3Card({ score, user, pos }) {
  const { name, email, avatar } = user;

  return (
    <div className={`top3-card top3-card__${pos}`}>
      <div className="top3-card__header">
        <div>
          <p>Skor</p>
          <p className="top3-card__score">{score}</p>
        </div>
        <img src={avatar} />
      </div>
      <div>
        <p className="top3-card__name">{name}</p>
        <p className="top3-card__email">{email}</p>
      </div>
    </div>
  );
}

export default Top3Card;
