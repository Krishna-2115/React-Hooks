import React, { createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';

// Create Notification Context
const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);
    setTimeout(() => removeNotification(id), 5000); // Auto-remove after 5s
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div style={styles.notificationPanel}>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            style={{ ...styles.notification, ...styles[notif.type] }}
          >
            {notif.message}
          </motion.div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Components that dispatch notifications
const Dashboard = () => {
  const { addNotification } = useNotifications();
  return (
    <button style={styles.button} onClick={() => addNotification('New order received!', 'success')}>
      New Order
    </button>
  );
};

const Profile = () => {
  const { addNotification } = useNotifications();
  return (
    <button style={styles.button} onClick={() => addNotification('Profile updated successfully!', 'info')}>
      Update Profile
    </button>
  );
};

const App = () => {
  return (
    <NotificationProvider>
      <div style={styles.container}>
        <h1 style={styles.title}>Notification Center</h1>
        <Dashboard />
        <Profile />
      </div>
    </NotificationProvider>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    marginTop: '50px',
  },
  title: {
    fontSize: '32px',
    color: '#333',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    margin: '10px',
    borderRadius: '8px',
    border: 'none',
    background: '#007BFF',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  notificationPanel: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    width: '300px',
    zIndex: 1000,
  },
  notification: {
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    color: '#fff',
    fontSize: '16px',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  },
  success: { background: '#28a745' },
  info: { background: '#17a2b8' },
  error: { background: '#dc3545' },
};

export default App;
