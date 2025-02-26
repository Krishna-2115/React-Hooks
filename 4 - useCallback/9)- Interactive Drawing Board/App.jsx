import React, { useState, useRef, useCallback } from 'react';

const DrawingBoard = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#00FFFF');
  const [lineWidth, setLineWidth] = useState(5);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  // Set up the canvas context on component mount
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctxRef.current = ctx;
  }, []);

  // Memoized handler for starting the drawing on mouse down
  const startDrawing = useCallback((event) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const { offsetX, offsetY } = event.nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }, []);

  // Memoized handler for drawing the line as mouse moves
  const draw = useCallback((event) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const { offsetX, offsetY } = event.nativeEvent;

    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }, [isDrawing, color, lineWidth]);

  // Memoized handler for stopping the drawing on mouse up
  const stopDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.closePath();
    setIsDrawing(false);
  }, []);

  // Clear the canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Update the canvas size when the window resizes
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.6;
    canvas.height = window.innerHeight * 0.6;
  }, []);

  // Set up the canvas when the component mounts
  React.useEffect(() => {
    setupCanvas();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [setupCanvas, resizeCanvas]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🎨 Interactive Drawing Board</h1>
      </div>

      {/* Drawing Canvas */}
      <div style={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          style={styles.canvas}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <button
          onClick={() => setColor('#00FFFF')}
          style={styles.button('#00FFFF')}
        >
          🖌️ Cyan
        </button>
        <button
          onClick={() => setColor('#FF00FF')}
          style={styles.button('#FF00FF')}
        >
          💜 Purple
        </button>
        <button
          onClick={() => setLineWidth(lineWidth + 1)}
          style={styles.button('#00FF00')}
        >
          ➕ Increase Width
        </button>
        <button
          onClick={() => setLineWidth(lineWidth > 1 ? lineWidth - 1 : 1)}
          style={styles.button('#00FF00')}
        >
          ➖ Decrease Width
        </button>
        <button
          onClick={clearCanvas}
          style={styles.clearButton}
        >
          ❌ Clear
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
    height: '100vh',
    background: 'linear-gradient(to bottom right, #121212, #282828)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#fff',
    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.6)',
  },
  canvasWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  canvas: {
    border: '3px solid #00FFFF',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
    cursor: 'crosshair',
    transition: 'box-shadow 0.3s ease-in-out',
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    alignItems: 'center',
  },
  button: (bgColor) => ({
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: bgColor, // Solid background color
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
    width: '180px',
    textAlign: 'center',
    fontWeight: 'bold',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    ':hover': {
      transform: 'scale(1.1)',
      backgroundColor: '#fff', // Change background color to white on hover
      color: bgColor, // Text color changes to the button color on hover
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
    },
  }),
  clearButton: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#FF6347', // Solid background color
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
    width: '180px',
    fontWeight: 'bold',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    ':hover': {
      transform: 'scale(1.1)',
      backgroundColor: '#fff', // Change background color to white on hover
      color: '#FF6347', // Text color changes to the button color on hover
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
    },
  },
};


export default DrawingBoard;
