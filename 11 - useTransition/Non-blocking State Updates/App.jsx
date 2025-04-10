import { useState, useTransition } from "react";

export default function LoadMoreList() {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    startTransition(() => {
      const more = Array.from({ length: 20 });
      setItems(prev => [...prev, ...more]);
    });
  };

  return (
    <div className="p-4">
      <ul className="grid grid-cols-2 gap-2">
        {items.map((_, i) => (
          <li key={i} className="p-2 border">{`Item ${i + 1}`}</li>
        ))}
      </ul>
      <button className="btn mt-4" onClick={loadMore}>
        Load More
      </button>
      {isPending && <div className="loader mt-4" />}
    </div>
  );
}
