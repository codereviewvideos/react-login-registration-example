import persistentState from '../utils/localStorage';

/**
 * things I'd like to keep around even if a browser is closed between now and next time
 *
 * @param key
 * @param value
 */
export function save(key, value) {
  console.log('saving to storage', key, value);
  persistentState.setItem(key, value);
}

export function get(key) {
  console.log('calling get from storage',key );
  return persistentState.getItem(key);
}

export function cleanUp() {
  persistentState.removeItem('id_token');
  persistentState.removeItem('profile');
}

export default {
  save,
  get,
  cleanUp
};
