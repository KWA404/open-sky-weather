import { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import ErrorMessage from './ErrorMessage';
import { useWeather } from '../context/WeatherContext';

const WeatherDashboard = () => {
  const { weather, error, loading } = useWeather();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <SearchBar />
      </div>
      
      {error && <ErrorMessage message={error} />}
      
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {weather && !loading && (
        <WeatherCard weather={weather} />
      )}
      
      {!weather && !loading && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Welcome to Weather Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Search for a city to get the current weather information.
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;