class HttpApiCallError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;

    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

export async function login(username, password) {

  console.log('api - login method called', username, password);


  const requestConfig = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  };

  const response = await fetch('http://api.rest-user-api.dev/app_acceptance.php/login', requestConfig);

  if (!response.ok) {
    throw new HttpApiCallError(response.statusText, response.status);
  }

  return response.json();

  // if (!loginResponse.ok) {
  //   console.log('login response', loginResponse);
  //   throw new Error(
  //     loginResponse.statusText,
  //     loginResponse.status
  //   );
  // }
  //   .then(res => {
  //     console.log('res', res);
  //     if (!res.ok) {
  //       // dispatch(addNotification(res.statusText, 'error'));
  //       dispatch(loginFailed(res.statusText));
  //       return Promise.reject(res.statusText);
  //     }
  //
  //     return res.json();
  //   })
  //   .then(body => {
  //     let token = body.token || '';
  //     localStorage.setItem('idToken', token);
  //
  //     return dispatch(loginSuccess(token));
  //   })
  //   .catch(err => {
  //     console.log('there was an error sir', err);
  //     dispatch(addNotification(err, 'error'));
  //     return dispatch(loginFailed(err));
  //   })
  // ;
}
