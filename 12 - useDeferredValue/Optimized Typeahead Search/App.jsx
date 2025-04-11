import React, { useState, useDeferredValue } from 'react';

const TypeaheadSearch = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const data = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded"
        placeholder="Search items..."
      />
      <div className="mt-4">
        {filteredData.slice(0, 10).map((item) => (
          <div key={item} className="p-2 border-b">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeaheadSearch;
