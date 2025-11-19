import React from 'react';
import type { Forecast } from '../types';
import {
  SunnyIcon,
  CloudyIcon,
  RainyIcon,
  SnowyIcon,
  PartlyCloudyIcon,
  ThunderstormIcon,
} from './icons';

interface ForecastPanelProps {
  forecast: Forecast[];
}

const ForecastIcon: React.FC<{ condition: string; className?: string }> = ({
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

export const ForecastPanel: React.FC<ForecastPanelProps> = ({ forecast }) => {
  return (
    <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-transparent p-6 text-slate-100 backdrop-blur-2xl shadow-[0_20px_60px_rgba(7,16,45,0.45)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white">5-day sky story</h2>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Auto refreshed</p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {forecast.map((day, index) => (
          <div
            key={`${day.day}-${index}`}
            className="rounded-2xl border border-white/5 bg-white/10 p-4 text-center shadow-inner shadow-white/10 transition hover:-translate-y-1 hover:border-amber-200/60"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">{day.day}</p>
            <ForecastIcon condition={day.condition} className="mx-auto my-3 h-12 w-12 text-amber-200" />
            <div className="text-2xl font-semibold text-white">{day.high}°</div>
            <p className="text-sm text-slate-300">Feels {day.low}° · {day.condition}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-cyan-300 via-amber-200 to-rose-200"
                style={{ width: `${Math.min(100, Math.max(20, day.high * 3))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};