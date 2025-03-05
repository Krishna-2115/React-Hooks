import React, { useState, useRef, useLayoutEffect } from "react";

const DynamicDashboard = () => {
  const containerRef = useRef(null);
  const [gridStyle, setGridStyle] = useState({
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
  });

  useLayoutEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();

        if (width < 600) {
          setGridStyle({ gridTemplateColumns: "1fr", gridTemplateRows: "auto" });
        } else if (width < 900) {
          setGridStyle({ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto" });
        } else {
          setGridStyle({ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto" });
        }
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  return (
    <div ref={containerRef} style={{ 
      display: "grid",
      gap: "15px",
      padding: "20px",
      height: "100vh",
      ...gridStyle
    }}>
      <div style={boxStyle}>Widget 1</div>
      <div style={boxStyle}>Widget 2</div>
      <div style={boxStyle}>Widget 3</div>
      <div style={boxStyle}>Widget 4</div>
      <div style={boxStyle}>Widget 5</div>
      <div style={boxStyle}>Widget 6</div>
    </div>
  );
};

const boxStyle = {
  backgroundColor: "#3498db",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "bold",
  padding: "20px",
  borderRadius: "10px",
};

export default DynamicDashboard;
