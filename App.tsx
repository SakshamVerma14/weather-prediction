// src/App.tsx
import React, { useState, type FormEvent } from "react";
import { weatherService } from "./services/weatherService";
import FloodPredictionWidget from "./components/FloodPredictionWidget";
import type { WeatherData } from "./types";

export default function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!location.trim()) {
      setError("Please enter a city or state");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.getWeather(location.trim());
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      let msg =
        err instanceof Error ? err.message : "Failed to fetch weather data.";
      setError(msg);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBackHome = () => {
    setLocation("");
    setWeatherData(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bgStyle: React.CSSProperties = {
    backgroundImage:
      'linear-gradient(135deg, rgba(3,7,18,0.97), rgba(15,23,42,0.96))',
    minHeight: "100vh",
  };

  return (
    <div style={bgStyle} className="text-cyan-50">
            {/* HEADER */}
      <header className="max-w-6xl mx-auto px-4 pt-6 pb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.25em] text-cyan-300 uppercase">
            Smart Climate Assistant
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-cyan-100">
            Weather &amp; Disaster Predictor
          </h1>
          <p className="mt-1 text-sm md:text-base text-cyan-200/80">
            Real-time weather, alerts &amp; AI-based hazard prediction for any
            location.
          </p>
        </div>

        {/* Compact data source pill (visual toggle) */}
        <div className="shrink-0 rounded-full bg-slate-900/80 border border-cyan-500/50 px-4 py-1 flex items-center gap-2 text-[11px] md:text-xs">
          <span className="uppercase tracking-[0.22em] text-cyan-300">
            Data Source
          </span>
          <span className="rounded-full bg-cyan-500 text-slate-900 px-3 py-0.5 font-semibold shadow shadow-cyan-900/40">
            Open-Meteo (Live)
          </span>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-4 pb-10 space-y-8">
        {/* SEARCH CARD */}
        <section className="rounded-3xl border border-cyan-500/30 bg-slate-900/70 shadow-xl shadow-cyan-900/40 backdrop-blur-xl p-5 md:p-7">
          {weatherData && (
            <button
              type="button"
              onClick={handleBackHome}
              className="mb-4 inline-flex items-center text-sm text-cyan-300 hover:text-cyan-100 transition"
            >
              ← Back to home
            </button>
          )}

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-stretch">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300">
                  🔍
                </span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city or state (e.g., Mumbai, Kerala, Bihar, Delhi…)"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950/80 border border-cyan-500/40 text-cyan-50 placeholder:text-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 font-semibold shadow-lg shadow-cyan-900/40 hover:from-cyan-300 hover:to-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {loading ? "Fetching…" : "Search"}
              </button>
            </div>

            {!weatherData && !loading && (
              <div className="flex flex-col md:flex-row justify-between gap-4 text-xs md:text-sm text-cyan-200/80">
                <div>
                  <span className="font-semibold text-cyan-100">
                    Quick start:{" "}
                  </span>
                  Try{" "}
                  <span className="font-mono">“Mumbai”, “Kerala”, “Punjab”</span>{" "}
                  or <span className="font-mono">“Bihar”</span>.
                </div>
                <div>
                  <span className="font-semibold text-cyan-100">Tip: </span>
                  You can also search non-Indian cities; Open-Meteo will still
                  return weather.
                </div>
              </div>
            )}
          </form>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-2xl border border-rose-500/40 bg-rose-900/50 px-4 py-3 text-sm text-rose-100 flex items-start gap-2">
              <span className="mt-0.5 text-lg">⚠️</span>
              <p>{error}</p>
            </div>
          )}
        </section>

        {/* LOADING */}
        {loading && (
          <section className="py-10 text-center space-y-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-cyan-400/40 border-t-transparent animate-spin" />
            <p className="text-cyan-100 text-sm md:text-base">
              Contacting weather service…
            </p>
          </section>
        )}

        {/* MAIN DASHBOARD */}
        {weatherData && !loading && (
          <>
            {/* Current + Alerts */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current conditions */}
              <div className="lg:col-span-2 rounded-3xl bg-slate-900/80 border border-cyan-500/40 p-6 space-y-3 shadow-lg shadow-cyan-900/40">
                <h2 className="text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase">
                  Current Conditions
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-cyan-100 flex items-center gap-2">
                  📍 {weatherData.current.location}
                </h3>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div className="col-span-2">
                    <div className="text-5xl font-extrabold text-cyan-200">
                      {weatherData.current.temperature}°C
                    </div>
                    <p className="text-cyan-200/80 mt-1">
                      {weatherData.current.condition}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-cyan-300/70">Feels like</p>
                    <p className="text-lg text-cyan-100">
                      {weatherData.current.feelsLike}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-cyan-300/70">Humidity</p>
                    <p className="text-lg text-cyan-100">
                      {weatherData.current.humidity}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-cyan-300/70">Wind speed</p>
                    <p className="text-lg text-cyan-100">
                      {weatherData.current.windSpeed} km/h
                    </p>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="rounded-3xl bg-slate-900/80 border border-amber-400/40 p-6 space-y-3 shadow-lg shadow-amber-900/30">
                <h2 className="text-sm font-semibold tracking-[0.25em] text-amber-300 uppercase">
                  Disaster Alerts
                </h2>
                {weatherData.alerts.length === 0 ? (
                  <p className="text-sm text-amber-100/90">
                    No active disaster alerts for this area right now.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {weatherData.alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="rounded-2xl border border-amber-400/40 bg-amber-900/30 px-4 py-3 text-sm"
                      >
                        <p className="font-semibold text-amber-100 mb-1">
                          ⚠️ {alert.title}
                        </p>
                        <p className="text-amber-50/90 text-xs mb-1">
                          {alert.description}
                        </p>
                        <p className="text-[11px] text-amber-200">
                          📍 {alert.area}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Forecast */}
            <section className="rounded-3xl bg-slate-900/80 border border-cyan-500/40 p-6 shadow-lg shadow-cyan-900/40 space-y-4">
              <h2 className="text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase">
                5-Day Forecast
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {weatherData.forecast.map((day, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-slate-800/80 border border-cyan-500/30 p-4 text-center hover:border-cyan-300 hover:-translate-y-0.5 transition"
                  >
                    <p className="font-semibold text-cyan-100 mb-1">
                      {day.day}
                    </p>
                    <p className="text-2xl font-bold text-cyan-200 mb-1">
                      {day.high}°
                    </p>
                    <p className="text-xs text-cyan-300/70 mb-1">
                      {day.low}°
                    </p>
                    <p className="text-[11px] text-cyan-200/80">
                      {day.condition}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* AI flood widget (uses your existing component & backend) */}
            <section className="rounded-3xl bg-slate-900/80 border border-emerald-400/40 p-6 md:p-8 shadow-2xl shadow-emerald-900/40 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-emerald-200">
                    AI-based Flood Severity Prediction
                  </h2>
                  <p className="text-xs md:text-sm text-emerald-100/80">
                    Uses your trained Gradient Boosting model from the Flask
                    backend.
                  </p>
                </div>
              </div>

              <FloodPredictionWidget />
            </section>
          </>
        )}

        {/* Empty state */}
        {!weatherData && !loading && !error && (
          <section className="mt-4 rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 text-sm text-cyan-100/90">
            <p>
              Start by typing a city or state in the search bar above. The app
              will fetch live weather using Open-Meteo and then you can explore
              the AI flood model below.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
