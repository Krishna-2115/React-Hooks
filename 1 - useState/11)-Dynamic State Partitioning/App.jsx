import React, { useState } from "react";

const TaskManager = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Personal", tasks: ["Buy groceries", "Read a book"] },
    { id: 2, name: "Work", tasks: ["Complete project", "Email client"] },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [newTask, setNewTask] = useState({ text: "", categoryId: null });

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        { id: Date.now(), name: newCategory, tasks: [] },
      ]);
      setNewCategory("");
    }
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const addTask = () => {
    if (newTask.text.trim() && newTask.categoryId) {
      setCategories(
        categories.map((category) =>
          category.id === newTask.categoryId
            ? { ...category, tasks: [...category.tasks, newTask.text] }
            : category
        )
      );
      setNewTask({ text: "", categoryId: null });
    }
  };

  const deleteTask = (categoryId, taskIndex) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
            ...category,
            tasks: category.tasks.filter((_, index) => index !== taskIndex),
          }
          : category
      )
    );
  };

  const moveTask = (fromCategoryId, toCategoryId, taskIndex) => {
    const taskToMove = categories
      .find((category) => category.id === fromCategoryId)
      ?.tasks[taskIndex];
    if (taskToMove) {
      setCategories(
        categories.map((category) => {
          if (category.id === fromCategoryId) {
            return {
              ...category,
              tasks: category.tasks.filter((_, index) => index !== taskIndex),
            };
          }
          if (category.id === toCategoryId) {
            return {
              ...category,
              tasks: [...category.tasks, taskToMove],
            };
          }
          return category;
        })
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.addSection}>
        <input
          style={styles.input}
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
        />
        <button style={styles.button} onClick={addCategory}>
          Add Category
        </button>
      </div>
      <div style={styles.addSection}>
        <input
          style={styles.input}
          value={newTask.text}
          onChange={(e) =>
            setNewTask({ ...newTask, text: e.target.value })
          }
          placeholder="New Task"
        />
        <select
          style={styles.select}
          value={newTask.categoryId || ""}
          onChange={(e) =>
            setNewTask({ ...newTask, categoryId: Number(e.target.value) })
          }
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button style={styles.button} onClick={addTask}>
          Add Task
        </button>
      </div>
      <div style={styles.categories}>
        {categories.map((category) => (
          <div key={category.id} style={styles.category}>
            <div style={styles.categoryHeader}>
              <h3 style={styles.categoryTitle}>{category.name}</h3>
              <button
                style={styles.deleteButton}
                onClick={() => deleteCategory(category.id)}
              >
                Delete
              </button>
            </div>
            <ul style={styles.taskList}>
              {category.tasks.map((task, index) => (
                <li key={index} style={styles.task}>
                  <span>{task}</span>
                  <div>
                    <select
                      style={styles.select}
                      value=""
                      onChange={(e) =>
                        moveTask(
                          category.id,
                          Number(e.target.value),
                          index
                        )
                      }
                    >
                      <option value="" disabled>
                        Move to
                      </option>
                      {categories
                        .filter((cat) => cat.id !== category.id)
                        .map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteTask(category.id, index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f9",
  },
  addSection: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    flex: 1,
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#1E90FF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#4682B4",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  categories: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  category: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  categoryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  categoryTitle: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "20px",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#FF4500",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginLeft:"5px"
  },
  taskList: {
    listStyleType: "none",
    padding: 0,
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
};

export default TaskManager;
