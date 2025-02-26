import React, { useState, useMemo } from 'react';

const OptimizedMultiSelect = () => {
  // Simulating thousands of options
  const options = Array.from({ length: 5000 }, (_, index) => ({
    id: index + 1,
    name: `Option ${index + 1}`,
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Memoizing filtered options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery) {
      return options;
    }
    return options.filter(option => 
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, options]);

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Toggle selection of an option
  const handleSelectOption = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option.id)) {
        return prevSelectedOptions.filter(id => id !== option.id);
      } else {
        return [...prevSelectedOptions, option.id];
      }
    });
  };

  return (
    <div style={styles.container}>
      <h2>Select Options</h2>

      {/* Search input for filtering options */}
      <input
        type="text"
        placeholder="Search options"
        style={styles.searchInput}
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Multi-Select Dropdown */}
      <div style={styles.dropdown}>
        <ul style={styles.optionList}>
          {filteredOptions.map(option => (
            <li
              key={option.id}
              style={styles.option}
              onClick={() => handleSelectOption(option)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleSelectOption(option)}
              />
              <span style={styles.optionText}>{option.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Display selected options */}
      <div style={styles.selectedOptions}>
        <h3>Selected Options</h3>
        <ul>
          {selectedOptions.map(id => {
            const option = options.find(opt => opt.id === id);
            return <li key={id}>{option.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

// Inline styles for a clean UI
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    margin: '0 auto',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  dropdown: {
    maxHeight: '300px',
    overflowY: 'scroll',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  optionList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  option: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
  },
  optionText: {
    marginLeft: '10px',
  },
  selectedOptions: {
    marginTop: '20px',
  },
};

export default OptimizedMultiSelect;
