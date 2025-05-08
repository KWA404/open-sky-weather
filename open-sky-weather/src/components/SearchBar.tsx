import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const POPULAR_CITIES = [
  'New York', 
  'London', 
  'Tokyo', 
  'Paris', 
  'Sydney', 
  'Berlin',
  'Los Angeles',
  'Toronto',
  'Singapore'
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { fetchWeather, setError } = useWeather();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = POPULAR_CITIES.filter(city => 
      city.toLowerCase().includes(query.toLowerCase())
    );
    
    setSuggestions(filtered);
  }, [query]);

  const handleSearch = (cityName: string = query) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    fetchWeather(cityName);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSuggestionClick = (city: string) => {
    setQuery(city);
    handleSearch(city);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for a city..."
          className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          aria-label="Search for a city"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((city, index) => (
            <div 
              key={index}
              onClick={() => handleSuggestionClick(city)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;