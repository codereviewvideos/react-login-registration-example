import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';
import * as types from '../constants/ActionTypes';
import { LEVEL } from '../actions/notificationActions';
import { login } from '../connectivity/api';
import persistentState from '../utils/localStorage';

function * doLogin(action) {
  try {

    console.log('login generator was hit', action);

    const { username, password } = action.payload;

    console.log('got me some data', username, password);

    yield put({type: types.SENDING_REQUEST, sendingRequest: true});

    const responseBody = yield call(login, username, password);

    const token = responseBody.token || '';
    save('idToken', token);

    const { userId } = jwtDecode(token); // pull out the user data from the JWT
    save('profile', JSON.stringify({userId, username}));

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

  cleanUp();
}

export function * watchLoginFailed() {
  console.log('am i watch login failed');
  yield* takeLatest(types.LOGIN__FAILED, doLoginFailed);
}







export function * doLogout() {
  cleanUp();

  yield put({
    type: types.LOGOUT__SUCCESS
  });

  yield put(push('/')); // redirect to /
}

export function * watchLogout() {
  yield* takeLatest(types.LOGOUT__REQUESTED, doLogout);
}



function cleanUp() {
  persistentState.removeItem('idToken');
  persistentState.removeItem('profile');
}


/**
 * things I'd like to keep around even if a browser is closed between now and next time
 *
 * @param key
 * @param value
 */
function save(key, value) {
  persistentState.setItem(key, value);
}
