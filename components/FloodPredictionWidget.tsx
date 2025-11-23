// src/components/FloodPredictionWidget.tsx
import React, { useState } from "react";

interface FloodResult {
  severity_index: number;
  severity_label: string;
  tba_alert: number;
  model_accuracy: number;
}

const FloodPredictionWidget: React.FC = () => {
  const [rain, setRain] = useState("");
  const [rain3d, setRain3d] = useState("");
  const [riverLevel, setRiverLevel] = useState("");
  const [dangerLevel, setDangerLevel] = useState("");
  const [soil, setSoil] = useState("");
  const [upstreamRain, setUpstreamRain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FloodResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const resp = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rain_mm: Number(rain),
          rain3d_mm: Number(rain3d),
          river_level_m: Number(riverLevel),
          danger_level_m: Number(dangerLevel),
          soil_moist_pct: Number(soil),
          upstream_rain_mm: Number(upstreamRain),
        }),
      });

      if (!resp.ok) {
        throw new Error(`Server error: ${resp.status}`);
      }

      const data = (await resp.json()) as FloodResult;
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to contact flood prediction service"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-emerald-400/40 p-6 space-y-4 shadow-2xl shadow-emerald-900/40">
      <h2 className="text-lg md:text-xl font-bold text-emerald-200 flex items-center gap-2">
        <span className="text-2xl">🌊</span> AI Flood Severity Prediction
      </h2>
      <p className="text-xs md:text-sm text-emerald-100/80">
        Enter recent rainfall, river level and soil conditions. The model
        estimates flood severity (Low / Moderate / High) based on your trained
        Gradient Boosting classifier.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm"
      >
        <label className="flex flex-col gap-1">
          <span className="text-emerald-100/90">Rain (last 24h, mm)</span>
          <input
            value={rain}
            onChange={(e) => setRain(e.target.value)}
            type="number"
            step="0.1"
            className="rounded-xl bg-slate-900/80 border border-emerald-400/40 px-3 py-2 text-emerald-50 outline-none focus:ring-2 focus:ring-emerald-400/60"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-emerald-100/90">Rain (last 3 days, mm)</span>
          <input
            value={rain3d}
            onChange={(e) => setRain3d(e.target.value)}
            type="number"
            step="0.1"
            className="rounded-xl bg-slate-900/80 border border-emerald-400/40 px-3 py-2 text-emerald-50 outline-none focus:ring-2 focus:ring-emerald-400/60"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-emerald-100/90">River level (m)</span>
          <input
            value={riverLevel}
            onChange={(e) => setRiverLevel(e.target.value)}
            type="number"
            step="0.01"
            className="rounded-xl bg-slate-900/80 border border-emerald-400/40 px-3 py-2 text-emerald-50 outline-none focus:ring-2 focus:ring-emerald-400/60"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-emerald-100/90">Danger level (m)</span>
          <input
            value={dangerLevel}
            onChange={(e) => setDangerLevel(e.target.value)}
            type="number"
            step="0.01"
            className="rounded-xl bg-slate-900/80 border border-emerald-400/40 px-3 py-2 text-emerald-50 outline-none focus:ring-2 focus:ring-emerald-400/60"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-emerald-100/90">Soil moisture (%)</span>
          <input
            value={soil}
            onChange={(e) => setSoil(e.target.value)}
            type="number"
            step="0.1"
            className="rounded-xl bg-slate-900/80 border border-emerald-400/40 px-3 py-2 text-emerald-50 outline-none focus:ring-2 focus:ring-emerald-400/60"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-emerald-100/90">Upstream rain (mm)</span>
          <input
            value={upstreamRain}
            onChange={(e) => setUpstreamRain(e.target.value)}
            type="number"
            step="0.1"
            className="rounded-xl bg-slate-900/80 border border-emerald-400/40 px-3 py-2 text-emerald-50 outline-none focus:ring-2 focus:ring-emerald-400/60"
          />
        </label>

        <div className="md:col-span-3 flex justify-end mt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-xl bg-emerald-400 text-slate-900 font-semibold shadow-lg shadow-emerald-500/40 hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Predicting…" : "Predict Flood"}
          </button>
        </div>
      </form>

      {error && (
        <p className="text-sm text-rose-200 bg-rose-900/40 border border-rose-500/40 rounded-xl px-4 py-2">
          {error}
        </p>
      )}

      {result && !error && (
        <div className="mt-2 rounded-2xl border border-emerald-400/40 bg-emerald-900/30 px-4 py-3 text-sm text-emerald-50">
          <p className="font-semibold">
            Predicted Severity:{" "}
            <span className="uppercase">{result.severity_label}</span>
          </p>
          <p className="text-xs mt-1">
            Model test accuracy: {(result.model_accuracy * 100).toFixed(1)}%
          </p>
          {result.tba_alert === 1 && (
            <p className="mt-1 text-xs text-amber-200">
              ⚠️ TBA rule-based alert is active (very high rain / river level).
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FloodPredictionWidget;
