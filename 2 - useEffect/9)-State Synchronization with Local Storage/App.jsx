import React, { useState, useEffect } from 'react';

const GlobalSettingsManager = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);

  // Simulated external API URL
  const API_URL = 'https://jsonplaceholder.typicode.com/posts/1'; // Replace with actual API endpoint

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const storedLanguage = localStorage.getItem('language');
    const storedNotifications = localStorage.getItem('notifications');

    if (storedTheme) setTheme(storedTheme);
    if (storedLanguage) setLanguage(storedLanguage);
    if (storedNotifications) setNotifications(storedNotifications === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
    localStorage.setItem('notifications', notifications.toString());
  }, [theme, language, notifications]);

  return (
    <div style={{ ...styles.container, backgroundColor: theme === 'light' ? '#f4f4f9' : '#333' }}>
      <h1 style={{ ...styles.title, color: theme === 'light' ? '#333' : '#fff' }}>Global Settings Manager</h1>

      <div style={styles.settings}>
        <div style={styles.setting}>
          <label style={{ ...styles.label, color: theme === 'light' ? '#333' : '#fff' }}>Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={styles.select}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div style={styles.setting}>
          <label style={{ ...styles.label, color: theme === 'light' ? '#333' : '#fff' }}>Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={styles.select}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div style={styles.setting}>
          <label style={{ ...styles.label, color: theme === 'light' ? '#333' : '#fff' }}>Notifications:</label>
          <div style={styles.switch}>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              style={styles.checkbox}
            />
            <span style={{ ...styles.switchLabel, color: theme === 'light' ? '#333' : '#fff' }}>
              {notifications ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>

      <div style={{ ...styles.status, backgroundColor: theme === 'light' ? '#fff' : '#444' }}>
        <h2 style={{ color: theme === 'light' ? '#333' : '#fff' }}>Current Settings:</h2>
        <p><strong style={{ color: theme === 'light' ? '#333' : '#fff' }}>Theme:</strong> {theme}</p>
        <p><strong style={{ color: theme === 'light' ? '#333' : '#fff' }}>Language:</strong> {language}</p>
        <p><strong style={{ color: theme === 'light' ? '#333' : '#fff' }}>Notifications:</strong> {notifications ? 'Enabled' : 'Disabled'}</p>
      </div>

      <div style={styles.footer}>
        <p style={{ color: theme === 'light' ? '#333' : '#fff' }}>© 2025 Global Settings</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
    transition: 'background-color 0.3s ease',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '20px',
  },
  settings: {
    marginBottom: '30px',
  },
  setting: {
    marginBottom: '20px',
    transition: 'all 0.3s ease',
  },
  label: {
    fontSize: '18px',
    display: 'block',
    marginBottom: '8px',
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  switch: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    width: '24px',
    height: '24px',
    marginRight: '10px',
    transition: 'transform 0.3s ease',
  },
  switchLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  status: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
  },
};

export default GlobalSettingsManager;
