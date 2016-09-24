// import { CALL_API } from 'redux-api-middleware';
import { CALL_API } from '../middlewares/api';
import {
  PROFILE__REQUESTING,
  PROFILE__SUCCESSFULLY_RECEIVED,
  PROFILE__FAILED_RECEIVING
}  from '../constants/ActionTypes';

export function fetchProfile() {
  console.log('profileActions :: fetchProfile');
  console.log('profileActions :: CALL_API', CALL_API);
  return {
    [CALL_API]: {
      endpoint: `http://api.rest-user-api.dev/app_acceptance.php/profile/1`,
      method: 'GET',
      authenticated: true,
      types: [
        PROFILE__REQUESTING,
        PROFILE__SUCCESSFULLY_RECEIVED,
        PROFILE__FAILED_RECEIVING
      ]
    }
  }
}
