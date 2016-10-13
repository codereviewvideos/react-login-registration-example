import HttpApiCallError from '../errors/HttpApiCallError';

async function fetchAsJson(url, requestConfig = {}) {
  const resp = await fetch(url, requestConfig);

  console.log('resp', resp);

  const data = await resp.json();

  console.log('data', data);


  const isSuccess = resp.status >= 200 && resp.status < 300;

  if (isSuccess) {
    return data;
  }

  const error = new HttpApiCallError(resp.statusText, resp.status);
  error.data = data;
  throw error;
}

export default {
  fetchAsJson
};
