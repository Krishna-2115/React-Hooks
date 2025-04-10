import { useState, useTransition } from "react";

const tasks = [
  { name: "Email", priority: 2 },
  { name: "Code Review", priority: 1 },
  { name: "Meeting", priority: 3 },
];

export default function TaskManager() {
  const [sorted, setSorted] = useState(tasks);
  const [isPending, startTransition] = useTransition();

  const sortByPriority = () => {
    startTransition(() => {
      const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);
      setSorted(sortedTasks);
    });
  };

  return (
    <div className="p-4">
      <button className="btn mb-4" onClick={sortByPriority}>Sort by Priority</button>
      {isPending && <div>Sorting...</div>}
      <ul className="list-disc pl-5">
        {sorted.map((task) => (
          <li key={task.name}>{task.name} (Priority {task.priority})</li>
        ))}
      </ul>
    </div>
  );
}
