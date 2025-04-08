import { useRef } from "react";

export default function StickyHeaderTable() {
  const tableRef = useRef(null);

  return (
    <div className="overflow-y-scroll h-64 border rounded shadow" ref={tableRef}>
      <table className="min-w-full text-left">
        <thead className="sticky top-0 bg-white shadow z-10">
          <tr>
            <th className="p-2 border-b font-bold">ID</th>
            <th className="p-2 border-b font-bold">Name</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 50 }, (_, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-2 border-b">#{i + 1}</td>
              <td className="p-2 border-b">User {i + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
