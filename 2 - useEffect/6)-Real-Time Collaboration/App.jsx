import { useState, useEffect } from 'react';

const CollaborativeEditor = () => {
  const [text, setText] = useState(''); // Store text state
  const [socket, setSocket] = useState(null); // WebSocket connection

  // Setup WebSocket connection on component mount
  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    // Listen for incoming text changes from other users
    ws.onmessage = (event) => {
      const incomingText = event.data;
      // Update local text when another user modifies content
      setText(incomingText);
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  // Handle text change from the user and send it to the server
  const handleChange = (e) => {
    const updatedText = e.target.value;
    setText(updatedText);

    // Send the updated text to the WebSocket server
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(updatedText);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Collaborative Text Editor</h1>
      <textarea
        value={text} // Bind textarea to the 'text' state
        onChange={handleChange} // Update text state on change
        style={{
          width: '100%',
          height: '400px',
          fontSize: '16px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};

export default CollaborativeEditor;
