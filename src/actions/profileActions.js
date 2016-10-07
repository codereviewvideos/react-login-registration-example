// import {push} from 'react-router-redux'
// import {
//   PROFILE__REQUESTED,
//   PROFILE__SUCCESSFULLY_RECEIVED,
//   PROFILE__FAILED_RECEIVING,
//
//   CHANGE_PASSWORD__REQUESTED,
//   CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED,
//   CHANGE_PASSWORD__FAILED_RECEIVING
// }  from '../constants/ActionTypes';
//
//
// export function fetchProfile(id) {
//   return async(dispatch) => {
//     const actionResponse = await dispatch({
//       [CALL_API]: {
//         endpoint: `http://api.rest-user-api.dev/app_acceptance.php/profile/${id}`,
//         method: 'GET',
//         authenticated: true,
//         types: [
//           PROFILE__REQUESTED,
//           PROFILE__SUCCESSFULLY_RECEIVED,
//           PROFILE__FAILED_RECEIVING
//         ]
//       }
//     });
//
//
//     if (actionResponse.error) {
//       console.log('it all blew up', actionResponse);
//       // dispatch(failedRequest(444, 'some gibbons broke it all'));
//       dispatch(push('/'));
//       // the last dispatched action has errored, break out of the promise chain.
//       throw new Error("Promise flow received action error", actionResponse);
//     }
//
//     console.log('it all went well', actionResponse);
//
//     // you can EITHER return the above resolved promise (actionResponse) here...
//     return actionResponse;
//   }
// }


// export function changePassword(userId, oldPassword, newPassword, newPasswordRepeated) {
//   console.log('called change password', userId, oldPassword, newPassword, newPasswordRepeated);
//   return {
//     [CALL_API]: {
//       endpoint: `http://api.rest-user-api.dev/app_acceptance.php/password/${userId}/change`,
//       method: 'POST',
//       authenticated: true,
//       body: JSON.stringify({
//         "current_password": oldPassword,
//         "plainPassword": {
//           "first": newPassword,
//           "second": newPasswordRepeated
//         }
//       }),
//       types: [
//         CHANGE_PASSWORD__REQUESTED,
//         CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED,
//         CHANGE_PASSWORD__FAILED_RECEIVING
//       ]
//     }
//   }
// }
