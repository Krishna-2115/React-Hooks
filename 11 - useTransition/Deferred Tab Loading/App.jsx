import { useState, useTransition } from "react";

export default function DeferredTabs() {
  const [tab, setTab] = useState("Tab 1");
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleTabClick = (name) => {
    startTransition(() => {
      setTimeout(() => {
        setTab(name);
        setContent(`${name} Content loaded`);
      }, 1000);
    });
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        {["Tab 1", "Tab 2", "Tab 3"].map(t => (
          <button key={t} className="btn" onClick={() => handleTabClick(t)}>
            {t}
          </button>
        ))}
      </div>
      <div>{isPending ? "Loading..." : content}</div>
    </div>
  );
}
