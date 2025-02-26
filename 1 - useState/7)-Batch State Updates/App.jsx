import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextStep = (e) => {
    // Prevent form submission if "Next" is clicked
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = (e) => {
    // Prevent form submission if "Previous" is clicked
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted: " + JSON.stringify(formData, null, 2));
  };

  return (
    <div style={styles.container}>
      <h2>Multi-Step Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {step === 1 && (
          <div style={styles.step}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Enter your name"
            />
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>
        )}
        {step === 2 && (
          <div style={styles.step}>
            <label style={styles.label}>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Enter your address"
            />
            <label style={styles.label}>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Enter your city"
            />
            <label style={styles.label}>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Enter your country"
            />
          </div>
        )}
        <div style={styles.navigationButtons}>
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              style={styles.button}
            >
              Previous
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={handleNextStep}
              style={styles.button}
            >
              Next
            </button>
          ) : (
            <button type="submit" style={styles.button}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    borderRadius: "10px",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    maxWidth: "500px",
    width: "90%",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  step: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    width: "95%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
  },
  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default MultiStepForm;
