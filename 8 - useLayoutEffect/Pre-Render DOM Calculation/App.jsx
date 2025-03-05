import React, { useState, useRef, useLayoutEffect } from "react";

const Tooltip = ({ targetRef, text }) => {
  const tooltipRef = useRef(null);
  const [style, setStyle] = useState({ opacity: 0 });

  useLayoutEffect(() => {
    if (targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      let top = targetRect.top - tooltipRect.height - 8; // Position above target
      let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;

      // Prevent tooltip from going outside viewport
      if (top < 0) top = targetRect.bottom + 8; // Move below if out of bounds
      if (left < 0) left = 8; // Adjust if overflowing left
      if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 8; // Adjust if overflowing right
      }

      setStyle({ top, left, opacity: 1 });
    }
  }, []);

  return (
    <div
      ref={tooltipRef}
      style={{
        position: "absolute",
        backgroundColor: "black",
        color: "white",
        padding: "8px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
        transform: "translateY(-4px)",
        transition: "opacity 0.2s ease-in-out",
        pointerEvents: "none",
        ...style,
      }}
    >
      {text}
    </div>
  );
};

const TooltipExample = () => {
  const buttonRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{ position: "relative", padding: "50px", textAlign: "center" }}>
      <button
        ref={buttonRef}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          border: "none",
          backgroundColor: "#3498db",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Hover Me
      </button>
      {showTooltip && <Tooltip targetRef={buttonRef} text="This is a tooltip!" />}
    </div>
  );
};

export default TooltipExample;
