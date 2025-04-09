import { useId } from "react";

export default function SurveyForm() {
  const qId = useId();

  return (
    <div className="p-4">
      <label htmlFor={qId} className="font-semibold block">Your Feedback:</label>
      <textarea id={qId} className="w-full border p-2 rounded mt-2" />
    </div>
  );
}
