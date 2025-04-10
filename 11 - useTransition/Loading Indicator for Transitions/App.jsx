import { useState, useTransition } from "react";

export default function LoadingSpinnerTransition() {
  const [isPending, startTransition] = useTransition();
  const [text, setText] = useState("Hello");

  const handleChange = () => {
    startTransition(() => {
      setTimeout(() => setText("World!"), 1000);
    });
  };

  return (
    <div className="p-4 text-center">
      <p className="text-xl mb-4">{text}</p>
      <button className="btn" onClick={handleChange}>Change</button>
      {isPending && <div className="loader mt-4" />}
    </div>
  );
}
