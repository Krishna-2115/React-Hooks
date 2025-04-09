import { useId } from "react";

export default function DynamicList() {
  const id = useId();
  const items = ["Apple", "Banana", "Cherry"];

  return (
    <ul className="p-4 list-disc pl-5">
      {items.map((item, i) => (
        <li key={`${id}-${i}`}>{item}</li>
      ))}
    </ul>
  );
}
