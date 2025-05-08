import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WeatherData, ForecastData, AirQualityData } from '../types/weather';
import { fetchWeatherForCity, fetchForecast, fetchAirQuality, fetchLocationByCoords } from '../services/weatherService';

interface WeatherContextType {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  airQuality: AirQualityData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (query: string) => Promise<void>;
  setError: (message: string | null) => void;
  favoriteLocations: string[];
  addFavoriteLocation: (location: string) => void;
  removeFavoriteLocation: (location: string) => void;
}

const WeatherContext = createContext<WeatherContextType>({
  weather: null,
  forecast: null,
  airQuality: null,
  loading: false,
  error: null,
  fetchWeather: async () => {},
  setError: () => {},
  favoriteLocations: [],
  addFavoriteLocation: () => {},
  removeFavoriteLocation: () => {},
});

export const useWeather = () => useContext(WeatherContext);

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [favoriteLocations, setFavoriteLocations] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteLocations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Get user's location on initial load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await fetchLocationByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeather(data);
            await fetchAdditionalData(data.coord.lat, data.coord.lon);
          } catch (err) {
            console.error('Error fetching location weather:', err);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to default city
          fetchWeather('London');
        }
      );
    }
  }, []);

  const fetchAdditionalData = async (lat: number, lon: number) => {
    try {
      const [forecastData, airQualityData] = await Promise.all([
        fetchForecast(lat, lon),
        fetchAirQuality(lat, lon)
      ]);
      setForecast(forecastData);
      setAirQuality(airQualityData);
    } catch (err) {
      console.error('Error fetching additional data:', err);
    }
  };

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherForCity(query);
      setWeather(data);
      await fetchAdditionalData(data.coord.lat, data.coord.lon);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const addFavoriteLocation = (location: string) => {
    setFavoriteLocations(prev => {
      const updated = [...new Set([...prev, location])];
      localStorage.setItem('favoriteLocations', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavoriteLocation = (location: string) => {
    setFavoriteLocations(prev => {
      const updated = prev.filter(loc => loc !== location);
      localStorage.setItem('favoriteLocations', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        airQuality,
        loading,
        error,
        fetchWeather,
        setError,
        favoriteLocations,
        addFavoriteLocation,
        removeFavoriteLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};