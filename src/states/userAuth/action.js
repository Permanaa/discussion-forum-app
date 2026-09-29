import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }, onSuccessCallback) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { error, token, message } = await api.login({ email, password });
      if (error) {
        alert(message);
        return;
      }

      api.putAccessToken(token);

      const authUser = await api.getOwnProfile();
      if (authUser.error) {
        alert(authUser.message);
        return;
      }

      dispatch(setAuthUserActionCreator(authUser));
      if (onSuccessCallback) onSuccessCallback();
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}

function asyncRegisterUser({ name, email, password }, onSuccessCallback) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { error, message } = await api.register({ name, email, password });
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

function asyncPreloadUserAuth() {
  return async (dispatch) => {
    try {
      const { error, user } = await api.getOwnProfile();
      if (error) {
        dispatch(setAuthUserActionCreator(null));
        return;
      }

      dispatch(setAuthUserActionCreator(user));
    } catch (error) {
      console.log(error);
      dispatch(setAuthUserActionCreator(null));
    }
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
  asyncPreloadUserAuth,
};
