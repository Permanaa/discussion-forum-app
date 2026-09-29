import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetAuthUser } from '../states/userAuth/action';
import { useEffect } from 'react';

function LoginPage() {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onLogin(event) {
    event.preventDefault();
    dispatch(
      asyncSetAuthUser({ email, password }, () => {
        navigate('/');
      }),
    );
  }

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser]);

  return (
    <>
      <h2 className="page-title">Masuk</h2>
      <form className="auth-form" onSubmit={onLogin}>
        <div className="input-wrapper">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="login-password">Kata Sandi</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={setPassword}
          />
        </div>
        <button type="submit">Masuk</button>
        <p>
          Belum punya akun? <Link to="/register">Daftar</Link>
        </p>
      </form>
    </>
  );
}

export default LoginPage;
