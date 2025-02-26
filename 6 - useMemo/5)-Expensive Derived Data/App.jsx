import React, { useState, useMemo } from "react";

// Sample Large Dataset
const rawData = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  category: ["Electronics", "Clothing", "Home", "Sports"][i % 4],
  price: Math.floor(Math.random() * 500) + 20,
  sales: Math.floor(Math.random() * 1000) + 50,
}));

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  card: {
    padding: "15px",
    margin: "10px 0",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
};

const Dashboard = () => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);

  // Filtered Data (useMemo for performance optimization)
  const filteredData = useMemo(() => {
    return rawData.filter((item) => (!category || item.category === category) && item.price >= minPrice);
  }, [category, minPrice]);

  // Aggregated Data (useMemo to avoid unnecessary recalculations)
  const aggregatedData = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        acc.totalSales += item.sales;
        acc.totalRevenue += item.sales * item.price;
        return acc;
      },
      { totalSales: 0, totalRevenue: 0 }
    );
  }, [filteredData]);

  return (
    <div style={styles.container}>
      <h2>📊 Sales Dashboard</h2>

      {/* Filters */}
      <label>Filter by Category:</label>
      <select style={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Home">Home</option>
        <option value="Sports">Sports</option>
      </select>

      <label>Minimum Price:</label>
      <input
        type="number"
        style={styles.select}
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />

      {/* Aggregated Data */}
      <div style={styles.card}>
        <h3>📈 Summary</h3>
        <p><strong>Total Sales:</strong> {aggregatedData.totalSales}</p>
        <p><strong>Total Revenue:</strong> ${aggregatedData.totalRevenue.toLocaleString()}</p>
      </div>

      {/* Filtered Data Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Price ($)</th>
            <th style={styles.th}>Sales</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0, 10).map((item) => (
            <tr key={item.id}>
              <td style={styles.td}>{item.id}</td>
              <td style={styles.td}>{item.category}</td>
              <td style={styles.td}>{item.price}</td>
              <td style={styles.td}>{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
