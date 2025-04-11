import React, { useState, useDeferredValue } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const deferredActiveTab = useDeferredValue(activeTab);

  return (
    <div className="p-4">
      <div className="tabs">
        <button
          onClick={() => setActiveTab('tab1')}
          className={`tab ${deferredActiveTab === 'tab1' ? 'bg-blue-500' : ''}`}
        >
          Tab 1
        </button>
        <button
          onClick={() => setActiveTab('tab2')}
          className={`tab ${deferredActiveTab === 'tab2' ? 'bg-blue-500' : ''}`}
        >
          Tab 2
        </button>
      </div>
      <div className="mt-4">
        {deferredActiveTab === 'tab1' ? (
          <div>Loading data for Tab 1...</div>
        ) : (
          <div>Loading data for Tab 2...</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
