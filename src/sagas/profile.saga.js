import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { LEVEL } from '../constants/NotificationLevels';
import { fetchProfile, changePassword } from '../connectivity/api';


export function * doRequestProfile(action) {
  try {
    const { userId } = action.payload;

    yield put({
      type: types.SENDING_REQUEST,
      payload: {sendingRequest: true}
    });

    const responseBody = yield call(fetchProfile, userId);

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
  try {
    const { userId } = action.payload;

    yield put({
      type: types.SENDING_REQUEST,
      payload: {sendingRequest: true}
    });

    const responseBody = yield call(changePassword, userId);

    const { message } = responseBody;

    yield put({
      type: types.CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED,
      payload: {
        message
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




export function * doFailedChangingPassword(error) {
  yield put({
    type: types.ADD_NOTIFICATION,
    payload: {
      message: error.message,
      level: LEVEL.ERROR
    }
  });
}

export function * watchFailedChangingPassword() {
  yield* takeLatest(types.CHANGE_PASSWORD__FAILED_RECEIVING, doFailedChangingPassword);
}
