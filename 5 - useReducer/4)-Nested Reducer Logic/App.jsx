import React, { useReducer, useContext, createContext, useState } from 'react';
import './App.css'; // Ensure you have some external CSS for additional effects

// Initial state for the to-do list with each task having its own state
const initialState = {
  tasks: [],
};

// Nested Reducer to handle actions on tasks
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: Date.now(), text: action.payload.text, completed: false, priority: 'normal' },
        ],
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
    case 'CHANGE_PRIORITY':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, priority: action.payload.priority }
            : task
        ),
      };
    default:
      return state;
  }
};

// Context to provide state to the components
const TodoContext = createContext();

// Provider component to wrap the app and provide global state
const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Task Input Component
const TodoInput = () => {
  const [taskText, setTaskText] = useState('');
  const { dispatch } = useContext(TodoContext);

  const handleAddTask = () => {
    if (taskText) {
      dispatch({ type: 'ADD_TASK', payload: { text: taskText } });
      setTaskText('');
    }
  };

  return (
    <div style={styles.inputContainer}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        style={styles.input}
        placeholder="Add a new task..."
      />
      <button onClick={handleAddTask} style={styles.button}>
        Add Task
      </button>
    </div>
  );
};

// Task List Component
const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);

  const handleToggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const handleRemoveTask = (id) => {
    dispatch({ type: 'REMOVE_TASK', payload: id });
  };

  const handleChangePriority = (id, priority) => {
    dispatch({ type: 'CHANGE_PRIORITY', payload: { id, priority, previousPriority: 'normal' } });
  };

  return (
    <ul style={styles.list}>
      {state.tasks.map((task) => (
        <li key={task.id} style={styles.listItem}>
          <div style={styles.taskDetails}>
            <span
              onClick={() => handleToggleTask(task.id)}
              style={{
                ...styles.taskText,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.priority === 'high' ? '#e74c3c' : '#2ecc71',
              }}
            >
              {task.text}
            </span>
            <div>
              <span
                style={{ ...styles.priority, backgroundColor: task.priority === 'high' ? '#e74c3c' : '#2ecc71' }}
                onClick={() =>
                  handleChangePriority(task.id, task.priority === 'high' ? 'normal' : 'high')
                }
              >
                {task.priority === 'high' ? 'High Priority' : 'Normal Priority'}
              </span>
            </div>
          </div>
          <button onClick={() => handleRemoveTask(task.id)} style={styles.removeButton}>
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

// Main App Component
const App = () => {
  return (
    <TodoProvider>
      <div style={styles.container}>
        <h1 style={styles.header}>Advanced Task List</h1>
        <TodoInput />
        <TodoList />
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
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    color: '#333',
  },
  header: {
    fontSize: '32px',
    marginBottom: '20px',
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginBottom: '25px',
  },
  input: {
    padding: '12px',
    fontSize: '18px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '80%',
    transition: '0.3s',
  },
  button: {
    padding: '12px 18px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
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
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    marginBottom: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
  },
  taskDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  taskText: {
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'color 0.3s ease-in-out',
  },
  priority: {
    fontSize: '14px',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '8px',
    marginTop: '5px',
    cursor: 'pointer',
  },
  removeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#f44336',
    cursor: 'pointer',
    fontSize: '18px',
  },
};

export default App;
