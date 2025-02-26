import React, { createContext, useContext, useState } from 'react';

// Language context to manage selected language globally
const LanguageContext = createContext();

// Language data for different translations
const translations = {
  en: {
    welcome: "Welcome to the Multi-Language App!",
    selectLanguage: "Select Language:",
    description: "This is an example of a multi-layered context system.",
    buttonText: "Change Language",
  },
  hi: {
    welcome: "मल्टी-लैंग्वेज ऐप में आपका स्वागत है!",
    selectLanguage: "भाषा चुनें:",
    description: "यह मल्टी-लेयर्ड कॉन्टेक्स्ट सिस्टम का एक उदाहरण है।",
    buttonText: "भाषा बदलें",
  },
  es: {
    welcome: "¡Bienvenido a la aplicación multilingüe!",
    selectLanguage: "Seleccione idioma:",
    description: "Este es un ejemplo de un sistema de contexto multinivel.",
    buttonText: "Cambiar idioma",
  },
};

// Provider component to wrap the app and provide language state
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
const useLanguage = () => {
  return useContext(LanguageContext);
};

// Header component
const Header = () => {
  const { language } = useLanguage();
  return <h1 style={styles.title}>{translations[language].welcome}</h1>;
};

// Language selector component
const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={styles.selectorContainer}>
      <label style={styles.label}>{translations[language].selectLanguage}</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={styles.select}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};

// Main content component
const Content = () => {
  const { language } = useLanguage();
  return <p style={styles.description}>{translations[language].description}</p>;
};

// Button component
const ChangeLanguageButton = () => {
  const { language, setLanguage } = useLanguage();

  const changeLanguage = () => {
    const nextLanguage = language === "en" ? "hi" : language === "hi" ? "es" : "en";
    setLanguage(nextLanguage);
  };

  return (
    <button onClick={changeLanguage} style={styles.button}>
      {translations[language].buttonText}
    </button>
  );
};

// Main App Component
const App = () => {
  return (
    <LanguageProvider>
      <div style={styles.container}>
        <Header />
        <LanguageSelector />
        <Content />
        <ChangeLanguageButton />
      </div>
    </LanguageProvider>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
    margin: '50px auto',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
    color: '#fff',
    transition: 'all 0.3s ease-in-out',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    animation: 'fadeIn 1s ease-in-out',
  },
  selectorContainer: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '18px',
    marginRight: '10px',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: '0.3s',
  },
  description: {
    fontSize: '20px',
    margin: '20px 0',
  },
  button: {
    padding: '12px 25px',
    fontSize: '18px',
    background: '#ff7f50',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
  },
};

export default App;
