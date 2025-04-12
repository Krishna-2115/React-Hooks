// components/CounterControls.jsx
import { increment, decrement, reset } from '../store';

const CounterControls = () => {
    return (
        <div className="flex justify-center mt-6 gap-4">
            <button
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                onClick={increment}
            >
                Increment
            </button>
            <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                onClick={decrement}
            >
                Decrement
            </button>
            <button
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl"
                onClick={reset}
            >
                Reset
            </button>
        </div>
    );
};

export default CounterControls;
