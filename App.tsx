// src/App.tsx
import { useState, type FormEvent } from 'react';
import { weatherService } from './services/weatherService';
import DataSourceToggle from './components/DataSourceToggle';
import type { WeatherData } from './types';

export default function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.getWeather(location.trim());
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#282828] text-[#ebdbb2] p-8">
      {/* Toggle Component */}
      <DataSourceToggle />

      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">
          🌦️ Weather & Disaster Predictor
        </h1>
        <p className="text-[#928374] text-center mb-8">
          Real-time weather & disaster alerts powered by free APIs
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city or state (e.g., Mumbai, Bihar, Delhi)"
              className="flex-1 px-4 py-3 bg-[#3c3836] border-2 border-[#665c54] rounded-sm text-[#ebdbb2] placeholder-[#928374] focus:border-[#83a598] focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#83a598] text-[#282828] font-bold rounded-sm hover:bg-[#b8bb26] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳' : '🔍 Search'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-[#fb4934] bg-opacity-20 border-2 border-[#fb4934] rounded-sm">
            <p className="text-[#fb4934] font-bold">❌ Error: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-6xl">⏳</div>
            <p className="mt-4 text-[#928374]">Fetching weather data...</p>
          </div>
        )}

        {/* Weather Data Display */}
        {weatherData && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Weather Card */}
            <div className="bg-[#3c3836] border-2 border-[#665c54] p-6 rounded-sm">
              <h2 className="text-2xl font-bold mb-4 text-[#fabd2f]">
                📍 {weatherData.current.location}
              </h2>
              <div className="space-y-2">
                <p className="text-5xl font-bold">{weatherData.current.temperature}°C</p>
                <p className="text-[#d5c4a1]">{weatherData.current.condition}</p>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#504945]">
                  <div>
                    <p className="text-[#928374] text-sm">Feels Like</p>
                    <p className="text-xl">{weatherData.current.feelsLike}°C</p>
                  </div>
                  <div>
                    <p className="text-[#928374] text-sm">Humidity</p>
                    <p className="text-xl">{weatherData.current.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-[#928374] text-sm">Wind Speed</p>
                    <p className="text-xl">{weatherData.current.windSpeed} km/h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts Card */}
            <div className="bg-[#3c3836] border-2 border-[#665c54] p-6 rounded-sm">
              <h2 className="text-2xl font-bold mb-4 text-[#fb4934]">⚠️ Disaster Alerts</h2>
              {weatherData.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`mb-4 p-4 border-2 rounded-sm ${
                    alert.severity === 'Warning'
                      ? 'border-[#fb4934] bg-[#fb4934] bg-opacity-10'
                      : 'border-[#fabd2f] bg-[#fabd2f] bg-opacity-10'
                  }`}
                >
                  <h3 className="font-bold mb-1">{alert.title}</h3>
                  <p className="text-sm text-[#d5c4a1] mb-2">{alert.description}</p>
                  <p className="text-xs text-[#928374]">📍 {alert.area}</p>
                </div>
              ))}
            </div>

            {/* Forecast Card */}
            <div className="bg-[#3c3836] border-2 border-[#665c54] p-6 rounded-sm md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-[#b8bb26]">📅 5-Day Forecast</h2>
              <div className="grid grid-cols-5 gap-4">
                {weatherData.forecast.map((day, i) => (
                  <div
                    key={i}
                    className="bg-[#504945] p-4 rounded-sm text-center hover:bg-[#665c54] transition"
                  >
                    <p className="font-bold mb-2">{day.day}</p>
                    <p className="text-2xl mb-1">{day.high}°</p>
                    <p className="text-sm text-[#928374]">{day.low}°</p>
                    <p className="text-xs mt-2 text-[#d5c4a1]">{day.condition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!weatherData && !loading && (
          <div className="max-w-2xl mx-auto mt-12 p-6 bg-[#3c3836] border-2 border-[#665c54] rounded-sm">
            <h3 className="text-xl font-bold mb-4 text-[#83a598]">💡 Quick Start</h3>
            <ul className="space-y-2 text-[#d5c4a1]">
              <li>• <strong>Mock Data:</strong> Try "Mumbai", "Kashmir", "Punjab", "Bihar"</li>
              <li>• <strong>Open-Meteo (Free):</strong> Try any city worldwide, no API key needed!</li>
              <li>• <strong>OpenWeather:</strong> Requires API key in .env file</li>
            </ul>
            <p className="mt-4 text-sm text-[#928374]">
              Switch data sources using the toggle in the top-right corner
            </p>
          </div>
        )}
      </div>
    </div>
  );
}