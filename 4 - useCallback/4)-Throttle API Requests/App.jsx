import React, { useState, useCallback } from "react";

const CategorizedSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ Books: [], Authors: [] });
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Custom throttle function
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

  // Simulated API call
  const fetchResults = async (searchQuery) => {
    setLoading(true);
    console.log("Fetching API for:", searchQuery);
    // Simulated delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockData = {
      Books: [`Book 1 for "${searchQuery}"`, `Book 2 for "${searchQuery}"`],
      Authors: [`Author A for "${searchQuery}"`, `Author B for "${searchQuery}"`],
    };
    setResults(mockData);
    setLoading(false);
  };

  //  API call
  const Fetch = useCallback(
    throttle((searchQuery) => fetchResults(searchQuery), 1000),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    Fetch(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const displayedResults =
    selectedCategory === "All"
      ? [...results.Books, ...results.Authors]
      : results[selectedCategory] || [];

  // Inline styles
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "50px auto",
      padding: "20px",
      background: "linear-gradient(135deg, #ffffff, #f9fafb)",
      borderRadius: "16px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#2d3748",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #cbd5e0",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    categoryButtons: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
    },
    button: {
      padding: "8px 16px",
      margin: "0 5px",
      fontSize: "14px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: "#3182ce",
      color: "white",
      transition: "all 0.3s ease",
    },
    activeButton: {
      backgroundColor: "#2c5282",
    },
    list: {
      listStyleType: "none",
      padding: "0",
    },
    listItem: {
      padding: "8px",
      fontSize: "16px",
      borderBottom: "1px solid #e2e8f0",
    },
    loading: {
      fontSize: "16px",
      color: "#718096",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}> Categorized Search</h2>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        style={styles.input}
      />
      <div style={styles.categoryButtons}>
        {["All", "Books", "Authors"].map((category) => (
          <button
            key={category}
            style={{
              ...styles.button,
              ...(selectedCategory === category ? styles.activeButton : {}),
            }}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {loading && <p style={styles.loading}>Loading...</p>}
      <ul style={styles.list}>
        {displayedResults.map((result, index) => (
          <li key={index} style={styles.listItem}>
            {result}
          </li>
        ))}
      </ul>
      {!loading && displayedResults.length === 0 && (
        <p style={styles.loading}>No results found.</p>
      )}
    </div>
  );
};

export default CategorizedSearch;
