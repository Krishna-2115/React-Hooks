import React, { useRef, useState, useLayoutEffect } from "react";

const StickySidebarLayout = () => {
  const mainContentRef = useRef(null);
  const [sidebarHeight, setSidebarHeight] = useState("auto");

  useLayoutEffect(() => {
    const updateSidebarHeight = () => {
      if (mainContentRef.current) {
        const contentHeight = mainContentRef.current.getBoundingClientRect().height;
        setSidebarHeight(`${contentHeight}px`);
      }
    };

    updateSidebarHeight();
    window.addEventListener("resize", updateSidebarHeight);

    return () => window.removeEventListener("resize", updateSidebarHeight);
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Sticky Sidebar */}
      <div
        style={{
          position: "sticky",
          top: "10px",
          width: "250px",
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          height: sidebarHeight,
          transition: "height 0.3s ease",
        }}
      >
        <h3>Sticky Sidebar</h3>
        <p>Adjusts based on content</p>
      </div>

      {/* Main Content */}
      <div
        ref={mainContentRef}
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#ecf0f1",
          borderRadius: "10px",
        }}
      >
        <h2>Main Content</h2>
        <p>
          This is the main content area. The sidebar height will match the height of this section.
        </p>
        <p style={{ marginTop: "50px" }}>
          Scroll down to see the sidebar height adjusting dynamically as content expands.
        </p>
        <div style={{ height: "400px", backgroundColor: "#bdc3c7", marginTop: "20px" }}>
          <p>Extra content...</p>
        </div>
      </div>
    </div>
  );
};

export default StickySidebarLayout;
