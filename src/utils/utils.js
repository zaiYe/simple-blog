/**
 * 存储localStorage
 * @param {string}  key
 * @param {string|Object} val
 */
export const setStorage = (key, val) => {
  if (!key) return;
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
  }
  window.localStorage.setItem(key, val);
};

/**
 * 获取localStorage
 * @param {string} key
 * @return {string | null | void}
 */
export const getStorage = key => {
  return window.localStorage.getItem(key);
};

/**
 * 移除localStorage
 * @param {string} key
 */
export const removeStorage = key => {
  if (key) {
    window.localStorage.removeItem(key);
  }
};
