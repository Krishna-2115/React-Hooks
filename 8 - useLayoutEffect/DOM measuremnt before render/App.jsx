import React, { useState, useRef, useLayoutEffect } from "react";

const Tooltip = ({ children, text }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const parentRef = useRef(null);

  useLayoutEffect(() => {
    if (tooltipRef.current && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = parentRect.top - tooltipRect.height - 5;
      let left = parentRect.left + (parentRect.width - tooltipRect.width) / 2;

      // Ensure tooltip is within viewport
      if (top < 0) top = parentRect.bottom + 5;
      if (left < 0) left = 5;
      if (left + tooltipRect.width > window.innerWidth)
        left = window.innerWidth - tooltipRect.width - 5;

      setPosition({ top, left });
    }
  }, [text]);

  return (
    <div ref={parentRef} style={{ display: "inline-block", position: "relative" }}>
      {children}
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          background: "black",
          color: "white",
          padding: "5px 10px",
          borderRadius: "5px",
          whiteSpace: "nowrap",
          transform: "translateY(-100%)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;