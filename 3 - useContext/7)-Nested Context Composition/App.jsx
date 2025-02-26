import React, { useState, createContext, useContext } from 'react';

// Contexts
const ThemeContext = createContext();
const LanguageContext = createContext();

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainComponent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={themeStyles[theme]}>{children}</div>
    </ThemeContext.Provider>
  );
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const switchLanguage = (lang) => setLanguage(lang);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const MainComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, switchLanguage } = useContext(LanguageContext);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{languageData[language].greeting}</h1>
      <button onClick={toggleTheme} style={buttonStyles}>Toggle Theme</button>
      <button onClick={() => switchLanguage('en')} style={buttonStyles}>English</button>
      <button onClick={() => switchLanguage('es')} style={buttonStyles}>Español</button>
    </div>
  );
};

const themeStyles = {
  light: {
    backgroundColor: '#f4f4f4',
    color: '#333',
    transition: 'all 0.3s ease-in-out',
  },
  dark: {
    backgroundColor: '#333',
    color: '#f4f4f4',
    transition: 'all 0.3s ease-in-out',
  },
};

const buttonStyles = {
  padding: '10px 20px',
  margin: '10px',
  fontSize: '16px',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
};

const languageData = {
  en: { greeting: 'Hello, welcome to our app!' },
  es: { greeting: '¡Hola, bienvenido a nuestra aplicación!' },
};

export default App;
