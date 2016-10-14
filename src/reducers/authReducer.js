import * as types from '../constants/ActionTypes';
import persistentState from '../utils/localStorage';

export default function auth(state = {
  isAuthenticated: isAuthenticated(),
  userId: getUserId(),
  username: getUsername()
}, action) {

  switch (action.type) {

    case types.LOGIN__COMPLETED: {
      const {userId, username} = action.payload;
      return Object.assign({}, state, {
        isAuthenticated: true,
        userId,
        username
      });
    }

    case types.LOGIN__FAILED: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.payload.message
      });
    }

    case types.LOGOUT__SUCCESS: {
      return Object.assign({}, {
        isAuthenticated: false
      });
    }

    default: {
      return state;
    }
  }
}





function isAuthenticated() {
  return !!persistentState.getItem('id_token');
}

function getUserId() {
  try {

    let profile = persistentState.getItem('profile') || {};
    profile = JSON.parse(profile);

    return profile.userId;

  } catch (e) {
    return undefined;
  }
}

function getUsername() {
  try {

    let profile = persistentState.getItem('profile');
    profile = JSON.parse(profile);

    return profile.username;

  } catch (e) {
    return undefined;
  }
}
