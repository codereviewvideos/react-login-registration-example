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

    const responseBody = yield call(api.register, username, email, password, passwordRepeated);

    yield put({
      type: types.REGISTRATION__SUCCESSFULLY_RECEIVED,
      payload: {
        message: responseBody
      }
    });

  } catch (e) {

    yield put({
      type: types.REGISTRATION__FAILED_RECEIVING,
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