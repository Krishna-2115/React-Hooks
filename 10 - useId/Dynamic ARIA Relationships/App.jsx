import { useId, useState } from "react";

export default function Accordion() {
  const headingId = useId();
  const panelId = useId();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 border rounded">
      <button
        aria-expanded={open}
        aria-controls={panelId}
        id={headingId}
        onClick={() => setOpen(!open)}
        className="font-semibold text-left w-full"
      >
        Accordion Header
      </button>
      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          className="mt-2"
        >
          Accordion content goes here.
        </div>
      )}
    </div>
  );
}
