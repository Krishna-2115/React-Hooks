import React, { useRef, useImperativeHandle, forwardRef, useState } from "react";

// Child Component: Resizable Panel
const ResizablePanel = forwardRef((props, ref) => {
  const [size, setSize] = useState({ width: 300, height: 200 });

  // Expose resize controls to the parent
  useImperativeHandle(ref, () => ({
    increaseWidth: () => setSize((prev) => ({ ...prev, width: prev.width + 50 })),
    decreaseWidth: () => setSize((prev) => ({ ...prev, width: Math.max(prev.width - 50, 150) })),
    increaseHeight: () => setSize((prev) => ({ ...prev, height: prev.height + 50 })),
    decreaseHeight: () => setSize((prev) => ({ ...prev, height: Math.max(prev.height - 50, 100) })),
  }));

  // Drag resizing logic
  const onMouseDown = (e, direction) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMouseMove = (event) => {
      if (direction === "horizontal") {
        setSize({ ...size, width: Math.max(startWidth + (event.clientX - startX), 150) });
      } else if (direction === "vertical") {
        setSize({ ...size, height: Math.max(startHeight + (event.clientY - startY), 100) });
      }
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div style={{ ...styles.panel, width: size.width, height: size.height }}>
      <h3 style={styles.title}>Resizable Panel</h3>
      <p>Drag the edges or use buttons to resize.</p>
      <div style={styles.resizeHandleRight} onMouseDown={(e) => onMouseDown(e, "horizontal")} />
      <div style={styles.resizeHandleBottom} onMouseDown={(e) => onMouseDown(e, "vertical")} />
    </div>
  );
});

// Parent Component: Controls the Panel Size
const ParentComponent = () => {
  const panelRef = useRef();

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Resizable Panel System</h2>
      <div style={styles.buttonContainer}>
        <button onClick={() => panelRef.current.increaseWidth()} style={styles.button}>⬅ Expand Width</button>
        <button onClick={() => panelRef.current.decreaseWidth()} style={styles.button}>➡ Shrink Width</button>
        <button onClick={() => panelRef.current.increaseHeight()} style={styles.button}>⬆ Expand Height</button>
        <button onClick={() => panelRef.current.decreaseHeight()} style={styles.button}>⬇ Shrink Height</button>
      </div>
      <ResizablePanel ref={panelRef} />
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#ecf0f1",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  header: {
    fontSize: "22px",
    color: "#2c3e50",
    marginBottom: "15px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "15px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  panel: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    overflow: "hidden",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#34495e",
  },
  resizeHandleRight: {
    position: "absolute",
    top: "50%",
    right: "-5px",
    width: "10px",
    height: "50px",
    backgroundColor: "#2980b9",
    cursor: "ew-resize",
    borderRadius: "5px",
    transform: "translateY(-50%)",
  },
  resizeHandleBottom: {
    position: "absolute",
    left: "50%",
    bottom: "-5px",
    width: "50px",
    height: "10px",
    backgroundColor: "#e67e22",
    cursor: "ns-resize",
    borderRadius: "5px",
    transform: "translateX(-50%)",
  },
};

export default ParentComponent;
