import { useId, useState } from "react";

export default function AccessibleDropdown() {
  const labelId = useId();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <button
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        <span id={labelId}>Choose an option</span>
      </button>
      {open && (
        <ul role="listbox" className="mt-2 border rounded bg-white">
          <li className="p-2 hover:bg-blue-100">Option 1</li>
          <li className="p-2 hover:bg-blue-100">Option 2</li>
        </ul>
      )}
    </div>
  );
}
