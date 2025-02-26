import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";

// Custom Input Component with Masking (e.g., Credit Card Input)
const MaskedInput = forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  // Method to format input (e.g., credit card number formatting)
  const formatInput = (value) => {
    let formattedValue = value.replace(/\D/g, ""); // Remove non-digit characters
    formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 "); // Format with spaces
    setInputValue(formattedValue);
  };

  // Method to clear input
  const clearInput = () => {
    setInputValue("");
    setIsValid(true);
  };

  // Method to validate input (e.g., valid credit card length and format)
  const validateInput = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    const isValidCard = cleanedValue.length === 16; // Simple validation for credit card length
    setIsValid(isValidCard);
    return isValidCard;
  };

  // Handle input changes
  const handleChange = (e) => {
    const value = e.target.value;
    formatInput(value);
    validateInput(value);
  };

  // Exposing methods to the parent component
  useImperativeHandle(ref, () => ({
    formatInput,
    clearInput,
    validateInput: () => validateInput(inputValue),
  }));

  return (
    <div style={styles.inputWrapper}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter credit card number"
        style={{
          ...styles.input,
          borderColor: isValid ? "#ccc" : "#e74c3c",
        }}
      />
      {!isValid && <p style={styles.errorText}>Invalid credit card number</p>}
    </div>
  );
});

// Parent Component to Control the Input
const ParentComponent = () => {
  const inputRef = useRef();

  const handleFormatInput = () => {
    inputRef.current.formatInput("1234567812345678");
  };

  const handleClearInput = () => {
    inputRef.current.clearInput();
  };

  const handleValidateInput = () => {
    const isValid = inputRef.current.validateInput();
    alert(isValid ? "Valid" : "Invalid");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Credit Card Input Masking</h2>
      <div style={styles.buttonPanel}>
        <button onClick={handleFormatInput} style={styles.button}>
          Format Input (Pre-fill)
        </button>
        <button onClick={handleClearInput} style={styles.button}>
          Clear Input
        </button>
        <button onClick={handleValidateInput} style={styles.button}>
          Validate Input
        </button>
      </div>
      <MaskedInput ref={inputRef} />
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    backgroundColor: "#f4f6f7",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    margin: "0 auto",
  },
  header: {
    fontSize: "24px",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  buttonPanel: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 25px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    maxWidth: "350px",
    marginBottom: "10px",
    transition: "border-color 0.3s",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: "12px",
    margin: "5px 0 0",
  },
};

export default ParentComponent;
