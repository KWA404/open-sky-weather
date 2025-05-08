import { useState } from 'react';
import { Droplets, Wind, Thermometer } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const { temperatureUnit, setTemperatureUnit, windSpeedUnit, setWindSpeedUnit } = usePreferences();

  const getTemperature = (temp: number): string => {
    if (temperatureUnit === 'celsius') {
      return `${Math.round(temp)}°C`;
    } else {
      // Convert to Fahrenheit: (C * 9/5) + 32
      return `${Math.round((temp * 9/5) + 32)}°F`;
    }
  };

  const getWindSpeed = (speed: number): string => {
    if (windSpeedUnit === 'kph') {
      return `${Math.round(speed * 3.6)} km/h`; // Convert m/s to km/h
    } else {
      return `${Math.round(speed * 2.237)} mph`; // Convert m/s to mph
    }
  };

  const getWeatherIcon = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getBackgroundClass = (): string => {
    const weatherMain = weather.weather[0].main.toLowerCase();
    
    if (weatherMain.includes('clear')) {
      return 'bg-gradient-to-br from-blue-400 to-blue-600';
    } else if (weatherMain.includes('cloud')) {
      return 'bg-gradient-to-br from-gray-300 to-gray-500';
    } else if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
      return 'bg-gradient-to-br from-blue-600 to-blue-800';
    } else if (weatherMain.includes('thunder')) {
      return 'bg-gradient-to-br from-purple-600 to-purple-800';
    } else if (weatherMain.includes('snow')) {
      return 'bg-gradient-to-br from-blue-100 to-blue-300';
    } else if (weatherMain.includes('mist') || weatherMain.includes('fog')) {
      return 'bg-gradient-to-br from-gray-400 to-gray-600';
    } else {
      return 'bg-gradient-to-br from-blue-500 to-blue-700';
    }
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-lg dark:shadow-gray-800/30 transition-all duration-300 hover:shadow-xl">
      <div className={`${getBackgroundClass()} px-6 py-8 text-white`}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="text-3xl font-bold">{weather.name}</h2>
            <p className="text-lg opacity-90">{weather.sys.country}</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <img 
              src={getWeatherIcon(weather.weather[0].icon)}
              alt={weather.weather[0].description}
              className="w-16 h-16"
            />
            <div className="ml-2">
              <div className="text-4xl font-bold">{getTemperature(weather.main.temp)}</div>
              <p className="capitalize">{weather.weather[0].description}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setTemperatureUnit(temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius')}
            className="bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 text-sm transition-colors duration-200"
          >
            {temperatureUnit === 'celsius' ? '°C' : '°F'}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center border-b md:border-b-0 md:border-r dark:border-gray-700 pb-4 md:pb-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-3">
              <Thermometer className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm">Feels Like</h3>
            <p className="text-gray-900 dark:text-white text-xl font-medium mt-1">
              {getTemperature(weather.main.feels_like)}
            </p>
          </div>

          <div className="flex flex-col items-center border-b md:border-b-0 md:border-r dark:border-gray-700 pb-4 md:pb-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-3">
              <Droplets className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm">Humidity</h3>
            <p className="text-gray-900 dark:text-white text-xl font-medium mt-1">{weather.main.humidity}%</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-3">
              <Wind className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm">Wind Speed</h3>
            <div className="flex items-center mt-1">
              <p className="text-gray-900 dark:text-white text-xl font-medium">{getWindSpeed(weather.wind.speed)}</p>
              <button
                onClick={() => setWindSpeedUnit(windSpeedUnit === 'kph' ? 'mph' : 'kph')}
                className="ml-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {windSpeedUnit === 'kph' ? 'km/h' : 'mph'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;