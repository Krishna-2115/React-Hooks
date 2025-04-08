import { useRef, useEffect } from "react";

export default function AutoFocusModal() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto mt-10">
      <h3 className="text-lg font-bold mb-4">Auto-Focus Modal</h3>
      <input ref={inputRef} type="text" className="w-full p-2 border rounded" placeholder="Type here..." />
    </div>
  );
}
