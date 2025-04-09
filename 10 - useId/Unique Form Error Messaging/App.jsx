import { useId, useState } from "react";

export default function FormWithError() {
  const inputId = useId();
  const errorId = useId();
  const [error, setError] = useState("Name is required.");

  return (
    <div className="p-4">
      <label htmlFor={inputId} className="block font-semibold">Name:</label>
      <input
        id={inputId}
        aria-describedby={errorId}
        className="border p-2 rounded w-full"
      />
      {error && (
        <p id={errorId} className="text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
