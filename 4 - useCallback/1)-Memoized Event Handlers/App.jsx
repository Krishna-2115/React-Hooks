import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const List = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build an App" },
    { id: 3, text: "Optimize Performance" },
  ]);
  const [newTask, setNewTask] = useState("");

  const handleAdd = useCallback(() => {
    if (newTask.trim() === "") return;
    setItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), text: newTask.trim() },
    ]);
    setNewTask("");
  }, [newTask]);

  const handleDelete = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const handleEdit = useCallback((id, newText) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  }, []);

  // Inline styles for components
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      background: "linear-gradient(135deg, #f7fafc, #e2e8f0)",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#2d3748",
      marginBottom: "20px",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },
    input: {
      flex: 1,
      padding: "10px",
      border: "1px solid #cbd5e0",
      borderRadius: "8px",
      marginRight: "10px",
      fontSize: "14px",
    },
    addButton: {
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "500",
      backgroundColor: "#38a169",
      color: "white",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    addButtonHover: {
      backgroundColor: "#2f855a",
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      marginBottom: "10px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    listItemHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
    button: {
      padding: "8px 12px",
      fontSize: "14px",
      fontWeight: "500",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s, color 0.2s",
    },
    editButton: {
      backgroundColor: "#3182ce",
      color: "white",
    },
    editButtonHover: {
      backgroundColor: "#2b6cb0",
    },
    deleteButton: {
      backgroundColor: "#e53e3e",
      color: "white",
    },
    deleteButtonHover: {
      backgroundColor: "#c53030",
    },
    emptyMessage: {
      color: "#718096",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Task Manager</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          style={styles.input}
        />
        <button
          onClick={handleAdd}
          style={styles.addButton}
          onMouseOver={(e) =>
            Object.assign(e.target.style, styles.addButtonHover)
          }
          onMouseOut={(e) => Object.assign(e.target.style, styles.addButton)}
        >
          Add Task
        </button>
      </div>
      <AnimatePresence>
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
            styles={styles}
          />
        ))}
      </AnimatePresence>
      {items.length === 0 && (
        <p style={styles.emptyMessage}>
          Your task list is empty. Add some tasks to get started.
        </p>
      )}
    </div>
  );
};

const ListItem = React.memo(({ item, onDelete, onEdit, styles }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);

  const handleSave = () => {
    onEdit(item.id, editText);
    setIsEditing(false);
  };

  return (
    <motion.div
      style={styles.listItem}
      whileHover={styles.listItemHover}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={styles.input}
        />
      ) : (
        <span>{item.text}</span>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        {isEditing ? (
          <button
            onClick={handleSave}
            style={{
              ...styles.button,
              ...styles.editButton,
            }}
            onMouseOver={(e) =>
              Object.assign(e.target.style, styles.editButtonHover)
            }
            onMouseOut={(e) =>
              Object.assign(e.target.style, styles.editButton)
            }
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              ...styles.button,
              ...styles.editButton,
            }}
            onMouseOver={(e) =>
              Object.assign(e.target.style, styles.editButtonHover)
            }
            onMouseOut={(e) =>
              Object.assign(e.target.style, styles.editButton)
            }
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(item.id)}
          style={{
            ...styles.button,
            ...styles.deleteButton,
          }}
          onMouseOver={(e) =>
            Object.assign(e.target.style, styles.deleteButtonHover)
          }
          onMouseOut={(e) =>
            Object.assign(e.target.style, styles.deleteButton)
          }
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
});

export default List;
