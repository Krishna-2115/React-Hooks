import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';

// Child Component (Sortable List)
const SortableList = forwardRef((props, ref) => {
  const listRef = useRef(null);
  const [items, setItems] = useState([
    'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
    'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
    'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15'
  ]);
  const [draggingIndex, setDraggingIndex] = useState(null);

  // Handle Drag Start
  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  // Handle Drag Over
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems.splice(draggingIndex, 1)[0];
    newItems.splice(index, 0, draggedItem);

    setItems(newItems);
    setDraggingIndex(index);
  };

  // Handle Drop
  const handleDrop = () => {
    setDraggingIndex(null);
  };

  // Scroll to an item
  const scrollToElement = (index) => {
    if (listRef.current) {
      const item = listRef.current.children[index];
      if (item) {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Get current drag state
  const getDragState = () => ({
    items: [...items], // Correctly returns the updated list order
    draggingIndex,
  });

  // Expose methods to the parent
  useImperativeHandle(ref, () => ({
    scrollToElement,
    getDragState,
  }));

  return (
    <ul ref={listRef} style={styles.list}>
      {items.map((item, index) => (
        <li
          key={item} // Use unique keys for performance
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={handleDrop}
          style={{
            ...styles.listItem,
            backgroundColor: draggingIndex === index ? '#dfe6e9' : '#ffffff',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
});

// Parent Component
const ParentComponent = () => {
  const listRef = useRef();

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Drag-and-Drop Sortable List</h2>
      <SortableList ref={listRef} />
      <div style={styles.buttonContainer}>
        <button
          onClick={() => listRef.current.scrollToElement(10)}
          style={{ ...styles.button, ...styles.scrollButton }}
        >
          Scroll to Item 11
        </button>
        <button
          onClick={() => console.log(listRef.current.getDragState())}
          style={{ ...styles.button, ...styles.stateButton }}
        >
          Get Drag State (Check Console)
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
    padding: '20px',
    backgroundColor: '#ecf0f1',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
  },
  header: {
    fontSize: '20px',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '5px',
    maxHeight: '300px',
    overflowY: 'auto',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  listItem: {
    padding: '10px',
    margin: '5px 0',
    backgroundColor: '#ffffff',
    border: '1px solid #bdc3c7',
    borderRadius: '5px',
    cursor: 'grab',
    transition: 'background 0.3s ease',
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
  scrollButton: {
    backgroundColor: '#3498db',
    color: '#fff',
  },
  stateButton: {
    backgroundColor: '#e67e22',
    color: '#fff',
  },
};

export default ParentComponent;
