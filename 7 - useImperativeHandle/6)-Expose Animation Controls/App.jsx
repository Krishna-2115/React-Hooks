import React, { useRef, useState, useImperativeHandle, forwardRef } from "react";

// Child Component: Modal with Advanced Animation Controls
const AnimatedModal = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationState, setAnimationState] = useState("running");
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // Open & Close Modal
  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  // Animation Controls
  const startAnimation = () => setAnimationState("running");
  const stopAnimation = () => setAnimationState("paused");
  const speedUp = () => setAnimationSpeed((prev) => Math.min(prev + 0.5, 3));
  const slowDown = () => setAnimationSpeed((prev) => Math.max(prev - 0.5, 0.5));

  // Expose functions to the parent
  useImperativeHandle(ref, () => ({
    openModal,
  }));

  if (!isVisible) return null;

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, animation: "fadeIn 0.3s ease-out" }}>
        <div
          style={{
            ...styles.box,
            animationPlayState: animationState,
            animationDuration: `${1 / animationSpeed}s`,
          }}
        />
        <div style={styles.controlPanel}>
          <button onClick={startAnimation} style={styles.button}>▶ Start</button>
          <button onClick={stopAnimation} style={styles.button}>⏸ Pause</button>
          <button onClick={speedUp} style={styles.speedButton}>⏩ Speed Up</button>
          <button onClick={slowDown} style={styles.slowButton}>⏪ Slow Down</button>
        </div>
        <button onClick={closeModal} style={styles.closeButton}>✖ Close</button>
      </div>
    </div>
  );
});

// Parent Component
const ParentComponent = () => {
  const modalRef = useRef();

  return (
    <div style={styles.container}>
      <button onClick={() => modalRef.current.openModal()} style={styles.openButton}>Open Modal</button>
      <AnimatedModal ref={modalRef} />
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
    maxWidth: "500px",
    margin: "0 auto",
  },
  openButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "12px 18px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "0.3s",
  },
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  },
  box: {
    width: "50px",
    height: "50px",
    backgroundColor: "#3498db",
    borderRadius: "5px",
    margin: "10px auto",
    animation: "bounce 1s infinite alternate",
  },
  closeButton: {
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  controlPanel: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  speedButton: {
    backgroundColor: "#f39c12",
    color: "#fff",
    padding: "10px 15px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
    margin: "5px",
  },
  slowButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "10px 15px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
    margin: "5px",
  },
};

// Add keyframe animations dynamically
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes bounce {
    from { transform: translateY(0); }
    to { transform: translateY(-20px); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
`, styleSheet.cssRules.length);

export default ParentComponent;
