import React, { useState, useEffect } from "react";

const ApiPolling = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const result = await response.json();
        setData(result.slice(0, 10));
        setTimer(5); // Reset timer on successful fetch
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 5));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>API Polling Component</h1>
        <p style={styles.timer}>Timer: {timer}s</p>
        {loading && <p style={styles.loading}>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}
        {!loading && !error && (
          <ul style={styles.list}>
            {data.map((item) => (
              <li key={item.id} style={styles.listItem}>
                <div style={styles.cardContent}>
                  <h3 style={styles.itemTitle}>{item.title}</h3>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    margin: "auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#0f1b34",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
    fontFamily: "'Poppins', sans-serif",
    color: "#fff",
  },
  timer: {
    fontSize: "24px",
    color: "#58a6ff",
    fontWeight: "bold",
  },
  content: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "20px",
    color: "#58a6ff",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#4c8ff5",
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "#ff4c6b",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    animation: "fadeIn 1s ease-in-out",
  },
  listItem: {
    margin: "10px 0",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#1e2a47",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    cursor: "pointer",
  },
  listItemHover: {
    backgroundColor: "#2a3859",
    transform: "translateY(-5px)",
  },
  cardContent: {
    animation: "zoomIn 0.5s ease-in-out",
  },
  itemTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#58a6ff",
  },
};

export default ApiPolling;
