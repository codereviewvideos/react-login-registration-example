import * as types from '../constants/ActionTypes';
import { addNotification } from '../actions/notificationActions';
import { sendingRequest } from '../actions/utilityActions';



// TODO need a way to check if id_token has expired
// TODO need to check if exists in local storage
// TODO and if it's still valid, if not refresh ?
// TODO or log out


/**
 * Logs a user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */
export function login(username, password) {
  return dispatch => {

    let requestConfig = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    };

    dispatch(sendingRequest(true));

    return fetch('http://api.rest-user-api.dev/app_acceptance.php/login', requestConfig)
      .then(res => {
        console.log('res', res);
        if (!res.ok) {
          dispatch(addNotification(res.statusText, 'error'));
          dispatch(sendingRequest(false));
          dispatch(loginFailed(res.statusText));
          return Promise.reject(username);
        }

        return res.json();
      })
      .then(body => {
        let token = body.token || '';
        localStorage.setItem('id_token', token);
        dispatch(sendingRequest(false));
        return dispatch(loginSuccess(token));
      })
      .catch(err => {
        console.log('there was an error sir', err);
        dispatch(addNotification(err, 'error'));
        dispatch(sendingRequest(false));
        return dispatch(loginFailed(err));
      })
    ;
  };
}


// export function loginAttempt() {
//   return dispatch => {
//     dispatch(sendingRequest(true));
//   }
// }


export function loginSuccess(token) {
  return {
    type: types.LOGIN__SUCCESS,
    isAuthenticated: true,
    id_token: token
  };
}


export function loginFailed(errorMsg) {
  return {
    type: types.LOGIN__FAILED,
    isAuthenticated: false,
    id_token: '',
    errorMsg
  };
}


