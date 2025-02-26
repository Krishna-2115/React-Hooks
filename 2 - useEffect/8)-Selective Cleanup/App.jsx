import React, { useState, useEffect } from 'react';

// Sample pane 1 - Fetches data from an API
const DataPane = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      console.log('DataPane is unmounting, cleanup if necessary');
    };
  }, []);

  if (isLoading) return <div>Loading data...</div>;

  return (
    <div style={styles.paneContainer}>
      <h3>Data Pane</h3>
      <ul>
        {data.slice(0, 5).map((item) => (
          <li key={item.id} style={styles.listItem}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Sample pane 2 - Event listener (e.g., mouse move event)
const MouseMovePane = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      console.log('MouseMovePane is unmounting, event listener cleaned up');
    };
  }, []);

  return (
    <div style={styles.paneContainer}>
      <h3>Mouse Position Pane</h3>
      <p>Mouse Position - X: {position.x}, Y: {position.y}</p>
    </div>
  );
};

// Sample pane 3 - Interval-based updating (e.g., fetching data every 5 seconds)
const IntervalPane = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log('IntervalPane is unmounting, interval cleared');
    };
  }, []);

  return (
    <div style={styles.paneContainer}>
      <h3>Time Update Pane</h3>
      <p>Current Time: {time}</p>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [activePane, setActivePane] = useState('data'); // State to track the active pane

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.title}>Multi-Pane Dashboard</h1>

      <div style={styles.nav}>
        <button
          style={styles.navButton}
          onClick={() => setActivePane('data')}
        >
          Data Pane
        </button>
        <button
          style={styles.navButton}
          onClick={() => setActivePane('mouse')}
        >
          Mouse Pane
        </button>
        <button
          style={styles.navButton}
          onClick={() => setActivePane('interval')}
        >
          Interval Pane
        </button>
      </div>

      <div style={styles.content}>
        {activePane === 'data' && <DataPane />}
        {activePane === 'mouse' && <MouseMovePane />}
        {activePane === 'interval' && <IntervalPane />}
      </div>
    </div>
  );
};

// Basic Styles
const styles = {
  dashboard: {
    fontFamily: "'Arial', sans-serif",
    background: '#f4f6f9',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: 'auto',
    transition: 'background-color 0.3s ease',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  navButton: {
    padding: '10px 20px',
    fontSize: '16px',
    background: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease-in-out',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  navButtonHover: {
    background: '#2980b9',
    transform: 'scale(1.05)',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  paneContainer: {
    background: '#fff',
    padding: '20px',
    width: '300px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textAlign: 'center',
  },
  listItem: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
    listStyle: 'none',
    background: '#ecf0f1',
    padding: '10px',
    borderRadius: '8px',
    transition: 'transform 0.3s ease',
  },
};

export default Dashboard;
