import React from 'react';
import * as types from '../../src/constants/ActionTypes';
import notification from '../../src/reducers/notificationReducer';

describe('Notification Reducer', () => {
  it('has a default state', () => {
    expect(notification(undefined, { type: 'unexpected'})).toEqual({});
  });

  it('can handle ADD_NOTIFICATION', () => {
    let action = {
      type: types.ADD_NOTIFICATION,
      payload: {
        message: 'test message',
        level: 'success'
      }
    };
    expect(notification({}, action)).toEqual(action.payload);
  });
});

