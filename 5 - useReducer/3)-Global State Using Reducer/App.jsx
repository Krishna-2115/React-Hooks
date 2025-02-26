import React, { useReducer, useContext, createContext, useState } from 'react';

// Initial state for the to-do list
const initialState = {
  tasks: [],
};

// Reducer function to handle actions
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), text: action.payload, completed: false }],
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.completed),
      };
    default:
      return state;
  }
};

// Create a context to share the global state across components
const TodoContext = createContext();

// Provider component to wrap the app and provide global state
const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// To-Do Input Component
const TodoInput = () => {
  const [task, setTask] = useState('');
  const { dispatch } = useContext(TodoContext);

  const handleAddTask = () => {
    if (task) {
      dispatch({ type: 'ADD_TASK', payload: task });
      setTask('');
    }
  };

  return (
    <div style={styles.inputContainer}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={styles.input}
        placeholder="Add a new task..."
      />
      <button onClick={handleAddTask} style={styles.button}>
        Add Task
      </button>
    </div>
  );
};

// To-Do List Component
const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);

  const handleToggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const handleRemoveTask = (id) => {
    dispatch({ type: 'REMOVE_TASK', payload: id });
  };

  return (
    <ul style={styles.list}>
      {state.tasks.map((task) => (
        <li key={task.id} style={styles.listItem}>
          <span
            onClick={() => handleToggleTask(task.id)}
            style={{
              ...styles.taskText,
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            {task.text}
          </span>
          <button onClick={() => handleRemoveTask(task.id)} style={styles.removeButton}>
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

// Clear Completed Button
const ClearCompleted = () => {
  const { dispatch } = useContext(TodoContext);

  return (
    <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })} style={styles.clearButton}>
      Clear Completed Tasks
    </button>
  );
};

// Main App Component
const App = () => {
  return (
    <TodoProvider>
      <div style={styles.container}>
        <h1 style={styles.header}>To-Do App</h1>
        <TodoInput />
        <TodoList />
        <ClearCompleted />
      </div>
    </TodoProvider>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    textAlign: 'center',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    color: '#333',
    fontFamily: 'Helvetica Neue, sans-serif',
  },
  header: {
    fontSize: '36px',
    marginBottom: '30px',
    color: '#444',
  },
  inputContainer: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '80%',
    color: '#555',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: '1px solid #4CAF50',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '20px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px',
    background: '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
  },
  taskText: {
    fontSize: '18px',
    cursor: 'pointer',
    color: '#333',
  },
  removeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#f44336',
    cursor: 'pointer',
    fontSize: '20px',
    transition: 'color 0.3s ease',
  },
  clearButton: {
    padding: '12px 24px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  '@media (max-width: 768px)': {
    inputContainer: {
      flexDirection: 'column',
    },
    input: {
      width: '100%',
    },
    button: {
      width: '100%',
    },
  },
};

export default App;
