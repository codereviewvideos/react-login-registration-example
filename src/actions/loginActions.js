import * as types from '../constants/actionTypes';

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
 * Logs an user in
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
        // if (!res.ok) {
        //   throw res.statusText;
        // }

        // dispatch(addedTumblrPost(tumblrPost, res));
        // dispatch(addNotification('some message', 'success'));
      })
      .catch(err => {
        console.log('there was an error sir', err);
        // dispatch(failedAddingTumblrPost(tumblrPost, err));
        // dispatch(addNotification(err, 'error'));
      })
      ;
  };
}



/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: types.SENDING_REQUEST, sending };
}
