import { useId } from "react";

export default function QuizApp() {
  const qId = useId();
  const options = ["Red", "Blue", "Green"];

  return (
    <div className="p-4">
      <p id={qId} className="font-semibold">What is your favorite color?</p>
      {options.map((option, i) => {
        const optionId = `${qId}-option-${i}`;
        return (
          <div key={optionId}>
            <input type="radio" id={optionId} name="color" className="mr-2" />
            <label htmlFor={optionId}>{option}</label>
          </div>
        );
      })}
    </div>
  );
}
