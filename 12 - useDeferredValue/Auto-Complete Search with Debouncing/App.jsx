import React, { useState, useDeferredValue } from 'react';

const AutoCompleteSearch = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Grapes', 'Kiwi', 'Lemon'];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded"
        placeholder="Search for fruit..."
      />
      <ul className="mt-4">
        {filteredItems.map((item) => (
          <li key={item} className="p-2 border-b">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoCompleteSearch;
