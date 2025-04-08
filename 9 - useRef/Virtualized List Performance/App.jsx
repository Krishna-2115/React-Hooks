import { useRef, useState } from "react";

export default function VirtualizedList() {
  const containerRef = useRef(null);
  const [start, setStart] = useState(0);

  const itemHeight = 40;
  const visibleCount = 10;
  const totalItems = 1000;

  const items = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const newStart = Math.floor(scrollTop / itemHeight);
    setStart(newStart);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Virtualized List</h2>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-96 overflow-y-scroll border rounded"
      >
        <div style={{ height: `${totalItems * itemHeight}px`, position: "relative" }}>
          {items.slice(start, start + visibleCount).map((item, i) => (
            <div
              key={start + i}
              style={{
                position: "absolute",
                top: `${(start + i) * itemHeight}px`,
                height: `${itemHeight}px`,
              }}
              className="w-full px-4 py-2 bg-gray-50 border-b"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
