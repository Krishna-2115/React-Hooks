import React, { useState, useRef, useLayoutEffect } from "react";

const DynamicStyledBox = () => {
  const containerRef = useRef(null);
  const [styles, setStyles] = useState({ fontSize: "16px", padding: "10px" });

  useLayoutEffect(() => {
    const updateStyles = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setStyles({
          fontSize: `${Math.max(16, width * 0.05)}px`,
          padding: `${Math.max(10, height * 0.05)}px`,
        });
      }
    };

    updateStyles();
    window.addEventListener("resize", updateStyles);
    return () => window.removeEventListener("resize", updateStyles);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "50vw", height: "30vh", border: "2px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={styles}>Dynamic Styled Text</p>
    </div>
  );
};

export default DynamicStyledBox;
