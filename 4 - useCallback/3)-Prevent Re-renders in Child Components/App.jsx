import React, { useState, useCallback } from "react";

// Child component
const NameList = React.memo(({ names, onFilterChange }) => {
  console.log("Child re-rendered");
  return (
    <div style={styles.childContainer}>
      <h3 style={styles.heading}>Filter Names</h3>
      <input
        type="text"
        placeholder="Type to filter..."
        onChange={(e) => onFilterChange(e.target.value)}
        style={styles.input}
      />
      <ul style={styles.list}>
        {names.map((name, index) => (
          <li key={index} style={styles.listItem}>
            {name}
          </li>
        ))}
      </ul>
      {names.length === 0 && (
        <p style={styles.emptyMessage}>No names match your filter.</p>
      )}
    </div>
  );
});

// Parent component
const Parent = () => {
  const [names, setNames] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  // Memoized callback to prevent unnecessary re-renders
  const handleFilterChange = useCallback((value) => {
    setFilter(value);
  }, []);

  const handleAddName = () => {
    const newName = prompt("Enter a new name:");
    if (newName) setNames((prevNames) => [...prevNames, newName]);
  };

  console.log("Parent re-rendered");

  return (
    <div style={styles.parentContainer}>
      <h2 style={styles.heading}>Dynamic Name List</h2>
      <button style={styles.button} onClick={handleAddName}>
        Add Name
      </button>
      <NameList names={filteredNames} onFilterChange={handleFilterChange} />
    </div>
  );
};

// Inline styles for enhanced UI
const styles = {
  parentContainer: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #ffffff, #f9fafb)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2d3748",
  },
  childContainer: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#edf2f7",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  button: {
    marginTop: "10px",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#3182ce",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #cbd5e0",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    padding: "8px",
    fontSize: "16px",
    borderBottom: "1px solid #e2e8f0",
  },
  emptyMessage: {
    fontSize: "16px",
    color: "#718096",
    marginTop: "10px",
  },
};

export default Parent;
