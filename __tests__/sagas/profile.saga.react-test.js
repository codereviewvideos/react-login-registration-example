jest.mock('../../src/connectivity/storage.js');
jest.mock('../../src/connectivity/api.js');

import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as types from '../../src/constants/ActionTypes';
import * as profileSaga from '../../src/sagas/profile.saga';
import LEVEL from '../../src/constants/NotificationLevels';


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
    });
  });


  describe('doChangePassword', () => {

    it('has a happy path', () => {

      const userId = 435,
        oldPassword = 'oldpass',
        newPassword = 'newpass',
        newPasswordRepeated = 'newpass'
        ;

      const generator = profileSaga.doChangePassword({
        payload: {
          userId,
          oldPassword,
          newPassword,
          newPasswordRepeated
        }
      });

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
        call(api.changePassword, userId, oldPassword, newPassword, newPasswordRepeated)
      );


      let fakeResponseBody = { message: 'it all went well' };

      expect(
        generator.next(fakeResponseBody).value
      ).toEqual(
        put({
          type: types.CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED,
          payload: {
            message: fakeResponseBody.message
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


    it('throws when call to api.changePassword fails', () => {

      const userId = 435,
        oldPassword = 'oldpass',
        newPassword = 'newpass',
        newPasswordRepeated = 'newpass'
        ;

      const generator = profileSaga.doChangePassword({
        payload: {
          userId,
          oldPassword,
          newPassword,
          newPasswordRepeated
        }
      });

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
        call(api.changePassword, userId, oldPassword, newPassword, newPasswordRepeated)
      );


      expect(
        generator.throw({
          message: 'it blew up',
          statusCode: 403
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
        put({
          type: types.SENDING_REQUEST,
          payload: {sendingRequest: false}
        })
      );
    });
  });


  describe('doFailedChangingPassword', () => {

    it('behaves as expected', () => {

      const generator = profileSaga.doFailedChangingPassword({
        message: 'whoops!'
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

    });

  });

});
