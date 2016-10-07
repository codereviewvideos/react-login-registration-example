import HttpApiCallError from '../errors/HttpApiCallError';

const apiBaseUrl = 'http://api.rest-user-api.dev/app_acceptance.php';

const baseRequestConfig = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
  }
};


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

  const response = await fetch(`${apiBaseUrl}/profile/${userId}`, baseRequestConfig);

  console.log('api fetch profile response', response);


  if (!response.ok) {
    throw new HttpApiCallError(response.statusText, response.status);
  }

  return response.json();

}
