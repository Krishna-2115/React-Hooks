import React, { createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';

// Theme context
const ThemeContext = createContext();

const themes = {
  light: {
    background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
    color: '#333',
    buttonBg: '#ff6f61',
    buttonText: '#fff',
  },
  dark: {
    background: 'linear-gradient(135deg, #2c3e50, #4ca1af)',
    color: '#fff',
    buttonBg: '#34495e',
    buttonText: '#ecf0f1',
  },
  neon: {
    background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    color: '#fff',
    buttonBg: '#ff0',
    buttonText: '#000',
  },
};

const ThemeProvider = ({ children, theme }) => {
  const parentTheme = useContext(ThemeContext);
  const appliedTheme = theme || parentTheme || themes.light;

  return <ThemeContext.Provider value={appliedTheme}>{children}</ThemeContext.Provider>;
};

const ThemedButton = () => {
  const theme = useContext(ThemeContext);
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        backgroundColor: theme.buttonBg,
        color: theme.buttonText,
        padding: '12px 24px',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '18px',
        transition: '0.3s',
        boxShadow: '0px 10px 20px rgba(0,0,0,0.2)'
      }}
    >
      Click Me
    </motion.button>
  );
};

const ThemedCard = () => {
  const theme = useContext(ThemeContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: theme.background,
        color: theme.color,
        padding: '30px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        maxWidth: '400px',
        margin: '20px auto',
      }}
    >
      <h2>Stylish Themed Card</h2>
      <p>This component adapts the theme dynamically.</p>
      <ThemedButton />
    </motion.div>
  );
};

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeProvider theme={themes[theme]}>
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1 style={{ marginBottom: '30px', fontSize: '36px' }}>Advanced Theme Switcher</h1>
        <select
          onChange={(e) => setTheme(e.target.value)}
          value={theme}
          style={{ padding: '10px', fontSize: '18px', borderRadius: '10px', border: 'none' }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="neon">Neon</option>
        </select>
        <ThemedCard />
      </div>
    </ThemeProvider>
  );
};

export default App;
