import React, { useReducer, useRef, useEffect } from "react";

// Reducer function
const textReducer = (state, action) => {
  switch (action.type) {
    case "TYPE":
      return {
        ...state,
        text: action.payload,
        history: [...state.history.slice(0, state.index + 1), action.payload],
        index: state.index + 1,
      };
    case "UNDO":
      return state.index > 0 ? { ...state, text: state.history[state.index - 1], index: state.index - 1 } : state;
    case "REDO":
      return state.index < state.history.length - 1
        ? { ...state, text: state.history[state.index + 1], index: state.index + 1 }
        : state;
    default:
      return state;
  }
};

// Initial state
const initialState = {
  text: "",
  history: [""],
  index: 0,
};

const TextEditor = () => {
  const [state, dispatch] = useReducer(textReducer, initialState);
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        dispatch({ type: "UNDO" });
      } else if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        dispatch({ type: "REDO" });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={styles.container}>
      <textarea
        ref={textareaRef}
        style={styles.textarea}
        value={state.text}
        onChange={(e) => dispatch({ type: "TYPE", payload: e.target.value })}
        placeholder="Start typing..."
      />
      <div style={styles.buttons}>
        <button
          onClick={() => dispatch({ type: "UNDO" })}
          style={state.index === 0 ? styles.disabledButton : styles.button}
          disabled={state.index === 0}
        >
          ⬅ Undo
        </button>
        <button
          onClick={() => dispatch({ type: "REDO" })}
          style={state.index === state.history.length - 1 ? styles.disabledButton : styles.button}
          disabled={state.index === state.history.length - 1}
        >
          Redo ➡
        </button>
      </div>
    </div>
  );
};

// Inline styles with blue aesthetic theme
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "15px",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    position: "relative",
    animation: "fadeIn 0.8s ease-in-out",
  },
  textarea: {
    width: "95%",
    height: "200px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255, 255, 255, 0.9)",
    transition: "0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "#1e3c72",
    fontFamily: "'Poppins', sans-serif",
  },
  buttons: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  button: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #007bff, #0056b3)",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  },
  disabledButton: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#ccc",
    color: "#666",
    cursor: "not-allowed",
    fontSize: "14px",
    fontWeight: "bold",
    opacity: 0.7,
  },
};

// Injecting keyframe animations
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    button:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
  </style>
`
);

export default TextEditor;
