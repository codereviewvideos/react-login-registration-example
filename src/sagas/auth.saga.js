import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';
import * as types from '../constants/ActionTypes';
import { LEVEL } from '../actions/notificationActions';
import { login } from '../connectivity/api';
import { save, cleanUp } from '../connectivity/storage';

function * doLogin(action) {
  try {

    // console.log('login generator was hit', action);

    const { username, password } = action.payload;

    // console.log('got me some data', username, password);

    yield put({
      type: types.SENDING_REQUEST,
      payload: { sendingRequest: true }
    });

    const responseBody = yield call(login, username, password);

    const token = responseBody.token || '';
    yield call(save, 'id_token', token);

    const { userId } = jwtDecode(token); // pull out the user data from the JWT
    yield call(save, 'profile', JSON.stringify({userId, username}));

    yield put({
      type: types.LOGIN__SUCCEEDED,
      payload: {
        userId,
        username
      }
    });

  } catch (e) {

    // console.log('it all went wrong', e);

    yield put({
      type: types.LOGIN__FAILED,
      payload: {
        message: e.message,
        statusCode: e.statusCode
      }
    });

  } finally {
    yield put({
      type: types.SENDING_REQUEST,
      payload: { sendingRequest: false }
    });
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
    payload: {
      message: error.message,
      level: LEVEL.ERROR
    }
  });

  yield call(cleanUp);
}

export function * watchLoginFailed() {
  console.log('am i watch login failed');
  yield* takeLatest(types.LOGIN__FAILED, doLoginFailed);
}







export function * doLogout() {
  yield call(cleanUp);

  yield put({
    type: types.LOGOUT__SUCCESS
  });

  yield put(push('/')); // redirect to /
}

export function * watchLogout() {
  yield* takeLatest(types.LOGOUT__REQUESTED, doLogout);
}




