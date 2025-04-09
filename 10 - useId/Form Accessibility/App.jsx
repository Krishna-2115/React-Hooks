import { useId } from "react";

export default function AccessibleForm() {
  const nameId = useId();
  const emailId = useId();

  return (
    <form className="p-4 space-y-4">
      <div>
        <label htmlFor={nameId} className="block font-medium">Name</label>
        <input id={nameId} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label htmlFor={emailId} className="block font-medium">Email</label>
        <input id={emailId} className="w-full border p-2 rounded" />
      </div>
    </form>
  );
}
