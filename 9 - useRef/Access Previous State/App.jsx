import { useState, useEffect, useRef } from "react";

export default function PreviousCounter() {
  const [count, setCount] = useState(0);
  const prevRef = useRef();

  useEffect(() => {
    prevRef.current = count;
  }, [count]);

  return (
    <div className="p-6 bg-white rounded shadow text-center space-y-2">
      <h2 className="text-xl font-bold">Previous State</h2>
      <p>Current: {count}</p>
      <p>Previous: {prevRef.current}</p>
      <button onClick={() => setCount(count + 1)} className="bg-blue-600 text-white px-4 py-1 rounded">Increment</button>
    </div>
  );
}
