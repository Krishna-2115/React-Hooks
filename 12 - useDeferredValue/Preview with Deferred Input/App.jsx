import React, { useState, useDeferredValue } from 'react';

const MarkdownPreview = () => {
  const [markdownText, setMarkdownText] = useState('');
  const deferredMarkdownText = useDeferredValue(markdownText);

  return (
    <div className="p-4">
      <textarea
        value={markdownText}
        onChange={(e) => setMarkdownText(e.target.value)}
        className="p-2 border rounded w-full"
        rows="6"
        placeholder="Write markdown..."
      />
      <div className="mt-4">
        <h3 className="font-semibold">Preview:</h3>
        <div>{deferredMarkdownText}</div>
      </div>
    </div>
  );
};

export default MarkdownPreview;
