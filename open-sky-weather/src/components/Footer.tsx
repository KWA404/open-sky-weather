import { Github as GitHub } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {year} Weather Dashboard. Powered by OpenWeatherMap.
          </p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
              aria-label="GitHub Repository"
            >
              <GitHub className="h-5 w-5" />
            </a>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Built with React & Azure
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;