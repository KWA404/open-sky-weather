import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Cloud } from 'lucide-react';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Cloud className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Weather Dashboard</h1>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 text-yellow-400" />
          ) : (
            <Moon className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;