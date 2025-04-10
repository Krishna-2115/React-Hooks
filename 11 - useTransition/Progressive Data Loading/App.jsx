import { useState, useTransition } from "react";

const allData = Array.from({ length: 100 }, (_, i) => `Row ${i + 1}`);

export default function PaginatedTable() {
  const [rows, setRows] = useState(allData.slice(0, 20));
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    startTransition(() => {
      const next = rows.length + 20;
      setRows(allData.slice(0, next));
    });
  };

  return (
    <div className="p-4">
      <table className="table-auto w-full border">
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="border p-2">{row}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn mt-4" onClick={loadMore}>Load More</button>
      {isPending && <div className="mt-2">Loading more rows...</div>}
    </div>
  );
}
