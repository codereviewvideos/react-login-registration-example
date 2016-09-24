import {
  LOGIN__FAILED,
  LOGIN__SUCCESS,
  LOGOUT__SUCCESS
} from '../constants/ActionTypes';

export default function auth(state = {
  sendingRequest: false,
  isAuthenticated: !!localStorage.getItem('idToken')
}, action) {

  switch (action.type) {

    case LOGIN__SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        userId: action.userId,
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
