import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    const newNotification = { id: Date.now(), message };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        {notifications.map((notification) => (
          <div key={notification.id} style={{
            background: '#333',
            color: '#fff',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.5s ease-in-out',
            cursor: 'pointer'
          }} onClick={() => removeNotification(notification.id)}>
            {notification.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

const Header = () => {
  const { addNotification } = useNotifications();
  return (
    <div style={{ padding: '20px', background: '#007bff', color: '#fff', textAlign: 'center' }}>
      <h1>Notification Center</h1>
      <button style={{ padding: '10px 20px', background: '#fff', color: '#007bff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        onClick={() => addNotification('New notification added!')}>
        Add Notification
      </button>
    </div>
  );
};

const Sidebar = () => {
  const { notifications } = useNotifications();
  return (
    <div style={{ width: '250px', padding: '20px', background: '#f4f4f4', height: '100vh', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
      <h2>Sidebar</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} style={{ marginBottom: '10px', padding: '10px', background: '#ddd', borderRadius: '5px' }}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <NotificationProvider>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ padding: '20px', flex: 1 }}>
          <h2>Welcome to the Notification System</h2>
          <p>Click the button above to add a notification.</p>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default App;
