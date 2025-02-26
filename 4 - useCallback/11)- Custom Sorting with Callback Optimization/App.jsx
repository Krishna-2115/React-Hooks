import React, { useState, useCallback } from "react";

const SortableTable = () => {
  // Sample data for the table
  const data = [
    { name: "Alice", age: 24, country: "USA" },
    { name: "Bob", age: 30, country: "Canada" },
    { name: "Charlie", age: 28, country: "UK" },
    { name: "David", age: 35, country: "Australia" },
    { name: "Eve", age: 22, country: "USA" },
    { name: "Frank", age: 27, country: "Germany" },
    { name: "Grace", age: 29, country: "USA" },
    { name: "Hannah", age: 32, country: "Canada" },
    { name: "Ivy", age: 25, country: "UK" },
    { name: "Jack", age: 33, country: "Australia" },
  ];

  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedAndFilteredData = useCallback(() => {
    let filteredData = data.filter((item) =>
      Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    let sortedArray = [...filteredData].sort((a, b) => {
      if (!sortConfig.key) return 0;
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    return sortedArray;
  }, [data, sortConfig, searchTerm]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const paginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData().slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, sortedAndFilteredData]);

  const totalPages = Math.ceil(sortedAndFilteredData().length / itemsPerPage);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Sortable & Searchable Table</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: "100%",
          padding: "10px",
          margin: "20px 0",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th
              style={{
                cursor: "pointer",
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
                transition: "background-color 0.3s",
              }}
              onClick={() => handleSort("name")}
            >
              Name
              {sortConfig.key === "name" && (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </th>
            <th
              style={{
                cursor: "pointer",
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
                transition: "background-color 0.3s",
              }}
              onClick={() => handleSort("age")}
            >
              Age
              {sortConfig.key === "age" && (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </th>
            <th
              style={{
                cursor: "pointer",
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
                transition: "background-color 0.3s",
              }}
              onClick={() => handleSort("country")}
            >
              Country
              {sortConfig.key === "country" && (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData().map((item, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>{item.name}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>{item.age}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>{item.country}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          style={{ padding: "10px", margin: "0 5px", cursor: "pointer", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}
        >
          Prev
        </button>
        <span style={{ padding: "10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          style={{ padding: "10px", margin: "0 5px", cursor: "pointer", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SortableTable;
