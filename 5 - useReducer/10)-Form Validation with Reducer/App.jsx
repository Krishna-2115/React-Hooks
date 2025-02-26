import React, { useReducer } from 'react';
import { motion } from 'framer-motion';

const initialState = {
  name: '',
  email: '',
  password: '',
  errors: {},
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value, errors: { ...state.errors, [action.field]: '' } };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.error } };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const validateField = (field, value) => {
  switch (field) {
    case 'name':
      return value.length < 3 ? 'Name must be at least 3 characters' : '';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format';
    case 'password':
      return value.length < 6 ? 'Password must be at least 6 characters' : '';
    default:
      return '';
  }
};

const AdvancedForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
    const error = validateField(name, value);
    if (error) dispatch({ type: 'SET_ERROR', field: name, error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    Object.keys(state).forEach((field) => {
      if (field !== 'errors') {
        const error = validateField(field, state[field]);
        if (error) {
          dispatch({ type: 'SET_ERROR', field, error });
          valid = false;
        }
      }
    });
    if (valid) {
      alert('Form submitted successfully!');
      dispatch({ type: 'RESET' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}
    >
      <motion.form
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onSubmit={handleSubmit}
        style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', marginBottom: '24px', color: '#2563eb' }}>Register</h2>

        {['name', 'email', 'password'].map((field) => (
          <div key={field} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#374151', fontSize: '14px', fontWeight: '600', marginBottom: '6px', textTransform: 'capitalize' }}>
              {field}
            </label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={state[field]}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${state.errors[field] ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
            />
            {state.errors[field] && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{state.errors[field]}</p>}
          </div>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            border: 'none',
            transition: 'background-color 0.3s',
          }}
        >
          Submit
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AdvancedForm;
