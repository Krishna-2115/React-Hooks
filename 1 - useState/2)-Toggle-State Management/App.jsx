import React, { useState } from "react";

const themes = ["light", "dark", "solarized"];

const ThemeToggler = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => {
      const currentIndex = themes.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      return themes[nextIndex];
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor:
          currentTheme === "light"
            ? "#f0f0f0"
            : currentTheme === "dark"
              ? "#333"
              : "#ffebcd",
        color: currentTheme === "dark" ? "#fff" : "#000",
        borderRadius: "8px",
      }}
    >
      <h1>Current Theme: {currentTheme}</h1>
      <button onClick={toggleTheme} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeToggler;
