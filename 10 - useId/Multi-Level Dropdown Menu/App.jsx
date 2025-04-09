import { useState, useId } from "react";

export default function MultiLevelDropdown() {
  const mainId = useId();
  const subId = useId();
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  return (
    <div className="p-4">
      <button
        id={mainId}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Main Menu
      </button>
      {open && (
        <ul role="menu" className="mt-2 bg-white border rounded shadow">
          <li className="p-2 hover:bg-gray-100">Item 1</li>
          <li className="p-2 hover:bg-gray-100">
            <button
              id={subId}
              aria-haspopup="true"
              aria-expanded={subOpen}
              onClick={() => setSubOpen(!subOpen)}
              className="w-full text-left"
            >
              Submenu
            </button>
            {subOpen && (
              <ul role="menu" className="ml-4 mt-2 bg-gray-100 rounded p-2">
                <li className="hover:bg-gray-200 p-1">Sub Item 1</li>
                <li className="hover:bg-gray-200 p-1">Sub Item 2</li>
              </ul>
            )}
          </li>
        </ul>
      )}
    </div>
  );
}
