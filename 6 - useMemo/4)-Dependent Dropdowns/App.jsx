import React, { useState, useMemo } from "react";

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  select: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    display: "block",
  },
};

const data = {
  Fruits: ["Apple", "Banana", "Mango", "Orange"],
  Vegetables: ["Carrot", "Broccoli", "Spinach", "Potato"],
  Drinks: ["Water", "Juice", "Soda", "Milk"],
};

const DependentDropdown = () => {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");

  // Memoized filtered items to prevent unnecessary recalculations
  const filteredItems = useMemo(() => {
    return category ? data[category] || [] : [];
  }, [category]);

  return (
    <div style={styles.container}>
      <h2>🔽 Dependent Dropdowns</h2>

      {/* First Dropdown */}
      <label style={styles.label}>Select Category:</label>
      <select style={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">-- Choose --</option>
        {Object.keys(data).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      {/* Second Dropdown (Dependent) */}
      {category && (
        <>
          <label style={styles.label}>Select Item:</label>
          <select style={styles.select} value={item} onChange={(e) => setItem(e.target.value)}>
            <option value="">-- Choose --</option>
            {filteredItems.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Selected Output */}
      {item && <p><strong>Selected:</strong> {category} - {item}</p>}
    </div>
  );
};

export default DependentDropdown;
