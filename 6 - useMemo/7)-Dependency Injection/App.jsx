import React, { createContext, useContext, useMemo, useState } from "react";

// Example Services
class LoggerService {
  constructor(logHandler) {
    this.logHandler = logHandler;
  }

  log(message) {
    this.logHandler((prevLogs) => [...prevLogs, { message, type: "info" }]);
  }

  error(message) {
    this.logHandler((prevLogs) => [...prevLogs, { message, type: "error" }]);
  }
}

class ApiService {
  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: "🚀 API Response Received!" }), 1500);
    });
  }
}

// Dependency Injection Container
const ServiceContext = createContext(null);

const ServiceProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const services = useMemo(() => ({
    logger: new LoggerService(setLogs),
    api: new ApiService(),
  }), []);

  return (
    <ServiceContext.Provider value={{ services, logs }}>
      {children}
    </ServiceContext.Provider>
  );
};

// Custom Hook to Use Services
const useService = () => {
  return useContext(ServiceContext);
};

// Improved UI Component Using Injected Services
const SampleComponent = () => {
  const { services, logs } = useService();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const handleFetch = async () => {
    services.logger.log("⏳ Fetching data...");
    setLoading(true);
    try {
      const response = await services.api.fetchData();
      setData(response.data);
      services.logger.log("✅ Data successfully retrieved.");
    } catch (error) {
      services.logger.error("❌ Error fetching data.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛠️ Dependency Injection Demo</h2>

      <button onClick={handleFetch} style={styles.button} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {loading && <div style={styles.loader}></div>}

      {data && <p style={styles.response}>{data}</p>}

      {/* Logs Display */}
      <div style={styles.logs}>
        <h3 style={styles.logHeading}>📜 Logs</h3>
        <div style={styles.logContainer}>
          {logs.map((log, index) => (
            <p key={index} style={log.type === "error" ? styles.errorLog : styles.infoLog}>
              {log.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles (Inline)
const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  heading: {
    marginBottom: "20px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonDisabled: {
    backgroundColor: "#7f8c8d",
  },
  response: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#27ae60",
    borderRadius: "5px",
    color: "#fff",
  },
  loader: {
    margin: "15px auto",
    width: "30px",
    height: "30px",
    border: "4px solid #fff",
    borderTop: "4px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  logs: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#34495e",
    borderRadius: "5px",
    textAlign: "left",
  },
  logHeading: {
    fontSize: "18px",
    borderBottom: "2px solid #ecf0f1",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  logContainer: {
    maxHeight: "150px",
    overflowY: "auto",
  },
  infoLog: {
    padding: "5px",
    backgroundColor: "#2980b9",
    borderRadius: "3px",
    marginBottom: "5px",
  },
  errorLog: {
    padding: "5px",
    backgroundColor: "#c0392b",
    borderRadius: "3px",
    marginBottom: "5px",
  },
};

// Root App
const App = () => (
  <ServiceProvider>
    <SampleComponent />
  </ServiceProvider>
);

export default App;
