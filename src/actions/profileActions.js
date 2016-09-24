import { CALL_API } from 'redux-api-middleware';
import {
  PROFILE__REQUESTING,
  PROFILE__SUCCESSFULLY_RECEIVED,
  PROFILE__FAILED_RECEIVING
}  from '../constants/ActionTypes';

export function fetchProfile() {
  console.log('am i even called bruv?');
  return {
    [CALL_API]: {
      endpoint: `http://api.rest-user-api.dev/app_acceptance.php/profile/1`,
      method: 'GET',
      types: [
        PROFILE__REQUESTING,
        PROFILE__SUCCESSFULLY_RECEIVED,
        PROFILE__FAILED_RECEIVING
      ]
    }
  }
}
