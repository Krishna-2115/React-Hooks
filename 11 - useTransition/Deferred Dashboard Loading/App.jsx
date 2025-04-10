import { useState, useTransition } from "react";

export default function DashboardWidgets() {
  const [widgets, setWidgets] = useState([]);
  const [isPending, startTransition] = useTransition();

  const loadWidgets = () => {
    startTransition(() => {
      setTimeout(() => {
        setWidgets(["Stats", "Users", "Revenue", "Logs"]);
      }, 1500);
    });
  };

  return (
    <div className="p-4">
      <button className="btn mb-4" onClick={loadWidgets}>Load Widgets</button>
      <div className="grid grid-cols-2 gap-4">
        {isPending ? (
          <div className="col-span-2">Loading widgets...</div>
        ) : (
          widgets.map((w) => (
            <div key={w} className="border p-4 shadow bg-white rounded">
              {w} Widget
            </div>
          ))
        )}
      </div>
    </div>
  );
}
