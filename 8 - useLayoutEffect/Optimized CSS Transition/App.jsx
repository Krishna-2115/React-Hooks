import React, { useState, useRef, useLayoutEffect } from "react";
import "./CardFlip.css"; // Import the styles

const CardFlip = () => {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    if (cardRef.current) {
      // Forces a reflow to ensure the CSS transition is applied correctly
      cardRef.current.style.willChange = "transform";
    }
  }, []);

  return (
    <div
      className={`card-container ${flipped ? "flipped" : ""}`}
      ref={cardRef}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <div className="card">
        <div className="card-front">Front Side</div>
        <div className="card-back">Back Side</div>
      </div>
    </div>
  );
};

export default CardFlip;
