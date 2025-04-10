import { useState, useTransition } from "react";

export default function ConcurrentDataFetch() {
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();

  const fetchData = () => {
    startTransition(() => {
      setTimeout(() => {
        setData(["Apple", "Banana", "Cherry"]);
      }, 2000);
    });
  };

  return (
    <div className="p-4">
      <button className="btn" onClick={fetchData}>Fetch Data</button>
      {isPending ? (
        <div className="mt-4">Loading...</div>
      ) : (
        <ul className="mt-4 list-disc pl-5">{data.map(f => <li key={f}>{f}</li>)}</ul>
      )}
    </div>
  );
}
