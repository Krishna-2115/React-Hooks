import { useRef, useState } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  const start = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-64 text-center space-y-4">
      <h2 className="text-xl font-semibold">Stopwatch</h2>
      <p className="text-3xl font-mono">{time}s</p>
      <div className="flex justify-center gap-2">
        <button onClick={start} className="bg-blue-500 text-white px-4 py-1 rounded">Start</button>
        <button onClick={stop} className="bg-red-500 text-white px-4 py-1 rounded">Stop</button>
        <button onClick={reset} className="bg-gray-500 text-white px-4 py-1 rounded">Reset</button>
      </div>
    </div>
  );
}
