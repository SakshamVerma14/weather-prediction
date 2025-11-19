// src/components/DataSourceToggle.tsx
import { useState } from 'react';
import { weatherService, type DataSource } from '../services/weatherService';

export default function DataSourceToggle() {
  const [currentSource, setCurrentSource] = useState<DataSource>(
    weatherService.getDataSource()
  );
  const defaultSource: DataSource = 'openmeteo';

  const handleSourceChange = (source: DataSource) => {
    setCurrentSource(source);
    weatherService.setDataSource(source);
    
    // Show toast notification (optional)
    console.log(`Switched to ${source} data source`);
  };

  const options: Array<{ value: DataSource; label: string; hint: string; emoji: string }> = [
    { value: 'mock', label: 'Mock Lab', hint: 'design demos', emoji: '🎭' },
    { value: 'openmeteo', label: 'Open-Meteo', hint: 'no key', emoji: '🌍' },
    { value: 'openweather', label: 'OpenWeather', hint: 'api key', emoji: '☁️' },
  ];

  const hint = {
    mock: 'Using curated storytelling data',
    openmeteo: 'Live global feed · instant switch',
    openweather: 'Bring your API key for pro metrics',
  } as const;

  return (
    <div className="fixed top-6 right-6 z-30 w-72 max-w-[calc(100vw-2rem)]">
      <div className="rounded-[34px] border border-white/12 bg-white/8 p-5 text-slate-100 backdrop-blur-2xl shadow-[0_22px_70px_rgba(4,7,21,0.55)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.45em] text-slate-300/80">Data feed</p>
            <p className="text-lg font-semibold text-white">Signal router</p>
          </div>
          <button
            type="button"
            aria-label="Reset data source"
            onClick={() => handleSourceChange(defaultSource)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-lg text-slate-200 transition hover:border-amber-200/60 hover:text-white"
          >
            ↺
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSourceChange(option.value)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 ${
                currentSource === option.value
                  ? 'border-white/50 bg-white/20 text-white shadow-inner shadow-white/20'
                  : 'border-white/5 bg-white/5 text-slate-200 hover:border-white/25 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="text-base font-semibold">{option.emoji} {option.label}</div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">{option.hint}</p>
              </div>
              <span
                className={`h-3 w-3 rounded-full ${
                  currentSource === option.value ? 'bg-emerald-300' : 'bg-slate-500'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 text-[12px] text-slate-100/80">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
          <p>{hint[currentSource]}</p>
        </div>
      </div>
    </div>
  );
}