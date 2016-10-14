jest.mock('../../src/connectivity/storage.js');
jest.mock('../../src/connectivity/api.js');

import {call, put} from 'redux-saga/effects';
import * as types from '../../src/constants/ActionTypes';
import * as profileSaga from '../../src/sagas/profile.saga';
import LEVEL from '../../src/constants/NotificationLevels';
import { startSubmit, stopSubmit } from 'redux-form';
import formErrorHelper from '../../src/helpers/formErrorHelper';

describe('Profile Saga', () => {

  describe('doRequestProfile', () => {

    it('has a happy path', () => {

      let userId = 987;

      const generator = profileSaga.doRequestProfile({
        payload: { userId }
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
        call(api.fetchProfile, userId)
      );


      let fakeResponseBody = { username: 'chris', email: 'chris@codereviewvideos.com' };

      expect(
        generator.next(fakeResponseBody).value
      ).toEqual(
        put({
          type: types.PROFILE__SUCCESSFULLY_RECEIVED,
          payload: {
            id: userId,
            username: 'chris',
            email: 'chris@codereviewvideos.com'
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

      expect(generator.next().done).toBeTruthy();
    });


    it('throws when call to api.fetchProfile fails', () => {

      let userId = 654;

      const generator = profileSaga.doRequestProfile({
        payload: { userId }
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
        call(api.fetchProfile, userId)
      );


      expect(
        generator.throw({
          message: 'it blew up',
          statusCode: 403
        }).value
      ).toEqual(
        put({
          type: types.PROFILE__FAILED_RECEIVING,
          payload: {
            message: 'it blew up',
            statusCode: 403
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

      expect(generator.next().done).toBeTruthy();
    });
  });


  describe('doChangePassword', () => {

    it('has a happy path', () => {

      const userId = 435,
        currentPassword = 'oldpass',
        newPassword = 'newpass',
        newPasswordRepeated = 'newpass'
        ;

      const generator = profileSaga.doChangePassword({
        payload: {
          userId,
          currentPassword,
          newPassword,
          newPasswordRepeated
        }
      });

      expect(
        generator.next().value
      ).toEqual(
        put(startSubmit('change-password'))
      );

      const api = require('../../src/connectivity/api');

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.SENDING_REQUEST,
          payload: {sendingRequest: true}
        })
      );


      expect(
        generator.next().value
      ).toEqual(
        call(api.changePassword, userId, currentPassword, newPassword, newPasswordRepeated)
      );


      let fakeResponseBody = { message: 'it all went well' };

      expect(
        generator.next(fakeResponseBody).value
      ).toEqual(
        put({
          type: types.CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED,
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

      expect(
        generator.next().value
      ).toEqual(
        put(stopSubmit('change-password', {}))
      );

      expect(generator.next().done).toBeTruthy();
    });


    it('throws when call to api.changePassword fails', () => {

      const userId = 435,
        currentPassword = 'oldpass',
        newPassword = 'newpass',
        newPasswordRepeated = 'newpass'
        ;

      const generator = profileSaga.doChangePassword({
        payload: {
          userId,
          currentPassword,
          newPassword,
          newPasswordRepeated
        }
      });

      expect(
        generator.next().value
      ).toEqual(
        put(startSubmit('change-password'))
      );


      const api = require('../../src/connectivity/api');

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.SENDING_REQUEST,
          payload: {sendingRequest: true}
        })
      );


      expect(
        generator.next().value
      ).toEqual(
        call(api.changePassword, userId, currentPassword, newPassword, newPasswordRepeated)
      );


      expect(
        generator.throw({
          message: 'it blew up',
          statusCode: 403,
          data: { fake: 'error' }
        }).value
      ).toEqual(
        put({
          type: types.CHANGE_PASSWORD__FAILED_RECEIVING,
          payload: {
            message: 'it blew up',
            statusCode: 403
          }
        })
      );


      expect(
        generator.next().value
      ).toEqual(
        call(formErrorHelper, { fake: 'error'}, 'children.current_password.errors[0]')
      );


      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.SENDING_REQUEST,
          payload: {sendingRequest: false}
        })
      );

      expect(
        generator.next().value
      ).toEqual(
        put(stopSubmit('change-password', { currentPassword: undefined }))
      );

      expect(generator.next().done).toBeTruthy();
    });
  });


  describe('doSucceededChangingPassword', () => {

    it('behaves as expected', () => {

      const generator = profileSaga.doSucceededChangingPassword({
        payload: { message: 'it worked!' }
      });

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.ADD_NOTIFICATION,
          payload: {
            message: 'it worked!',
            level: LEVEL.SUCCESS
          }
        })
      );

      expect(generator.next().done).toBeTruthy();
    });

  });


  describe('doFailedChangingPassword', () => {

    it('behaves as expected', () => {

      const generator = profileSaga.doFailedChangingPassword({
        payload: { message: 'whoops!' }
      });

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.ADD_NOTIFICATION,
          payload: {
            message: 'whoops!',
            level: LEVEL.ERROR
          }
        })
      );

      expect(generator.next().done).toBeTruthy();
    });

  });

});
