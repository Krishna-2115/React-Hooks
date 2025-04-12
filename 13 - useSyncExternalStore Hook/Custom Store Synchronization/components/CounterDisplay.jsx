// components/CounterDisplay.jsx
import { useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../store';

const CounterDisplay = () => {
  const count = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <div className="text-center mt-4 text-3xl font-bold text-blue-600">
      Current Count: {count}
    </div>
  );
};

export default CounterDisplay;
