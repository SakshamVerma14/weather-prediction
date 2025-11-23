// src/components/MapPanel.tsx
import React from "react";

interface MapPanelProps {
  location: string;
}

const MapPanel: React.FC<MapPanelProps> = ({ location }) => {
  if (!location.trim()) return null;

  const query = encodeURIComponent(location);

  return (
    <div className="rounded-3xl bg-slate-900/70 border border-cyan-500/30 p-4 shadow-lg shadow-cyan-900/40">
      <h2 className="text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase mb-3">
        Location Map
      </h2>
      <div className="h-64 rounded-2xl overflow-hidden border border-slate-700">
        <iframe
          title="map"
          className="w-full h-full"
          src={`https://www.openstreetmap.org/export/embed.html?search=${query}&layer=mapnik`}
        />
      </div>
      <p className="mt-2 text-[11px] text-cyan-200/70">
        Map preview based on the entered location (OpenStreetMap).
      </p>
    </div>
  );
};

export default MapPanel;
