import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import {push} from 'react-router-redux';
import * as types from '../constants/ActionTypes';
import LEVEL from '../constants/NotificationLevels';
import * as api from '../connectivity/api';
import * as storage from '../connectivity/storage';


export const MESSAGES = {
  UNABLE_TO_FIND_TOKEN_IN_LOGIN_RESPONSE: 'Cannot continue. Unable to find a valid token in the login response.',
  UNABLE_TO_FIND_TOKEN_IN_ACTION: 'Cannot continue. Unable to find a valid token in the given action.',
  UNABLE_TO_FIND_USER_ID: 'Cannot continue. Unable to find a user ID in the decoded JWT token.'
};


export function *doLogin(action) {
  try {

    const {username, password} = action.payload;

    yield put({
      type: types.SENDING_REQUEST,
      payload: {sendingRequest: true}
    });

    const responseBody = yield call(api.login, username, password);

    if (responseBody.token === undefined) {
      throw new Error(MESSAGES.UNABLE_TO_FIND_TOKEN_IN_LOGIN_RESPONSE);
    }

    yield put({
      type: types.LOGIN__SUCCEEDED,
      payload: {
        idToken: responseBody.token
      }
    });

  } catch (e) {

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
      payload: {sendingRequest: false}
    });
  }
}

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
export function *watchLogin() {
  yield* takeLatest(types.LOGIN__REQUESTED, doLogin);
}








export function *doLoginSucceeded(action) {

  const {idToken} = action.payload;

  if (idToken === undefined) {
    throw new Error(MESSAGES.UNABLE_TO_FIND_TOKEN_IN_ACTION);
  }

  yield call(storage.save, 'id_token', idToken);

  const {userId, username} = yield call(jwtDecode, idToken); // pull out the user data from the JWT

  if (userId === undefined) {
    throw new Error(MESSAGES.UNABLE_TO_FIND_USER_ID);
  }

  yield call(storage.save, 'profile', JSON.stringify({userId, username}));

  yield put({
    type: types.LOGIN__COMPLETED,
    payload: {
      userId,
      username
    }
  });
}

export function *watchLoginSucceeded() {
  yield* takeLatest(types.LOGIN__SUCCEEDED, doLoginSucceeded);
}








export function *doLoginFailed(action) {
  yield put({
    type: types.ADD_NOTIFICATION,
    payload: {
      message: action.payload.message,
      level: LEVEL.ERROR
    }
  });

  yield call(storage.cleanUp);
}

export function *watchLoginFailed() {
  yield* takeLatest(types.LOGIN__FAILED, doLoginFailed);
}







export function *doLogout() {
  yield call(storage.cleanUp);

  yield put({
    type: types.LOGOUT__SUCCESS
  });

  yield put(push('/')); // redirect to /
}

export function *watchLogout() {
  yield* takeLatest(types.LOGOUT__REQUESTED, doLogout);
}




