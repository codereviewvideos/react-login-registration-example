'use strict';

jest.mock('../../src/connectivity/fetch-json-async-await.js');

import React from 'react';
import { fetchProfile } from '../../src/connectivity/api';

describe('Connectivity', () => {

  it('can fetchProfile', async () => {



    // let get = jest.fn(() => new Promise(resolve => resolve()));
    // let fetch = jest.fn(() => new Promise(resolve => resolve()));

    // fetch.mockResponse('123');


    // fetch.mockResponse('456');

    // try {
    //   let result = await fetchProfile(1);
    //
    //   expect(result).toThrow();
    // } catch(err) {
    //   console.log(err);
    // }
  });


  // it('can fetchProfile alt', async () => {
  //   // fetch.mockResponse(JSON.stringify({ a: true, b: "worked" }));
  //
  //   const fetch = jest.fn(() => { return { hello: "world" }});
  //
  //   let result = await fetchProfile(1);
  //
  //   console.log('result', result);
  //
  //   expect(result).toEqual(true);
  // });
});

