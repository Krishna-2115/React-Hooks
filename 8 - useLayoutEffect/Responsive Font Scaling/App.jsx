import React, { useState, useRef, useLayoutEffect } from "react";

const ResponsiveText = ({ text }) => {
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(16); // Default font size

  useLayoutEffect(() => {
    const updateFontSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setFontSize(Math.max(16, width / 20)); // Scale font size based on width
      }
    };

    updateFontSize(); // Adjust on mount
    window.addEventListener("resize", updateFontSize);

    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "600px",
        padding: "20px",
        border: "2px solid #3498db",
        textAlign: "center",
        fontSize: `${fontSize}px`,
        transition: "font-size 0.2s ease-in-out",
      }}
    >
      {text}
    </div>
  );
};

const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <ResponsiveText text="Dynamic Font Scaling!" />
    </div>
  );
};

export default App;
