import { useId, useState } from "react";

export default function TabSystem() {
  const tabId = useId();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Home", "Profile", "Settings"];

  return (
    <div className="p-4">
      <div role="tablist" className="flex space-x-2">
        {tabs.map((tab, i) => (
          <button
            key={`${tabId}-tab-${i}`}
            role="tab"
            id={`${tabId}-tab-${i}`}
            aria-controls={`${tabId}-panel-${i}`}
            aria-selected={activeTab === i}
            className={`px-4 py-2 rounded ${activeTab === i ? "bg-blue-500 text-white" : "bg-gray-100"}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={`${tabId}-panel-${i}`}
          id={`${tabId}-panel-${i}`}
          role="tabpanel"
          hidden={activeTab !== i}
          aria-labelledby={`${tabId}-tab-${i}`}
          className="mt-4 p-4 border rounded"
        >
          Content for {tab}
        </div>
      ))}
    </div>
  );
}
