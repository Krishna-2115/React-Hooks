import React, { useState, useCallback } from "react";

const LiveSuggestionsSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Throttle function to limit API requests
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return (...args) => {
      if (!lastRan) {
        func(...args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  // Fetch data from API
  const fetchSuggestions = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?q=${searchQuery}`
      ); // Replace with your API endpoint
      const data = await response.json();
      setResults(data.slice(0, 5)); // Limit results for demonstration
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Throttled API request
  const throttledFetch = useCallback(
    throttle((searchQuery) => fetchSuggestions(searchQuery), 1000),
    []
  );

  // Handle input change and throttle API call
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    throttledFetch(value);
  };

  // Inline styles with professional gradient theme
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "50px auto",
      padding: "30px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #4e73df, #1e3a8a)", // Deep blue gradient
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      fontFamily: "'Arial', sans-serif",
      color: "#fff", // White text for contrast
      textAlign: "center",
    },
    input: {
      width: "92%",
      padding: "14px 18px",
      fontSize: "16px",
      border: "none",
      borderRadius: "30px", // Rounded input
      outline: "none",
      background: "#ffffff", // White background for the input
      color: "#333",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
      transition: "all 0.3s ease",
    },
    inputFocused: {
      boxShadow: "0 0 10px rgba(72, 144, 226, 0.6)", // Light blue shadow on focus
      border: "1px solid #4e73df", // Blue border on focus
    },
    loading: {
      fontSize: "16px",
      color: "#ffffff",
      marginTop: "10px",
      animation: "blink 1.5s infinite", // Simple blinking effect
    },
    list: {
      listStyleType: "none",
      padding: "0",
      marginTop: "20px",
      background: "linear-gradient(135deg, #4e73df, #1e3a8a)",
      borderRadius: "8px",
      maxHeight: "300px",
      overflowY: "auto",
    },
    listItem: {
      padding: "15px",
      fontSize: "16px",
      borderBottom: "1px solid #e5e7eb",
      transition: "background-color 0.3s ease",
      cursor: "pointer",
      borderRadius: "8px",
      color: "white",
    },
    listItemHover: {
      backgroundColor: "#f4f4f4",
    },
    noResults: {
      fontSize: "14px",
      color: "white",
      textAlign: "center",
      padding: "20px",
    },
    noResultsContainer: {
      padding: "20px",
      textAlign: "center",
    },
    pulseLoading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
    },
    dot: {
      width: "12px",
      height: "12px",
      margin: "0 6px",
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      animation: "pulse 1.5s infinite ease-in-out",
    },
    dot1: {
      animationDelay: "0s",
    },
    dot2: {
      animationDelay: "0.3s",
    },
    dot3: {
      animationDelay: "0.6s",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Search Suggestions</h2>
      <input
        type="text"
        placeholder="Search for posts..."
        value={query}
        onChange={handleInputChange}
        style={{
          ...styles.input,
          ...(query ? styles.inputFocused : {}),
        }}
      />
      {loading && (
        <div style={styles.pulseLoading}>
          <div
            style={{ ...styles.dot, ...styles.dot1 }}
          ></div>
          <div
            style={{ ...styles.dot, ...styles.dot2 }}
          ></div>
          <div
            style={{ ...styles.dot, ...styles.dot3 }}
          ></div>
        </div>
      )}
      {results.length === 0 && !loading && query && (
        <div style={styles.noResultsContainer}>
          <p style={styles.noResults}>No results found</p>
        </div>
      )}
      <ul style={styles.list}>
        {results.map((result) => (
          <li
            key={result.id}
            style={styles.listItem}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f4f4f4")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            {result.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveSuggestionsSearch;
