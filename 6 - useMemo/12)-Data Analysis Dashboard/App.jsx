import React, { useState, useMemo } from 'react';

// Simulated large dataset (e.g., sales data over time)
const generateDataset = (size = 1000) => {
  const dataset = [];
  for (let i = 0; i < size; i++) {
    dataset.push({
      date: `2023-12-${String(i + 1).padStart(2, '0')}`,
      value: Math.floor(Math.random() * 1000) + 100, // Random sales between 100 and 1100
    });
  }
  return dataset;
};

const DataAnalysisDashboard = () => {
  const [dataset] = useState(generateDataset());
  const [filterDateRange, setFilterDateRange] = useState([0, dataset.length - 1]);

  // Deriving metrics using useMemo for performance optimization
  const { average, median, trend } = useMemo(() => {
    const filteredData = dataset.slice(filterDateRange[0], filterDateRange[1] + 1);
    const values = filteredData.map(item => item.value);
    
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = sortedValues.length % 2 === 0
      ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
      : sortedValues[Math.floor(sortedValues.length / 2)];
    
    // Simple trend calculation (could be extended to more complex trend analysis)
    const trend = (values[values.length - 1] - values[0]) / values[0] * 100;

    return { average, median, trend };
  }, [dataset, filterDateRange]);

  // Handling filter range change
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setFilterDateRange((prevRange) => ({
      ...prevRange,
      [name]: parseInt(value, 10),
    }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Data Analysis Dashboard</h1>
      
      {/* Filter Section */}
      <div style={styles.filterContainer}>
        <label style={styles.filterLabel}>
          Start Date Index:
          <input
            type="number"
            name="0"
            min="0"
            max={dataset.length - 1}
            value={filterDateRange[0]}
            onChange={handleDateRangeChange}
            style={styles.filterInput}
          />
        </label>
        <label style={styles.filterLabel}>
          End Date Index:
          <input
            type="number"
            name="1"
            min="0"
            max={dataset.length - 1}
            value={filterDateRange[1]}
            onChange={handleDateRangeChange}
            style={styles.filterInput}
          />
        </label>
      </div>

      {/* Derived Metrics Display */}
      <div style={styles.metricsContainer}>
        <div style={styles.metricCard}>
          <h3>Average Sales: </h3>
          <p style={styles.metricValue}>${average.toFixed(2)}</p>
        </div>
        <div style={styles.metricCard}>
          <h3>Median Sales: </h3>
          <p style={styles.metricValue}>${median.toFixed(2)}</p>
        </div>
        <div style={styles.metricCard}>
          <h3>Sales Trend: </h3>
          <p style={styles.metricValue}>
            {trend >= 0 ? `+${trend.toFixed(2)}%` : `${trend.toFixed(2)}%`}
          </p>
        </div>
      </div>

      {/* Raw Data Section */}
      <h2 style={styles.rawDataHeader}>Raw Data (Filtered)</h2>
      <div style={styles.dataContainer}>
        {dataset.slice(filterDateRange[0], filterDateRange[1] + 1).map((item, index) => (
          <div key={index} style={styles.dataItem}>
            <span>{item.date}: </span>
            <span>${item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline Styles for clean UI design
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    fontSize: '2.5em',
    marginBottom: '30px',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  filterLabel: {
    fontSize: '1.1em',
    fontWeight: 'bold',
  },
  filterInput: {
    padding: '5px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '80px',
    marginLeft: '10px',
  },
  metricsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '30px',
  },
  metricCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '30%',
    textAlign: 'center',
  },
  metricValue: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#4caf50',
  },
  rawDataHeader: {
    fontSize: '1.8em',
    textAlign: 'center',
    marginBottom: '20px',
  },
  dataContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  dataItem: {
    fontSize: '1.2em',
    padding: '5px',
    borderBottom: '1px solid #eee',
  },
};

export default DataAnalysisDashboard;
