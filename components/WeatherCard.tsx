import React from 'react';
import type { CurrentWeather } from '../types';
import {
  SunnyIcon,
  CloudyIcon,
  RainyIcon,
  SnowyIcon,
  PartlyCloudyIcon,
  ThunderstormIcon,
} from './icons';

interface WeatherCardProps {
  current: CurrentWeather;
}

const WeatherIcon: React.FC<{ condition: string; className?: string }> = ({
  condition,
  className = '',
}) => {
  switch (condition) {
    case 'Sunny':
      return <SunnyIcon className={className} />;
    case 'Cloudy':
      return <CloudyIcon className={className} />;
    case 'Rainy':
      return <RainyIcon className={className} />;
    case 'Snowy':
      return <SnowyIcon className={className} />;
    case 'Thunderstorm':
      return <ThunderstormIcon className={className} />;
    case 'Partly Cloudy':
      return <PartlyCloudyIcon className={className} />;
    default:
      return <CloudyIcon className={className} />;
  }
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ current }) => {
  const comfort =
    100 - Math.min(100, Math.abs(24 - current.temperature) * 4 + Math.abs(50 - current.humidity));

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-white/15 via-white/5 to-transparent p-6 text-slate-100 backdrop-blur-2xl shadow-[0_25px_80px_rgba(8,12,47,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_60%)] opacity-40" />
      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-200/80">
              Current weather
            </h2>
            <p className="text-3xl font-semibold text-white">{current.location}</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-amber-100">
            Live
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6">
            <div>
              <p className="text-7xl font-black leading-none text-white drop-shadow-[0_10px_30px_rgba(15,23,42,0.7)]">
                {current.temperature}°
              </p>
              <p className="mt-2 text-base text-slate-300">Feels like {current.feelsLike}°C</p>
            </div>
            <div className="h-24 w-24 rounded-3xl border border-white/25 bg-slate-900/30 p-3 text-white shadow-inner shadow-white/30">
              <WeatherIcon condition={current.condition} className="h-full w-full" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-[13px] uppercase tracking-[0.6em] text-slate-400">Condition</p>
            <p className="text-2xl font-semibold text-amber-200">{current.condition}</p>
            <p className="mt-1 text-sm text-slate-300">Comfort score {Math.round(comfort)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Humidity</p>
            <p className="text-3xl font-semibold text-white">{current.humidity}%</p>
            <p className="text-xs text-slate-300">Indoor comfort {(current.humidity >= 35 && current.humidity <= 55) ? 'stable' : 'check air flow'}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Wind</p>
            <p className="text-3xl font-semibold text-white">{current.windSpeed} km/h</p>
            <p className="text-xs text-slate-300">
              {current.windSpeed > 25 ? 'Gusty · secure loose items' : 'Calm breeze outdoors'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};