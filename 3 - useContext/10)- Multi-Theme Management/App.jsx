import React, { createContext, useState, useContext, useEffect } from 'react';
import { FaSun, FaMoon, FaAdjust } from 'react-icons/fa';

// Define available themes with advanced styles and animations
const themes = {
  light: {
    name: 'light',
    body: {
      backgroundColor: '#f0f4f8',
      color: '#333333',
      transition: 'all 0.5s ease',
    },
    button: {
      backgroundColor: '#ff6363',
      color: '#ffffff',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    buttonHover: {
      backgroundColor: '#36cfc9',
      transform: 'scale(1.1)',
    },
    card: {
      backgroundColor: '#ffffff',
      color: '#333333',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
    },
  },
  dark: {
    name: 'dark',
    body: {
      backgroundColor: '#121212',
      color: '#f5f5f5',
      transition: 'all 0.5s ease',
    },
    button: {
      backgroundColor: '#36cfc9',
      color: '#000000',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    },
    buttonHover: {
      backgroundColor: '#ff6363',
      transform: 'scale(1.1)',
    },
    card: {
      backgroundColor: '#1c1c1c',
      color: '#f5f5f5',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 8px 20px rgba(255, 255, 255, 0.15)',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 30px rgba(255, 255, 255, 0.2)',
    },
  },
  contrast: {
    name: 'contrast',
    body: {
      backgroundColor: '#1a1a1a',
      color: '#ffdf00',
      transition: 'all 0.5s ease',
    },
    button: {
      backgroundColor: '#ffae00',
      color: '#000000',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 10px rgba(255, 255, 255, 0.2)',
    },
    buttonHover: {
      backgroundColor: '#ff6363',
      transform: 'scale(1.1)',
    },
    card: {
      backgroundColor: '#333333',
      color: '#ffdf00',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 8px 20px rgba(255, 255, 255, 0.15)',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 30px rgba(255, 255, 255, 0.2)',
    },
  },
};

// Create the Theme Context
const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme && themes[savedTheme]) {
      setTheme(themes[savedTheme]);
    }
  }, []);

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setTheme(themes[themeName]);
      localStorage.setItem('app-theme', themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <div style={theme.body}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);

// ThemeSwitcher component with hover animations
const ThemeSwitcher = () => {
  const { switchTheme, theme } = useTheme();

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Current Theme: {theme.name}
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button
          style={{ ...theme.button, ...(theme.name === 'light' ? theme.buttonHover : {}) }}
          onClick={() => switchTheme('light')}
        >
          <FaSun style={{ marginRight: '8px' }} /> Light
        </button>
        <button
          style={{ ...theme.button, ...(theme.name === 'dark' ? theme.buttonHover : {}) }}
          onClick={() => switchTheme('dark')}
        >
          <FaMoon style={{ marginRight: '8px' }} /> Dark
        </button>
        <button
          style={{ ...theme.button, ...(theme.name === 'contrast' ? theme.buttonHover : {}) }}
          onClick={() => switchTheme('contrast')}
        >
          <FaAdjust style={{ marginRight: '8px' }} /> Contrast
        </button>
      </div>
    </div>
  );
};

// ThemedCard component with hover animation
const ThemedCard = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        ...theme.card,
        ...(theme.name === 'light' ? theme.cardHover : {}),
      }}
    >
      <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>Themed Card</h3>
      <p>This card adjusts according to the selected theme.</p>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <ThemeProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px' }}>
          Multi-Theme Management
        </h1>
        <ThemeSwitcher />
        <ThemedCard />
      </div>
    </ThemeProvider>
  );
};

export default App;
