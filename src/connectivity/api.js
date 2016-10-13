import * as storage from './storage';
import asyncFetch from './fetch-json-async-await';

// needs to be extracted
const apiBaseUrl = 'http://api.rest-user-api.dev/app_acceptance.php';

const baseRequestConfig = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${storage.get('id_token')}`
  }
};


/**
 * Login
 *
 * @param username
 * @param password
 * @returns {*}
 */
export async function login(username, password) {

  let requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });

  return await asyncFetch.fetchAsJson(`${apiBaseUrl}/login`, requestConfig);
}


/**
 * Fetch Profile
 *
 * @param userId
 * @returns {*}
 */
export async function fetchProfile(userId) {

  return await asyncFetch.fetchAsJson(`${apiBaseUrl}/profile/${userId}`, baseRequestConfig);
}


/**
 * Change Password
 *
 * @param userId
 * @param oldPassword
 * @param newPassword
 * @param newPasswordRepeated
 * @returns {*}
 */
export async function changePassword(userId, oldPassword, newPassword, newPasswordRepeated) {

  let requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({
      "current_password": oldPassword,
      "plainPassword": {
        "first": newPassword,
        "second": newPasswordRepeated
      }
    })
  });

  return await asyncFetch.fetchAsJson(`${apiBaseUrl}/password/${userId}/change`, requestConfig);
}
