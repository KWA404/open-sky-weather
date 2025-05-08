import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import WeatherDashboard from './components/WeatherDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';
import { PreferencesProvider } from './context/PreferencesContext';

function App() {
  return (
    <ThemeProvider>
      <PreferencesProvider>
        <WeatherProvider>
          <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
              <WeatherDashboard />
            </main>
            <Footer />
          </div>
        </WeatherProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
}

export default App;