import React, { useState, useDeferredValue } from 'react';

const LargeList = () => {
  const data = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);

  return (
    <div className="p-4">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded"
        placeholder="Filter items..."
      />
      <div className="mt-4">
        {data
          .filter((item) => item.toLowerCase().includes(deferredFilter.toLowerCase()))
          .map((item) => (
            <div key={item} className="p-2 border-b">
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default LargeList;
