import React, { useState, useDeferredValue } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);

    const handleChange = (e) => setQuery(e.target.value);

    return (
        <div className="p-4">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Search..."
            />
            <div className="mt-4">
                <h3 className="font-semibold">Results for: {deferredQuery}</h3>
                {/* Render search results here */}
            </div>
        </div>
    );
};

export default Search;
