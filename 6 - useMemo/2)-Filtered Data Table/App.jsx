import React, { useState, useMemo } from 'react';

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', age: 28, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 34, city: 'Los Angeles' },
  { id: 3, name: 'Samuel Johnson', age: 22, city: 'Chicago' },
  { id: 4, name: 'Mary Clark', age: 40, city: 'San Francisco' },
  { id: 5, name: 'Paul Allen', age: 30, city: 'Seattle' },
  { id: 6, name: 'Rachel Adams', age: 25, city: 'New York' },
];

const FilteredDataTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  // Filter and search logic using useMemo to optimize performance
  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      const matchesSearchQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCityFilter = selectedCity ? item.city === selectedCity : true;

      return matchesSearchQuery && matchesCityFilter;
    });
  }, [searchQuery, selectedCity]); // Only recompute when searchQuery or selectedCity changes

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Filtered Data Table</h1>
      
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by name or city"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          style={styles.selectInput}
        >
          <option value="">Filter by city</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Seattle">Seattle</option>
        </select>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Age</th>
            <th style={styles.tableHeader}>City</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row) => (
              <tr key={row.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{row.id}</td>
                <td style={styles.tableCell}>{row.name}</td>
                <td style={styles.tableCell}>{row.age}</td>
                <td style={styles.tableCell}>{row.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={styles.noData}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#333',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '20px',
  },
  filters: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '200px',
  },
  selectInput: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  },
  tableRow: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  noData: {
    textAlign: 'center',
    padding: '20px',
    color: '#777',
    fontSize: '1.2rem',
    fontStyle: 'italic',
  },
};

export default FilteredDataTable;
