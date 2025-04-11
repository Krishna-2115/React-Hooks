import React, { useState, useDeferredValue } from 'react';

const InputDelay = () => {
  const [inputText, setInputText] = useState('');
  const deferredInputText = useDeferredValue(inputText);

  return (
    <div className="p-4">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="p-2 border rounded"
        placeholder="Type with delay..."
      />
      <div className="mt-4">
        <p className="text-gray-600">Delayed Input: {deferredInputText}</p>
      </div>
    </div>
  );
};

export default InputDelay;
