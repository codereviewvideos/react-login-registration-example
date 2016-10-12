import React from 'react';
import * as types from '../../src/constants/ActionTypes';
import profile from '../../src/reducers/profileReducer';

describe('Profile Reducer', () => {

  it('has a default state', () => {
    expect(profile(undefined, { type: 'unexpected' })).toEqual({});
  });


  describe('Profile', () => {
    it('can handle PROFILE__REQUESTED', () => {
      let action = { type: types.PROFILE__REQUESTED };
      expect(profile({}, action)).toEqual({});
    });

    it('can handle PROFILE__SUCCESSFULLY_RECEIVED', () => {
      let action = {
        type: types.PROFILE__SUCCESSFULLY_RECEIVED,
        payload: {
          id: 123,
          username: 'chris',
          email: 'chris@codereviewvideos.com'
        }
      };
      expect(profile({}, action)).toEqual(action.payload);
    });

    it('can handle PROFILE__FAILED_RECEIVING', () => {
      let action = { type: types.PROFILE__FAILED_RECEIVING };
      expect(profile({}, action)).toEqual({});
    });
  });


  describe('Change Password', () => {
    it('can handle CHANGE_PASSWORD__REQUESTED', () => {
      let action = { type: types.CHANGE_PASSWORD__REQUESTED };
      expect(profile({}, action)).toEqual({});
    });

    it('can handle CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED', () => {
      let action = {
        type: types.CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED,
        payload: {
          id: 123,
          username: 'chris',
          email: 'chris@codereviewvideos.com'
        }
      };
      expect(profile({}, action)).toEqual(action.payload);
    });

    it('can handle CHANGE_PASSWORD__FAILED_RECEIVING', () => {
      let action = { type: types.CHANGE_PASSWORD__FAILED_RECEIVING };
      expect(profile({}, action)).toEqual({});
    });
  });
});

