import React, { useState } from "react";

const StatefulList = () => {
  const [items, setItems] = useState([
    { id: 1, title: "Item 1", description: "This is the description of Item 1" },
    { id: 2, title: "Item 2", description: "This is the description of Item 2" },
    { id: 3, title: "Item 3", description: "This is the description of Item 3" },
  ]);

  // Handler to update title or description for a specific item
  const handleEdit = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Handler to add a new item
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      title: "New Item",
      description: "This is a new description.",
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Editable List of Items</h2>
      <div style={styles.listContainer}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleEdit(item.id, "title", e.target.value)}
              style={styles.input}
              placeholder="Edit title"
            />
            <textarea
              value={item.description}
              onChange={(e) =>
                handleEdit(item.id, "description", e.target.value)
              }
              style={styles.textarea}
              placeholder="Edit description"
            />
          </div>
        ))}
      </div>
      <button onClick={handleAddItem} style={styles.addButton}>
        Add Item
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    background: "linear-gradient(135deg, #6e7dff, #9b3dff)",
    borderRadius: "10px",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    color: "#fff",
    marginBottom: "30px",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "600px",
  },
  card: {
    background: "#1f1f2e",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease-in-out",
  },
  input: {
    width: "96%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#111",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s",
  },
  textarea: {
    width: "96%",
    padding: "10px",
    height: "100px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#111",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.3s",
  },
  addButton: {
    padding: "12px 20px",
    background: "linear-gradient(145deg, #ff5e57, #ff3a35)",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s ease, transform 0.2s ease-in-out",
  },
};

export default StatefulList;
