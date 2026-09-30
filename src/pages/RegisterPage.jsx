import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterUser } from '../states/userAuth/action';
import { useEffect } from 'react';

function RegisterPage() {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [confirmPass, setConfirmPass] = useInput('');

  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onRegisterHandler(event) {
    event.preventDefault();

    if (password.length < 6) {
      alert('Password setidaknya 6 karakter!');
      return;
    }

    if (password !== confirmPass) {
      alert('Password tidak sama!');
      return;
    }

    dispatch(
      asyncRegisterUser({ name, email, password }, () => navigate('/login')),
    );
  }

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser]);

  return (
    <>
      <h1 className="page-title">Daftar</h1>
      <form className="auth-form" onSubmit={onRegisterHandler}>
        <div className="input-wrapper">
          <label htmlFor="register-name">Nama</label>
          <input
            id="register-name"
            type="text"
            required
            value={name}
            onChange={setName}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            required
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="register-password">Kata Sandi</label>
          <input
            id="register-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="register-confirm-password">
            Konfirmasi Kata Sandi
          </label>
          <input
            id="register-confirm-password"
            type="password"
            autoComplete="current-password"
            required
            value={confirmPass}
            onChange={setConfirmPass}
          />
        </div>
        <button type="submit">Daftar</button>
        <p>
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </p>
      </form>
    </>
  );
}

export default RegisterPage;
