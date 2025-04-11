import React, { useState, useDeferredValue } from 'react';

const FormValidation = () => {
  const [input, setInput] = useState('');
  const deferredInput = useDeferredValue(input);

  const validateInput = (inputValue) => {
    if (inputValue.length < 5) return 'Input must be at least 5 characters long.';
    return '';
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border rounded"
        placeholder="Enter text..."
      />
      <div className="mt-4">
        <p className="text-red-500">{validateInput(deferredInput)}</p>
      </div>
    </div>
  );
};

export default FormValidation;
