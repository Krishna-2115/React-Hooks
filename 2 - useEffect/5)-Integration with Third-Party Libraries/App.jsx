import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const DynamicChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [10, 20, 30, 40, 50],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy previous chart before creating a new one
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]);

  const updateChartData = () => {
    setChartData({
      labels: ['June', 'July', 'August', 'September', 'October'],
      datasets: [
        {
          label: 'Revenue',
          data: [50, 40, 60, 80, 100],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div style={{ width: '600px', height: '400px', margin: '0 auto', textAlign: 'center' }}>
      <canvas ref={chartRef}></canvas>
      <button
        onClick={updateChartData}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Update Chart
      </button>
    </div>
  );
};

export default DynamicChart;
