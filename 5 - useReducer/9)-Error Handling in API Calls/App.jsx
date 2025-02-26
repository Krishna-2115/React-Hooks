import { useReducer, useState, useCallback, useEffect } from 'react';

// Action Types
const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';
const FETCH_RETRY = 'FETCH_RETRY';
const FETCH_RESET = 'FETCH_RESET';

// Initial state
const initialState = {
  data: null,
  error: null,
  loading: false,
  retryAttempts: 0,
  retryTimeout: 1000, // Retry interval starts at 1s
};

// Reducer function
const apiReducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true, error: null, retryAttempts: 0, retryTimeout: 1000 };
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        retryAttempts: action.payload.retryAttempts,
        retryTimeout: action.payload.retryTimeout,
      };
    case FETCH_RETRY:
      return { ...state, retryAttempts: action.payload.retryAttempts, retryTimeout: action.payload.retryTimeout };
    case FETCH_RESET:
      return initialState;
    default:
      return state;
  }
};

// Custom Hook for fetching data with retries
const useApiFetch = (url, retryLimit = 3) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    dispatch({ type: FETCH_START });
    console.log("Fetching data from:", url); // Debugging output

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      dispatch({ type: FETCH_SUCCESS, payload: data });
    } catch (error) {
      if (retryCount < retryLimit) {
        // Retry with exponential backoff
        const timeout = Math.pow(2, retryCount) * 1000; // Exponential backoff (1s, 2s, 4s, 8s...)
        dispatch({ type: FETCH_RETRY, payload: { retryAttempts: retryCount + 1, retryTimeout: timeout } });
        setTimeout(() => fetchData(), timeout);
        setRetryCount(prev => prev + 1);
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: { error: error.message, retryAttempts: retryCount, retryTimeout: Math.pow(2, retryCount) * 1000 },
        });
      }
    }
  }, [url, retryCount, retryLimit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
};

const DataFetchingComponent = () => {
  const { data, error, loading, retryAttempts, retryTimeout } = useApiFetch(
    'https://jsonplaceholder.typicode.com/posts', // Example API URL
    5 // Retry limit
  );

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner"></div> <span style={styles.loadingText}>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>Error: {error}</p>
        <p>Retries: {retryAttempts} | Next Retry in {retryTimeout / 1000} seconds</p>
        <button onClick={() => window.location.reload()} style={styles.retryButton}>
          Retry Now
        </button>
      </div>
    );
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Advanced API Data Fetching with useReducer</h1>

      <div style={styles.dataContainer}>
        <h3>Fetched Data:</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map(post => (
              <tr key={post.id} style={styles.tableRow}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  loadingText: {
    marginTop: '10px',
    fontSize: '18px',
    color: '#3498db',
  },
  errorContainer: {
    backgroundColor: '#ffcccc',
    color: '#a94442',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  errorText: {
    fontSize: '16px',
    fontWeight: '600',
  },
  retryButton: {
    marginTop: '15px',
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  dataContainer: {
    marginTop: '30px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  tableRow: {
    backgroundColor: '#f9f9f9',
    transition: 'background-color 0.3s ease',
  },
  tableRowHover: {
    backgroundColor: '#ecf0f1',
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
};

// Keyframes for spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default DataFetchingComponent;
