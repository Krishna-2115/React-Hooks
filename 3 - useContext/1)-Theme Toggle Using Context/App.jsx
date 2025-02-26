import React, { createContext, useState, useContext, useEffect } from 'react';

// Step 1: Create a context for the theme
const ThemeContext = createContext();

// Step 2: Create a provider to manage the theme state
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Load the theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Toggle the theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save to localStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Step 3: Create a custom hook to access the theme context
const useTheme = () => {
  return useContext(ThemeContext);
};

// Step 4: Create a Theme Toggle button component
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#3498db' : '#2ecc71',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '50px',
        fontSize: '18px',
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.3s ease-in-out',
        boxShadow: theme === 'light' ? '0 4px 12px rgba(52, 152, 219, 0.5)' : '0 4px 12px rgba(46, 204, 113, 0.5)',
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'scale(1.1)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'scale(1)';
      }}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

// Step 5: Create a component that uses the theme
const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        background: theme === 'light' ? '#ecf0f1' : '#2c3e50',
        color: theme === 'light' ? '#2c3e50' : '#ecf0f1',
        minHeight: '100vh',
        padding: '40px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        transition: 'background 0.4s ease, color 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '40px',
          borderRadius: '15px',
          background: theme === 'light' ? '#fff' : '#34495e',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <h1
          style={{
            fontSize: '36px',
            marginBottom: '20px',
            fontWeight: '600',
          }}
        >
          Welcome to the {theme === 'light' ? 'Light' : 'Dark'} Mode App
        </h1>
        <ThemeToggleButton />
      </div>
    </div>
  );
};

// Step 6: Wrap the entire app with the ThemeProvider
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
