import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type TemperatureUnit = 'celsius' | 'fahrenheit';
type WindSpeedUnit = 'kph' | 'mph';

interface PreferencesContextType {
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setWindSpeedUnit: (unit: WindSpeedUnit) => void;
}

const PreferencesContext = createContext<PreferencesContextType>({
  temperatureUnit: 'celsius',
  windSpeedUnit: 'kph',
  setTemperatureUnit: () => {},
  setWindSpeedUnit: () => {},
});

export const usePreferences = () => useContext(PreferencesContext);

interface PreferencesProviderProps {
  children: ReactNode;
}

export const PreferencesProvider: React.FC<PreferencesProviderProps> = ({ children }) => {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [windSpeedUnit, setWindSpeedUnit] = useState<WindSpeedUnit>('kph');

  useEffect(() => {
    // Load preferences from localStorage
    const savedTempUnit = localStorage.getItem('temperatureUnit') as TemperatureUnit;
    const savedWindUnit = localStorage.getItem('windSpeedUnit') as WindSpeedUnit;
    
    if (savedTempUnit) {
      setTemperatureUnit(savedTempUnit);
    }
    
    if (savedWindUnit) {
      setWindSpeedUnit(savedWindUnit);
    }
  }, []);

  const updateTemperatureUnit = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
    localStorage.setItem('temperatureUnit', unit);
  };

  const updateWindSpeedUnit = (unit: WindSpeedUnit) => {
    setWindSpeedUnit(unit);
    localStorage.setItem('windSpeedUnit', unit);
  };

  return (
    <PreferencesContext.Provider
      value={{
        temperatureUnit,
        windSpeedUnit,
        setTemperatureUnit: updateTemperatureUnit,
        setWindSpeedUnit: updateWindSpeedUnit,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};