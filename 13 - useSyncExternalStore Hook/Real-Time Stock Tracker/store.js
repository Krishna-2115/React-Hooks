// store.js
let stockPrice = 100;
let listeners = [];

function subscribe(callback) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter(listener => listener !== callback);
  };
}

function getSnapshot() {
  return stockPrice;
}

function updatePrice() {
  stockPrice = +(stockPrice + (Math.random() * 4 - 2)).toFixed(2);
  listeners.forEach(listener => listener());
}

setInterval(updatePrice, 1000);

export { subscribe, getSnapshot };
