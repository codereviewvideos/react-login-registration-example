import * as types from '../constants/ActionTypes';
import { addNotification } from '../actions/notificationActions';
import dateHelper from '../utils/dateHelper';

// example of a thunk using the redux-thunk middleware
export function saveFuelSavings(settings) {
  return function (dispatch) {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the fuel savings
    return dispatch({
      type: types.SAVE_FUEL_SAVINGS,
      dateModified: dateHelper.getFormattedDateTime(),
      settings
    });
  };
}

export function calculateFuelSavings(settings, fieldName, value) {
  return {
    type: types.CALCULATE_FUEL_SAVINGS,
    dateModified: dateHelper.getFormattedDateTime(),
    settings,
    fieldName,
    value
  };
}



/**
 * Logs a user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */
export function login(username, password) {
  return dispatch => {
    dispatch(sendingRequest(true));
    return fetch('http://api.rest-user-api.dev/app_acceptance.php/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(res => {
        console.log('res', res);
        if (!res.ok) {
          return
        }

        return res.json();
      })
      .then(body => {
        let token = body.token || '';
        return dispatch(loginSuccess(token))
      })
      .catch(err => {
        console.log('there was an error sir', err);
        dispatch(addNotification(errorMsg, 'error'));
        return loginFailed(err);
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
    sendingRequest: false,
    isAuthenticated: true,
    id_token: token
  };
}


export function loginFailed(errorMsg) {
  return dispatch => {
    dispatch(sendingRequest(false));


    return {
      type: types.LOGIN__SUCCESS,
      sendingRequest: false,
      isAuthenticated: true,
      id_token: token
    };
  }
}


