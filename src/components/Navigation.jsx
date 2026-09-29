import { LuSquarePlus } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncUnsetAuthUser } from '../states/userAuth/action';

function Navigation() {
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();

  function onSignout() {
    dispatch(asyncUnsetAuthUser());
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Beranda</Link>
        </li>
        <li>
          <Link to="/leaderboard">Papan Peringkat</Link>
        </li>
        <li>
          {authUser ? (
            <Link onClick={onSignout}>Keluar</Link>
          ) : (
            <Link to="/login">Masuk</Link>
          )}
        </li>
      </ul>

      {authUser && (
        <div className="create-post">
          <Link to="/threads/create">
            <button>
              <LuSquarePlus size={20} />
              Buat Diskusi
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
