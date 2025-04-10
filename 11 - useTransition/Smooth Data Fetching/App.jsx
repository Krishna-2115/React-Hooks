import { useState, useTransition } from "react";

const fruits = ["Apple", "Banana", "Cherry", "Date", "Grape", "Mango", "Orange"];

export default function SmoothSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(fruits);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      const filtered = fruits.filter((f) =>
        f.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    });
  };

  return (
    <div className="p-4">
      <input
        value={query}
        onChange={handleSearch}
        className="input input-bordered w-full mb-4"
        placeholder="Search fruits..."
      />
      {isPending && <div className="loader mb-4">Searching...</div>}
      <ul className="list-disc pl-5">
        {results.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
