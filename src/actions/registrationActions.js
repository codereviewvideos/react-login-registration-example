import addNotification from '../actions/notificationActions';
import { login, loginFailed } from './authActions';


export function register(username, emailAddress, plainPassword, plainPasswordRepeated) {
  return dispatch => {

    console.log('register action', username, emailAddress, plainPassword, plainPasswordRepeated);

    let requestConfig = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email: emailAddress,
        plainPassword: {
          first: plainPassword,
          second: plainPasswordRepeated
        },
      })
    };

    return fetch('http://api.rest-user-api.dev/app_acceptance.php/register', requestConfig)
      .then(res => {
        console.log('registration res', res);
        if (!res.ok) {
          dispatch(loginFailed(res.statusText));
          return Promise.reject(res.statusText);
        }

        return res.json();
      })
      .then(() => {
        return dispatch(login(username, plainPassword));
      })
      .catch(err => {
        console.log('there was an error sir', err);
        dispatch(addNotification(err, 'error'));
        return dispatch(loginFailed(err));
      })
      ;
  };
}
