import { get } from './storage';
import HttpApiCallError from '../errors/HttpApiCallError';
import fetchJson from './fetch-json-async-await';

const apiBaseUrl = 'http://api.rest-user-api.dev/app_acceptance.php';

const baseRequestConfig = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${get('id_token')}`
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

  const response = await fetchJson(`${apiBaseUrl}/login`, requestConfig);

  if (!response.ok) {
    throw new HttpApiCallError(response.statusText, response.status);
  }

  return response.json();
}


/**
 * Fetch Profile
 *
 * @param userId
 * @returns {*}
 */
export async function fetchProfile(userId) {

  return await fetchJson(`${apiBaseUrl}/profile/${userId}`, baseRequestConfig);
  // const response = await fetchJson(`${apiBaseUrl}/profile/${userId}`, baseRequestConfig);
  //
  // if (!response.ok) {
  //   throw new HttpApiCallError(response.statusText, response.status);
  // }
  //
  // return response.json();
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
  console.log('called change password', userId, oldPassword, newPassword, newPasswordRepeated);

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

  const response = await fetchJson(`${apiBaseUrl}/password/${userId}/change`, requestConfig);

  if (!response.ok) {
    throw new HttpApiCallError(response.statusText, response.status);
  }

  return response.json();
}
