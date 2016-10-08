import React from 'react';
import * as types from '../../src/constants/ActionTypes';
import request from '../../src/reducers/requestReducer';

describe('Request Reducer', () => {
  it('has a default state', () => {
    expect(request(undefined, { type: 'unexpected'})).toEqual({ sendingRequest: false });
  });

  it('can handle SENDING_REQUEST', () => {
    let action = {
      type: types.SENDING_REQUEST,
      payload: { sendingRequest: true }
    };
    expect(request({}, action)).toEqual(action.payload);
  });
});

