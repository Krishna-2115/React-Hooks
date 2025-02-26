import React, { useState, useEffect, useCallback } from "react";

const GameControls = () => {
  // Initial player position
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [score, setScore] = useState(0);

  // Movement speed
  const speed = 10;

  // Memoize the handleMove function to prevent re-renders
  const handleMove = useCallback(
    (e) => {
      if (isGamePaused) return; // Prevent movement if the game is paused
      if (e.key === "ArrowUp") {
        setPosition((prev) => {
          const newY = prev.y - speed < 0 ? 0 : prev.y - speed; // Prevent going above screen
          return { ...prev, y: newY };
        });
        setScore((prev) => prev + 1); // Increase score as player moves
      } else if (e.key === "ArrowDown") {
        setPosition((prev) => {
          const newY = prev.y + speed > window.innerHeight - 50 ? window.innerHeight - 50 : prev.y + speed; // Prevent going below screen
          return { ...prev, y: newY };
        });
        setScore((prev) => prev + 1); // Increase score
      } else if (e.key === "ArrowLeft") {
        setPosition((prev) => {
          const newX = prev.x - speed < 0 ? 0 : prev.x - speed; // Prevent going left of screen
          return { ...prev, x: newX };
        });
        setScore((prev) => prev + 1); // Increase score
      } else if (e.key === "ArrowRight") {
        setPosition((prev) => {
          const newX = prev.x + speed > window.innerWidth - 50 ? window.innerWidth - 50 : prev.x + speed; // Prevent going right of screen
          return { ...prev, x: newX };
        });
        setScore((prev) => prev + 1); // Increase score
      }
    },
    [isGamePaused, speed]
  );

  // Set up keyboard event listener on mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener("keydown", handleMove);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleMove);
    };
  }, [handleMove]);

  // Handle game pause and resume
  const handlePauseResume = () => {
    setIsGamePaused((prev) => !prev);
  };

  // Handle game reset
  const handleReset = () => {
    setPosition({ x: 100, y: 100 });
    setScore(0);
    setIsGamePaused(false);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "90vw",
        height: "90vh",
        background: "linear-gradient(to bottom right, #2c3e50, #34495e)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        color: "#fff",
        fontFamily: "'Press Start 2P', cursive", // Retro gaming font
        marginLeft:"60px"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: "50px",
          height: "50px",
          backgroundColor: "#FF6347",
          borderRadius: "50%",
          transition: "top 0.1s ease, left 0.1s ease",
          boxShadow: "0px 0px 15px rgba(255, 99, 71, 0.8)", // Glow effect
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Score: {score}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "20px",
        }}
      >
        <button
          onClick={handlePauseResume}
          style={{
            padding: "10px 20px",
            backgroundColor: isGamePaused ? "#FF6347" : "#1abc9c",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {isGamePaused ? "Resume" : "Pause"}
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Reset
        </button>
      </div>

      {isGamePaused && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "40px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Game Paused
        </div>
      )}
    </div>
  );
};

export default GameControls;
