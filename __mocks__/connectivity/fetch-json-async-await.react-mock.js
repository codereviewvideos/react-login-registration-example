async function fetchJson(url) {
  return true;
  // const resp = await fetch(url);
  // const data = await resp.json();
  // const isSuccess = resp.status >= 200 && resp.status < 300;
  //
  // if (isSuccess) {
  //   return data;
  // }
  //
  // const error = new Error(resp.responseText);
  // error.data = data;
  // throw error;
}

export default fetchJson;
