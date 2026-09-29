import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users: Object.fromEntries(users.map((user) => [user.id, user])),
    },
  };
}

function asyncPopulateUsers() {
  return async (dispatch) => {
    try {
      const users = await api.getUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { ActionType, receiveUsersActionCreator, asyncPopulateUsers };
