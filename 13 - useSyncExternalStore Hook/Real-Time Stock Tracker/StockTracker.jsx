import { useSyncExternalStore } from 'react';
import { subscribe, getSnapshot } from './store';

export default function StockTracker() {
  const price = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Real-Time Stock Tracker 📈</h1>
      <div className="bg-green-500 p-8 rounded-lg shadow-lg text-4xl font-mono">
        ${price}
      </div>
    </div>
  );
}
