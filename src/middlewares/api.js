function callApi(endpoint, method, body = {}, authenticated) {


  console.log('middleware/apis - callApi');


  let token = localStorage.getItem('idToken') || null;
  let config = {};

  if(authenticated) {
    if (!token) {
      throw STATUS.noTokenSaved;
    }

    config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      method,
      body
    };
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
    .catch(err => console.log('beep', err));
}




export const CALL_API = Symbol('Call API');
export const STATUS = {
  noTokenSaved: 'No token saved!'
};


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

  console.log('middleware/apis callAPI', callAPI);

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let {
    endpoint,
    types,
    method = 'GET',
    body = {},
    authenticated
  } = callAPI;


  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [ requestType, successType, errorType ] = types;

  next(actionWith({ type: requestType }));

  try {
    return callApi(endpoint, method, body, authenticated).then(
      response =>
        next({
          response,
          authenticated,
          type: successType
        }),
      error => {
        console.log('i am an error', error);
        next({
          error: error.message || 'There was an error.',
          type: errorType
        })
      }
    );
  } catch(err) {
    return next({
      error: err || 'There was an error.',
      type: errorType
    })
  }

};
