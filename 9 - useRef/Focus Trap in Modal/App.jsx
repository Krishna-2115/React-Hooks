import { useRef, useEffect } from "react";

export default function FocusTrapModal() {
  const firstRef = useRef();
  const lastRef = useRef();

  useEffect(() => {
    const trap = e => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstRef.current) {
            e.preventDefault();
            lastRef.current.focus();
          }
        } else {
          if (document.activeElement === lastRef.current) {
            e.preventDefault();
            firstRef.current.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, []);

  return (
    <div className="p-4 border rounded shadow w-80 mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-2">Focus Trap Modal</h2>
      <input ref={firstRef} type="text" placeholder="First" className="w-full p-2 mb-2 border rounded" />
      <input type="text" placeholder="Middle" className="w-full p-2 mb-2 border rounded" />
      <input ref={lastRef} type="text" placeholder="Last" className="w-full p-2 border rounded" />
    </div>
  );
}
