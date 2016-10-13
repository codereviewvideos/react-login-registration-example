import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import LEVEL from '../constants/NotificationLevels';
import * as api from '../connectivity/api';
import { startSubmit, stopSubmit } from 'redux-form';
import { SubmissionError } from 'redux-form';  // ES6

export function * doRequestProfile(action) {
  try {
    const { userId } = action.payload;

    yield put({
      type: types.SENDING_REQUEST,
      payload: {sendingRequest: true}
    });

    const responseBody = yield call(api.fetchProfile, userId);

    const { username, email } = responseBody;

    yield put({
      type: types.PROFILE__SUCCESSFULLY_RECEIVED,
      payload: {
        id: userId,
        username,
        email
      }
    });

  } catch (e) {

    yield put({
      type: types.PROFILE__FAILED_RECEIVING,
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

export function * watchRequestProfile() {
  yield* takeLatest(types.PROFILE__REQUESTED, doRequestProfile);
}



export function * doChangePassword(action) {

  console.log('doChangePassword action', action);

  const { userId, currentPassword, newPassword, newPasswordRepeated, resolve, reject } = action.payload;

  try {

    yield put(startSubmit('change-password'));

    yield put({
      type: types.SENDING_REQUEST,
      payload: {sendingRequest: true}
    });

    const responseBody = yield call(api.changePassword, userId, currentPassword, newPassword, newPasswordRepeated);

    yield put({
      type: types.CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED,
      payload: {
        message: responseBody
      }
    });

  } catch (e) {

    yield put({
      type: types.CHANGE_PASSWORD__FAILED_RECEIVING,
      payload: {
        message: e.message,
        statusCode: e.statusCode
      }
    });

    yield put(stopSubmit('change-password', {
      _error: {currentPassword: 'some errors'},
      error: {currentPassword: 'bbbb'},
      currentPassword: 'bbbb',
      errors: {currentPassword: 'aaa'}
    }));

  } finally {

    yield put({
      type: types.SENDING_REQUEST,
      payload: {sendingRequest: false}
    });

  }
}

export function * watchChangePassword() {
  yield* takeLatest(types.CHANGE_PASSWORD__REQUESTED, doChangePassword);
}




export function * doSucceededChangingPassword(action) {
  yield put({
    type: types.ADD_NOTIFICATION,
    payload: {
      message: action.payload.message,
      level: LEVEL.SUCCESS
    }
  });
}

export function * watchSucceededChangingPassword() {
  yield* takeLatest(types.CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED, doSucceededChangingPassword);
}



export function * doFailedChangingPassword(action) {
  yield put({
    type: types.ADD_NOTIFICATION,
    payload: {
      message: action.payload.message,
      level: LEVEL.ERROR
    }
  });
}

export function * watchFailedChangingPassword() {
  yield* takeLatest(types.CHANGE_PASSWORD__FAILED_RECEIVING, doFailedChangingPassword);
}

