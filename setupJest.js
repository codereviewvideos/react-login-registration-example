let localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });





const syncify = async (fn) => {
  try {
    const result = await fn();
    return () => { return result; };
  } catch (e) {
    return () => { throw e; };
  }
};

export default {
  syncify
}
