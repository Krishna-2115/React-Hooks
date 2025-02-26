import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';

// Child Component (Canvas)
const DrawingCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; // Set background to white
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#2c3e50';
  }, []);

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = '#fff'; // Refill background to white
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'drawing.png';
    link.click();
  };

  useImperativeHandle(ref, () => ({
    clearCanvas,
    saveCanvas,
  }));

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={400}
      style={styles.canvas}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
});

// Parent Component
const ParentComponent = () => {
  const canvasRef = useRef();

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Canvas Drawing</h2>
      <DrawingCanvas ref={canvasRef} />
      <div style={styles.buttonContainer}>
        <button onClick={() => canvasRef.current.clearCanvas()} style={{ ...styles.button, ...styles.clearButton }}>
          Clear Canvas
        </button>
        <button onClick={() => canvasRef.current.saveCanvas()} style={{ ...styles.button, ...styles.saveButton }}>
          Save Drawing
        </button>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#ecf0f1',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: {
    fontSize: '20px',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  canvas: {
    border: '2px solid #34495e',
    borderRadius: '5px',
    backgroundColor: '#fff',
    cursor: 'crosshair',
  },
  buttonContainer: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#3498db',
    color: '#fff',
  },
};

export default ParentComponent;
