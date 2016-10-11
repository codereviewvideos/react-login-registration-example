import HttpApiCallError from '../../src/errors/HttpApiCallError';

describe('HttpApiCallError', () => {

  const err = new HttpApiCallError('some message', 4567);

  it('is defined', () => {
    expect(err).toBeDefined();
  });

  it('can define an error message', () => {
    expect(err.message).toEqual('some message');
  });

  it('can define an error status code', () => {
    expect(err.statusCode).toEqual(4567);
  });
});

