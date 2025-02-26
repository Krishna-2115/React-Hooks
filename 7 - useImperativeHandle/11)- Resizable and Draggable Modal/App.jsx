import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";

// Resizable and Draggable Modal Component
const ResizableDraggableModal = forwardRef((props, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [modalStyle, setModalStyle] = useState({
    width: 400,
    height: 300,
    top: 100,
    left: 100,
  });

  const modalRef = useRef(null);
  const initialPosition = useRef({ top: 0, left: 0 });
  const initialSize = useRef({ width: 0, height: 0 });

  // Exposing methods to the parent component
  useImperativeHandle(ref, () => ({
    setWidth: (width) => {
      setModalStyle((prevStyle) => ({ ...prevStyle, width }));
    },
    setHeight: (height) => {
      setModalStyle((prevStyle) => ({ ...prevStyle, height }));
    },
    setPosition: (top, left) => {
      setModalStyle((prevStyle) => ({ ...prevStyle, top, left }));
    },
    resetModal: () => {
      setModalStyle({ width: 400, height: 300, top: 100, left: 100 });
    },
  }));

  // Handle dragging
  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    initialPosition.current = { top: e.clientY - modalStyle.top, left: e.clientX - modalStyle.left };
  };

  const onDrag = (e) => {
    if (isDragging) {
      setModalStyle((prevStyle) => ({
        ...prevStyle,
        top: e.clientY - initialPosition.current.top,
        left: e.clientX - initialPosition.current.left,
      }));
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  // Handle resizing
  const startResize = (e) => {
    e.preventDefault();
    setIsResizing(true);
    initialSize.current = { width: modalStyle.width, height: modalStyle.height };
  };

  const onResize = (e) => {
    if (isResizing) {
      const newWidth = initialSize.current.width + (e.clientX - e.clientX);
      const newHeight = initialSize.current.height + (e.clientY - e.clientY);
      setModalStyle((prevStyle) => ({
        ...prevStyle,
        width: newWidth > 200 ? newWidth : 200,
        height: newHeight > 150 ? newHeight : 150,
      }));
    }
  };

  const stopResize = () => {
    setIsResizing(false);
  };

  return (
    <div
      ref={modalRef}
      style={{
        ...modalStyle,
        position: "absolute",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        cursor: isDragging ? "grabbing" : "pointer",
      }}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onMouseDown={startDrag}
    >
      <div
        style={{
          cursor: "move",
          padding: "10px",
          backgroundColor: "#3498db",
          color: "#fff",
          borderRadius: "8px 8px 0 0",
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        Draggable Modal
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>Content of the modal goes here.</p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "5px",
          right: "5px",
          cursor: "se-resize",
        }}
        onMouseDown={startResize}
      >
        <div style={{ width: "20px", height: "20px", backgroundColor: "#3498db" }} />
      </div>
    </div>
  );
});

// Parent Component
const ParentComponent = () => {
  const modalRef = useRef();

  return (
    <div style={styles.container}>
      <h2 style={styles.mainHeader}>Resizable & Draggable Modal</h2>
      <div style={styles.controlPanel}>
        <button onClick={() => modalRef.current.setWidth(600)} style={styles.controlButton}>
          Set Width to 600px
        </button>
        <button onClick={() => modalRef.current.setHeight(500)} style={styles.controlButton}>
          Set Height to 500px
        </button>
        <button onClick={() => modalRef.current.setPosition(200, 200)} style={styles.controlButton}>
          Set Position to (200, 200)
        </button>
        <button onClick={() => modalRef.current.resetModal()} style={styles.controlButton}>
          Reset Modal
        </button>
      </div>
      <ResizableDraggableModal ref={modalRef} />
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  mainHeader: {
    fontSize: "24px",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  controlPanel: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  controlButton: {
    padding: "12px 25px",
    backgroundColor: "#e67e22",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default ParentComponent;
