import { WeatherData, ForecastData, AirQualityData } from '../types/weather';

const API_KEY = '567f1f2976a32306d3de30b0e0e47221';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeatherForCity(query: string): Promise<WeatherData> {
  try {
    // Try with city name or postal code
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(query)}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Failed to fetch weather data (${response.status})`);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data');
  }
}

export async function fetchForecast(lat: number, lon: number): Promise<ForecastData> {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  
  return await response.json();
}

export async function fetchAirQuality(lat: number, lon: number): Promise<AirQualityData> {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch air quality data');
  }
  
  return await response.json();
}

export async function fetchLocationByCoords(lat: number, lon: number): Promise<WeatherData> {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }
  
  return await response.json();
}