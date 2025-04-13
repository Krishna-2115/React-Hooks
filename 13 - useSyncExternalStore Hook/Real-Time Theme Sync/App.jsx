// src/App.jsx
import ThemeSwitcher from './components/ThemeSwitcher';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 pt-10">
        Real-Time Theme Sync
      </h1>
      <ThemeSwitcher />
    </div>
  );
}
