async function fetchJson(url) {
  const resp = await fetch(url);
  const data = await resp.json();
  const isSuccess = resp.status >= 200 && resp.status < 300;

  if (isSuccess) {
    return data;
  }

  const error = new Error(resp.statusText || 'No response given');
  error.data = data || {};
  throw error;
}

export default fetchJson;
