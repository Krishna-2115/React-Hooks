// src/stores/themeStore.js
let currentTheme = localStorage.getItem('theme') || 'light';

const listeners = new Set();

function notifyAll() {
  for (const listener of listeners) {
    listener();
  }
}

function getSnapshot() {
  return currentTheme;
}

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setTheme(newTheme) {
  currentTheme = newTheme;
  localStorage.setItem('theme', newTheme);
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
  notifyAll();
}

export const themeStore = {
  subscribe,
  getSnapshot,
  setTheme,
};
