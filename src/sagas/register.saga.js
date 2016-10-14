import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import * as types from '../constants/ActionTypes';
import LEVEL from '../constants/NotificationLevels';
import * as api from '../connectivity/api';


export function *doRegister(action) {

  let success = false;

  try {
    const {username, email, password, passwordRepeated} = action.payload;

    yield put({
      type: types.SENDING_REQUEST,
      payload: {sendingRequest: true}
    });

    const {msg, token} = yield call(api.register, username, email, password, passwordRepeated);

    console.log('regi', msg, token);

    yield put({
      type: types.REGISTRATION__SUCCESSFULLY_RECEIVED,
      payload: {
        idToken: token,
        message: msg
      }
    });

    success = true;

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

  if (success) {
    yield put(push('/'));
  }
}

export function *watchRegister() {
  yield* takeLatest(types.REGISTRATION__REQUESTED, doRegister);
}



export function *doSuccessfullyRegistered(action) {
  yield put({
    type: types.LOGIN__SUCCEEDED,
    payload: {
      idToken: action.payload.idToken
    }
  });

  yield put({
    type: types.ADD_NOTIFICATION,
    payload: {
      message: action.payload.message,
      level: LEVEL.SUCCESS
    }
  });
}

export function *watchSucceededChangingPassword() {
  yield* takeLatest(types.REGISTRATION__SUCCESSFULLY_RECEIVED, doSuccessfullyRegistered);
}



export function *doFailedRegistration(action) {
  yield put({
    type: types.ADD_NOTIFICATION,
    payload: {
      message: action.payload.message,
      level: LEVEL.ERROR
    }
  });
}

export function *watchFailedRegistering() {
  yield* takeLatest(types.REGISTRATION__FAILED_RECEIVING, doFailedRegistration);
}
