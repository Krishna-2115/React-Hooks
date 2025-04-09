import { useId } from "react";

export default function NestedTable() {
  const id = useId();
  const data = [
    {
      name: "Fruits",
      items: ["Apple", "Banana"]
    },
    {
      name: "Vegetables",
      items: ["Carrot", "Broccoli"]
    }
  ];

  return (
    <table className="table-auto w-full border">
      <thead>
        <tr>
          <th className="border px-4 py-2">Category</th>
          <th className="border px-4 py-2">Items</th>
        </tr>
      </thead>
      <tbody>
        {data.map((group, i) => (
          <tr key={`${id}-row-${i}`}>
            <td className="border px-4 py-2">{group.name}</td>
            <td className="border px-4 py-2">
              <ul>
                {group.items.map((item, j) => (
                  <li key={`${id}-item-${i}-${j}`}>{item}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
