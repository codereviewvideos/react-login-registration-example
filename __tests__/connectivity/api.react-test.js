import React from 'react';
import { fetchProfile } from '../../src/connectivity/api';

describe('Connectivity', () => {

  it('can fetchProfile', async () => {



    // let get = jest.fn(() => new Promise(resolve => resolve()));
    // let fetch = jest.fn(() => new Promise(resolve => resolve()));

    // fetch.mockResponse('123');


    fetch.mockResponse('456');

    // try {
    //   let result = await fetchProfile(1);
    //
    //   expect(result).toThrow();
    // } catch(err) {
    //   console.log(err);
    // }
  });


  it('can fetchProfile alt', async () => {
    fetch.mockResponse(JSON.stringify({ a: true, b: "worked" }));

    // try {
      let result = await fetchProfile(1);

      expect(result).toEqual('#');
    // } catch(err) {
    //   console.log(err);
    // }
  });
});

