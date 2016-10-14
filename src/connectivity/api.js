import * as storage from './storage';
import asyncFetch from './fetch-json-async-await';

// needs to be extracted
const apiBaseUrl = 'http://api.rest-user-api.dev/app_acceptance.php';



const getBaseRequestConfig = () => {

  console.log('storage', storage);

  const idToken = storage.get('id_token');
  console.log('got token', idToken);

  return {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  };
};



/**
 * Login
 *
 * @param username
 * @param password
 * @returns {*}
 */
export async function login(username, password) {

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({username, password})
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

  const requestConfig = getBaseRequestConfig();

  return await asyncFetch.fetchAsJson(`${apiBaseUrl}/profile/${userId}`, requestConfig);
}


/**
 * Change Password
 *
 * @param userId
 * @param currentPassword
 * @param newPassword
 * @param newPasswordRepeated
 * @returns {*}
 */
export async function changePassword(userId, currentPassword, newPassword, newPasswordRepeated) {

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({
      "current_password": currentPassword,
      "plainPassword": {
        "first": newPassword,
        "second": newPasswordRepeated
      }
    })
  });

  return await asyncFetch.fetchAsJson(`${apiBaseUrl}/password/${userId}/change`, requestConfig);
}


/**
 * Register
 *
 * @param username
 * @param email
 * @param password
 * @param passwordRepeated
 * @returns {*}
 */
export async function register(username, email, password, passwordRepeated) {

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      plainPassword: {
        first: password,
        second: passwordRepeated
      }
    })
  });

  delete requestConfig.headers.Authorization;

  return await asyncFetch.fetchAsJson(`${apiBaseUrl}/register`, requestConfig);
}
