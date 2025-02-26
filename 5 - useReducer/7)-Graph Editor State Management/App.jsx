import React, { useReducer, useState } from 'react';
import { motion } from 'framer-motion';

// Initial state of the graph
const initialState = {
  nodes: [],
  edges: [],
};

// Reducer function to handle graph actions
const graphReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NODE':
      const newNode = {
        id: Date.now(),
        label: action.payload.label,
        position: action.payload.position,
      };
      return { ...state, nodes: [...state.nodes, newNode] };

    case 'REMOVE_NODE':
      const filteredNodes = state.nodes.filter(node => node.id !== action.payload.id);
      const filteredEdges = state.edges.filter(edge => edge.from !== action.payload.id && edge.to !== action.payload.id);
      return { ...state, nodes: filteredNodes, edges: filteredEdges };

    case 'ADD_EDGE':
      const newEdge = {
        id: Date.now(),
        from: action.payload.from,
        to: action.payload.to,
      };
      return { ...state, edges: [...state.edges, newEdge] };

    case 'REMOVE_EDGE':
      const remainingEdges = state.edges.filter(edge => edge.id !== action.payload.id);
      return { ...state, edges: remainingEdges };

    case 'MOVE_NODE':
      const updatedNodes = state.nodes.map(node =>
        node.id === action.payload.id ? { ...node, position: action.payload.position } : node
      );
      return { ...state, nodes: updatedNodes };

    default:
      return state;
  }
};

const GraphEditor = () => {
  const [state, dispatch] = useReducer(graphReducer, initialState);
  const [draggingNode, setDraggingNode] = useState(null);
  const [draggingPosition, setDraggingPosition] = useState(null);

  // Add a new node
  const addNode = () => {
    const label = prompt('Enter node label:');
    const position = { x: Math.random() * 400, y: Math.random() * 400 }; // Random position for the node
    dispatch({ type: 'ADD_NODE', payload: { label, position } });
  };

  // Remove a node
  const removeNode = (id) => {
    dispatch({ type: 'REMOVE_NODE', payload: { id } });
  };

  // Add an edge
  const addEdge = (fromId, toId) => {
    dispatch({ type: 'ADD_EDGE', payload: { from: fromId, to: toId } });
  };

  // Remove an edge
  const removeEdge = (id) => {
    dispatch({ type: 'REMOVE_EDGE', payload: { id } });
  };

  // Move a node
  const moveNode = (id, x, y) => {
    dispatch({ type: 'MOVE_NODE', payload: { id, position: { x, y } } });
  };

  // Start dragging a node
  const startDrag = (nodeId, e) => {
    setDraggingNode(nodeId);
    setDraggingPosition({ x: e.clientX, y: e.clientY });
  };

  // Drag a node
  const onDrag = (e) => {
    if (draggingNode) {
      const dx = e.clientX - draggingPosition.x;
      const dy = e.clientY - draggingPosition.y;
      const node = state.nodes.find(n => n.id === draggingNode);
      const newX = node.position.x + dx;
      const newY = node.position.y + dy;
      moveNode(draggingNode, newX, newY);
      setDraggingPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Stop dragging a node
  const stopDrag = () => {
    setDraggingNode(null);
  };

  return (
    <div style={styles.container}>
      <h1>Graph Editor</h1>

      <div style={styles.buttons}>
        <button onClick={addNode} style={styles.button}>Add Node</button>
        {state.nodes.length > 1 && (
          <button
            onClick={() => addEdge(state.nodes[0]?.id, state.nodes[1]?.id)}
            style={styles.button}
          >
            Add Edge (between Node 1 and Node 2)
          </button>
        )}
      </div>

      <div
        style={styles.graphArea}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {state.edges.map(edge => {
          const fromNode = state.nodes.find(node => node.id === edge.from);
          const toNode = state.nodes.find(node => node.id === edge.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.div
              key={edge.id}
              style={{
                ...styles.edge,
                left: fromNode.position.x + 50,
                top: fromNode.position.y + 50,
                width: Math.abs(toNode.position.x - fromNode.position.x),
                height: Math.abs(toNode.position.y - fromNode.position.y),
                transform: `rotate(${Math.atan2(toNode.position.y - fromNode.position.y, toNode.position.x - fromNode.position.x)}rad)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
            >
              <button onClick={() => removeEdge(edge.id)} style={styles.removeEdgeButton}>X</button>
            </motion.div>
          );
        })}

        {state.nodes.map(node => (
          <motion.div
            key={node.id}
            style={{
              ...styles.node,
              left: node.position.x,
              top: node.position.y,
            }}
            onMouseDown={(e) => startDrag(node.id, e)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
          >
            {node.label}
            <button onClick={() => removeNode(node.id)} style={styles.removeButton}>X</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Styles for the graph editor
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  buttons: {
    margin: '20px 0',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '0 10px',
    transition: 'background-color 0.3s',
  },
  graphArea: {
    position: 'relative',
    width: '600px',
    height: '400px',
    margin: '0 auto',
    backgroundColor: '#ecf0f1',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  node: {
    position: 'absolute',
    padding: '12px 20px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    cursor: 'move',
    transition: 'transform 0.3s ease',
    zIndex: 2,
  },
  removeButton: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    padding: '6px 8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  edge: {
    position: 'absolute',
    backgroundColor: '#3498db',
    opacity: 0.6,
    borderRadius: '50px',
    zIndex: 1,
    height: '2px',
    pointerEvents: 'none',
  },
  removeEdgeButton: {
    position: 'absolute',
    top: '-12px',
    right: '-12px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default GraphEditor;
