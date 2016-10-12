jest.mock('../../src/connectivity/storage.js');
jest.mock('../../src/connectivity/api.js');
jest.mock('jwt-decode', () => {
  return jest.fn(() => ({userId: 456}))
}); // simple mock to return a decoded token

import {call, put} from 'redux-saga/effects';
import * as types from '../../src/constants/ActionTypes';
// import {takeLatest} from 'redux-saga';
import * as authSaga from '../../src/sagas/auth.saga';
import * as storage from '../../src/connectivity/storage';

describe('Auth Saga', () => {

  it('doLogin - happy path', () => {

    let val;

    const generator = authSaga.doLogin({ payload: {
      username: 'tim',
      password: 'timpass'
    }});

    expect(
      generator.next().value
    ).toEqual(
      put({
        type: types.SENDING_REQUEST,
        payload: { sendingRequest: true }
      })
    );


    const api = require('../../src/connectivity/api');

    expect(
      generator.next().value
    ).toEqual(
      call(api.login, 'tim', 'timpass')
    );


    let fakeResponseBody = { token: 'some-token' };

    expect(
      generator.next(fakeResponseBody).value
    ).toEqual(
      call(storage.save, 'id_token', 'some-token')
    );


    expect(
      generator.next().value
    ).toEqual(
      call(storage.save, 'profile', JSON.stringify({userId: 456, username: 'tim'}))
    );


    expect(
      generator.next().value
    ).toEqual(
      put({
        type: types.LOGIN__SUCCEEDED,
        payload: {userId: 456, username: 'tim'}
      })
    );

  });

});
