export function formApiAdapter(dispatch, actionCreator) {
  return (...args) =>
    new Promise((resolve, reject) => {
      dispatch(actionCreator(...args)).then(response => {
        if (response.error) {
          reject(formatErrors(response))
        } else {
          resolve(response)
        }
      })
    })
}
function formatErrors(response) {
  console.log('form api adapter format errors', response);
  // ...translate your API's error response into a redux-form-compatible error object
}
