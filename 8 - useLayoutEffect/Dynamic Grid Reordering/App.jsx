import React, { useState, useRef, useLayoutEffect } from "react";

const DynamicGrid = () => {
  const containerRef = useRef(null);
  const [columns, setColumns] = useState(3); // Default columns

  useLayoutEffect(() => {
    const updateGrid = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;

        if (width < 500) {
          setColumns(1); // 1 column for small screens
        } else if (width < 800) {
          setColumns(2); // 2 columns for medium screens
        } else {
          setColumns(3); // 3 columns for large screens
        }
      }
    };

    updateGrid(); // Run on mount
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "15px",
        padding: "20px",
        transition: "grid-template-columns 0.3s ease",
      }}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} style={gridItemStyle}>
          Item {i + 1}
        </div>
      ))}
    </div>
  );
};

const gridItemStyle = {
  backgroundColor: "#3498db",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "20px",
  borderRadius: "10px",
};

export default DynamicGrid;
