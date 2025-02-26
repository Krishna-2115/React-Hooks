import React, { useState } from "react";

const MultiLevelForm = () => {
  const [level1, setLevel1] = useState({ name: "", email: "" });
  const [level2, setLevel2] = useState({ address: "", city: "" });
  const [level3, setLevel3] = useState({ password: "", confirmPassword: "" });

  const [level1Valid, setLevel1Valid] = useState(false);
  const [level2Valid, setLevel2Valid] = useState(false);
  const [level3Valid, setLevel3Valid] = useState(false);

  const validateLevel1 = () => {
    setLevel1Valid(level1.name.trim() !== "" && /\S+@\S+\.\S+/.test(level1.email));
  };

  const validateLevel2 = () => {
    setLevel2Valid(level2.address.trim() !== "" && level2.city.trim() !== "");
  };

  const validateLevel3 = () => {
    setLevel3Valid(
      level3.password.length >= 8 && level3.password === level3.confirmPassword
    );
  };

  const isFormValid = level1Valid && level2Valid && level3Valid;

  const handleSubmit = () => {
    alert("Form submitted successfully!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dynamic Multi-Level Form</h1>
      <div style={styles.progressContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: `${((level1Valid + level2Valid + level3Valid) / 3) * 100}%`,
          }}
        />
      </div>
      <div style={styles.level}>
        <h2 style={styles.levelTitle}>Step 1: Personal Details</h2>
        <input
          style={styles.input}
          value={level1.name}
          onChange={(e) => setLevel1({ ...level1, name: e.target.value })}
          onBlur={validateLevel1}
          placeholder="Full Name"
        />
        <input
          style={styles.input}
          value={level1.email}
          onChange={(e) => setLevel1({ ...level1, email: e.target.value })}
          onBlur={validateLevel1}
          placeholder="Email Address"
        />
        {!level1Valid && <span style={styles.error}>Please complete Step 1</span>}
      </div>
      <div style={styles.level}>
        <h2 style={styles.levelTitle}>Step 2: Address Details</h2>
        <input
          style={styles.input}
          value={level2.address}
          onChange={(e) => setLevel2({ ...level2, address: e.target.value })}
          onBlur={validateLevel2}
          placeholder="Street Address"
        />
        <input
          style={styles.input}
          value={level2.city}
          onChange={(e) => setLevel2({ ...level2, city: e.target.value })}
          onBlur={validateLevel2}
          placeholder="City"
        />
        {!level2Valid && <span style={styles.error}>Please complete Step 2</span>}
      </div>
      <div style={styles.level}>
        <h2 style={styles.levelTitle}>Step 3: Security Details</h2>
        <input
          type="password"
          style={styles.input}
          value={level3.password}
          onChange={(e) => setLevel3({ ...level3, password: e.target.value })}
          onBlur={validateLevel3}
          placeholder="Password"
        />
        <input
          type="password"
          style={styles.input}
          value={level3.confirmPassword}
          onChange={(e) =>
            setLevel3({ ...level3, confirmPassword: e.target.value })
          }
          onBlur={validateLevel3}
          placeholder="Confirm Password"
        />
        {!level3Valid && (
          <span style={styles.error}>
            Password must match and be at least 8 characters long
          </span>
        )}
      </div>
      <button
        style={{
          ...styles.submitButton,
          backgroundColor: isFormValid ? "#007bff" : "#ccc",
          cursor: isFormValid ? "pointer" : "not-allowed",
        }}
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: "90%",
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "15px",
    backgroundColor: "#f0f8ff",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    color: "#0056b3",
    marginBottom: "20px",
  },
  progressContainer: {
    height: "8px",
    backgroundColor: "#d0e7ff",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#0056b3",
    transition: "width 0.4s ease",
  },
  level: {
    marginBottom: "20px",
  },
  levelTitle: {
    fontSize: "18px",
    color: "#004085",
    marginBottom: "10px",
  },
  input: {
    width: "95%",
    padding: "12px 15px",
    marginBottom: "10px",
    border: "1px solid #bdd8ff",
    borderRadius: "10px",
    fontSize: "14px",
    backgroundColor: "#e9f3ff",
    transition: "box-shadow 0.3s ease",
  },
  error: {
    display: "block",
    fontSize: "13px",
    color: "#dc3545",
    marginTop: "-5px",
    marginBottom: "10px",
  },
  submitButton: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    transition: "background-color 0.3s ease",
  },
};

export default MultiLevelForm;
