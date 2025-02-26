import React, { useState } from "react";

const Spreadsheet = () => {
  const rows = 5;
  const cols = 5; 

  const createEmptyGrid = () => {
    return Array.from({ length: rows }, () => Array(cols).fill(""));
  };

  const [grid, setGrid] = useState(createEmptyGrid());
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const updateCell = (row, col, value) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row && colIndex === col ? value : c))
    );


    setUndoStack([...undoStack, grid]);
    setRedoStack([]); 

    setGrid(newGrid);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1];
      setRedoStack([grid, ...redoStack]);
      setGrid(lastState);
      setUndoStack(undoStack.slice(0, -1)); 
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setUndoStack([...undoStack, grid]);
      setGrid(nextState);
      setRedoStack(redoStack.slice(1)); 
    }
  };

  return (
    <div style={styles.container}>
      <h2>Spreadsheet with Undo/Redo</h2>
      <table style={styles.table}>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} style={styles.cell}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                    style={styles.input}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.buttonContainer}>
        <button onClick={undo} style={styles.button}>
          Undo
        </button>
        <button onClick={redo} style={styles.button}>
          Redo
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    borderRadius: "10px",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  table: {
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  cell: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "5px",
    fontSize: "14px",
    border: "none",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    background: "#0066ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default Spreadsheet;
