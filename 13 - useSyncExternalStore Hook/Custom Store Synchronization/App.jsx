// App.jsx
import CounterDisplay from './components/CounterDisplay';
import CounterControls from './components/CounterControls';

const App = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">Custom Global Store</h1>
            <CounterDisplay />
            <CounterControls />
        </div>
    );
};

export default App;
