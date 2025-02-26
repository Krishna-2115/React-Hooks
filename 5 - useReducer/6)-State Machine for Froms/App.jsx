import React, { useReducer, useState } from 'react';

// Initial state for the form with steps and validation status
const initialState = {
  currentStep: 1,
  formData: {
    name: '',
    email: '',
    password: '',
  },
  errors: {},
  isValid: false,
};

// Reducer to handle form steps, data updates, and validations
const formReducer = (state, action) => {
  switch (action.type) {
    case 'NEXT':
      if (state.currentStep < 3) {
        return { ...state, currentStep: state.currentStep + 1 };
      }
      return state;
    case 'PREVIOUS':
      if (state.currentStep > 1) {
        return { ...state, currentStep: state.currentStep - 1 };
      }
      return state;
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        },
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'SET_VALIDITY':
      return { ...state, isValid: action.payload };
    default:
      return state;
  }
};

// Helper function to validate the fields
const validateStep = (step, data) => {
  const errors = {};
  let isValid = true;

  if (step === 1) {
    // Validation for step 1 (name)
    if (!data.name) {
      errors.name = 'Name is required';
      isValid = false;
    }
  } else if (step === 2) {
    // Validation for step 2 (email)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!data.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(data.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }
  } else if (step === 3) {
    // Validation for step 3 (password)
    if (!data.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (data.password.length < 6) {
      errors.password = 'Password should be at least 6 characters';
      isValid = false;
    }
  }

  return { errors, isValid };
};

// Multi-Step Form Component
const MultiStepForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isFormValid, setIsFormValid] = useState(false);

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', payload: { name, value } });
  };

  // Handle next button click
  const handleNext = () => {
    const { errors, isValid } = validateStep(state.currentStep, state.formData);
    if (isValid) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      dispatch({ type: 'NEXT' });
    } else {
      dispatch({ type: 'SET_ERRORS', payload: errors });
    }
  };

  // Handle previous button click
  const handlePrevious = () => {
    dispatch({ type: 'PREVIOUS' });
  };

  // Handle form submission
  const handleSubmit = () => {
    const { errors, isValid } = validateStep(state.currentStep, state.formData);
    if (isValid) {
      alert('Form Submitted Successfully!');
    } else {
      dispatch({ type: 'SET_ERRORS', payload: errors });
    }
  };

  // Render specific step based on the currentStep
  const renderStep = () => {
    if (state.currentStep === 1) {
      return (
        <div>
          <h2 style={styles.stepTitle}>Step 1: Enter Name</h2>
          <input
            type="text"
            name="name"
            value={state.formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            style={styles.input}
          />
          {state.errors.name && <p style={styles.errorText}>{state.errors.name}</p>}
        </div>
      );
    } else if (state.currentStep === 2) {
      return (
        <div>
          <h2 style={styles.stepTitle}>Step 2: Enter Email</h2>
          <input
            type="email"
            name="email"
            value={state.formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            style={styles.input}
          />
          {state.errors.email && <p style={styles.errorText}>{state.errors.email}</p>}
        </div>
      );
    } else if (state.currentStep === 3) {
      return (
        <div>
          <h2 style={styles.stepTitle}>Step 3: Enter Password</h2>
          <input
            type="password"
            name="password"
            value={state.formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={styles.input}
          />
          {state.errors.password && <p style={styles.errorText}>{state.errors.password}</p>}
        </div>
      );
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Multi-Step Form</h1>
      <div style={styles.progressBar}>
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            style={{
              ...styles.progressStep,
              backgroundColor: step <= state.currentStep ? '#3498db' : '#ddd',
            }}
          >
            {step}
          </div>
        ))}
      </div>

      {renderStep()}

      <div style={styles.buttons}>
        {state.currentStep > 1 && (
          <button onClick={handlePrevious} style={styles.button}>
            Previous
          </button>
        )}

        {state.currentStep < 3 ? (
          <button onClick={handleNext} style={styles.button}>
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} style={styles.submitButton}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    color: '#333',
    fontFamily: "'Roboto', sans-serif",
  },
  heading: {
    fontSize: '30px',
    color: '#2c3e50',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  progressStep: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#fff',
    margin: '0 10px',
    transition: 'background-color 0.3s',
  },
  stepTitle: {
    fontSize: '24px',
    color: '#3498db',
    fontWeight: '600',
    marginBottom: '10px',
  },
  input: {
    padding: '14px 18px',
    fontSize: '16px',
    width: '94%',
    border: '2px solid #3498db',
    borderRadius: '8px',
    marginBottom: '20px',
    transition: 'border-color 0.3s',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '14px',
    marginTop: '-12px',
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
  },
  button: {
    padding: '14px 18px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '30%',
    transition: 'transform 0.2s ease, box-shadow 0.3s',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  submitButton: {
    padding: '14px 18px',
    fontSize: '16px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '30%',
    transition: 'transform 0.2s ease, box-shadow 0.3s',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};

export default MultiStepForm;
