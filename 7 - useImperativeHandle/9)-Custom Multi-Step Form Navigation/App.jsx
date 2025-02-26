import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";

// Child Component: Multi-Step Form with Inputs
const MultiStepForm = forwardRef((props, ref) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmation: "",
  });

  const steps = [
    { label: "Step 1", content: "Enter your name", field: "name" },
    { label: "Step 2", content: "Enter your email", field: "email" },
    { label: "Step 3", content: "Enter your password", field: "password" },
    { label: "Step 4", content: "Confirm details", field: "confirmation" },
  ];

  // Exposing navigation methods to parent component
  useImperativeHandle(ref, () => ({
    goToNextStep: () => {
      if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    },
    goToPreviousStep: () => {
      if (currentStep > 0) setCurrentStep(currentStep - 1);
    },
    resetForm: () => {
      setCurrentStep(0);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmation: "",
      });
    },
  }));

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Multi-Step Form</h2>
      <div style={styles.stepContent}>
        <h3 style={styles.stepTitle}>{steps[currentStep].label}</h3>
        <p>{steps[currentStep].content}</p>
        <input
          type="text"
          name={steps[currentStep].field}
          value={formData[steps[currentStep].field]}
          onChange={handleInputChange}
          style={styles.input}
          placeholder={` ${steps[currentStep].content.toLowerCase()}`}
        />
      </div>
      <div style={styles.buttonContainer}>
        {currentStep > 0 && (
          <button onClick={() => setCurrentStep(currentStep - 1)} style={styles.button}>Previous</button>
        )}
        {currentStep < steps.length - 1 ? (
          <button onClick={() => setCurrentStep(currentStep + 1)} style={styles.button}>Next</button>
        ) : (
          <button style={styles.button}>Submit</button>
        )}
      </div>
    </div>
  );
});

// Parent Component: Controls Multi-Step Form Navigation
const ParentComponent = () => {
  const formRef = useRef();

  return (
    <div style={styles.container}>
      <h2 style={styles.mainHeader}>Parent-Controlled Multi-Step Form</h2>
      <div style={styles.buttonContainer}>
        <button onClick={() => formRef.current.goToNextStep()} style={styles.controlButton}>Go to Next Step</button>
        <button onClick={() => formRef.current.goToPreviousStep()} style={styles.controlButton}>Go to Previous Step</button>
        <button onClick={() => formRef.current.resetForm()} style={styles.controlButton}>Reset Form</button>
      </div>
      <MultiStepForm ref={formRef} />
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
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  mainHeader: {
    fontSize: "24px",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "20px",
    color: "#34495e",
    marginBottom: "15px",
  },
  stepContent: {
    fontSize: "16px",
    color: "#555",
    textAlign: "center",
    marginBottom: "20px",
  },
  stepTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2980b9",
  },
  input: {
    width: "80%",
    padding: "10px",
    marginTop: "15px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  controlButton: {
    padding: "12px 25px",
    backgroundColor: "#e67e22",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default ParentComponent;
