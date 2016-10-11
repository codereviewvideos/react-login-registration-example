import React from 'react';
import * as types from '../../src/constants/ActionTypes';
import auth from '../../src/reducers/authReducer';

describe('Auth Reducer', () => {

  it('has a default state', () => {
    expect(auth(undefined, { type: 'unexpected'})).toEqual({
      isAuthenticated: false,
      userId: undefined,
      username: undefined
    });
  });


  it('can handle LOGIN__SUCCEEDED', () => {
    let action = {
      type: types.LOGIN__SUCCEEDED,
      payload: {
        userId: 654,
        username: "billy bob"
      }
    };

    let expectedOutcome = Object.assign({}, action.payload, { isAuthenticated: true });

    expect(auth({}, action)).toEqual(expectedOutcome);
  });


  it('can handle LOGIN__FAILED', () => {
    let action = {
      type: types.LOGIN__FAILED,
      payload: {
        message: "things went badly"
      }
    };

    let expectedOutcome = { isAuthenticated: false, errorMessage: "things went badly" };

    expect(auth({}, action)).toEqual(expectedOutcome);
  });


  it('can handle LOGOUT__SUCCESS', () => {
    let action = { type: types.LOGOUT__SUCCESS };

    let expectedOutcome = { isAuthenticated: false };

    expect(auth({}, action)).toEqual(expectedOutcome);
  });




});

