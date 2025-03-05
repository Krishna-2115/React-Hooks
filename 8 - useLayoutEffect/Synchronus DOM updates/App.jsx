import React, { useState, useRef, useLayoutEffect } from "react";

const Grid = ({ rows = 3, cols = 3 }) => {
  const [cellSize, setCellSize] = useState(100);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const updateCellSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const newSize = Math.min(width / cols, height / rows);
        setCellSize(newSize);
      }
    };

    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, [rows, cols]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        width: "100%",
        height: "100vh",
        border: "2px solid black",
      }}
    >
      {Array.from({ length: rows * cols }).map((_, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid gray",
            background: "lightblue",
          }}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Grid;
