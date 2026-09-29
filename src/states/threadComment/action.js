import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import { asyncReceiveThreadDetail } from '../threadDetail/action';

function asyncCreateComment({ threadId, content }, onSuccessCallback) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { error, message } = await api.postCreateComment({
        threadId,
        content,
      });
      if (error) {
        alert(message);
        return;
      }

      dispatch(asyncReceiveThreadDetail(threadId));
      if (onSuccessCallback) onSuccessCallback();
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteComment({ threadId, commentId }, onSuccessCallback) {
  return async () => {
    try {
      const { error, message } = await api.postUpVoteComment({
        threadId,
        commentId,
      });
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

function asyncDownVoteComment({ threadId, commentId }, onSuccessCallback) {
  return async () => {
    try {
      const { error, message } = await api.postDownVoteComment({
        threadId,
        commentId,
      });
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

function asyncNeutralVoteComment({ threadId, commentId }, onSuccessCallback) {
  return async () => {
    try {
      const { error, message } = await api.postNeutralVoteComment({
        threadId,
        commentId,
      });
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

function asyncToggleUpVoteComment(
  { isVote, threadId, commentId },
  onSuccessCallback,
) {
  return async (dispatch) => {
    try {
      if (isVote) {
        dispatch(
          asyncNeutralVoteComment({ threadId, commentId }, onSuccessCallback),
        );
      } else {
        dispatch(
          asyncUpVoteComment({ threadId, commentId }, onSuccessCallback),
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleDownVoteComment(
  { isVote, threadId, commentId },
  onSuccessCallback,
) {
  return async (dispatch) => {
    try {
      if (isVote) {
        dispatch(
          asyncNeutralVoteComment({ threadId, commentId }, onSuccessCallback),
        );
      } else {
        dispatch(
          asyncDownVoteComment({ threadId, commentId }, onSuccessCallback),
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
