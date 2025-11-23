// src/components/DataSourceToggle.tsx
import { useEffect, useState } from "react";
import {
  getCurrentSource,
  setCurrentSource,
  type DataSource,
} from "../services/weatherService";

export default function DataSourceToggle() {
  const [source, setSource] = useState<DataSource>("mock");

  useEffect(() => {
    setSource(getCurrentSource());
  }, []);

  const handleChange = (next: DataSource) => {
    setSource(next);
    setCurrentSource(next);
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 border border-cyan-500/40 px-3 py-2 text-xs text-cyan-100 shadow-md shadow-cyan-900/40">
      <span className="tracking-[0.2em] uppercase text-[10px] text-cyan-300">
        Data Source
      </span>
      <div className="flex items-center rounded-full bg-slate-950/80 p-1 gap-1">
        <button
          type="button"
          onClick={() => handleChange("mock")}
          className={`px-3 py-1 rounded-full transition text-[11px] ${
            source === "mock"
              ? "bg-cyan-400 text-slate-900 font-semibold shadow shadow-cyan-400/40"
              : "text-cyan-200 hover:bg-slate-800"
          }`}
        >
          Mock Data
        </button>
        <button
          type="button"
          onClick={() => handleChange("open-meteo")}
          className={`px-3 py-1 rounded-full transition text-[11px] ${
            source === "open-meteo"
              ? "bg-cyan-400 text-slate-900 font-semibold shadow shadow-cyan-400/40"
              : "text-cyan-200 hover:bg-slate-800"
          }`}
        >
          Open-Meteo
        </button>
      </div>
    </div>
  );
}
