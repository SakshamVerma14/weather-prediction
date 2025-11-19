// src/App.tsx
import { useState, type FormEvent, useMemo } from 'react';
import { weatherService } from './services/weatherService';
import DataSourceToggle from './components/DataSourceToggle';
import { WeatherCard } from './components/WeatherCard';
import { ForecastPanel } from './components/ForecastPanel';
import { AlertPanel } from './components/AlertPanel';
import type { WeatherData } from './types';

const heroImages: Record<string, string> = {
  Sunny: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80',
  'Partly Cloudy':
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
  Cloudy:
    'https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1600&q=80',
  Rainy:
    'https://images.unsplash.com/photo-1437624155766-b64bf17eb2ce?auto=format&fit=crop&w=1600&q=80',
  Thunderstorm:
    'https://images.unsplash.com/photo-1498810902911-015eea1048b5?auto=format&fit=crop&w=1600&q=80',
  Snowy: 'https://images.unsplash.com/photo-1605478031036-1650f87ba4ec?auto=format&fit=crop&w=1600&q=80',
};

type TrendProps = {
  values: number[];
  labels: string[];
};

const TemperatureSparkline = ({ values, labels }: TrendProps) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (values.length < 2) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300">
        Not enough data to plot trend
      </div>
    );
  }

  const max = Math.max(...values);
  const min = Math.min(...values);
  const variance = max - min;
  const consistencyScore = Math.max(0, Math.min(100, 100 - variance * 4));
  const coords = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100;
    const range = variance || 1;
    const y = 100 - ((value - min) / range) * 100;
    return { x, y };
  });

  const linePoints = coords.map((point) => `${point.x},${point.y}`).join(' ');
  const areaPoints = `${coords.map((point) => `${point.x},${point.y}`).join(' ')} 100,100 0,100`;
  const activeIndex = hoverIndex ?? values.indexOf(max);

  const tooltip = hoverIndex !== null
    ? {
        label: labels[hoverIndex],
        value: values[hoverIndex],
        coord: coords[hoverIndex],
      }
    : null;

  return (
    <div className="relative rounded-[40px] border border-white/15 bg-gradient-to-br from-white/12 via-white/5 to-transparent p-8 text-slate-100 backdrop-blur-2xl shadow-[0_25px_90px_rgba(5,11,39,0.65)]">
      {tooltip && (
        <div
          className="pointer-events-none absolute z-20 min-w-[140px] rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-2 text-xs text-slate-100 shadow-lg"
          style={{
            left: `calc(${tooltip.coord.x}% - 70px)`,
            top: `calc(${tooltip.coord.y}% - 20px)`,
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-slate-300">Hover</p>
          <p className="text-sm font-semibold">{tooltip.label}</p>
          <p className="text-lg font-bold text-white">{tooltip.value}°C</p>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-slate-300">Thermal glide</p>
          <h3 className="text-3xl font-semibold text-white">Temperature arc</h3>
          <p className="text-sm text-slate-300">Next 5 days · {min}° to {max}°C</p>
        </div>
        <div className="rounded-3xl border border-white/15 bg-white/5 px-4 py-3 text-right">
          <p className="text-[11px] uppercase tracking-[0.45em] text-slate-300">Consistency</p>
          <p className="text-2xl font-semibold">{Math.round(consistencyScore)}%</p>
          <p className="text-xs text-slate-400">Lower swing = calmer days</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="relative h-64 w-full">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Temperature consistency chart"
            onMouseLeave={() => setHoverIndex(null)}
          >
            <defs>
              <linearGradient id="trend-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="50%" stopColor="#f9a8d4" />
                <stop offset="100%" stopColor="#fcd34d" />
              </linearGradient>
              <linearGradient id="trend-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(248, 189, 255, 0.35)" />
                <stop offset="100%" stopColor="rgba(10, 15, 42, 0)" />
              </linearGradient>
            </defs>
            {[20, 40, 60, 80].map((y) => (
              <line
                key={`grid-${y}`}
                x1="0"
                x2="100"
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
              />
            ))}
            <polygon points={areaPoints} fill="url(#trend-fill)" opacity={0.8} />
            <polyline
              points={linePoints}
              fill="none"
              stroke="url(#trend-line)"
              strokeWidth={3}
              strokeLinecap="round"
            />
            {coords.map((point, index) => (
              <g key={`dot-${labels[index]}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={index === activeIndex ? 2.8 : 2}
                  fill="#fff"
                  opacity={index === activeIndex ? 1 : 0.7}
                />
                <rect
                  x={point.x - 4}
                  y={point.y - 10}
                  width={8}
                  height={20}
                  fill="transparent"
                  onMouseEnter={() => setHoverIndex(index)}
                />
              </g>
            ))}
          </svg>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.4em] text-slate-400">
          {labels.map((label, index) => (
            <span
              key={label}
              className={index === activeIndex ? 'text-white' : undefined}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="mt-3 text-sm text-slate-300">
          {hoverIndex !== null
            ? `Hovering ${labels[hoverIndex]} · peak ${values[hoverIndex]}°C`
            : 'Hover the arc to inspect each day’s spike'}
        </div>
      </div>
    </div>
  );
};

type MetricCardProps = {
  label: string;
  value: string;
  hint: string;
  accent: string;
  progress?: number;
};

const MetricCard = ({ label, value, hint, accent, progress }: MetricCardProps) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">
    <p className="text-[11px] uppercase tracking-[0.5em] text-slate-400">{label}</p>
    <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
    <p className="text-sm text-slate-300">{hint}</p>
    {typeof progress === 'number' && (
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <span
          className="block h-full rounded-full transition-all"
          style={{
            width: `${progress}%`,
            backgroundImage: `linear-gradient(90deg, ${accent}, rgba(255,255,255,0.8))`,
          }}
        />
      </div>
    )}
  </div>
);

const getRainChance = (condition: string) => {
  if (condition.includes('Rain') || condition.includes('Storm')) return 82;
  if (condition.includes('Cloud')) return 38;
  if (condition.includes('Snow')) return 65;
  return 12;
};

const getComfortScore = (temp: number, humidity: number) =>
  Math.max(
    0,
    Math.min(100, 100 - Math.abs(24 - temp) * 3 - Math.abs(55 - humidity) * 0.8),
  );

const getAlertPressure = (alerts: WeatherData['alerts']) =>
  Math.min(100, alerts.length * 30 + alerts.filter((a) => a.severity === 'Warning').length * 10);

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

  const trendData = useMemo(() => {
    if (!weatherData) return { values: [], labels: [] };
    return {
      values: weatherData.forecast.map((day) => day.high),
      labels: weatherData.forecast.map((day) => day.day.slice(0, 3)),
    };
  }, [weatherData]);

  const analytics = useMemo(() => {
    if (!weatherData) {
      return null;
    }
    const { current, alerts } = weatherData;
    return [
      {
        label: 'Comfort index',
        value: `${Math.round(getComfortScore(current.temperature, current.humidity))}%`,
        hint: current.temperature > 32 ? 'Heat stress likely · hydrate more' : 'Evening breeze comfort zone',
        progress: getComfortScore(current.temperature, current.humidity),
        accent: '#f9a8d4',
      },
      {
        label: 'Rain signal',
        value: `${getRainChance(current.condition)}%`,
        hint: current.condition.includes('Rain') ? 'Carry rain shell · pop-up showers' : 'Low precipitation window',
        progress: getRainChance(current.condition),
        accent: '#67e8f9',
      },
      {
        label: 'Wind load',
        value: `${current.windSpeed} km/h`,
        hint: current.windSpeed > 30 ? 'Secure loose rooftop items' : 'Friendly for outdoor plans',
        progress: Math.min(100, (current.windSpeed / 60) * 100),
        accent: '#fcd34d',
      },
      {
        label: 'Alert pressure',
        value: `${weatherData.alerts.length} active`,
        hint: alerts.length ? 'Tap cards to brief stakeholders' : 'Monitoring quiet tonight',
        progress: getAlertPressure(alerts),
        accent: '#fb7185',
      },
    ];
  }, [weatherData]);

  const heroImage =
    weatherData?.current?.condition && heroImages[weatherData.current.condition]
      ? heroImages[weatherData.current.condition]
      : 'https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1600&q=80';

  const maxSwingSpan = useMemo(() => {
    if (!weatherData) return 1;
    return Math.max(...weatherData.forecast.map((d) => Math.max(1, d.high - d.low)));
  }, [weatherData]);

  const heroHighlights = useMemo(
    () => [
      { label: 'Coverage', value: '190+ geo clusters' },
      { label: 'Alert latency', value: '< 60s relay' },
      { label: 'Mock scenes', value: '5 cinematic sets' },
    ],
    [],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040a19] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-32 h-96 w-96 rounded-full bg-amber-400/20 blur-[140px]" />
        <div className="absolute top-0 right-0 h-[32rem] w-[32rem] rounded-full bg-cyan-400/20 blur-[160px]" />
      </div>

      <DataSourceToggle />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-20 pt-16 sm:px-6 lg:px-0">
        <section className="rounded-[42px] border border-white/12 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_rgba(4,6,28,0.6))] p-8 text-center text-slate-100 shadow-[0_24px_90px_rgba(8,12,37,0.65)] backdrop-blur-2xl">
          <header>
            <p className="text-xs uppercase tracking-[0.6em] text-amber-100">Evening desk · live</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Weather & Disaster Lookout
            </h1>
            <p className="mt-3 text-base text-slate-200 md:text-lg">
              A cinematic dashboard that pairs glass cards, atmospheric imagery, alert intelligence and analytics built for storytellers.
            </p>
          </header>
          <div className="mt-6 grid gap-4 text-left sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/15 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSearch}
            className="mt-8 flex w-full flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 text-left text-slate-100 backdrop-blur-xl sm:flex-row sm:items-center sm:px-8 sm:py-6"
          >
            <div className="flex-1">
              <label className="text-xs uppercase tracking-[0.4em] text-slate-400">Search city</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Try Mumbai, Kashmir, Manila, Nairobi..."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-amber-200 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl border border-amber-200/40 bg-gradient-to-r from-amber-400/80 to-rose-400/80 px-6 py-3 text-base font-semibold text-slate-950 shadow-[0_10px_30px_rgba(251,191,36,0.35)] transition hover:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Scanning...' : 'Launch briefing'}
            </button>
          </form>
        </section>

        {error && (
          <div className="mx-auto w-full rounded-3xl border border-rose-400/40 bg-rose-500/10 px-6 py-4 text-center text-rose-100">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-amber-200/40 border-t-amber-300" />
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300">Fetching layers</p>
          </div>
        )}

        {weatherData && !loading && (
          <section className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
              <article
                className="relative overflow-hidden rounded-[36px] border border-white/15 bg-slate-950/40 text-white shadow-[0_30px_80px_rgba(7,11,32,0.75)]"
                style={{
                  backgroundImage: `linear-gradient(120deg, rgba(2,8,23,0.8), rgba(2,0,36,0.4)), url(${heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="relative z-10 flex h-full flex-col gap-6 p-8">
                  <p className="text-xs uppercase tracking-[0.5em] text-amber-200">Spotlight city</p>
                  <div>
                    <h2 className="text-4xl font-bold drop-shadow-2xl">{weatherData.current.location}</h2>
                    <p className="text-lg text-amber-100">{weatherData.current.condition}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="rounded-full border border-white/30 px-4 py-1 backdrop-blur">
                      Feels {weatherData.current.feelsLike}°C
                    </span>
                    <span className="rounded-full border border-white/30 px-4 py-1 backdrop-blur">
                      Humidity {weatherData.current.humidity}%
                    </span>
                    <span className="rounded-full border border-white/30 px-4 py-1 backdrop-blur">
                      Wind {weatherData.current.windSpeed} km/h
                    </span>
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-3xl border border-white/20 bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-200">Evening vibe</p>
                      <p className="text-xl font-semibold">
                        {weatherData.current.temperature > 30 ? 'Warm orange glow' : 'Cool indigo breeze'}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/20 bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-200">Plan radar</p>
                      <p className="text-xl font-semibold">
                        {weatherData.alerts.length ? 'Keep alerts pinned' : 'Open skies · go explore'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
              </article>

              <WeatherCard current={weatherData.current} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
              <TemperatureSparkline values={trendData.values} labels={trendData.labels} />
              <div className="grid gap-4">
                {analytics?.map((card) => (
                  <MetricCard key={card.label} {...card} />
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl lg:col-span-2">
                <h3 className="text-xl font-semibold text-white">Daily swing analytics</h3>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  High / low amplitude · better wardrobe picks
                </p>
                <div className="mt-5 space-y-4">
                  {weatherData.forecast.map((day) => {
                    const span = Math.max(1, day.high - day.low);
                    return (
                      <div key={`swing-${day.day}`} className="flex items-center gap-4">
                        <span className="w-16 text-sm text-slate-300">{day.day}</span>
                        <div className="flex-1 rounded-full bg-white/10">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-cyan-400 via-amber-200 to-rose-200"
                            style={{ width: `${(span / maxSwingSpan) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-200">
                          {day.low}° / {day.high}°
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-transparent p-6 backdrop-blur-2xl">
                <h3 className="text-xl font-semibold text-white">Planner cues</h3>
                <ul className="mt-4 space-y-4 text-sm text-slate-200">
                  <li>🧥 Layering tip: base tee + light jacket for quick temperature dips.</li>
                  <li>🧭 Comms: push alert snapshots to local groups if severity switches.</li>
                  <li>🎯 Field ops: best outdoor window {'<'} 4PM when heat index tapers.</li>
                  <li>🌊 Coastal note: watch tidal briefings if wind {'>'} 35 km/h.</li>
                </ul>
              </div>
            </div>

            <ForecastPanel forecast={weatherData.forecast} />

            <div className="grid gap-6 lg:grid-cols-2">
              <AlertPanel alerts={weatherData.alerts} />
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-slate-100 backdrop-blur-2xl">
                <h3 className="text-xl font-semibold text-white">Field analytics</h3>
                <p className="text-sm text-slate-300">
                  We remix meteorological signals into actionable storyboards.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <MetricCard
                    label="Visibility"
                    value={weatherData.current.condition.includes('Fog') ? 'Low' : 'Clear 9km'}
                    hint="Pilots + drone ops reference"
                    accent="#67e8f9"
                    progress={weatherData.current.condition.includes('Fog') ? 35 : 84}
                  />
                  <MetricCard
                    label="Mobility risk"
                    value={weatherData.alerts.length ? 'Elevated' : 'Soft green'}
                    hint="Road & rail planning"
                    accent="#fb7185"
                    progress={weatherData.alerts.length ? 68 : 28}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {!weatherData && !loading && (
          <div className="mx-auto max-w-3xl rounded-[36px] border border-white/10 bg-white/5 p-8 text-center text-slate-200 backdrop-blur-2xl">
            <h3 className="text-2xl font-semibold text-white">Start your scene</h3>
            <p className="mt-2 text-sm text-slate-300">
              Type any city to pull live feeds or flip the floating data router to explore mock storytelling sets. Every panel follows the same glass theme for a cohesive hero section feel.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}