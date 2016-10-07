import { get } from './storage';
import HttpApiCallError from '../errors/HttpApiCallError';

const apiBaseUrl = 'http://api.rest-user-api.dev/app_acceptance.php';

const baseRequestConfig = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
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

  console.log('api fetch profile', userId);

  let requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });

  console.log('req config', requestConfig);

  const response = await fetch(`${apiBaseUrl}/profile/${userId}`, requestConfig);

  console.log('api fetch profile response', response);


  if (!response.ok) {
    throw new HttpApiCallError(response.statusText, response.status);
  }

  return response.json();

}
