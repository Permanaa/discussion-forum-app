import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateLeaderboards } from '../states/leaderboard/action';
import Top3Card from '../components/Top3Card';

function LeaderboardPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  const first = leaderboards[0];
  const second = leaderboards[1];
  const third = leaderboards[2];

  if (leaderboards.length <= 0) {
    return (
      <>
        <h2 className="page-title">Pengguna Aktif Teratas</h2>
        <p>Memuat...</p>
      </>
    );
  }

  return (
    <>
      <h2 className="page-title">Pengguna Aktif Teratas</h2>
      <section className="top3-wrapper">
        <Top3Card score={second.score} user={second.user} pos="second" />
        <Top3Card score={first.score} user={first.user} pos="first" />
        <Top3Card score={third.score} user={third.user} pos="third" />
      </section>
      <section>
        <table className="leaderboard-table">
          <tbody>
            {leaderboards
              .slice(3, leaderboards.length)
              .map((leaderboard, rank) => {
                return (
                  <tr key={leaderboard.user.id}>
                    <td>{rank + 4}</td>
                    <td>
                      <img src={leaderboard.user.avatar} />
                    </td>
                    <td>{leaderboard.user.name}</td>
                    <td>{leaderboard.user.email}</td>
                    <td>{leaderboard.score}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default LeaderboardPage;
