import React, { useState, useEffect } from "react";

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const validatePassword = () => {
      if (formData.password && formData.password !== formData.confirmPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
      }
    };

    if (formData.password || formData.confirmPassword) {
      validatePassword();
    }
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    const validatePhoneNumber = () => {
      const phoneRegex = /^[0-9]{10}$/;
      if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Invalid phone number",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
      }
    };

    validatePhoneNumber();
  }, [formData.phoneNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every((error) => error === "")) {
      alert("Form submitted successfully");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Profile Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.errorText}>{errors.email}</p>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.password && <p style={styles.errorText}>{errors.password}</p>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.confirmPassword && (
            <p style={styles.errorText}>{errors.confirmPassword}</p>
          )}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="phoneNumber">
            Phone Number:
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.phoneNumber && (
            <p style={styles.errorText}>{errors.phoneNumber}</p>
          )}
        </div>
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "50%",
    margin: "0 auto",
    backgroundColor: "#212121",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
    color: "#fff",
    fontFamily: "'Roboto', sans-serif",
    animation: "fadeIn 1s ease-in-out",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    color: "#ff7043",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "16px",
    marginBottom: "8px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    width: "100%",
    backgroundColor: "#333",
    color: "#fff",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  },
  submitButton: {
    padding: "15px 30px",
    backgroundColor: "#ff7043",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#fff",
    transition: "background-color 0.3s ease",
  },
  errorText: {
    color: "#e57373",
    fontSize: "14px",
    marginTop: "5px",
  },
};

export default UserProfileForm;
