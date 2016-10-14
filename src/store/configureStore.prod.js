import {createStore, compose} from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  // const middewares = [
  //   // Add other middleware on this line...
  //
  // ];

  return createStore(
    rootReducer,
    initialState,
    compose()
  );
}
