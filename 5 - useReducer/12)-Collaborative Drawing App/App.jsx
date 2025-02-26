import React, { useReducer, useRef, useState, useEffect } from 'react';

// Initial state structure
const initialState = {
  drawings: [],
  currentTool: 'pen',
  penColor: '#000000',
  penSize: 5,
};

const drawingReducer = (state, action) => {
  switch (action.type) {
    case 'DRAW':
      return {
        ...state,
        drawings: [...state.drawings, action.payload],
      };
    case 'ERASE':
      return {
        ...state,
        drawings: state.drawings.filter((_, index) => index !== action.payload),
      };
    case 'SET_TOOL':
      return {
        ...state,
        currentTool: action.payload,
      };
    case 'SET_COLOR':
      return {
        ...state,
        penColor: action.payload,
      };
    case 'SET_SIZE':
      return {
        ...state,
        penSize: action.payload,
      };
    case 'CLEAR_CANVAS':
      return {
        ...state,
        drawings: [],
      };
    default:
      return state;
  }
};

const DrawingApp = () => {
  const [state, dispatch] = useReducer(drawingReducer, initialState);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState(null);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const startPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setIsDrawing(true);
    setLastPosition(startPosition);

    dispatch({
      type: 'DRAW',
      payload: {
        tool: state.currentTool,
        color: state.penColor,
        size: state.penSize,
        position: startPosition,
        endPosition: startPosition,
      },
    });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // Update drawing with continuous line
    dispatch({
      type: 'DRAW',
      payload: {
        tool: state.currentTool,
        color: state.penColor,
        size: state.penSize,
        position: lastPosition,
        endPosition: position,
      },
    });

    setLastPosition(position);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  const handleToolChange = (tool) => {
    dispatch({ type: 'SET_TOOL', payload: tool });
  };

  const handleColorChange = (e) => {
    dispatch({ type: 'SET_COLOR', payload: e.target.value });
  };

  const handleSizeChange = (e) => {
    dispatch({ type: 'SET_SIZE', payload: e.target.value });
  };

  const handleClearCanvas = () => {
    dispatch({ type: 'CLEAR_CANVAS' });
  };

  const renderDrawings = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    state.drawings.forEach((drawing) => {
      ctx.beginPath();
      ctx.lineWidth = drawing.size;
      ctx.strokeStyle = drawing.color;

      if (drawing.tool === 'pen') {
        ctx.moveTo(drawing.position.x, drawing.position.y);
        ctx.lineTo(drawing.endPosition.x, drawing.endPosition.y);
        ctx.stroke();
      } else if (drawing.tool === 'eraser') {
        ctx.clearRect(drawing.position.x - drawing.size / 2, drawing.position.y - drawing.size / 2, drawing.size, drawing.size);
      }
    });
  };

  useEffect(() => {
    renderDrawings();
  }, [state.drawings]);

  return (
    <div style={styles.container}>
      <div style={styles.toolbar}>
        <button style={styles.button} onClick={() => handleToolChange('pen')}>Pen</button>
        <button style={styles.button} onClick={() => handleToolChange('eraser')}>Eraser</button>
        <button style={styles.button} onClick={handleClearCanvas}>Clear Canvas</button>
        <input type="color" value={state.penColor} onChange={handleColorChange} style={styles.colorPicker} />
        <input
          type="range"
          min="1"
          max="20"
          value={state.penSize}
          onChange={handleSizeChange}
          style={styles.sizeSlider}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={styles.canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
    flexWrap: 'wrap',
  },
  button: {
    margin: '5px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  colorPicker: {
    margin: '5px',
  },
  sizeSlider: {
    margin: '5px',
    width: '100px',
  },
  canvas: {
    border: '1px solid black',
    backgroundColor: '#f4f4f4',
    cursor: 'crosshair',
  },
};

export default DrawingApp;
