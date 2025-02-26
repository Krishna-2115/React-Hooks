import React, { useReducer, useState } from "react";
import { motion } from "framer-motion";

// Initial Form State
const initialState = {
  step: 1,
  personalInfo: { firstName: "", lastName: "" },
  contactInfo: { email: "", phone: "" },
  preferences: { newsletter: false, notifications: false },
};

// Reducer Function
const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_PERSONAL_INFO":
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case "SET_CONTACT_INFO":
      return { ...state, contactInfo: { ...state.contactInfo, ...action.payload } };
    case "SET_PREFERENCES":
      return { ...state, preferences: { ...state.preferences, ...action.payload } };
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREVIOUS_STEP":
      return { ...state, step: state.step - 1 };
    default:
      return state;
  }
};

const MultiStepForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors = {};
    if (state.step === 1) {
      if (!state.personalInfo.firstName) newErrors.firstName = "First name is required";
      if (!state.personalInfo.lastName) newErrors.lastName = "Last name is required";
    } else if (state.step === 2) {
      if (!state.contactInfo.email) newErrors.email = "Email is required";
      if (!state.contactInfo.phone) newErrors.phone = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) dispatch({ type: "NEXT_STEP" });
  };

  const handlePrevious = () => dispatch({ type: "PREVIOUS_STEP" });

  const handleChange = (e, type) => {
    const { name, value, checked, type: inputType } = e.target;
    dispatch({
      type,
      payload: { [name]: inputType === "checkbox" ? checked : value },
    });
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: "500px",
      margin: "40px auto",
      padding: "25px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
    },
    progressBar: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
      paddingBottom: "10px",
      borderBottom: "2px solid #e0e0e0",
    },
    progressStep: (isActive) => ({
      fontWeight: "bold",
      fontSize: "14px",
      color: isActive ? "#007BFF" : "#A0AEC0",
      borderBottom: isActive ? "3px solid #007BFF" : "none",
      paddingBottom: "5px",
    }),
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      marginBottom: "8px",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.3s ease-in-out",
    },
    button: (bgColor) => ({
      width: "100px",
      padding: "10px",
      background: bgColor,
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background 0.3s ease",
    }),
    error: {
      color: "red",
      fontSize: "12px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Progress Bar */}
      <div style={styles.progressBar}>
        {["Personal", "Contact", "Preferences"].map((label, index) => (
          <span key={index} style={styles.progressStep(state.step === index + 1)}>
            {label}
          </span>
        ))}
      </div>

      {/* Animated Form Steps */}
      <motion.div
        key={state.step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {state.step === 1 && (
          <div>
            <h2>Step 1: Personal Info</h2>
            <input
              type="text"
              name="firstName"
              value={state.personalInfo.firstName}
              onChange={(e) => handleChange(e, "SET_PERSONAL_INFO")}
              placeholder="First Name"
              style={styles.input}
            />
            {errors.firstName && <p style={styles.error}>{errors.firstName}</p>}

            <input
              type="text"
              name="lastName"
              value={state.personalInfo.lastName}
              onChange={(e) => handleChange(e, "SET_PERSONAL_INFO")}
              placeholder="Last Name"
              style={styles.input}
            />
            {errors.lastName && <p style={styles.error}>{errors.lastName}</p>}

            <button onClick={handleNext} style={styles.button("#007BFF")}>
              Next
            </button>
          </div>
        )}

        {state.step === 2 && (
          <div>
            <h2>Step 2: Contact Info</h2>
            <input
              type="email"
              name="email"
              value={state.contactInfo.email}
              onChange={(e) => handleChange(e, "SET_CONTACT_INFO")}
              placeholder="Email"
              style={styles.input}
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}

            <input
              type="text"
              name="phone"
              value={state.contactInfo.phone}
              onChange={(e) => handleChange(e, "SET_CONTACT_INFO")}
              placeholder="Phone Number"
              style={styles.input}
            />
            {errors.phone && <p style={styles.error}>{errors.phone}</p>}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button onClick={handlePrevious} style={styles.button("#A0AEC0")}>
                Back
              </button>
              <button onClick={handleNext} style={styles.button("#007BFF")}>
                Next
              </button>
            </div>
          </div>
        )}

        {state.step === 3 && (
          <div>
            <h2>Step 3: Preferences</h2>
            <label>
              <input
                type="checkbox"
                name="newsletter"
                checked={state.preferences.newsletter}
                onChange={(e) => handleChange(e, "SET_PREFERENCES")}
                style={{ marginRight: "10px" }}
              />
              Subscribe to Newsletter
            </label>

            <label style={{ display: "block", marginTop: "10px" }}>
              <input
                type="checkbox"
                name="notifications"
                checked={state.preferences.notifications}
                onChange={(e) => handleChange(e, "SET_PREFERENCES")}
                style={{ marginRight: "10px" }}
              />
              Enable Notifications
            </label>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button onClick={handlePrevious} style={styles.button("#A0AEC0")}>
                Back
              </button>
              <button style={styles.button("#28A745")}>Submit</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MultiStepForm;
