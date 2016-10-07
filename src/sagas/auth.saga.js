import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { LEVEL } from '../actions/notificationActions';
import { login } from '../connectivity/api';
import jwtDecode from 'jwt-decode';

function * doLogin(action) {
  try {

    console.log('login generator was hit', action);

    let { username, password } = action.payload;

    console.log('got me some data', username, password);

    yield put({type: types.SENDING_REQUEST, sendingRequest: true});

    const responseBody = yield call(login, username, password);

    let token = responseBody.token || '';
    localStorage.setItem('idToken', token);
    localStorage.setItem('username', username); // already know the username, and should be valid at this point

    let { userId } = jwtDecode(token); // pull out the user data from the JWT
    localStorage.setItem('userId', userId);

    yield put({type: types.LOGIN__SUCCEEDED, userId, username});

  } catch (e) {

    console.log('it all went wrong', e);

    yield put({
      type: types.LOGIN__FAILED,
      message: e.message,
      statusCode: e.statusCode
    });

  } finally {
    yield put({type: types.SENDING_REQUEST, sendingRequest: false});
  }
}

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
export function * watchLogin() {
  console.log('am i watch login#?' );
  yield* takeLatest(types.LOGIN__REQUESTED, doLogin);
}





export function * doLoginFailed(error) {
  yield put({
    type: types.ADD_NOTIFICATION,
    message: error.message,
    level: LEVEL.ERROR
  });

  localStorage.removeItem('idToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
}

export function * watchLoginFailed() {
  console.log('am i watch login failed');
  yield* takeLatest(types.LOGIN__FAILED, doLoginFailed);
}
