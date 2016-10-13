jest.mock('../../src/connectivity/storage.js');
jest.mock('../../src/connectivity/api.js');

import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as types from '../../src/constants/ActionTypes';
import * as registrationSaga from '../../src/sagas/register.saga';
import LEVEL from '../../src/constants/NotificationLevels';


describe('Registration Saga', () => {

  describe('doRegister', () => {

    it('has a happy path', () => {

      let username = 'jim',
        email = 'jim@gym.net',
        password = 'somepassword',
        passwordRepeated = 'somepassword'
      ;

      const generator = registrationSaga.doRegister({
        payload: { username, email, password, passwordRepeated }
      });

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.SENDING_REQUEST,
          payload: {sendingRequest: true}
        })
      );


      const api = require('../../src/connectivity/api');

      expect(
        generator.next().value
      ).toEqual(
        call(api.register, username, email, password, passwordRepeated)
      );


      let fakeResponseBody = "The user has been created successfully";

      expect(
        generator.next(fakeResponseBody).value
      ).toEqual(
        put({
          type: types.REGISTRATION__SUCCESSFULLY_RECEIVED,
          payload: {
            message: fakeResponseBody
          }
        })
      );


      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.SENDING_REQUEST,
          payload: {sendingRequest: false}
        })
      );
    });


    it('throws when call to api.register fails', () => {

      let username = 'jim',
        email = 'jim@gym.net',
        password = 'somepassword',
        passwordRepeated = 'bad second password'
        ;

      const generator = registrationSaga.doRegister({
        payload: { username, email, password, passwordRepeated }
      });

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.SENDING_REQUEST,
          payload: {sendingRequest: true}
        })
      );


      const api = require('../../src/connectivity/api');

      expect(
        generator.next().value
      ).toEqual(
        call(api.register, username, email, password, passwordRepeated)
      );


      expect(
        generator.throw({
          message: 'passwords dont match',
          statusCode: 400
        }).value
      ).toEqual(
        put({
          type: types.REGISTRATION__FAILED_RECEIVING,
          payload: {
            message: 'passwords dont match',
            statusCode: 400
          }
        })
      );


      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.SENDING_REQUEST,
          payload: {sendingRequest: false}
        })
      );
    });
  });

});
