import { useRef, useEffect } from "react";

export default function ScrollTracker() {
  const boxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      console.log("ScrollTop:", boxRef.current.scrollTop);
    };

    const ref = boxRef.current;
    ref.addEventListener("scroll", handleScroll);

    return () => ref.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={boxRef} className="h-40 overflow-y-scroll border p-4 rounded shadow bg-gray-100">
      {[...Array(20)].map((_, i) => (
        <p key={i}>Item {i + 1}</p>
      ))}
    </div>
  );
}
