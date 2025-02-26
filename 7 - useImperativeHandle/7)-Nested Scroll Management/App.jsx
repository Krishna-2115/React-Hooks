import React, { useRef, useImperativeHandle, forwardRef } from "react";

// Child Component: Scrollable Nested Areas
const NestedScrollComponent = forwardRef((props, ref) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  // Exposing methods to control scrolling
  useImperativeHandle(ref, () => ({
    scrollOuterToTop: () => outerRef.current?.scrollTo({ top: 0, behavior: "smooth" }),
    scrollOuterToBottom: () => outerRef.current?.scrollTo({ top: outerRef.current.scrollHeight, behavior: "smooth" }),
    scrollInnerToTop: () => innerRef.current?.scrollTo({ top: 0, behavior: "smooth" }),
    scrollInnerToBottom: () => innerRef.current?.scrollTo({ top: innerRef.current.scrollHeight, behavior: "smooth" }),
  }));

  return (
    <div ref={outerRef} style={styles.outerContainer}>
      <h3 style={styles.header}>Outer Scrollable Area</h3>
      <p style={styles.content}>This is the outer scrollable area. Scroll inside!</p>
      <div ref={innerRef} style={styles.innerContainer}>
        <h4 style={styles.innerHeader}>Inner Scrollable Area</h4>
        <p style={styles.content}>Nested scrolling works here too.</p>
        {[...Array(10)].map((_, i) => (
          <p key={i} style={styles.content}>Inner Content {i + 1}</p>
        ))}
      </div>
      {[...Array(10)].map((_, i) => (
        <p key={i + 10} style={styles.content}>Outer Content {i + 1}</p>
      ))}
    </div>
  );
});

// Parent Component: Controls Nested Scroll Behavior
const ParentComponent = () => {
  const nestedScrollRef = useRef();

  return (
    <div style={styles.container}>
      <h2 style={styles.mainHeader}>Nested Scroll Management</h2>
      <div style={styles.buttonContainer}>
        <button onClick={() => nestedScrollRef.current.scrollOuterToTop()} style={styles.button}>⬆ Scroll Outer Top</button>
        <button onClick={() => nestedScrollRef.current.scrollOuterToBottom()} style={styles.button}>⬇ Scroll Outer Bottom</button>
        <button onClick={() => nestedScrollRef.current.scrollInnerToTop()} style={styles.innerButton}>⬆ Scroll Inner Top</button>
        <button onClick={() => nestedScrollRef.current.scrollInnerToBottom()} style={styles.innerButton}>⬇ Scroll Inner Bottom</button>
      </div>
      <NestedScrollComponent ref={nestedScrollRef} />
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
  mainHeader: {
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
  innerButton: {
    padding: "10px 15px",
    backgroundColor: "#e67e22",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  outerContainer: {
    width: "100%",
    height: "300px",
    overflowY: "auto",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#34495e",
  },
  content: {
    fontSize: "14px",
    color: "#555",
    padding: "5px 0",
  },
  innerContainer: {
    height: "150px",
    overflowY: "auto",
    backgroundColor: "#f8f9fa",
    padding: "10px",
    borderRadius: "8px",
    margin: "10px 0",
    border: "1px solid #ddd",
  },
  innerHeader: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#2c3e50",
  },
};

export default ParentComponent;
