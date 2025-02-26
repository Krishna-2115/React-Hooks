import React, { useState, useEffect } from 'react';

const TextEditorWithAutoSave = () => {
  const [content, setContent] = useState('');
  const [lastSavedContent, setLastSavedContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Simulate a save to the server
  const saveContentToServer = async (content) => {
    setIsSaving(true);
    try {
      // Simulating an API call to save the content
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulated delay
      console.log('Content saved:', content);
      setLastSavedContent(content); // Update last saved content
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Periodic auto-save logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (content !== lastSavedContent) {
        saveContentToServer(content); // Save if content has changed
      }
    }, 3000); // Save every 5 seconds if content has changed

    // Clean up the interval when component unmounts
    return () => clearInterval(interval);
  }, [content, lastSavedContent]);

  // Handle content change
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
        {isSaving ? (
          <span style={styles.savingIndicator}>Saving...</span>
        ) : (
          <span style={styles.savedIndicator}>Last saved: {lastSavedContent ? '✔️' : 'Not saved yet'}</span>
        )}
      </div>
    </div>
  );
};

// Styling for the editor UI with advanced dark theme and neon accents
const styles = {
  editorContainer: {
    background: 'linear-gradient(135deg, #2d3436, #1e272e)',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    maxWidth: '800px',
    margin: '50px auto',
    fontFamily: "'Roboto', sans-serif",
    transition: 'all 0.3s ease-in-out',
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    color: '#00f5d4',  // Neon Cyan Color
    fontSize: '36px',
    marginBottom: '20px',
    textShadow: '0 0 5px rgba(0, 245, 212, 0.8), 0 0 10px rgba(0, 245, 212, 0.8)',
    animation: 'fadeIn 2s ease-out',
  },
  textarea: {
    width: '100%',
    height: '300px',
    padding: '20px',
    fontSize: '18px',
    border: '2px solid #ff6347',  // Neon Orange border
    borderRadius: '10px',
    resize: 'none',
    boxSizing: 'border-box',
    marginBottom: '15px',
    backgroundColor: '#121212',  // Dark background
    color: '#f0f0f0',  // Light text
    fontFamily: "'Courier New', Courier, monospace",
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  textareaFocus: {
    borderColor: '#00f5d4',  // Neon Cyan focus border
    boxShadow: '0 0 8px rgba(0, 245, 212, 0.7)',
  },
  statusContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  savingIndicator: {
    fontSize: '18px',
    color: '#ff6347',  // Neon Orange for "Saving..."
    fontWeight: 'bold',
    animation: 'blink 1.5s infinite',
  },
  savedIndicator: {
    fontSize: '18px',
    color: '#00f5d4',  // Neon Cyan for "Saved"
    fontWeight: 'bold',
  },
};

// Keyframes for animations
const animations = {
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '@keyframes blink': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.5 },
    '100%': { opacity: 1 },
  },
};

export default TextEditorWithAutoSave;
