function callApi(endpoint, authenticated) {


  console.log('middleware/apis - callApi');


  let token = localStorage.getItem('idToken') || null;
  let config = {};

  if(authenticated) {
    if (token) {
      config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
    } else {
      throw "No token saved!";
    }
  }

  return fetch(endpoint, config)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
    .catch(err => console.log(err));
}




export const CALL_API = Symbol('Call API');


/**
 * This is the middleware itself
 *
 * It relies on the callApi function defined above
 *
 * @param store
 */
export default store => next => action => {

  console.log('middleware/apis - default');

  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, types, authenticated } = callAPI;

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [ requestType, successType, errorType ] = types;

  next(actionWith({ type: requestType }));

  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  );
};
