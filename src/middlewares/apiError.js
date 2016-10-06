export default store => next => action => {

  console.log('api error middlware', store, next, action);
};
