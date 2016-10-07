import {
  LOGIN__FAILED,
  LOGIN__SUCCEEDED,
  LOGOUT__SUCCESS
} from '../constants/ActionTypes';
import persistentState from '../utils/localStorage';

export default function auth(state = {
  isAuthenticated: isAuthenticated(),
  userId: getUserId(),
  username: getUsername()
}, action) {

  console.log('isAuthenticated', state.isAuthenticated);
  console.log('userId', state.userId);
  console.log('username', state.username);

  switch (action.type) {

    case LOGIN__SUCCEEDED:
      return Object.assign({}, state, {
        isAuthenticated: true,
        userId: action.userId,
        username: action.username
      });

    case LOGIN__FAILED:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.errorMsg
      });

    case LOGOUT__SUCCESS:
      return Object.assign({}, {
        isAuthenticated: false
      });

    default:
      return state;
  }
}





function isAuthenticated() {
  return !!persistentState.getItem('idToken');
}

function getUserId() {
  const profile = persistentState.getItem('profile');

  console.log('profile', profile);
  console.log('profile userId', profile.userId);


  return profile !== null ? profile.userId : undefined;
}

function getUsername() {
  return persistentState.getItem('profile') !== null ? persistentState.getItem('profile').username : undefined;
}
