// src/components/DataSourceToggle.tsx
import { useState } from 'react';
import { weatherService, DataSource } from '../services/weatherService';

export default function DataSourceToggle() {
  const [currentSource, setCurrentSource] = useState<DataSource>(
    weatherService.getDataSource()
  );

  const handleSourceChange = (source: DataSource) => {
    setCurrentSource(source);
    weatherService.setDataSource(source);
    
    // Show toast notification (optional)
    console.log(`Switched to ${source} data source`);
  };

  return (
    <div className="fixed top-4 right-4 bg-[#3c3836] border-2 border-[#665c54] p-4 rounded-sm shadow-lg">
      <div className="text-[#ebdbb2] text-sm font-bold mb-2">
        📡 DATA SOURCE
      </div>
      
      <div className="flex flex-col gap-2">
        {/* Mock Data Option */}
        <label className="flex items-center gap-2 cursor-pointer hover:bg-[#504945] p-2 rounded transition">
          <input
            type="radio"
            name="dataSource"
            value="mock"
            checked={currentSource === 'mock'}
            onChange={() => handleSourceChange('mock')}
            className="w-4 h-4 accent-[#b8bb26]"
          />
          <span className="text-[#d5c4a1] text-sm">
            🎭 Mock Data (Dummy)
          </span>
        </label>

        {/* Open-Meteo Option (Recommended - Free!) */}
        <label className="flex items-center gap-2 cursor-pointer hover:bg-[#504945] p-2 rounded transition">
          <input
            type="radio"
            name="dataSource"
            value="openmeteo"
            checked={currentSource === 'openmeteo'}
            onChange={() => handleSourceChange('openmeteo')}
            className="w-4 h-4 accent-[#83a598]"
          />
          <span className="text-[#d5c4a1] text-sm">
            🌍 Open-Meteo (Free!)
          </span>
        </label>

        {/* OpenWeather Option (Needs API Key) */}
        <label className="flex items-center gap-2 cursor-pointer hover:bg-[#504945] p-2 rounded transition">
          <input
            type="radio"
            name="dataSource"
            value="openweather"
            checked={currentSource === 'openweather'}
            onChange={() => handleSourceChange('openweather')}
            className="w-4 h-4 accent-[#fabd2f]"
          />
          <span className="text-[#d5c4a1] text-sm">
            ☁️ OpenWeather (API Key)
          </span>
        </label>
      </div>

      {/* Info Badge */}
      <div className="mt-3 text-xs text-[#928374] border-t border-[#504945] pt-2">
        {currentSource === 'mock' && '💡 Using test data'}
        {currentSource === 'openmeteo' && '✅ No API key needed'}
        {currentSource === 'openweather' && '🔑 Requires API key in .env'}
      </div>
    </div>
  );
}