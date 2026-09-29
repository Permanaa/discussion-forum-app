import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import RegisterPage from './pages/RegisterPage';
import CreateThreadPage from './pages/CreateThreadPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncPreloadUserAuth } from './states/userAuth/action';
import Loading from './components/Loading';
import { LoadingBar } from '@dimasmds/react-redux-loading-bar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadUserAuth());
  }, [dispatch]);

  return (
    <>
      <Loading />
      <LoadingBar />
      <main>
        <header>
          <Navigation />
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:threadId" element={<DetailPage />} />
          <Route path="/threads/create" element={<CreateThreadPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element="404" />
        </Routes>
      </main>
    </>
  );
}

export default App;
