// store.js
let count = 0;
const listeners = new Set();

export const getSnapshot = () => count;

export const subscribe = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

export const increment = () => {
  count++;
  listeners.forEach((cb) => cb());
};

export const decrement = () => {
  count--;
  listeners.forEach((cb) => cb());
};

export const reset = () => {
  count = 0;
  listeners.forEach((cb) => cb());
};
