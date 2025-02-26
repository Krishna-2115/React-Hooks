import React, { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Set up the interval that updates the counter every second
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // Cleanup interval on component unmount or reset
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once

  const handleReset = () => {
    // Reset counter to 0 when the button is clicked
    setCount(0);
  };

  return (
    <div style={{ textAlign: "center", fontSize: "30px", padding: "50px", fontFamily: "Arial" }}>
      <h2>Counter: {count}</h2>
      <button
        onClick={handleReset}
        style={{
          padding: "10px 20px",
          fontSize: "30px",
          backgroundColor: "#ff5555",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
