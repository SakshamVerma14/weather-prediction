import React from 'react';
import type { MockLocation } from '../services/weatherService';
import { MOCK_LOCATION_OPTIONS } from '../services/weatherService';
import { CloudIcon } from './icons';

interface HeaderProps {
  selectedLocation: MockLocation;
  onLocationChange: (location: MockLocation) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedLocation, onLocationChange }) => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm p-4 flex justify-between items-center border-b border-slate-700 sticky top-0 z-50">
      <a href="#/" className="flex items-center space-x-3 text-white no-underline">
        <CloudIcon className="h-8 w-8 text-cyan-400" />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Weather & Disaster Watch
        </h1>
      </a>

      <div className="relative">
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value as MockLocation)}
          className="bg-slate-700 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 appearance-none pr-8 cursor-pointer"
        >
          {MOCK_LOCATION_OPTIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};
