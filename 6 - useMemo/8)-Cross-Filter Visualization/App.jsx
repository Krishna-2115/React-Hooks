import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2020-01-01', value: 10 },
  { date: '2020-02-01', value: 15 },
  { date: '2020-03-01', value: 20 },
  { date: '2021-01-01', value: 25 },
  { date: '2021-02-01', value: 30 },
  { date: '2021-03-01', value: 35 },
  { date: '2022-01-01', value: 40 },
  { date: '2022-02-01', value: 45 },
  { date: '2022-03-01', value: 50 },
  // Add more data points as needed
];

const Dashboard = () => {
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2022-12-31');

  // Memoize the filtered data based on the selected date range
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return item.date >= startDate && item.date <= endDate;
    });
  }, [startDate, endDate]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Scatter Plot with Date Range Filter</h2>

      {/* Date Range Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="start-date" style={{ marginRight: '10px' }}>Start Date: </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          style={{ padding: '8px', fontSize: '16px', marginRight: '20px' }}
        />
        <label htmlFor="end-date" style={{ marginRight: '10px' }}>End Date: </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
        />
      </div>

      {/* Scatter Plot */}
      <h3>Filtered Data (Date Range: {startDate} to {endDate})</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis dataKey="date" name="Date" />
          <YAxis dataKey="value" name="Value" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Data Points" data={filteredData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
