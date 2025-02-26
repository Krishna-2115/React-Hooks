import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';

// Child Component (Form Component)
const Form = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setFormData({ name: '', email: '' });
    setErrors({ name: '', email: '' });
  };

  // Expose methods to the parent using useImperativeHandle
  useImperativeHandle(ref, () => ({
    reset,
    validate,
  }));

  return (
    <div style={styles.formContainer}>
      <div style={styles.formGroup}>
        <label htmlFor="name" style={styles.label}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ ...styles.input, ...(errors.name ? styles.errorInput : {}) }}
        />
        {errors.name && <div style={styles.errorMessage}>{errors.name}</div>}
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="email" style={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ ...styles.input, ...(errors.email ? styles.errorInput : {}) }}
        />
        {errors.email && <div style={styles.errorMessage}>{errors.email}</div>}
      </div>
    </div>
  );
});

// Parent Component
const ParentComponent = () => {
  const formRef = useRef();

  const handleReset = () => {
    formRef.current.reset();
  };

  const handleValidate = () => {
    const isValid = formRef.current.validate();
    if (isValid) {
      alert('Form is valid!');
    } else {
      alert('Please fill out the required fields.');
    }
  };

  return (
    <div style={styles.parentContainer}>
      <h2 style={styles.header}>Form</h2>
      <Form ref={formRef} />
      <button onClick={handleValidate} style={{ ...styles.button, ...styles.validateButton }}>
        Validate Form
      </button>
      <button onClick={handleReset} style={{ ...styles.button, ...styles.resetButton }}>
        Reset Form
      </button>
    </div>
  );
};

// Inline Styles
const styles = {
  parentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#2c3e50',
    marginBottom: '20px',
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    color: '#7f8c8d',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  errorInput: {
    borderColor: '#e74c3c',
  },
  errorMessage: {
    fontSize: '12px',
    color: '#e74c3c',
    marginTop: '5px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  validateButton: {
    backgroundColor: '#3498db',
    color: '#fff',
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
  },
};

export default ParentComponent;
