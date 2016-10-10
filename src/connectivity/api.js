import { get } from './storage';
import HttpApiCallError from '../errors/HttpApiCallError';

const apiBaseUrl = 'http://api.rest-user-api.dev/app_acceptance.php';

const baseRequestConfig = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${get('id_token')}`
  }
};


function addAuthorization() {
  return 'Bearer flflflf';
}


export async function login(username, password) {

  let requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });

  const response = await fetch(`${apiBaseUrl}/login`, requestConfig);

  if (!response.ok) {
    throw new HttpApiCallError(response.statusText, response.status);
  }

  return response.json();
}


export async function fetchProfile(userId) {

  const response = await fetch(`${apiBaseUrl}/profile/${userId}`, baseRequestConfig);

  if (!response.ok) {
    throw new HttpApiCallError(response.statusText, response.status);
  }

  return response.json();
}


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

  const response = await fetch(`${apiBaseUrl}/password/${userId}/change`, requestConfig);

  if (!response.ok) {
    throw new HttpApiCallError(response.statusText, response.status);
  }

  return response.json();
}
