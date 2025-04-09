import { useId, useState } from "react";

export default function ModalDialog() {
  const titleId = useId();
  const descId = useId();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <button onClick={() => setOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Open Modal
      </button>
      {open && (
        <div role="dialog" aria-labelledby={titleId} aria-describedby={descId} className="mt-4 p-4 border rounded shadow bg-white">
          <h2 id={titleId} className="text-xl font-bold">Modal Title</h2>
          <p id={descId} className="mt-2">This is the modal description.</p>
          <button onClick={() => setOpen(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </div>
      )}
    </div>
  );
}
