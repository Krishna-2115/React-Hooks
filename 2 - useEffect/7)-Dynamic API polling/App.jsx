import { useState, useEffect } from 'react';

// Function to simulate fetching data from an API
const fetchDataFromAPI = async () => {
  const start = Date.now();
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    const end = Date.now();
    const responseTime = end - start;
    return { data, responseTime };
  } catch (error) {
    throw new Error('Error fetching data');
  }
};

const DynamicPolling = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(5000); // Initial polling interval (5s)
  const [serverResponseTime, setServerResponseTime] = useState(0);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  // Function to fetch data from API and handle response time
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, responseTime } = await fetchDataFromAPI();
      setData(data);
      setServerResponseTime(responseTime);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Adjust polling interval dynamically based on server response time
  useEffect(() => {
    fetchData(); // Initial data fetch

    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 100) % 100); // Progress bar animation
      fetchData(); // Fetch data periodically
    }, pollingInterval);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [pollingInterval]);

  // Adjust polling interval based on server response time
  useEffect(() => {
    if (serverResponseTime < 1000) {
      setPollingInterval(3000); // Fast response, shorten interval to 3s
    } else if (serverResponseTime >= 1000 && serverResponseTime < 3000) {
      setPollingInterval(5000); // Moderate response time, keep interval at 5s
    } else {
      setPollingInterval(10000); // Slow response, lengthen interval to 10s
    }
  }, [serverResponseTime]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dynamic API Polling</h1>

      {isLoading && <div style={styles.spinner}></div>}

      {error && <div style={styles.error}>{error}</div>}

      {!isLoading && !error && data && (
        <div style={styles.dataContainer}>
          <h2>Fetched Data:</h2>
          <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <div style={styles.statusContainer}>
        <div
          style={{
            ...styles.status,
            backgroundColor: serverResponseTime < 1000 ? '#4CAF50' : serverResponseTime < 3000 ? '#FF9800' : '#F44336',
          }}
        >
          {serverResponseTime < 1000 ? 'Fast' : serverResponseTime < 3000 ? 'Moderate' : 'Slow'}
        </div>
        <p style={styles.pollingInfo}>Polling every {pollingInterval / 1000} seconds</p>
      </div>

      <div style={styles.progressContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: `${progress}%`,
          }}
        />
      </div>

      <p style={styles.responseTime}>Server Response Time: {serverResponseTime} ms</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  spinner: {
    margin: '20px auto',
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 2s linear infinite',
  },
  error: {
    color: '#F44336',
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  dataContainer: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  pre: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '5px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    textAlign: 'left',
  },
  statusContainer: {
    marginTop: '20px',
  },
  status: {
    fontSize: '1.2rem',
    padding: '10px',
    borderRadius: '5px',
    color: 'white',
    display: 'inline-block',
  },
  pollingInfo: {
    fontSize: '1.2rem',
    marginTop: '10px',
  },
  progressContainer: {
    width: '100%',
    height: '10px',
    backgroundColor: '#ddd',
    borderRadius: '5px',
    margin: '20px 0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: '5px',
    transition: 'width 1s ease-in-out',
  },
  responseTime: {
    fontSize: '1rem',
    color: '#555',
    marginTop: '10px',
  },
};

export default DynamicPolling;
