import React, { useState, useCallback } from "react";

const ExpensiveSorting = () => {
  const [names, setNames] = useState([
    "Alex",
    "Benjamin",
    "Christopher",
    "Daniel",
    "Ella",
    "Fiona",
    "George",
  ]);
  const [sortType, setSortType] = useState("alphabetical");
  const [sortedNames, setSortedNames] = useState([]);

  // Expensive sorting function
  const sortNames = useCallback(() => {
    console.log("Performing expensive sorting...");
    const sorted =
      sortType === "alphabetical"
        ? [...names].sort((a, b) => a.localeCompare(b)) // Alphabetical sorting
        : [...names].sort((a, b) => a.length - b.length); // Sorting by length
    setSortedNames(sorted);
  }, [names, sortType]);

  // Inline styles for improved UI
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "50px auto",
      padding: "20px",
      background: "linear-gradient(135deg, #ffffff, #f0f4f8)",
      borderRadius: "16px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#2d3748",
      textAlign: "center",
    },
    button: {
      marginTop: "20px",
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
    buttonHover: {
      backgroundColor: "#225b9e",
    },
    sortOptions: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "20px",
    },
    radioLabel: {
      fontSize: "16px",
      color: "#4a5568",
      cursor: "pointer",
    },
    listContainer: {
      marginTop: "30px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    },
    listBox: {
      padding: "15px",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      backgroundColor: "#f7fafc",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    },
    listTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#2d3748",
    },
    listItem: {
      fontSize: "16px",
      color: "#4a5568",
      lineHeight: "1.6",
    },
    emptyMessage: {
      fontSize: "16px",
      color: "#718096",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Enhanced Sorting </h1>
      <div style={styles.sortOptions}>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            name="sortType"
            value="alphabetical"
            checked={sortType === "alphabetical"}
            onChange={(e) => setSortType(e.target.value)}
            style={{ marginRight: "8px" }}
          />
          Sort Alphabetically
        </label>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            name="sortType"
            value="length"
            checked={sortType === "length"}
            onChange={(e) => setSortType(e.target.value)}
            style={{ marginRight: "8px" }}
          />
          Sort by Length
        </label>
      </div>
      <button
        onClick={sortNames}
        style={styles.button}
        onMouseOver={(e) =>
          Object.assign(e.target.style, styles.buttonHover)
        }
        onMouseOut={(e) =>
          Object.assign(e.target.style, styles.button)
        }
      >
        Sort Names
      </button>
      <div style={styles.listContainer}>
        <div style={styles.listBox}>
          <h3 style={styles.listTitle}>Original Names</h3>
          <ul>
            {names.map((name, index) => (
              <li key={index} style={styles.listItem}>
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.listBox}>
          <h3 style={styles.listTitle}>Sorted Names</h3>
          {sortedNames.length > 0 ? (
            <ul>
              {sortedNames.map((name, index) => (
                <li key={index} style={styles.listItem}>
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.emptyMessage}>
              No sorted names yet. Click the button to sort.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpensiveSorting;
