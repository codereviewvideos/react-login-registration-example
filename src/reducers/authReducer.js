import {
  LOGIN__FAILED,
  LOGIN__SUCCESS,
  LOGOUT__SUCCESS
} from '../constants/ActionTypes';

export default function auth(state = {
  isAuthenticated: !!localStorage.getItem('idToken'),
  userId: localStorage.getItem('userId'),
  username: localStorage.getItem('username'),
}, action) {

  switch (action.type) {

    case LOGIN__SUCCESS:
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
