jest.mock('../../src/connectivity/storage.js');
jest.mock('../../src/connectivity/api.js');
jest.mock('jwt-decode', () => {
  return jest.fn(() => ({userId: 456}));
}); // simple mock to return a decoded token

import {call, put} from 'redux-saga/effects';
import * as types from '../../src/constants/ActionTypes';
import {takeLatest} from 'redux-saga';
import { push } from 'react-router-redux';
import * as authSaga from '../../src/sagas/auth.saga';
import * as storage from '../../src/connectivity/storage';
import LEVEL from '../../src/constants/NotificationLevels';


describe('Auth Saga', () => {

  describe('doLogin', () => {

    it('has a happy path', () => {

      const generator = authSaga.doLogin({
        payload: {
          username: 'tim',
          password: 'timpass'
        }
      });

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
        put({
          type: types.LOGIN__SUCCEEDED,
          payload: { idToken: 'some-token'}
        })
      );


      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.SENDING_REQUEST,
          payload: { sendingRequest: false }
        })
      );

      expect(generator.next().done).toBeTruthy();
    });


    it('throws when call to api.login fails', () => {

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


      expect(
        generator.throw({
          message: 'something went wrong',
          statusCode: 123
        }).value
      ).toEqual(
        put({
          type: types.LOGIN__FAILED,
          payload: {
            message: 'something went wrong',
            statusCode: 123
          }
        })
      );

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.SENDING_REQUEST,
          payload: { sendingRequest: false }
        })
      );
    });


    it('throws when cannot find a token in responseBody', () => {

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


      let fakeResponseBody = { bad: 'response' };

      expect(
        generator.next(fakeResponseBody).value
      ).toEqual(
        put({
          type: types.LOGIN__FAILED,
          payload: {
            message: 'Cannot continue. Unable to find a valid token in the login response.',
            statusCode: undefined
          }
        })
      );


      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.SENDING_REQUEST,
          payload: { sendingRequest: false }
        })
      );
    });
  });


  describe('doLoginSucceeded', () => {
    it('behaves as expected', () => {

      const generator = authSaga.doLoginSucceeded({ payload: {
        idToken: 'some-token'
      }});

      expect(
        generator.next().value
      ).toEqual(
        call(storage.save, 'id_token', 'some-token')
      );

      const jwtDecode = require('jwt-decode');

      expect(
        generator.next().value
      ).toEqual(
        call(jwtDecode, 'some-token')
      );

      let mockJwtDecode = {userId: 456, username: 'tim'};

      expect(
        generator.next(mockJwtDecode).value
      ).toEqual(
        call(storage.save, 'profile', JSON.stringify({userId: 456, username: 'tim'}))
      );

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.LOGIN__COMPLETED,
          payload: {
            userId: 456,
            username: 'tim'
          }
        })
      );

      expect(generator.next().done).toBeTruthy();
    });


    it('throws if idToken is undefined', () => {

      const generator = authSaga.doLoginSucceeded({ payload: {
        bad: 'data'
      }});

      expect(() => generator.next()).toThrow('Cannot continue. Unable to find a valid token in the given action.');
    });

    it('throws if Unable to find a user ID in the decoded JWT token', () => {

      const generator = authSaga.doLoginSucceeded({ payload: {
        idToken: 'some-token'
      }});

      expect(
        generator.next().value
      ).toEqual(
        call(storage.save, 'id_token', 'some-token')
      );

      const jwtDecode = require('jwt-decode');

      expect(
        generator.next().value
      ).toEqual(
        call(jwtDecode, 'some-token')
      );

      let mockJwtDecode = {bad:'times'};

      expect(
        () => generator.next(mockJwtDecode)
      ).toThrow('Cannot continue. Unable to find a user ID in the decoded JWT token.');
    });

  });


  describe('doLoginFailed', () => {
    it('behaves as expected', () => {

      const generator = authSaga.doLoginFailed({ payload: {
        message: 'something went badly wrong'
      }});

      expect(
        generator.next().value
      ).toEqual(
        [
          put({
            type: types.ADD_NOTIFICATION,
            payload: {
              message: 'something went badly wrong',
              level: LEVEL.ERROR
            }
          }),
          call(storage.cleanUp)
        ]
      );

      expect(generator.next().done).toBeTruthy();
    });
  });


  describe('doLogout', () => {
    it('behaves as expected', () => {

      const generator = authSaga.doLogout();

      expect(
        generator.next().value
      ).toEqual(
        call(storage.cleanUp)
      );


      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.LOGOUT__SUCCESS
        })
      );


      expect(
        generator.next().value
      ).toEqual(
        put(push('/'))
      );

      expect(generator.next().done).toBeTruthy();
    });
  });
});
