/**
 * Default implementation works with localStorage
 *
 * @returns {obj}
 */
export default {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  removeItem: (key) => localStorage.removeItem(key)
};
