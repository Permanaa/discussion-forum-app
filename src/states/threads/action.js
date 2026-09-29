import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  // UP_VOTE_THREAD: "UP_VOTE_THREAD",
  // DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

function asyncPopulateThreads() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const threads = await api.getThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncCreateThread({ title, body, category }, onSuccessCallback) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { error, message } = await api.postCreateThread({
        title,
        body,
        category,
      });
      if (error) {
        alert(message);
        return;
      }

      if (onSuccessCallback) onSuccessCallback();
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThread(threadId, onSuccessCallback) {
  return async () => {
    try {
      const { error, message } = await api.postUpVoteThread(threadId);
      if (error) {
        alert(message);
        return;
      }

      if (onSuccessCallback) onSuccessCallback();
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownVoteThread(threadId, onSuccessCallback) {
  return async () => {
    try {
      const { error, message } = await api.postDownVoteThread(threadId);
      if (error) {
        alert(message);
        return;
      }

      if (onSuccessCallback) onSuccessCallback();
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralVoteThread(threadId, onSuccessCallback) {
  return async () => {
    try {
      const { error, message } = await api.postNeutralVoteThread(threadId);
      if (error) {
        alert(message);
        return;
      }

      if (onSuccessCallback) onSuccessCallback();
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpVoteThread({ isVote, threadId }, onSuccessCallback) {
  return async (dispatch) => {
    try {
      if (isVote) {
        dispatch(asyncNeutralVoteThread(threadId, onSuccessCallback));
      } else {
        dispatch(asyncUpVoteThread(threadId, onSuccessCallback));
      }
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleDownVoteThread({ isVote, threadId }, onSuccessCallback) {
  return async (dispatch) => {
    try {
      if (isVote) {
        dispatch(asyncNeutralVoteThread(threadId, onSuccessCallback));
      } else {
        dispatch(asyncDownVoteThread(threadId, onSuccessCallback));
      }
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  asyncPopulateThreads,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};
