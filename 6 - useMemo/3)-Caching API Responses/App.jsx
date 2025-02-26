import React, { useState, useEffect, useMemo } from "react";

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
  },
  resultContainer: {
    textAlign: "left",
    padding: "10px",
  },
  item: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: "5px",
    marginBottom: "5px",
  },
  loader: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#007BFF",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

const API_URL = "https://jsonplaceholder.typicode.com/users"; // Example API

const CachedAPIComponent = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({}); // Caching responses

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      if (cache[query]) {
        // Return cached data if available
        setData(cache[query]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}?name_like=${query}`);
        const result = await response.json();
        setCache((prevCache) => ({ ...prevCache, [query]: result })); // Store in cache
        setData(result);
      } catch (err) {
        setError("Failed to fetch data. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, cache]);

  // Memoized results to prevent unnecessary renders
  const filteredResults = useMemo(() => data, [data]);

  return (
    <div style={styles.container}>
      <h2>🔍 Cached API Search</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />

      {loading && <p style={styles.loader}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.resultContainer}>
        {filteredResults.map((user) => (
          <div key={user.id} style={styles.item}>
            <strong>{user.name}</strong> - {user.email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CachedAPIComponent;
