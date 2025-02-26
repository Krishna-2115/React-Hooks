import React, { useState, useMemo } from 'react';

// Styling for a more professional and modern look
const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7fc',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2.5em',
    marginBottom: '30px',
  },
  filtersContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  filterCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '48%',
    boxSizing: 'border-box',
  },
  filterLabel: {
    fontSize: '1.1em',
    color: '#666',
    marginBottom: '10px',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  selectField: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  widgetGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '40px',
  },
  widgetCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '30%',
    boxSizing: 'border-box',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  widgetCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  widgetTitle: {
    fontSize: '1.5em',
    color: '#333',
    marginBottom: '10px',
  },
  widgetContent: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#007bff',
  },
  chartContainer: {
    textAlign: 'center',
    marginTop: '40px',
  },
};

const Dashboard = () => {
  // Sample data
  const salesData = [
    { date: '2025-01-01', amount: 100 },
    { date: '2025-01-02', amount: 200 },
    { date: '2025-01-03', amount: 300 },
    { date: '2025-01-04', amount: 150 },
    { date: '2025-01-05', amount: 250 },
  ];

  const customerData = [
    { name: 'Customer 1', type: 'Regular' },
    { name: 'Customer 2', type: 'VIP' },
    { name: 'Customer 3', type: 'VIP' },
    { name: 'Customer 4', type: 'Regular' },
  ];

  const orderData = [
    { orderId: 1, status: 'Delivered' },
    { orderId: 2, status: 'Pending' },
    { orderId: 3, status: 'Delivered' },
    { orderId: 4, status: 'Cancelled' },
  ];

  // Filters
  const [dateRange, setDateRange] = useState([null, null]);
  const [customerType, setCustomerType] = useState(null);

  // Memoize filtered data
  const filteredSales = useMemo(() => {
    return salesData.filter(item => {
      if (dateRange[0] && dateRange[1]) {
        const date = new Date(item.date);
        return date >= dateRange[0] && date <= dateRange[1];
      }
      return true;
    });
  }, [salesData, dateRange]);

  const filteredCustomers = useMemo(() => {
    return customerData.filter(item => {
      if (customerType) {
        return item.type === customerType;
      }
      return true;
    });
  }, [customerData, customerType]);

  const filteredOrders = useMemo(() => {
    return orderData.filter(item => {
      return true; // Example: add filter logic if needed
    });
  }, [orderData]);

  // Calculate summaries
  const totalSales = useMemo(() => {
    return filteredSales.reduce((total, item) => total + item.amount, 0);
  }, [filteredSales]);

  const totalCustomers = useMemo(() => {
    return filteredCustomers.length;
  }, [filteredCustomers]);

  const totalOrders = useMemo(() => {
    return filteredOrders.length;
  }, [filteredOrders]);

  // Handle date range change
  const handleDateChange = (e) => {
    const value = e.target.value;
    const [start, end] = value.split('to');
    setDateRange([new Date(start.trim()), new Date(end.trim())]);
  };

  // Handle customer type filter change
  const handleCustomerTypeChange = (e) => {
    setCustomerType(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Dynamic Dashboard</h1>

      {/* Filters */}
      <div style={styles.filtersContainer}>
        <div style={styles.filterCard}>
          <label style={styles.filterLabel}>Choose Date Range: </label>
          <input
            type="text"
            placeholder="YYYY-MM-DD to YYYY-MM-DD"
            style={styles.inputField}
            onBlur={handleDateChange}
          />
        </div>

        <div style={styles.filterCard}>
          <label style={styles.filterLabel}>Customer Type: </label>
          <select
            style={styles.selectField}
            onChange={handleCustomerTypeChange}
          >
            <option value="">All</option>
            <option value="Regular">Regular</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div style={styles.widgetGrid}>
        {/* Sales Widget */}
        <div
          style={{
            ...styles.widgetCard,
            ...(styles.widgetCardHover), // Hover effect
          }}
        >
          <h3 style={styles.widgetTitle}>Total Sales</h3>
          <p style={styles.widgetContent}>${totalSales}</p>
        </div>

        {/* Customers Widget */}
        <div
          style={{
            ...styles.widgetCard,
            ...(styles.widgetCardHover), // Hover effect
          }}
        >
          <h3 style={styles.widgetTitle}>Total Customers</h3>
          <p style={styles.widgetContent}>{totalCustomers}</p>
        </div>

        {/* Orders Widget */}
        <div
          style={{
            ...styles.widgetCard,
            ...(styles.widgetCardHover), // Hover effect
          }}
        >
          <h3 style={styles.widgetTitle}>Total Orders</h3>
          <p style={styles.widgetContent}>{totalOrders}</p>
        </div>
      </div>

      {/* Sales Trend (Line Chart or Data Representation) */}
      <div style={styles.chartContainer}>
        <h3>Sales Trend</h3>
        {/* Placeholder for chart */}
        <canvas id="salesTrend" width="600" height="300"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
