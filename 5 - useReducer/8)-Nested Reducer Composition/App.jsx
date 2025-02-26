import React, { useReducer, useState } from 'react';

// Action types for column and card reducers
const ADD_CARD = 'ADD_CARD';
const REMOVE_CARD = 'REMOVE_CARD';
const UPDATE_CARD = 'UPDATE_CARD';
const ADD_COLUMN = 'ADD_COLUMN';
const REMOVE_COLUMN = 'REMOVE_COLUMN';
const RESIZE_COLUMN = 'RESIZE_COLUMN';

// Card reducer: Manages individual card state
const cardReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CARD:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

// Column reducer: Manages column state, including adding/removing cards
const columnReducer = (state, action) => {
  switch (action.type) {
    case ADD_CARD:
      return { ...state, cards: [...state.cards, action.payload] };
    case REMOVE_CARD:
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload.id),
      };
    case RESIZE_COLUMN:
      return { ...state, width: action.payload.width };
    default:
      return state;
  }
};

// Master reducer: Combines all column states into one state object
const masterReducer = (state, action) => {
  switch (action.type) {
    case ADD_COLUMN:
      return { ...state, [action.payload.id]: { ...action.payload, cards: [] } };
    case REMOVE_COLUMN:
      const { [action.payload.id]: removed, ...remainingColumns } = state;
      return remainingColumns;
    case RESIZE_COLUMN:
      return {
        ...state,
        [action.payload.columnId]: columnReducer(
          state[action.payload.columnId],
          { type: RESIZE_COLUMN, payload: { width: action.payload.width } }
        ),
      };
    default:
      return state;
  }
};

const KanbanBoard = () => {
  const [state, dispatch] = useReducer(masterReducer, {});
  const [newColumnName, setNewColumnName] = useState('');
  const [newCardName, setNewCardName] = useState('');
  const [activeCard, setActiveCard] = useState(null);

  const addColumn = () => {
    const id = Date.now();
    dispatch({
      type: ADD_COLUMN,
      payload: { id, name: newColumnName, width: 300 },
    });
    setNewColumnName('');
  };

  const addCard = (columnId) => {
    const id = Date.now();
    const newCard = {
      id,
      name: newCardName,
    };
    dispatch({ type: ADD_CARD, payload: newCard, columnId });
    setNewCardName('');
  };

  const updateCard = (columnId, cardId, key, value) => {
    dispatch({
      type: UPDATE_CARD,
      payload: { key, value },
      columnId,
      cardId,
    });
  };

  const removeCard = (columnId, cardId) => {
    dispatch({
      type: REMOVE_CARD,
      payload: { id: cardId },
      columnId,
    });
  };

  const removeColumn = (columnId) => {
    dispatch({
      type: REMOVE_COLUMN,
      payload: { id: columnId },
    });
  };

  const handleCardClick = (card) => {
    setActiveCard(card);
  };

  const handleColumnResize = (columnId, width) => {
    dispatch({
      type: RESIZE_COLUMN,
      payload: { columnId, width },
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Kanban Board</h1>
      <div style={styles.addColumnContainer}>
        <input
          type="text"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          placeholder="New Column Name"
          style={styles.input}
        />
        <button onClick={addColumn} style={styles.addButton}>Add Column</button>
      </div>

      <div style={styles.board}>
        {Object.keys(state).map((columnId) => {
          const column = state[columnId];
          return (
            <div
              key={columnId}
              style={{
                ...styles.column,
                width: column.width,
                transition: 'width 0.3s ease',
              }}
            >
              <div style={styles.columnHeader}>
                <h2>{column.name}</h2>
                <button
                  onClick={() => removeColumn(columnId)}
                  style={styles.removeColumnButton}
                >
                  &times;
                </button>
              </div>
              <div style={styles.cardContainer}>
                {column.cards.map((card) => (
                  <div
                    key={card.id}
                    style={styles.card}
                    onClick={() => handleCardClick(card)}
                  >
                    {card.name}
                    <button
                      onClick={() => removeCard(columnId, card.id)}
                      style={styles.removeCardButton}
                    >
                      X
                    </button>
                  </div>
                ))}
                <div style={styles.addCardContainer}>
                  <input
                    type="text"
                    value={newCardName}
                    onChange={(e) => setNewCardName(e.target.value)}
                    placeholder="New Card Name"
                    style={styles.input}
                  />
                  <button onClick={() => addCard(columnId)} style={styles.addButton}>Add Card</button>
                </div>
              </div>
              <input
                type="number"
                value={column.width}
                onChange={(e) => handleColumnResize(columnId, parseInt(e.target.value))}
                placeholder="Resize"
                style={styles.resizeInput}
              />
            </div>
          );
        })}
      </div>

      {activeCard && (
        <div style={styles.cardDetail}>
          <h3>Edit Card: {activeCard.name}</h3>
          <input
            type="text"
            value={activeCard.name}
            onChange={(e) => updateCard(activeCard.columnId, activeCard.id, 'name', e.target.value)}
            placeholder="Edit card name"
            style={styles.input}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    padding: '20px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '2.5rem',
    marginBottom: '30px',
    fontWeight: '600',
  },
  addColumnContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '8px 16px',
    margin: '0 10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  board: {
    display: 'flex',
    gap: '20px',
    overflowX: 'auto',
    padding: '10px 0',
  },
  column: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    transition: 'transform 0.2s',
  },
  columnHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    color: '#34495e',
  },
  removeColumnButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    padding: '6px 12px',
    cursor: 'pointer',
  },
  cardContainer: {
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '12px 20px',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  removeCardButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    padding: '6px 10px',
    cursor: 'pointer',
    position: 'absolute',
    top: '-8px',
    right: '-8px',
  },
  addCardContainer: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  resizeInput: {
    marginTop: '10px',
    padding: '6px 10px',
    fontSize: '14px',
    width: '80px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  cardDetail: {
    backgroundColor: '#fff',
    padding: '20px',
    marginTop: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '1000',
  },
};

export default KanbanBoard;
