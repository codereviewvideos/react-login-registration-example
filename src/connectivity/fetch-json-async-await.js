import HttpApiCallError from '../errors/HttpApiCallError';

async function fetchAsJson(url, requestConfig = {}) {
  const resp = await fetch(url, requestConfig);
  const data = await resp.json();

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
