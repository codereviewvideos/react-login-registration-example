import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import LEVEL from '../constants/NotificationLevels';
import * as api from '../connectivity/api';


export function * doRegister(action) {
  try {
    const { username, email, password, passwordRepeated } = action.payload;

    yield put({
      type: types.SENDING_REQUEST,
      payload: {sendingRequest: true}
    });

    const responseBody = yield call(api.re, userId);

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

export function * watchRegister() {
  yield* takeLatest(types.REGISTRATION__RREQUESTED, doRegister);
}
