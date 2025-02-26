import React, { useState, useEffect } from 'react';

const BackgroundSyncWithNotifications = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState(false);

  // Simulated external API URL
  const API_URL = 'https://jsonplaceholder.typicode.com/posts/1'; // Replace with actual API endpoint

  // Request permission to show notifications
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  }, []);

  // Function to fetch data from the API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setData(result);
      setIsLoading(false);
      // If data is different from the last fetched data, notify the user
      if (newData !== result.title) {
        setNewData(result.title); // Update to track the latest data
        sendNotification(result); // Send browser notification
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  // Send a browser notification
  const sendNotification = (data) => {
    if (Notification.permission === 'granted') {
      const notification = new Notification('New Data Available', {
        body: `Title: ${data.title}`,
        icon: 'https://via.placeholder.com/150',
      });

      notification.onclick = () => {
        window.open(API_URL, '_blank');
      };
    }
  };

  // Poll the API in the background every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // Poll every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [newData]); // Effect runs when newData is updated

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Background Sync with Notifications</h1>

      {isLoading ? (
        <div style={styles.loader}>Fetching New Data...</div>
      ) : (
        <div style={styles.dataContainer}>
          <h2 style={styles.dataTitle}>Latest Post:</h2>
          <p style={styles.dataText}>{data ? data.title : 'No data yet'}</p>
        </div>
      )}

      <div style={styles.footer}>
        <p style={styles.footerText}>Stay tuned for more updates.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    background: '#f4f6f9',
    maxWidth: '700px',
    margin: '50px auto',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  title: {
    color: '#4c4c4c',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  loader: {
    fontSize: '20px',
    color: '#3498db',
    animation: 'pulse 1.5s infinite',
  },
  dataContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    marginTop: '30px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  dataTitle: {
    fontSize: '22px',
    color: '#2c3e50',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  dataText: {
    fontSize: '18px',
    color: '#7f8c8d',
    marginBottom: '20px',
  },
  footer: {
    marginTop: '40px',
    fontSize: '16px',
    color: '#7f8c8d',
  },
  footerText: {
    fontSize: '18px',
    color: '#16a085',
    fontWeight: '500',
  },
};

export default BackgroundSyncWithNotifications;
