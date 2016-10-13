'use strict';

jest.mock('../../src/connectivity/storage.js');
jest.mock('../../src/connectivity/fetch-json-async-await.js');

import * as api from '../../src/connectivity/api';
import helpers from '../../setupJest';

describe('Connectivity', () => {

  describe('login', () => {

    it('has a happy path', async () => {

      const asyncFetch = require('../../src/connectivity/fetch-json-async-await.js').default;
      asyncFetch.fetchAsJson = jest.fn(() => 'worked' );

      let result = await api.login('bob', 'testpass');
      expect(result).toEqual('worked');

      let url = asyncFetch.fetchAsJson.mock.calls[0][0];
      expect(url).toEqual('http://api.rest-user-api.dev/app_acceptance.php/login');

      let requestConfig = asyncFetch.fetchAsJson.mock.calls[0][1];
      let body = JSON.stringify({ username: 'bob', password: 'testpass' });

      expect(requestConfig.body).toEqual(body);
      expect(requestConfig.method).toEqual('POST');
    });

  });


  describe('fetchProfile', () => {

    it('has a happy path', async () => {

      const asyncFetch = require('../../src/connectivity/fetch-json-async-await.js').default;
      asyncFetch.fetchAsJson = jest.fn(() => 'worked');

      let result = await api.fetchProfile(123);
      expect(result).toEqual('worked');

      let url = asyncFetch.fetchAsJson.mock.calls[0][0];
      expect(url).toEqual('http://api.rest-user-api.dev/app_acceptance.php/profile/123');

      let requestConfig = asyncFetch.fetchAsJson.mock.calls[0][1];
      expect(requestConfig.method).toEqual('GET');
    });

  });


  describe('changePassword', () => {

    it('has a happy path', async () => {

      const asyncFetch = require('../../src/connectivity/fetch-json-async-await.js').default;
      asyncFetch.fetchAsJson = jest.fn(() => 'worked');

      let result = await api.changePassword(123, 'oldpass', 'newpass', 'newpass');
      expect(result).toEqual('worked');

      let url = asyncFetch.fetchAsJson.mock.calls[0][0];
      let requestConfig = asyncFetch.fetchAsJson.mock.calls[0][1];
      let body = JSON.stringify({
        "current_password": 'oldpass',
        "plainPassword": {
          "first": 'newpass',
          "second": 'newpass'
        }
      });

      expect(url).toEqual('http://api.rest-user-api.dev/app_acceptance.php/password/123/change');
      expect(requestConfig.body).toEqual(body);
      expect(requestConfig.method).toEqual('POST');
    });

  });


});

