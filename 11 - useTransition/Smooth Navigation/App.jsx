import { useState, useTransition } from "react";

export default function SmoothTabs() {
  const tabs = ["Home", "About", "Contact"];
  const [tab, setTab] = useState("Home");
  const [isPending, startTransition] = useTransition();

  const selectTab = (t) => {
    startTransition(() => setTab(t));
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => selectTab(t)}
            className={`btn ${tab === t ? "bg-blue-500 text-white" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>
      {isPending ? <div>Loading...</div> : <div>{tab} Content</div>}
    </div>
  );
}
