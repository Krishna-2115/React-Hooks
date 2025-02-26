import { useState, useEffect } from 'react';

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const containerStyle = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#222',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  };

  const textContainerStyle = {
    textAlign: 'center',
    zIndex: 1,
  };

  const textStyle = {
    fontSize: '24px',
    fontWeight: 'lighter',
    letterSpacing: '1px',
  };

  const dotStyle = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, #ff7eb3, #ff758c)',
    boxShadow: '0 0 20px rgba(255, 117, 140, 0.8)',
    transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
    transition: 'transform 0.1s ease-out',
    pointerEvents: 'none', // Ensures the dot doesn't interfere with interactions
  };

  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <h1 style={textStyle}>Move your mouse around!</h1>
        <p style={textStyle}>X: {position.x}px | Y: {position.y}px</p>
      </div>
      <div style={dotStyle}></div>
    </div>
  );
};

export default MouseTracker;
