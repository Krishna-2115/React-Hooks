import { useId } from "react";

export default function UniqueFormField() {
  const id = useId();
  return (
    <div className="p-4">
      <label htmlFor={id} className="block font-semibold">Name:</label>
      <input id={id} className="border p-2 rounded w-full" />
    </div>
  );
}
