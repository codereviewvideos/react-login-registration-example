import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';
import * as types from '../constants/ActionTypes';
import LEVEL from '../constants/NotificationLevels';
import * as api from '../connectivity/api';
import * as storage from '../connectivity/storage';

export function * doLogin(action) {
  try {

    const { username, password } = action.payload;

    yield put({
      type: types.SENDING_REQUEST,
      payload: { sendingRequest: true }
    });

    const responseBody = yield call(api.login, username, password);

    console.log('res bodyu', responseBody);

    const { token } = responseBody;
    if (token === undefined) {
      throw new Error('Cannot continue. Unable to find a valid token in the login response.');
    }
    yield call(storage.save, 'id_token', token);

    const { userId } = jwtDecode(token); // pull out the user data from the JWT
    if (userId === undefined) {
      throw new Error('Cannot continue. Unable to find a user ID in the decoded JWT token.');
    }
    yield call(storage.save, 'profile', JSON.stringify({userId, username}));

    yield put({
      type: types.LOGIN__SUCCEEDED,
      payload: {
        userId,
        username
      }
    });

  } catch (e) {

    console.log('caught e', e);

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
  yield* takeLatest(types.LOGIN__REQUESTED, doLogin);
}





export function * doLoginFailed(error) {
  yield put({
    type: types.ADD_NOTIFICATION,
    payload: {
      message: error.payload.message,
      level: LEVEL.ERROR
    }
  });

  yield call(storage.cleanUp);
}

export function * watchLoginFailed() {
  yield* takeLatest(types.LOGIN__FAILED, doLoginFailed);
}







export function * doLogout() {
  yield call(storage.cleanUp);

  yield put({
    type: types.LOGOUT__SUCCESS
  });

  yield put(push('/')); // redirect to /
}

export function * watchLogout() {
  yield* takeLatest(types.LOGOUT__REQUESTED, doLogout);
}




