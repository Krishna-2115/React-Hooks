import React, { useState, useDeferredValue } from 'react';

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const deferredMessage = useDeferredValue(message);

  return (
    <div className="p-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 border rounded"
        placeholder="Type a message..."
      />
      <div className="mt-4">
        <h3 className="font-semibold">Preview:</h3>
        <p>{deferredMessage}</p>
      </div>
    </div>
  );
};

export default ChatApp;
