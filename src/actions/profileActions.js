import { CALL_API } from '../middlewares/api';
import {
  PROFILE__REQUESTING,
  PROFILE__SUCCESSFULLY_RECEIVED,
  PROFILE__FAILED_RECEIVING,

  CHANGE_PASSWORD__REQUESTING,
  CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED,
  CHANGE_PASSWORD__FAILED_RECEIVING
}  from '../constants/ActionTypes';


export function fetchProfile(id) {
  return {
    [CALL_API]: {
      endpoint: `http://api.rest-user-api.dev/app_acceptance.php/profile/${id}`,
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


export function changePassword(userId, oldPassword, newPassword, newPasswordRepeated) {
  console.log('called change password', userId, oldPassword, newPassword, newPasswordRepeated);
  return {
    [CALL_API]: {
      endpoint: `http://api.rest-user-api.dev/app_acceptance.php/password/${userId}/change`,
      method: 'POST',
      authenticated: true,
      body: JSON.stringify({
        "current_password": oldPassword,
        "plainPassword": {
          "first": newPassword,
          "second": newPasswordRepeated
        }
      }),
      types: [
        CHANGE_PASSWORD__REQUESTING,
        CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED,
        CHANGE_PASSWORD__FAILED_RECEIVING
      ]
    }
  }
}
