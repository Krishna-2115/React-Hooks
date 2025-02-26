import React, { useState, useMemo } from 'react';

const ExpensiveComputation = () => {
  const [number, setNumber] = useState(10);

  // Function to calculate factorial of a number
  const factorial = (n) => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  // useMemo hook ensures factorial is recalculated only when 'number' changes
  const memoizedFactorial = useMemo(() => {
    console.log('Recalculating factorial...');
    return factorial(number);
  }, [number]); // Only recompute if 'number' changes

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Factorial Calculator</h1>
        <p style={styles.description}>Calculate the factorial of a number with optimized performance.</p>
        
        <div style={styles.inputContainer}>
          <label style={styles.label}>Enter a number: </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            style={styles.input}
          />
        </div>

        <div style={styles.resultContainer}>
          <h2 style={styles.resultTitle}>Factorial: </h2>
          <div style={styles.result}>{memoizedFactorial}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '350px',
  },
  title: {
    fontSize: '2rem',
    color: '#4CAF50',
    marginBottom: '10px',
    fontWeight: '600',
  },
  description: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '10px',
    display: 'block',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.3s ease',
  },
  inputFocus: {
    border: '1px solid #4CAF50',
  },
  resultContainer: {
    marginTop: '20px',
  },
  resultTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333',
  },
  result: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: '10px',
  },
};

export default ExpensiveComputation;
