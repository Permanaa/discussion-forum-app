const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      return { error: true, message, user: null };
    }

    const {
      data: { user },
    } = responseJson;

    return { error: false, message, user };
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      return { error: true, message, token: '' };
    }

    const {
      data: { token },
    } = responseJson;

    return { error: false, message, token };
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      return { error: true, message, user: null };
    }

    const {
      data: { user },
    } = responseJson;

    return { error: false, message, user };
  }

  async function getUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const resJson = await response.json();

    const { status, message } = resJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { users },
    } = resJson;

    return users;
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const resJson = await response.json();

    const { status, message } = resJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { leaderboards },
    } = resJson;

    return leaderboards;
  }

  async function getThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const resJson = await response.json();

    const { status, message } = resJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = resJson;

    return threads;
  }

  async function getThreadDetail(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const resJson = await response.json();

    const { status, message } = resJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = resJson;

    return detailThread;
  }

  async function postCreateThread({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      return { error: true, message, thread: null };
    }

    const {
      data: { thread },
    } = responseJson;

    return { error: false, message, thread };
  }

  async function postUpVoteThread(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      return { error: true, message, vote: null };
    }

    const {
      data: { vote },
    } = responseJson;

    return { error: false, message, vote };
  }

  async function postDownVoteThread(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      return { error: true, message, vote: null };
    }

    const {
      data: { vote },
    } = responseJson;

    return { error: false, message, vote };
  }

  async function postNeutralVoteThread(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      return { error: true, message, vote: null };
    }

    const {
      data: { vote },
    } = responseJson;

    return { error: false, message, vote };
  }

  async function postCreateComment({ threadId, content }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      return { error: true, message, comment: null };
    }

    const {
      data: { comment },
    } = responseJson;

    return { error: false, message, comment };
  }

  async function postUpVoteComment({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      return { error: true, message, vote: null };
    }

    const {
      data: { vote },
    } = responseJson;

    return { error: false, message, vote };
  }

  async function postDownVoteComment({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      return { error: true, message, vote: null };
    }

    const {
      data: { vote },
    } = responseJson;

    return { error: false, message, vote };
  }

  async function postNeutralVoteComment({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      return { error: true, message, vote: null };
    }

    const {
      data: { vote },
    } = responseJson;

    return { error: false, message, vote };
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getUsers,
    getLeaderboards,
    getThreads,
    getThreadDetail,
    postCreateThread,
    postUpVoteThread,
    postDownVoteThread,
    postNeutralVoteThread,
    postCreateComment,
    postUpVoteComment,
    postDownVoteComment,
    postNeutralVoteComment,
  };
})();

export default api;
