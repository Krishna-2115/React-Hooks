import React, { createContext, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion'; // Importing framer-motion for animations

// 1. Create a context to manage global configuration
const AppContext = createContext();

// 2. Create a provider to manage and provide the configuration
export const AppProvider = ({ children }) => {
  const [config, setConfig] = useState({
    theme: 'light',        // theme (light or dark)
    apiKey: '',            // API key for external service
    language: 'en',        // language preference
  });

  // 2.1 Function to toggle theme
  const toggleTheme = () => {
    setConfig(prevConfig => ({
      ...prevConfig,
      theme: prevConfig.theme === 'light' ? 'dark' : 'light',
    }));
  };

  // 2.2 Function to update API key
  const updateApiKey = (newApiKey) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      apiKey: newApiKey,
    }));
  };

  // 2.3 Function to update language
  const updateLanguage = (newLanguage) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      language: newLanguage,
    }));
  };

  return (
    <AppContext.Provider value={{ config, toggleTheme, updateApiKey, updateLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom hook to use app configuration
export const useAppContext = () => useContext(AppContext);

// 4. Settings Panel Component to update configuration
const SettingsPanel = () => {
  const { config, toggleTheme, updateApiKey, updateLanguage } = useAppContext();
  const [apiKey, setApiKey] = useState(config.apiKey);
  const [language, setLanguage] = useState(config.language);

  const handleApiKeyChange = (e) => setApiKey(e.target.value);
  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    updateApiKey(apiKey);
  };

  const handleLanguageSubmit = (e) => {
    e.preventDefault();
    updateLanguage(language);
  };

  return (
    <motion.div
      className="settings-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Settings Panel</h2>
      <motion.div
        className="setting"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <label>Theme</label>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {config.theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        </button>
      </motion.div>
      <motion.div
        className="setting"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <label>API Key</label>
        <form onSubmit={handleApiKeySubmit}>
          <input
            type="text"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter new API key"
          />
          <button type="submit">Update API Key</button>
        </form>
      </motion.div>
      <motion.div
        className="setting"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <label>Language</label>
        <form onSubmit={handleLanguageSubmit}>
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
          <button type="submit">Update Language</button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// 5. Dashboard Component to display current settings and demonstrate context usage
const Dashboard = () => {
  const { config } = useAppContext();

  return (
    <motion.div
      className={`dashboard ${config.theme}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Dashboard</h1>
      <p>Current Theme: {config.theme}</p>
      <p>Current Language: {config.language}</p>
      <p>API Key: {config.apiKey ? 'Set' : 'Not Set'}</p>
    </motion.div>
  );
};

// 6. Main App Component to wrap everything with the AppProvider
const App = () => {
  return (
    <AppProvider>
      <div className="app-container">
        <SettingsPanel />
        <Dashboard />
      </div>
    </AppProvider>
  );
};

export default App;
