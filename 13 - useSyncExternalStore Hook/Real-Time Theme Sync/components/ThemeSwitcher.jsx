// src/components/ThemeSwitcher.jsx
import { useSyncExternalStore } from 'react';
import { themeStore } from '../stores/themeStore';

export default function ThemeSwitcher() {
  const theme = useSyncExternalStore(themeStore.subscribe, themeStore.getSnapshot);

  const toggleTheme = () => {
    themeStore.setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <span className="text-lg font-medium text-gray-700 dark:text-gray-200">Current Theme: {theme}</span>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-600 transition"
      >
        Toggle Theme
      </button>
    </div>
  );
}
