import React, { useReducer, useState } from 'react';

// Initial state for the API request tracker
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// Reducer to handle loading, success, and error states
const apiReducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_START':
      return { ...state, loading: true, error: null };
    case 'REQUEST_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'REQUEST_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Main App Component
const App = () => {
  const [state, dispatch] = useReducer(apiReducer, initialState);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // API request simulation
  const fetchData = async () => {
    dispatch({ type: 'REQUEST_START' });
    setIsButtonDisabled(true);

    try {
      // Simulating an API call (replace with your actual API request)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      dispatch({ type: 'REQUEST_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'REQUEST_ERROR', payload: error.message });
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>API Request Tracker</h1>

      {/* Button to trigger API request */}
      <button
        onClick={fetchData}
        style={styles.button}
        disabled={isButtonDisabled} // Disable button during loading
      >
        {state.loading ? 'Loading...' : 'Fetch Data'}
      </button>

      {/* Error State */}
      {state.error && (
        <div style={styles.error}>
          <p>Error: {state.error}</p>
          <button onClick={fetchData} style={styles.retryButton}>
            Retry
          </button>
        </div>
      )}

      {/* Success State */}
      {state.data && (
        <div style={styles.success}>
          <h2>Data fetched successfully:</h2>
          <ul>
            {state.data.slice(0, 5).map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
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
  button: {
    padding: '12px 18px',
    fontSize: '18px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    width: '200px',
    marginBottom: '20px',
  },
  retryButton: {
    padding: '10px 15px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  loading: {
    fontSize: '18px',
    color: '#3498db',
    fontWeight: 'bold',
  },
  error: {
    fontSize: '18px',
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  success: {
    fontSize: '18px',
    color: '#2ecc71',
  },
};

export default App;
