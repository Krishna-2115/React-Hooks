import React, { useRef, useImperativeHandle, forwardRef } from "react";

const ScrollableSection = forwardRef((props, ref) => {
  const sectionRefs = {
    section1: useRef(null),
    section2: useRef(null),
    section3: useRef(null)
  };

  useImperativeHandle(ref, () => ({
    scrollToSection: (section) => {
      if (sectionRefs[section]?.current) {
        sectionRefs[section].current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }));

  return (
    <div style={{ height: "400px", overflowY: "auto", border: "2px solid #333", padding: "10px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", backgroundColor: "#f9f9f9" }}>
      <div ref={sectionRefs.section1} style={{ height: "250px", backgroundColor: "#3498db", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "bold", borderRadius: "6px", marginBottom: "10px" }}>Section 1</div>
      <div ref={sectionRefs.section2} style={{ height: "250px", backgroundColor: "#2ecc71", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "bold", borderRadius: "6px", marginBottom: "10px" }}>Section 2</div>
      <div ref={sectionRefs.section3} style={{ height: "250px", backgroundColor: "#e74c3c", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "bold", borderRadius: "6px" }}>Section 3</div>
    </div>
  );
});

const ParentComponent = () => {
  const scrollRef = useRef(null);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Scroll to Section</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => scrollRef.current?.scrollToSection("section1")} style={{ margin: "5px", padding: "10px 20px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>Go to Section 1</button>
        <button onClick={() => scrollRef.current?.scrollToSection("section2")} style={{ margin: "5px", padding: "10px 20px", backgroundColor: "#2ecc71", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>Go to Section 2</button>
        <button onClick={() => scrollRef.current?.scrollToSection("section3")} style={{ margin: "5px", padding: "10px 20px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>Go to Section 3</button>
      </div>
      <ScrollableSection ref={scrollRef} />
    </div>
  );
};

export default ParentComponent;