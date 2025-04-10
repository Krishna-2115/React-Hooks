import { useState, useTransition } from "react";

const allItems = [
  { name: "Apple", category: "Fruit" },
  { name: "Cucumber", category: "Vegetable" },
  { name: "Banana", category: "Fruit" },
  { name: "Carrot", category: "Vegetable" },
];

export default function FilterTable() {
  const [filter, setFilter] = useState("All");
  const [filtered, setFiltered] = useState(allItems);
  const [isPending, startTransition] = useTransition();

  const handleFilter = (cat) => {
    setFilter(cat);
    startTransition(() => {
      const result = cat === "All" ? allItems : allItems.filter(i => i.category === cat);
      setFiltered(result);
    });
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        {["All", "Fruit", "Vegetable"].map(cat => (
          <button key={cat} className="btn" onClick={() => handleFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>
      {isPending && <div>Filtering...</div>}
      <table className="table-auto w-full border">
        <tbody>
          {filtered.map((item, i) => (
            <tr key={i}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
