import React, { useState, useEffect } from 'react';

const TextEditor = () => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Not saved');
  const [timer, setTimer] = useState(5);  // Countdown timer (in seconds)
  const [timeoutId, setTimeoutId] = useState(null);

  // Function to simulate saving content (could be an API call)
  const saveContent = () => {
    setIsSaving(true);
    setSaveStatus('Saving...');
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('Saved');
    }, 1000); // Simulate saving delay (1 second)
  };

  // Update the countdown timer
  useEffect(() => {
    if (timer === 0) {
      saveContent();
      setTimer(5); // Reset timer after saving
    } else if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Start countdown only if there is content and no user input
    const newTimeoutId = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);

    setTimeoutId(newTimeoutId);

    return () => clearTimeout(newTimeoutId); // Cleanup timeout on component unmount
  }, [timer]);

  // Handle user typing
  useEffect(() => {
    setTimer(5); // Reset timer on content change (user starts typing)
  }, [content]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div style={styles.editorContainer}>
      <h1 style={styles.title}>Auto-Save Text Editor</h1>

      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Start typing here..."
        style={styles.textarea}
      />

      <div style={styles.statusContainer}>
        <span style={styles.statusText}>{saveStatus}</span>
        {isSaving && <span style={styles.savingIndicator}>Saving...</span>}
      </div>

      <div style={styles.timerContainer}>
        <span style={styles.timerText}>
          Auto-Save in: {timer} seconds
        </span>
      </div>
    </div>
  );
};

// Styling for the editor UI
const styles = {
  editorContainer: {
    background: '#fafafa',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '50px auto',
    fontFamily: "'Roboto', sans-serif",
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '32px',
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    height: '300px',
    padding: '20px',
    fontSize: '18px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    resize: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
    marginBottom: '15px',
  },
  statusContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  statusText: {
    fontSize: '16px',
    color: '#333',
  },
  savingIndicator: {
    fontSize: '16px',
    color: '#f39c12',
    fontWeight: 'bold',
    marginLeft: '10px',
    animation: 'blink 1.5s infinite',
  },
  timerContainer: {
    textAlign: 'center',
    marginTop: '15px',
  },
  timerText: {
    fontSize: '18px',
    color: '#e74c3c',
    fontWeight: 'bold',
  },
};

export default TextEditor;
