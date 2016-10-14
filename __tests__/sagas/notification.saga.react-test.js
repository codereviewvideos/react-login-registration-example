import {put} from 'redux-saga/effects';
import * as types from '../../src/constants/ActionTypes';
import * as notificationSaga from '../../src/sagas/notification.saga';

describe('Notification Saga', () => {

  describe('doAddNotification', () => {

    it('has a happy path', () => {

      const generator = notificationSaga.doAddNotification({
        payload: {
          message: 'some message',
          level: 'success'
        }
      });

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.ADD_NOTIFICATION,
          payload: {
            message: 'some message',
            level: 'success'
          }
        })
      );

      expect(generator.next().done).toBeTruthy();
    });
  });
});
